"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const doc_module_1 = require("./modules/doc/doc.module");
const colegio_module_1 = require("./modules/colegio/colegio.module");
const alimento_module_1 = require("./modules/alimento/alimento.module");
const user_module_1 = require("./modules/user/user.module");
const entrega_module_1 = require("./modules/entrega/entrega.module");
const rol_module_1 = require("./modules/rol/rol.module");
const estudiante_module_1 = require("./modules/estudiante/estudiante.module");
const auth_module_1 = require("./modules/auth/auth.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: '.env',
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (config) => ({
                    type: 'mysql',
                    host: config.get('DB_HOST'),
                    port: config.get('DB_PORT'),
                    username: config.get('DB_USER'),
                    database: config.get('DB_NAME'),
                    entities: [__dirname + '/**/entities/*.entity{.ts,.js}'],
                    autoLoadEntities: true,
                    synchronize: true,
                    charset: 'utf8mb4',
                }),
            }),
            doc_module_1.DocModule,
            colegio_module_1.ColegioModule,
            alimento_module_1.AlimentoModule,
            user_module_1.UserModule,
            entrega_module_1.EntregaModule,
            rol_module_1.RolModule,
            estudiante_module_1.EstudianteModule,
            auth_module_1.AuthModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map