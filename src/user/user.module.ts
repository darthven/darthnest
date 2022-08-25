import { Module } from '@nestjs/common'
import { JwtModule, JwtService } from '@nestjs/jwt'
import { MongooseModule } from '@nestjs/mongoose'

import { User, UserSchema } from './entities/user.entity'
import { UserGuard } from './guards/user.guard'
import { UserResolver } from './user.resolver'
import { UserService } from './services/user.service'

@Module({
  imports: [
    JwtModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [UserResolver, UserService, JwtService, UserGuard],
})
export class UserModule {}
