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
const estudiante_entity_1 = require("../estudiante/entities/estudiante.entity");
const alimento_entity_1 = require("../alimento/entities/alimento.entity");
const entity_validation_service_1 = require("../../common/services/entity-validation.service");
let EntregaService = class EntregaService {
    entregaRepository;
    userRepository;
    estudianteRepository;
    alimentoRepository;
    validationService;
    constructor(entregaRepository, userRepository, estudianteRepository, alimentoRepository, validationService) {
        this.entregaRepository = entregaRepository;
        this.userRepository = userRepository;
        this.estudianteRepository = estudianteRepository;
        this.alimentoRepository = alimentoRepository;
        this.validationService = validationService;
    }
    async create(createEntregaDto) {
        const emisor = await this.validationService.findEntityById(this.userRepository, createEntregaDto.emisor, 'Emisor');
        const receptor = await this.validationService.findEntityById(this.estudianteRepository, createEntregaDto.receptor, 'Receptor');
        const alimento = await this.validationService.findEntityById(this.alimentoRepository, createEntregaDto.alimento, 'Alimento');
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
    __param(0, (0, typeorm_1.InjectRepository)(entrega_entity_1.Entrega)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(2, (0, typeorm_1.InjectRepository)(estudiante_entity_1.Estudiante)),
    __param(3, (0, typeorm_1.InjectRepository)(alimento_entity_1.Alimento)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        entity_validation_service_1.EntityValidationService])
], EntregaService);
//# sourceMappingURL=entrega.service.js.map