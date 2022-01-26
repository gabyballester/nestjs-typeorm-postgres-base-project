import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BcryptProvider } from 'src/common/providers/bcrypt.provider';
import { UserEntity } from '../user/user.entity';
import { UserRepository } from '../user/user.repository';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, UserRepository])],
  controllers: [AuthController],
  providers: [AuthService, BcryptProvider],
})
export class AuthModule {}
