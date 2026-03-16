import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';

import { User } from '../users/entities/user.entity';
import { UsersModule } from '../users/users.module';

@Module({
imports:[
UsersModule,
TypeOrmModule.forFeature([User]),
JwtModule.register({
secret:'secret123',
signOptions:{expiresIn:'1d'}
})
],
providers:[AuthService,JwtStrategy],
controllers:[AuthController]
})
export class AuthModule {}