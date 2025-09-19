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
const grado_entity_1 = require("../grado/entities/grado.entity");
const jornada_entity_1 = require("../jornada/entities/jornada.entity");
const entity_validation_service_1 = require("../../common/services/entity-validation.service");
let EstudianteService = class EstudianteService {
    estudianteRepository;
    colegioRepository;
    docRepository;
    gradoRepository;
    jornadaRepository;
    validationService;
    constructor(estudianteRepository, colegioRepository, docRepository, gradoRepository, jornadaRepository, validationService) {
        this.estudianteRepository = estudianteRepository;
        this.colegioRepository = colegioRepository;
        this.docRepository = docRepository;
        this.gradoRepository = gradoRepository;
        this.jornadaRepository = jornadaRepository;
        this.validationService = validationService;
    }
    async create(createEstudianteDto) {
        const { id_doc, id_grado, id_jornada, colegio, ...estudianteData } = createEstudianteDto;
        const docEntity = await this.validationService.findEntityById(this.docRepository, id_doc, 'id_doc');
        const gradoEntity = await this.validationService.findEntityById(this.gradoRepository, id_grado, 'id_grado');
        const jornadaEntity = await this.validationService.findEntityById(this.jornadaRepository, id_jornada, 'id_jornada');
        let colegioEntity = null;
        if (colegio) {
            colegioEntity = await this.validationService.findEntityById(this.colegioRepository, colegio, 'id_colegio');
        }
        const nuevoEstudiante = this.estudianteRepository.create({
            ...estudianteData,
            tipo_doc: docEntity,
            grado: gradoEntity,
            jornada: jornadaEntity,
            colegio: colegioEntity,
        });
        return this.estudianteRepository.save(nuevoEstudiante);
    }
    async findAll(user) {
        const queryOptions = {
            relations: ['colegio', 'tipo_doc', 'grado', 'jornada'],
            order: { id_estudiante: 'ASC' },
            where: {},
        };
        const userRole = user.rol.nombre_rol;
        if ((userRole == 'colegio' || userRole == 'profesor') && user.colegio) {
            queryOptions.where.colegio = { id_colegio: user.colegio.id_colegio };
        }
        return this.estudianteRepository.find(queryOptions);
    }
    async findOne(id) {
        const estudiante = await this.estudianteRepository.findOne({
            where: { id_estudiante: id },
            relations: ['tipo_doc', 'grado', 'jornada', 'colegio'],
        });
        if (!estudiante) {
            throw new common_1.HttpException('Estudiante not found', common_1.HttpStatus.NOT_FOUND);
        }
        return estudiante;
    }
    async update(id, updateEstudianteDto, requestingUser) {
        const estudiante = await this.estudianteRepository.findOne({
            where: { id_estudiante: id },
        });
        if (!estudiante) {
            throw new common_1.HttpException('Estudiante not found', common_1.HttpStatus.NOT_FOUND);
        }
        const updatedData = {};
        if (updateEstudianteDto.nombre_estudiante) {
            updatedData.nombre_estudiante = this.validationService.capitalize(updateEstudianteDto.nombre_estudiante);
        }
        if (updateEstudianteDto.apellido_estudiante) {
            updatedData.apellido_estudiante = this.validationService.capitalize(updateEstudianteDto.apellido_estudiante);
        }
        if (updateEstudianteDto.numero_documento) {
            updatedData.numero_documento = updateEstudianteDto.numero_documento;
        }
        if (updateEstudianteDto.id_doc) {
            updatedData.tipo_doc = await this.validationService.findEntityById(this.docRepository, updateEstudianteDto.id_doc, 'id_doc');
        }
        if (updateEstudianteDto.id_grado) {
            updatedData.grado = await this.validationService.findEntityById(this.gradoRepository, updateEstudianteDto.id_grado, 'id_grado');
        }
        if (updateEstudianteDto.id_jornada) {
            updatedData.jornada = await this.validationService.findEntityById(this.jornadaRepository, updateEstudianteDto.id_jornada, 'id_jornada');
        }
        if (requestingUser.rol.nombre_rol !== 'aseador' &&
            updateEstudianteDto.colegio) {
            updatedData.colegio = await this.validationService.findEntityById(this.colegioRepository, updateEstudianteDto.colegio, 'id_colegio');
        }
        const updatedEstudiante = Object.assign(estudiante, updatedData);
        return this.estudianteRepository.save(updatedEstudiante);
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
    __param(3, (0, typeorm_1.InjectRepository)(grado_entity_1.Grado)),
    __param(4, (0, typeorm_1.InjectRepository)(jornada_entity_1.Jornada)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        entity_validation_service_1.EntityValidationService])
], EstudianteService);
//# sourceMappingURL=estudiante.service.js.map