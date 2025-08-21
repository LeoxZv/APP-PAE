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
exports.ColegioService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const colegio_entity_1 = require("./entities/colegio.entity");
let ColegioService = class ColegioService {
    colegioRepository;
    constructor(colegioRepository) {
        this.colegioRepository = colegioRepository;
    }
    create(createColegioDto) {
        const colegio = this.colegioRepository.create(createColegioDto);
        return this.colegioRepository.save(colegio);
    }
    findAll() {
        return this.colegioRepository.find();
    }
    findOne(id) {
        return this.colegioRepository.findOne({ where: { id_colegio: id } });
    }
    async update(id, updateColegioDto) {
        const colegio = await this.colegioRepository.findOne({
            where: { id_colegio: id },
        });
        if (!colegio) {
            throw new common_1.HttpException('Colegio not found', common_1.HttpStatus.NOT_FOUND);
        }
        const updatedColegio = Object.assign(colegio, updateColegioDto);
        return this.colegioRepository.save(updatedColegio);
    }
    async remove(id) {
        const result = await this.colegioRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.HttpException('Colegio not found', common_1.HttpStatus.NOT_FOUND);
        }
        return { message: 'Colegio deleted successfully' };
    }
};
exports.ColegioService = ColegioService;
exports.ColegioService = ColegioService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(colegio_entity_1.Colegio)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ColegioService);
//# sourceMappingURL=colegio.service.js.map