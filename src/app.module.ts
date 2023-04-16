import { Logger, Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { UserModule } from './user/user.module'
@Module({
	imports: [ConfigModule.forRoot(), MongooseModule.forRoot('mongodb://localhost:27017/nest'), AuthModule, UserModule],
	controllers: [AppController],
	providers: [AppService, Logger],
})
export class AppModule {}
