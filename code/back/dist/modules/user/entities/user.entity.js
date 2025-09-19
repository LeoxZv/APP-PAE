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
exports.User = void 0;
const colegio_entity_1 = require("../../colegio/entities/colegio.entity");
const doc_entity_1 = require("../../doc/entities/doc.entity");
const rol_entity_1 = require("../../rol/entities/rol.entity");
const typeorm_1 = require("typeorm");
let User = class User {
    id_user;
    nombre_user;
    apellido_user;
    password_user;
    numero_documento;
    tipo_doc;
    rol;
    colegio;
};
exports.User = User;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], User.prototype, "id_user", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 55 }),
    __metadata("design:type", String)
], User.prototype, "nombre_user", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 55 }),
    __metadata("design:type", String)
], User.prototype, "apellido_user", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar' }),
    __metadata("design:type", String)
], User.prototype, "password_user", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 20 }),
    __metadata("design:type", String)
], User.prototype, "numero_documento", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => doc_entity_1.Doc),
    (0, typeorm_1.JoinColumn)({ name: 'tipo_doc_id' }),
    __metadata("design:type", doc_entity_1.Doc)
], User.prototype, "tipo_doc", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => rol_entity_1.Rol),
    (0, typeorm_1.JoinColumn)({ name: 'rol_id' }),
    __metadata("design:type", rol_entity_1.Rol)
], User.prototype, "rol", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => colegio_entity_1.Colegio, (colegio) => colegio.users, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'colegio_id' }),
    __metadata("design:type", Object)
], User.prototype, "colegio", void 0);
exports.User = User = __decorate([
    (0, typeorm_1.Entity)()
], User);
//# sourceMappingURL=user.entity.js.map