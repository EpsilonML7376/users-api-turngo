import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { entities } from './entities';
import { AuthGuard } from './middlewares/auth.middleware';
import { JwtService } from './jwt/jwt.service';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { RolesController } from './roles/roles.controller';
import { PermissionsController } from './permissions/permissions.controller';
import { PermissionsService } from './permissions/permissions.service';
import { RolesService } from './roles/roles.service';
import { GoogleStrategy } from './auth/strategies/google.strategy';
import { AuthController } from './auth/auth.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    PassportModule,
    TypeOrmModule.forRoot({
        type: 'postgres',
        host: 'localhost',
        database: 'turngo-db',
        username: 'turngo-user',
        password: 'turngo-pass',
        port: 5333,
        synchronize: true,
        entities,
    }),
    TypeOrmModule.forFeature(entities),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [AppController, UsersController, RolesController, PermissionsController, AuthController],
  providers: [AuthGuard, JwtService, UsersService, PermissionsService, RolesService, GoogleStrategy],
})
export class AppModule {}
