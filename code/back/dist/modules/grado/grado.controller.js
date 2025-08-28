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
exports.GradoController = void 0;
const common_1 = require("@nestjs/common");
const grado_service_1 = require("./grado.service");
const create_grado_dto_1 = require("./dto/create-grado.dto");
const update_grado_dto_1 = require("./dto/update-grado.dto");
let GradoController = class GradoController {
    gradoService;
    constructor(gradoService) {
        this.gradoService = gradoService;
    }
    create(createGradoDto) {
        return this.gradoService.create(createGradoDto);
    }
    findAll() {
        return this.gradoService.findAll();
    }
    findOne(id) {
        return this.gradoService.findOne(+id);
    }
    update(id, updateGradoDto) {
        return this.gradoService.update(+id, updateGradoDto);
    }
    remove(id) {
        return this.gradoService.remove(+id);
    }
};
exports.GradoController = GradoController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_grado_dto_1.CreateGradoDto]),
    __metadata("design:returntype", void 0)
], GradoController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], GradoController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], GradoController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_grado_dto_1.UpdateGradoDto]),
    __metadata("design:returntype", void 0)
], GradoController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], GradoController.prototype, "remove", null);
exports.GradoController = GradoController = __decorate([
    (0, common_1.Controller)('grado'),
    __metadata("design:paramtypes", [grado_service_1.GradoService])
], GradoController);
//# sourceMappingURL=grado.controller.js.map