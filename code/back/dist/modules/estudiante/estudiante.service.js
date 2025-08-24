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
exports.EstudianteService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const estudiante_entity_1 = require("./entities/estudiante.entity");
const colegio_entity_1 = require("../colegio/entities/colegio.entity");
const doc_entity_1 = require("../doc/entities/doc.entity");
let EstudianteService = class EstudianteService {
    estudianteRepository;
    colegioRepository;
    docRepository;
    constructor(estudianteRepository, colegioRepository, docRepository) {
        this.estudianteRepository = estudianteRepository;
        this.colegioRepository = colegioRepository;
        this.docRepository = docRepository;
    }
    async create(estudiante) {
        const colegio = await this.colegioRepository.findOne({
            where: { id_colegio: estudiante.colegio },
        });
        if (!colegio) {
            throw new common_1.HttpException('Colegio not found', common_1.HttpStatus.NOT_FOUND);
        }
        const doc = await this.docRepository.findOne({
            where: { id_doc: estudiante.tipo_doc },
        });
        if (!doc) {
            throw new common_1.HttpException('Doc not found', common_1.HttpStatus.NOT_FOUND);
        }
        const newEstudiante = this.estudianteRepository.create({
            nombre_estudiante: estudiante.nombre_estudiante,
            apellido_estudiante: estudiante.apellido_estudiante,
            numero_documento: estudiante.numero_documento,
            colegio,
            tipo_doc: doc,
        });
        return this.estudianteRepository.save(newEstudiante);
    }
    async findAll() {
        return this.estudianteRepository.find({
            relations: ['colegio', 'tipo_doc'],
            order: { id_estudiante: 'ASC' },
        });
    }
    async findOne(id) {
        const estudiante = await this.estudianteRepository.findOne({
            where: { id_estudiante: id },
        });
        if (!estudiante) {
            throw new common_1.HttpException('Estudiante not found', common_1.HttpStatus.NOT_FOUND);
        }
        return estudiante;
    }
    async update(id, updateUserDto) {
        const estudiante = await this.estudianteRepository.findOne({
            where: { id_estudiante: id },
        });
        if (!estudiante) {
            throw new common_1.HttpException('Estudiante not found', common_1.HttpStatus.NOT_FOUND);
        }
        const updatedUser = Object.assign(estudiante, updateUserDto);
        return this.estudianteRepository.save(updatedUser);
    }
    async remove(id) {
        const deleteResult = await this.estudianteRepository.delete(id);
        if (deleteResult.affected === 0) {
            throw new common_1.HttpException('Estudiante not found', common_1.HttpStatus.NOT_FOUND);
        }
        return { message: 'Estudiante deleted successfully' };
    }
};
exports.EstudianteService = EstudianteService;
exports.EstudianteService = EstudianteService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(estudiante_entity_1.Estudiante)),
    __param(1, (0, typeorm_1.InjectRepository)(colegio_entity_1.Colegio)),
    __param(2, (0, typeorm_1.InjectRepository)(doc_entity_1.Doc)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], EstudianteService);
//# sourceMappingURL=estudiante.service.js.map