import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { PostModule } from './modules/post/post.module';
import { RoleModule } from './modules/role/role.module';

@Module({
  imports: [UserModule, AuthModule, PostModule, RoleModule]
})
export class ApiModule {}
