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
exports.Entrega = void 0;
const alimento_entity_1 = require("../../alimento/entities/alimento.entity");
const user_entity_1 = require("../../user/entities/user.entity");
const typeorm_1 = require("typeorm");
let Entrega = class Entrega {
    id_entrega;
    cantidad;
    hora_entrega;
    emisor;
    receptor;
    alimento;
};
exports.Entrega = Entrega;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Entrega.prototype, "id_entrega", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 1 }),
    __metadata("design:type", Number)
], Entrega.prototype, "cantidad", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], Entrega.prototype, "hora_entrega", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User),
    (0, typeorm_1.JoinColumn)({ name: 'id_emisor' }),
    __metadata("design:type", user_entity_1.User)
], Entrega.prototype, "emisor", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User),
    (0, typeorm_1.JoinColumn)({ name: 'id_receptor' }),
    __metadata("design:type", user_entity_1.User)
], Entrega.prototype, "receptor", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => alimento_entity_1.Alimento, (alimento) => alimento.id_alimento),
    __metadata("design:type", alimento_entity_1.Alimento)
], Entrega.prototype, "alimento", void 0);
exports.Entrega = Entrega = __decorate([
    (0, typeorm_1.Entity)()
], Entrega);
//# sourceMappingURL=entrega.entity.js.map