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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JornadaController = void 0;
const common_1 = require("@nestjs/common");
const jornada_service_1 = require("./jornada.service");
const create_jornada_dto_1 = require("./dto/create-jornada.dto");
const update_jornada_dto_1 = require("./dto/update-jornada.dto");
let JornadaController = class JornadaController {
    jornadaService;
    constructor(jornadaService) {
        this.jornadaService = jornadaService;
    }
    create(createJornadaDto) {
        return this.jornadaService.create(createJornadaDto);
    }
    findAll() {
        return this.jornadaService.findAll();
    }
    findOne(id) {
        return this.jornadaService.findOne(+id);
    }
    update(id, updateJornadaDto) {
        return this.jornadaService.update(+id, updateJornadaDto);
    }
    remove(id) {
        return this.jornadaService.remove(+id);
    }
};
exports.JornadaController = JornadaController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_jornada_dto_1.CreateJornadaDto]),
    __metadata("design:returntype", void 0)
], JornadaController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], JornadaController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], JornadaController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_jornada_dto_1.UpdateJornadaDto]),
    __metadata("design:returntype", void 0)
], JornadaController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], JornadaController.prototype, "remove", null);
exports.JornadaController = JornadaController = __decorate([
    (0, common_1.Controller)('jornada'),
    __metadata("design:paramtypes", [jornada_service_1.JornadaService])
], JornadaController);
//# sourceMappingURL=jornada.controller.js.map