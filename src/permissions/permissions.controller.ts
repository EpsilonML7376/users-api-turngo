import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../middlewares/auth.middleware';
import { Permissions } from '../middlewares/decorators/permissions.decorator';
import { PermissionsService } from './permissions.service';
import { CreatePermissionDto } from './permissionsDto';
@Controller('permissions')
export class PermissionsController {
constructor(private permissionService: PermissionsService) {}

  @UseGuards(AuthGuard)
  @Permissions(['create-permission'])
  @Post()
  async createPermission(@Body() name: CreatePermissionDto) {
    return await this.permissionService.createPermission(name)
  }


}
