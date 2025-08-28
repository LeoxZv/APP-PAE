"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Estudiante = void 0;
const colegio_entity_1 = require("../../colegio/entities/colegio.entity");
const doc_entity_1 = require("../../doc/entities/doc.entity");
const typeorm_1 = require("typeorm");
const grado_entity_1 = require("../../grado/entities/grado.entity");
const jornada_entity_1 = require("../../jornada/entities/jornada.entity");
let Estudiante = class Estudiante {
    id_estudiante;
    nombre_estudiante;
    apellido_estudiante;
    numero_documento;
    id_grado;
    id_jornada;
    id_doc;
    colegio;
};
exports.Estudiante = Estudiante;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Estudiante.prototype, "id_estudiante", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 55 }),
    __metadata("design:type", String)
], Estudiante.prototype, "nombre_estudiante", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 55 }),
    __metadata("design:type", String)
], Estudiante.prototype, "apellido_estudiante", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 20 }),
    __metadata("design:type", String)
], Estudiante.prototype, "numero_documento", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => grado_entity_1.Grado, (grado) => grado.id_grado),
    __metadata("design:type", grado_entity_1.Grado)
], Estudiante.prototype, "id_grado", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => jornada_entity_1.Jornada, (jornada) => jornada.id_jornada),
    __metadata("design:type", jornada_entity_1.Jornada)
], Estudiante.prototype, "id_jornada", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => doc_entity_1.Doc, (doc) => doc.id_doc),
    __metadata("design:type", doc_entity_1.Doc)
], Estudiante.prototype, "id_doc", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => colegio_entity_1.Colegio, (colegio) => colegio.users),
    __metadata("design:type", colegio_entity_1.Colegio)
], Estudiante.prototype, "colegio", void 0);
exports.Estudiante = Estudiante = __decorate([
    (0, typeorm_1.Entity)()
], Estudiante);
//# sourceMappingURL=estudiante.entity.js.map