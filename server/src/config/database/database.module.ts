import { Module, Global } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createPool, Pool } from 'mysql2/promise';

@Global()
@Module({
  providers: [
    {
      provide: 'MYSQL_POOL',
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const pool: Pool = createPool({
          host: configService.get<string>('DB_HOST'),
          port: configService.get<number>('DB_PORT'),
          user: configService.get<string>('DB_USER'),
          password: configService.get<string>('DB_PASSWORD'),
          database: configService.get<string>('DB_NAME'),
          waitForConnections: true,
          connectionLimit: 10,
          queueLimit: 0,
        });
        return pool;
      },
    },
  ],
  exports: ['MYSQL_POOL'],
})
export class DatabaseModule { }
