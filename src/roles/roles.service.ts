import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleEntity } from 'src/entities/role.entity';
import { PermissionsService } from 'src/permissions/permissions.service';
import { Repository } from 'typeorm';
import { AssignPermissionsDto } from './rolesDto';

@Injectable()
export class RolesService {

    constructor(@InjectRepository(RoleEntity) private roleRepository: Repository<RoleEntity>,
                private readonly permissionsService: PermissionsService
            ) {}

    hasPermission(role:RoleEntity, permission:string){
        return role.permissions.some(p => p.name === permission)
    }

    async create(name:string):Promise<RoleEntity>{
            return await this.roleRepository.save({name});
    }

    async assignNewPermissions(roleName: string, permissionsNames: AssignPermissionsDto): Promise<RoleEntity> { // Asigna nuevos permisos.
        const role = await this.findRoleByName(roleName)
        const permissions = await this.permissionsService.findPermissionsByNames(permissionsNames.permissions)
        role.permissions = role.permissions.concat(permissions)
        return await this.roleRepository.save(role)
    }

        async assignPermissions(roleName: string, permissionsNames: AssignPermissionsDto): Promise<RoleEntity> { // Modifica los permisos que tiene.
        const role = await this.findRoleByName(roleName)
        const permissions = await this.permissionsService.findPermissionsByNames(permissionsNames.permissions)
        role.permissions = permissions
        return await this.roleRepository.save(role)
    }

    async findRoleByName(name: string): Promise<RoleEntity> {
        return await this.roleRepository.findOne({where : {name: name}})
    }

}
