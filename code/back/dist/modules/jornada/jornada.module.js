"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JornadaModule = void 0;
const common_1 = require("@nestjs/common");
const jornada_service_1 = require("./jornada.service");
const jornada_controller_1 = require("./jornada.controller");
const typeorm_module_1 = require("@nestjs/typeorm/dist/typeorm.module");
const jornada_entity_1 = require("./entities/jornada.entity");
let JornadaModule = class JornadaModule {
};
exports.JornadaModule = JornadaModule;
exports.JornadaModule = JornadaModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_module_1.TypeOrmModule.forFeature([jornada_entity_1.Jornada])],
        controllers: [jornada_controller_1.JornadaController],
        providers: [jornada_service_1.JornadaService],
        exports: [typeorm_module_1.TypeOrmModule],
    })
], JornadaModule);
//# sourceMappingURL=jornada.module.js.map