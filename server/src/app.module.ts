import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { NewsModule } from './news/news.module';
import { CacheModule, Module, CacheInterceptor } from '@nestjs/common';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '120.79.56.127',
      port: 3306,
      username: 'root',
      password: 'tdbqyy8=ftdH',
      database: 'fire',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      // synchronize: true,
      logging: true,
    }),
    CacheModule.register(),
    NewsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
})
export class AppModule {}
