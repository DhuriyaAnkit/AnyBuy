import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);

  constructor(private readonly configService: ConfigService) {}

  async sendVerificationEmail(email: string, token: string): Promise<void> {
    const frontendUrl = this.configService.get<string>('FRONTEND_URL', 'http://localhost:3000');
    const verificationUrl = `${frontendUrl}/auth/verify-email?token=${token}`;

    this.logger.log(`📧 [Verification Email] Sent to: ${email}`);
    this.logger.log(`🔗 Verification Link: ${verificationUrl}`);
  }

  async sendPasswordResetEmail(email: string, token: string): Promise<void> {
    const frontendUrl = this.configService.get<string>('FRONTEND_URL', 'http://localhost:3000');
    const resetUrl = `${frontendUrl}/auth/reset-password?token=${token}`;

    this.logger.log(`📧 [Password Reset Email] Sent to: ${email}`);
    this.logger.log(`🔗 Password Reset Link: ${resetUrl}`);
  }
}
