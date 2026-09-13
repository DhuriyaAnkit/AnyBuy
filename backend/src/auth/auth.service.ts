import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
  NotFoundException,
  Logger,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import * as bcrypt from 'bcryptjs';
import * as crypto from 'crypto';
import { PrismaService } from '../database/prisma.service';
import { UsersService } from '../users/users.service';
import { EmailService } from '../email/email.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly emailService: EmailService,
  ) {}

  async register(dto: RegisterDto) {
    const existing = await this.usersService.findByEmail(dto.email);
    if (existing) {
      throw new BadRequestException('An account with this email address already exists.');
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(dto.password, salt);

    const user = await this.usersService.create({
      name: dto.name,
      email: dto.email,
      passwordHash,
      role: dto.role,
    });

    // Generate Verification Token (24-hour expiration)
    const verificationToken = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

    await this.prisma.verificationToken.create({
      data: {
        token: verificationToken,
        email: user.email,
        userId: user.id,
        expiresAt,
      },
    });

    // Send verification email
    await this.emailService.sendVerificationEmail(user.email, verificationToken);

    const { passwordHash: _, ...sanitizedUser } = user;
    return {
      success: true,
      message: 'Registration successful! Please check your email to verify your account.',
      user: sanitizedUser,
    };
  }

  async login(dto: LoginDto, res: Response) {
    const user = await this.usersService.findByEmail(dto.email);
    if (!user) {
      throw new UnauthorizedException('Invalid email address or password.');
    }

    const isMatch = await bcrypt.compare(dto.password, user.passwordHash);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid email address or password.');
    }

    const payload = { sub: user.id, email: user.email, role: user.role };
    const accessToken = this.jwtService.sign(payload);

    // Refresh Token (7 days or 30 days if rememberMe)
    const refreshDurationDays = dto.rememberMe ? 30 : 7;
    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_REFRESH_SECRET', 'anybuy-super-secure-refresh-secret-change-in-production'),
      expiresIn: `${refreshDurationDays}d` as any,
    });

    // Store refresh token hash
    const tokenHash = crypto.createHash('sha256').update(refreshToken).digest('hex');
    await this.prisma.refreshToken.create({
      data: {
        tokenHash,
        userId: user.id,
        expiresAt: new Date(Date.now() + refreshDurationDays * 24 * 60 * 60 * 1000),
      },
    });

    this.setAuthCookies(res, accessToken, refreshToken, refreshDurationDays);

    const { passwordHash: _, ...sanitizedUser } = user;
    return {
      success: true,
      message: 'Logged in successfully.',
      user: sanitizedUser,
      accessToken,
    };
  }

  async logout(userId: string, res: Response) {
    if (userId) {
      await this.prisma.refreshToken.updateMany({
        where: { userId, revoked: false },
        data: { revoked: true },
      });
    }

    this.clearAuthCookies(res);
    return {
      success: true,
      message: 'Logged out successfully.',
    };
  }

  async verifyEmail(token: string) {
    const record = await this.prisma.verificationToken.findUnique({
      where: { token },
      include: { user: true },
    });

    if (!record) {
      throw new BadRequestException('Invalid or expired verification link.');
    }

    if (new Date() > record.expiresAt) {
      await this.prisma.verificationToken.delete({ where: { id: record.id } });
      throw new BadRequestException('Verification link has expired. Please request a new one.');
    }

    await this.usersService.markEmailAsVerified(record.userId);
    await this.prisma.verificationToken.delete({ where: { id: record.id } });

    return {
      success: true,
      message: 'Email address successfully verified! You can now access all marketplace features.',
    };
  }

  async resendVerification(email: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      // Return generic success to avoid email enumeration
      return {
        success: true,
        message: 'If an unverified account exists with this email, a new verification link was sent.',
      };
    }

    if (user.emailVerified) {
      return {
        success: true,
        message: 'This email address is already verified. You may sign in directly.',
      };
    }

    // Delete existing tokens
    await this.prisma.verificationToken.deleteMany({
      where: { email: user.email },
    });

    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

    await this.prisma.verificationToken.create({
      data: {
        token,
        email: user.email,
        userId: user.id,
        expiresAt,
      },
    });

    await this.emailService.sendVerificationEmail(user.email, token);

    return {
      success: true,
      message: 'If an unverified account exists with this email, a new verification link was sent.',
    };
  }

  async forgotPassword(email: string) {
    const genericResponse = {
      success: true,
      message: "If an account exists for this email, we'll send password reset instructions.",
    };

    const user = await this.usersService.findByEmail(email);
    if (!user) {
      return genericResponse;
    }

    // Invalidate prior unused tokens
    await this.prisma.passwordResetToken.deleteMany({
      where: { email: user.email, used: false },
    });

    // Generate Single-Use Token (1-hour expiration)
    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000);

    await this.prisma.passwordResetToken.create({
      data: {
        token,
        email: user.email,
        userId: user.id,
        expiresAt,
      },
    });

    await this.emailService.sendPasswordResetEmail(user.email, token);
    return genericResponse;
  }

  async resetPassword(dto: ResetPasswordDto) {
    const resetRecord = await this.prisma.passwordResetToken.findUnique({
      where: { token: dto.token },
      include: { user: true },
    });

    if (!resetRecord || resetRecord.used) {
      throw new BadRequestException('Invalid or expired password reset token.');
    }

    if (new Date() > resetRecord.expiresAt) {
      throw new BadRequestException('Password reset token has expired. Please request a new link.');
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(dto.newPassword, salt);

    await this.usersService.updatePassword(resetRecord.userId, passwordHash);

    // Mark token as used
    await this.prisma.passwordResetToken.update({
      where: { id: resetRecord.id },
      data: { used: true },
    });

    // Invalidate active refresh tokens for security
    await this.prisma.refreshToken.updateMany({
      where: { userId: resetRecord.userId, revoked: false },
      data: { revoked: true },
    });

    return {
      success: true,
      message: 'Password reset successfully. You can now sign in with your new password.',
    };
  }

  async refresh(refreshToken: string, res: Response) {
    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token is missing.');
    }

    try {
      const payload = this.jwtService.verify(refreshToken, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET', 'anybuy-super-secure-refresh-secret-change-in-production'),
      });

      const tokenHash = crypto.createHash('sha256').update(refreshToken).digest('hex');
      const storedToken = await this.prisma.refreshToken.findUnique({
        where: { tokenHash },
      });

      if (!storedToken || storedToken.revoked || new Date() > storedToken.expiresAt) {
        this.clearAuthCookies(res);
        throw new UnauthorizedException('Refresh token has expired or was revoked.');
      }

      const user = await this.usersService.findById(payload.sub);
      if (!user) {
        this.clearAuthCookies(res);
        throw new UnauthorizedException('User no longer exists.');
      }

      const newAccessToken = this.jwtService.sign({
        sub: user.id,
        email: user.email,
        role: user.role,
      });

      const isSecure = this.configService.get<string>('COOKIE_SECURE') === 'true';
      res.cookie('access_token', newAccessToken, {
        httpOnly: true,
        secure: isSecure,
        sameSite: 'lax',
        maxAge: 15 * 60 * 1000,
        path: '/',
      });

      return {
        success: true,
        accessToken: newAccessToken,
      };
    } catch {
      this.clearAuthCookies(res);
      throw new UnauthorizedException('Invalid refresh token.');
    }
  }

  private setAuthCookies(res: Response, accessToken: string, refreshToken: string, refreshDays: number) {
    const isSecure = this.configService.get<string>('COOKIE_SECURE') === 'true';

    res.cookie('access_token', accessToken, {
      httpOnly: true,
      secure: isSecure,
      sameSite: 'lax',
      maxAge: 15 * 60 * 1000, // 15 mins
      path: '/',
    });

    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      secure: isSecure,
      sameSite: 'lax',
      maxAge: refreshDays * 24 * 60 * 60 * 1000,
      path: '/',
    });
  }

  private clearAuthCookies(res: Response) {
    const isSecure = this.configService.get<string>('COOKIE_SECURE') === 'true';

    res.clearCookie('access_token', {
      httpOnly: true,
      secure: isSecure,
      sameSite: 'lax',
      path: '/',
    });

    res.clearCookie('refresh_token', {
      httpOnly: true,
      secure: isSecure,
      sameSite: 'lax',
      path: '/',
    });
  }
}
