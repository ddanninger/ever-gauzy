// Copyright (c) 2019-2020 Ever Co. LTD

// Modified code from https://github.com/xmlking/ngx-starter-kit.
// Originally MIT Licensed
// - see https://github.com/xmlking/ngx-starter-kit/blob/develop/LICENSE
// - original code `Copyright (c) 2018 Sumanth Chinthagunta`;
import {
	DynamicModule,
	MiddlewareConsumer,
	Module,
	NestModule
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as path from 'path';
import { ConfigModule, ConfigService } from '@gauzy/config';
import { RequestContextMiddleware } from './context';
import { FileStorageModule } from './file-storage';
import { GraphqlModule } from '../graphql/graphql.module';
import { GraphqlApiModule } from '../graphql/graphql-api.module';

@Module({
	imports: [
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			useFactory: (configService: ConfigService) => {
				const { dbConnectionOptions } = configService.config;
				return {
					name: 'default',
					...dbConnectionOptions
				};
			},
			inject: [ConfigService]
		}),
		GraphqlApiModule,
		GraphqlModule.registerAsync((configService: ConfigService) => ({
			path: configService.graphqlConfigOptions.path,
			playground: configService.graphqlConfigOptions.playground,
			debug: configService.graphqlConfigOptions.debug,
			typePaths: [
				path.join(path.resolve(__dirname, '../**/', 'schema'), '*.gql')
			],
			resolverModule: GraphqlApiModule
		})) as DynamicModule,
		FileStorageModule
	],
	controllers: [],
	providers: []
})
export class CoreModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(RequestContextMiddleware).forRoutes('*');
	}
}