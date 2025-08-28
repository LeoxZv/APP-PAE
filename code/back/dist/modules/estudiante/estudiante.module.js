"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EstudianteModule = void 0;
const estudiante_service_1 = require("./estudiante.service");
const estudiante_controller_1 = require("./estudiante.controller");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const estudiante_entity_1 = require("./entities/estudiante.entity");
const colegio_entity_1 = require("../colegio/entities/colegio.entity");
const doc_entity_1 = require("../doc/entities/doc.entity");
const grado_entity_1 = require("../grado/entities/grado.entity");
const jornada_entity_1 = require("../jornada/entities/jornada.entity");
let EstudianteModule = class EstudianteModule {
};
exports.EstudianteModule = EstudianteModule;
exports.EstudianteModule = EstudianteModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([estudiante_entity_1.Estudiante, colegio_entity_1.Colegio, doc_entity_1.Doc, grado_entity_1.Grado, jornada_entity_1.Jornada]),
        ],
        controllers: [estudiante_controller_1.EstudianteController],
        providers: [estudiante_service_1.EstudianteService],
        exports: [typeorm_1.TypeOrmModule],
    })
], EstudianteModule);
//# sourceMappingURL=estudiante.module.js.map