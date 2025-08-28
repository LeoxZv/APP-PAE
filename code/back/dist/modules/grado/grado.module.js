"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GradoModule = void 0;
const common_1 = require("@nestjs/common");
const grado_service_1 = require("./grado.service");
const grado_controller_1 = require("./grado.controller");
const typeorm_module_1 = require("@nestjs/typeorm/dist/typeorm.module");
const grado_entity_1 = require("./entities/grado.entity");
let GradoModule = class GradoModule {
};
exports.GradoModule = GradoModule;
exports.GradoModule = GradoModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_module_1.TypeOrmModule.forFeature([grado_entity_1.Grado])],
        controllers: [grado_controller_1.GradoController],
        providers: [grado_service_1.GradoService],
        exports: [typeorm_module_1.TypeOrmModule],
    })
], GradoModule);
//# sourceMappingURL=grado.module.js.map