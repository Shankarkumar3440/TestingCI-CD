import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({
   isGlobal: true,
   envFilePath: '.process.env'
  }), 
   TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    useFactory: (configSevice:ConfigService) =>({
     type: 'mysql',
     host: configSevice.get('DB_HOST'),
     port: configSevice.get<number>('DB_PORT'),
     username: configSevice.get('DB_USERNAME'),
     password: configSevice.get('DB_PASSWORD'),
     database: configSevice.get('DB_NAME'),
     entities: [__dirname + '/**/*.entity{.ts,.js}'],
     synchronize: true,  
     logging: true
    }),
    inject: [ConfigService],
   }),

    UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
