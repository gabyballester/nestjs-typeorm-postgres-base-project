import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Key } from 'src/common/enum';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy, LocalStrategy } from './strategies';
import { BcryptProvider, JwtProvider } from 'src/common/providers';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: Key.SECRET_KEY,
    }),
    UserModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy, BcryptProvider, JwtProvider],
})
export class AuthModule {}

// import { Module } from '@nestjs/common';
// import { JwtModule } from '@nestjs/jwt';
// import { PassportModule } from '@nestjs/passport';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { Key } from 'src/common/enum';
// import { BcryptProvider } from 'src/common/providers/bcrypt.provider';
// import { UserEntity } from '../user/user.entity';
// import { UserRepository } from '../user/user.repository';
// import { AuthController } from './auth.controller';
// import { AuthService } from './auth.service';
// import { JwtStrategy } from './strategies';

// @Module({
//   imports: [
//     PassportModule.register({}),
//     JwtModule.register({
//       secret: Key.SECRET_KEY,
//       signOptions: {
//         expiresIn: 3600,
//       },
//     }),

//     TypeOrmModule.forFeature([UserEntity, UserRepository]),
//   ],
//   controllers: [AuthController],
//   providers: [AuthService, BcryptProvider, JwtStrategy],
//   exports:[JwtStrategy, PassportModule]
// })
// export class AuthModule {}
