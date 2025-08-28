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
exports.GradoService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const grado_entity_1 = require("./entities/grado.entity");
let GradoService = class GradoService {
    gradoRepository;
    constructor(gradoRepository) {
        this.gradoRepository = gradoRepository;
    }
    create(createGradoDto) {
        const grado = this.gradoRepository.create(createGradoDto);
        return this.gradoRepository.save(grado);
    }
    findAll() {
        return (this.gradoRepository.find(), 'encontraste todos');
    }
    findOne(id) {
        return this.gradoRepository.findOne({ where: { id_grado: id } });
    }
    async update(id, updateGradoDto) {
        const grado = await this.gradoRepository.findOne({
            where: { id_grado: id },
        });
        if (!grado) {
            throw new common_1.HttpException('Grado not found', common_1.HttpStatus.NOT_FOUND);
        }
        const updatedGrado = Object.assign(grado, updateGradoDto);
        return this.gradoRepository.save(updatedGrado);
    }
    async remove(id) {
        const result = await this.gradoRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.HttpException('Grado not found', common_1.HttpStatus.NOT_FOUND);
        }
        return { message: 'Grado deleted successfully' };
    }
};
exports.GradoService = GradoService;
exports.GradoService = GradoService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(grado_entity_1.Grado)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], GradoService);
//# sourceMappingURL=grado.service.js.map