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
exports.Doc = void 0;
const user_entity_1 = require("../../user/entities/user.entity");
const typeorm_1 = require("typeorm");
let Doc = class Doc {
    id_doc;
    nombre;
    siglas;
    users;
};
exports.Doc = Doc;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Doc.prototype, "id_doc", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 55 }),
    __metadata("design:type", String)
], Doc.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 15 }),
    __metadata("design:type", String)
], Doc.prototype, "siglas", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => user_entity_1.User, (User) => User.tipo_doc),
    __metadata("design:type", Array)
], Doc.prototype, "users", void 0);
exports.Doc = Doc = __decorate([
    (0, typeorm_1.Entity)()
], Doc);
//# sourceMappingURL=doc.entity.js.map