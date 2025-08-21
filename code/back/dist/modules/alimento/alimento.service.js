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
exports.AlimentoService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const alimento_entity_1 = require("./entities/alimento.entity");
let AlimentoService = class AlimentoService {
    alimentoRepository;
    constructor(alimentoRepository) {
        this.alimentoRepository = alimentoRepository;
    }
    create(createAlimentoDto) {
        const alimento = this.alimentoRepository.create(createAlimentoDto);
        return this.alimentoRepository.save(alimento);
    }
    findAll() {
        return this.alimentoRepository.find();
    }
    findOne(id) {
        return this.alimentoRepository.findOne({ where: { id_alimento: id } });
    }
    async update(id, updateAlimentoDto) {
        const alimento = await this.alimentoRepository.findOne({
            where: { id_alimento: id },
        });
        if (!alimento) {
            throw new common_1.HttpException('Alimento not found', common_1.HttpStatus.NOT_FOUND);
        }
        const updatedAlimento = Object.assign(alimento, updateAlimentoDto);
        return this.alimentoRepository.save(updatedAlimento);
    }
    async remove(id) {
        const result = await this.alimentoRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.HttpException('Alimento not found', common_1.HttpStatus.NOT_FOUND);
        }
        return { message: 'Alimento deleted successfully' };
    }
};
exports.AlimentoService = AlimentoService;
exports.AlimentoService = AlimentoService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(alimento_entity_1.Alimento)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], AlimentoService);
//# sourceMappingURL=alimento.service.js.map