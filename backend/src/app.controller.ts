import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('health')
  healthCheck() {
    return {
      status: 'ok',
      service: 'anybuy-api',
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
    };
  }

  @Get()
  root() {
    return {
      name: 'AnyBuy API',
      status: 'healthy',
      version: '1.0.0',
      timestamp: new Date().toISOString(),
    };
  }
}
