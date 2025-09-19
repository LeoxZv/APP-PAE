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
exports.EstudianteController = void 0;
const common_1 = require("@nestjs/common");
const estudiante_service_1 = require("./estudiante.service");
const create_estudiante_dto_1 = require("./dto/create-estudiante.dto");
const update_estudiante_dto_1 = require("./dto/update-estudiante.dto");
const roles_decorator_1 = require("../auth/roles/roles.decorator");
let EstudianteController = class EstudianteController {
    EstudianteService;
    constructor(EstudianteService) {
        this.EstudianteService = EstudianteService;
    }
    create(createEstudianteDto) {
        return this.EstudianteService.create(createEstudianteDto);
    }
    findAll(req) {
        return this.EstudianteService.findAll(req.user);
    }
    findOne(id) {
        return this.EstudianteService.findOne(+id);
    }
    update(id, updateEstudianteDto, req) {
        return this.EstudianteService.update(+id, updateEstudianteDto, req.user);
    }
    remove(id) {
        return this.EstudianteService.remove(+id);
    }
};
exports.EstudianteController = EstudianteController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)(1, 4),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_estudiante_dto_1.CreateEstudianteDto]),
    __metadata("design:returntype", void 0)
], EstudianteController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)(1, 2, 3, 4),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], EstudianteController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, roles_decorator_1.Roles)(1, 2, 3, 4),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], EstudianteController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, roles_decorator_1.Roles)(1, 4),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_estudiante_dto_1.UpdateEstudianteDto, Object]),
    __metadata("design:returntype", void 0)
], EstudianteController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_1.Roles)(1, 4),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], EstudianteController.prototype, "remove", null);
exports.EstudianteController = EstudianteController = __decorate([
    (0, common_1.Controller)('estudiante'),
    __metadata("design:paramtypes", [estudiante_service_1.EstudianteService])
], EstudianteController);
//# sourceMappingURL=estudiante.controller.js.map