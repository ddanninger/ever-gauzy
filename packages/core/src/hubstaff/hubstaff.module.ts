import { Module, HttpModule } from '@nestjs/common';
import { HubstaffService } from './hubstaff.service';
import { HubstaffController } from './hubstaff.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IntegrationTenant } from '../integration-tenant/integration-tenant.entity';
import { IntegrationTenantService } from '../integration-tenant/integration-tenant.service';
import { IntegrationSetting } from '../integration-setting/integration-setting.entity';
import { IntegrationSettingService } from '../integration-setting/integration-setting.service';
import { IntegrationMap } from '../integration-map/integration-map.entity';
import { IntegrationMapService } from '../integration-map/integration-map.service';
import { OrganizationProject } from '../organization-project/organization-project.entity';
import { OrganizationProjectService } from '../organization-project/organization-project.service';
import { IntegrationEntitySettingService } from '../integration-entity-setting/integration-entity-setting.service';
import { IntegrationEntitySetting } from '../integration-entity-setting/integration-entity-setting.entity';
import { CqrsModule } from '@nestjs/cqrs';
import { IntegrationEntitySettingTiedEntity } from '../integration-entity-setting-tied-entity/integration-entity-setting-tied-entity.entity';
import { IntegrationEntitySettingTiedEntityService } from '../integration-entity-setting-tied-entity/integration-entity-setting-tied-entity.service';
import { RoleService } from '../role/role.service';
import { Organization } from '../organization/organization.entity';
import { OrganizationService } from '../organization/organization.service';
import { Role } from '../role/role.entity';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { UserModule } from '../user/user.module';
import { RoleModule } from '../role/role.module';
import { RolePermissionsModule } from '../role-permissions/role-permissions.module';
import { RouterModule } from 'nest-router';
import { TenantModule } from './../tenant';

@Module({
	imports: [
		RouterModule.forRoutes([
			{ path: '/integrations/hubstaff', module: HubstaffModule }
		]),
		HttpModule,
		TypeOrmModule.forFeature([
			IntegrationTenant,
			IntegrationSetting,
			IntegrationMap,
			OrganizationProject,
			IntegrationEntitySetting,
			IntegrationEntitySettingTiedEntity,
			Role,
			Organization,
			User
		]),
		CqrsModule,
		RoleModule,
		UserModule,
		RolePermissionsModule,
		TenantModule
	],
	controllers: [HubstaffController],
	providers: [
		HubstaffService,
		IntegrationTenantService,
		IntegrationSettingService,
		IntegrationMapService,
		OrganizationProjectService,
		IntegrationEntitySettingService,
		IntegrationEntitySettingTiedEntityService,
		OrganizationService,
		RoleService,
		UserService
	]
})
export class HubstaffModule {}
