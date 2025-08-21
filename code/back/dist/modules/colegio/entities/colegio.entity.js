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
exports.Colegio = void 0;
const user_entity_1 = require("../../user/entities/user.entity");
const typeorm_1 = require("typeorm");
let Colegio = class Colegio {
    id_colegio;
    nombre_colegio;
    direccion_colegio;
    users;
};
exports.Colegio = Colegio;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Colegio.prototype, "id_colegio", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 55 }),
    __metadata("design:type", String)
], Colegio.prototype, "nombre_colegio", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 55 }),
    __metadata("design:type", String)
], Colegio.prototype, "direccion_colegio", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => user_entity_1.User, (user) => user.colegio),
    __metadata("design:type", Array)
], Colegio.prototype, "users", void 0);
exports.Colegio = Colegio = __decorate([
    (0, typeorm_1.Entity)()
], Colegio);
//# sourceMappingURL=colegio.entity.js.map