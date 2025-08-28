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
exports.JornadaService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const jornada_entity_1 = require("./entities/jornada.entity");
let JornadaService = class JornadaService {
    jornadaRepository;
    constructor(jornadaRepository) {
        this.jornadaRepository = jornadaRepository;
    }
    create(createJornadaDto) {
        const jornada = this.jornadaRepository.create(createJornadaDto);
        return this.jornadaRepository.save(jornada);
    }
    findAll() {
        return this.jornadaRepository.find();
    }
    findOne(id) {
        return this.jornadaRepository.findOne({ where: { id_jornada: id } });
    }
    async update(id, updateJornadaDto) {
        const jornada = await this.jornadaRepository.findOne({
            where: { id_jornada: id },
        });
        if (!jornada) {
            throw new common_1.HttpException('Jornada not found', common_1.HttpStatus.NOT_FOUND);
        }
        const updatedJornada = Object.assign(jornada, updateJornadaDto);
        return this.jornadaRepository.save(updatedJornada);
    }
    async remove(id) {
        const result = await this.jornadaRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.HttpException('Jornada not found', common_1.HttpStatus.NOT_FOUND);
        }
        return { message: 'Jornada deleted successfully' };
    }
};
exports.JornadaService = JornadaService;
exports.JornadaService = JornadaService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(jornada_entity_1.Jornada)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], JornadaService);
//# sourceMappingURL=jornada.service.js.map