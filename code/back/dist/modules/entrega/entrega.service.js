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
exports.EntregaService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const entrega_entity_1 = require("./entities/entrega.entity");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../user/entities/user.entity");
const alimento_entity_1 = require("../alimento/entities/alimento.entity");
let EntregaService = class EntregaService {
    entregaRepository;
    userRepository;
    alimentoRepository;
    constructor(entregaRepository, userRepository, alimentoRepository) {
        this.entregaRepository = entregaRepository;
        this.userRepository = userRepository;
        this.alimentoRepository = alimentoRepository;
    }
    async create(createEntregaDto) {
        const emisor = await this.userRepository.findOne({
            where: { id_user: createEntregaDto.emisor },
        });
        if (!emisor) {
            throw new common_1.HttpException('Emisor not found', common_1.HttpStatus.NOT_FOUND);
        }
        const receptor = await this.userRepository.findOne({
            where: { id_user: createEntregaDto.receptor },
        });
        if (emisor == receptor) {
            throw new Error('Emisor and Receptor cannot be the same user');
        }
        if (!receptor) {
            throw new common_1.HttpException('Receptor not found', common_1.HttpStatus.NOT_FOUND);
        }
        const alimento = await this.alimentoRepository.findOne({
            where: { id_alimento: createEntregaDto.alimento },
        });
        if (!alimento) {
            throw new common_1.HttpException('Alimento not found', common_1.HttpStatus.NOT_FOUND);
        }
        const entrega = this.entregaRepository.create({
            hora_entrega: createEntregaDto.hora_entrega,
            emisor: emisor,
            receptor: receptor,
            alimento: alimento,
            cantidad: createEntregaDto.cantidad,
        });
        return this.entregaRepository.save(entrega);
    }
    async findAll() {
        return this.entregaRepository.find({
            relations: ['emisor', 'receptor', 'alimento'],
        });
    }
    async findOne(id) {
        const entrega = await this.entregaRepository.findOne({
            where: { id_entrega: id },
            relations: ['emisor', 'receptor', 'alimento'],
        });
        if (!entrega) {
            throw new common_1.HttpException('Entrega not found', common_1.HttpStatus.NOT_FOUND);
        }
        return entrega;
    }
    async update(id, updateEntregaDto) {
        const entrega_existente = await this.entregaRepository.findOneBy({
            id_entrega: id,
        });
        if (!entrega_existente) {
            throw new common_1.HttpException('Entrega not found', common_1.HttpStatus.NOT_FOUND);
        }
        const updatedEntrega = Object.assign(entrega_existente, updateEntregaDto);
        return this.entregaRepository.save(updatedEntrega);
    }
    async remove(id) {
        const result = await this.entregaRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.HttpException('Entrega not found', common_1.HttpStatus.NOT_FOUND);
        }
        return { message: 'Entrega deleted successfully' };
    }
};
exports.EntregaService = EntregaService;
exports.EntregaService = EntregaService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entrega_entity_1.Entrega)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(2, (0, typeorm_1.InjectRepository)(alimento_entity_1.Alimento)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], EntregaService);
//# sourceMappingURL=entrega.service.js.map