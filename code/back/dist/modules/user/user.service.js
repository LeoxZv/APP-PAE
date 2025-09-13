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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./entities/user.entity");
const rol_entity_1 = require("../rol/entities/rol.entity");
const colegio_entity_1 = require("../colegio/entities/colegio.entity");
const doc_entity_1 = require("../doc/entities/doc.entity");
const bcrypt = require("bcrypt");
let UserService = class UserService {
    userRepository;
    rolRepository;
    colegioRepository;
    docRepository;
    constructor(userRepository, rolRepository, colegioRepository, docRepository) {
        this.userRepository = userRepository;
        this.rolRepository = rolRepository;
        this.colegioRepository = colegioRepository;
        this.docRepository = docRepository;
    }
    capitalize(str) {
        if (!str)
            return str;
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }
    async create(user) {
        const rolEntity = await this.rolRepository.findOne({
            where: { id_rol: user.rol },
        });
        if (!rolEntity) {
            throw new common_1.HttpException('Rol not found', common_1.HttpStatus.NOT_FOUND);
        }
        const colegioEntity = await this.colegioRepository.findOne({
            where: { id_colegio: user.colegio },
        });
        if (!colegioEntity) {
            throw new common_1.HttpException('Colegio not found', common_1.HttpStatus.NOT_FOUND);
        }
        const docEntity = await this.docRepository.findOne({
            where: { id_doc: user.tipo_doc },
        });
        if (!docEntity) {
            throw new common_1.HttpException('Doc not found', common_1.HttpStatus.NOT_FOUND);
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(user.password_user, salt);
        const newUser = this.userRepository.create({
            nombre_user: this.capitalize(user.nombre_user),
            apellido_user: this.capitalize(user.apellido_user),
            password_user: hashedPassword,
            numero_documento: user.numero_documento,
            rol: rolEntity,
            colegio: colegioEntity,
            tipo_doc: docEntity,
        });
        return this.userRepository.save(newUser);
    }
    async findAll() {
        return this.userRepository.find({
            relations: ['rol', 'colegio', 'tipo_doc'],
            order: { id_user: 'ASC' },
        });
    }
    async findOne(id) {
        const user = await this.userRepository.findOne({
            where: { id_user: id },
            relations: ['rol', 'colegio', 'tipo_doc'],
        });
        if (!user) {
            throw new common_1.HttpException('User not found', common_1.HttpStatus.NOT_FOUND);
        }
        return user;
    }
    async update(id, updateUserDto) {
        const user = await this.userRepository.findOne({ where: { id_user: id } });
        if (!user) {
            throw new common_1.HttpException('User not found', common_1.HttpStatus.NOT_FOUND);
        }
        const updatedData = {};
        if (updateUserDto.nombre_user) {
            updatedData.nombre_user = this.capitalize(updateUserDto.nombre_user);
        }
        if (updateUserDto.apellido_user) {
            updatedData.apellido_user = this.capitalize(updateUserDto.apellido_user);
        }
        if (updateUserDto.numero_documento) {
            updatedData.numero_documento = updateUserDto.numero_documento;
        }
        if (updateUserDto.password_user) {
            const salt = await bcrypt.genSalt(10);
            updatedData.password_user = await bcrypt.hash(updateUserDto.password_user, salt);
        }
        if (updateUserDto.rol) {
            const rolEntity = await this.rolRepository.findOne({
                where: { id_rol: updateUserDto.rol },
            });
            if (!rolEntity) {
                throw new common_1.HttpException('Rol not found', common_1.HttpStatus.NOT_FOUND);
            }
            updatedData.rol = rolEntity;
        }
        if (updateUserDto.colegio) {
            const colegioEntity = await this.colegioRepository.findOne({
                where: { id_colegio: updateUserDto.colegio },
            });
            if (!colegioEntity) {
                throw new common_1.HttpException('Colegio not found', common_1.HttpStatus.NOT_FOUND);
            }
            updatedData.colegio = colegioEntity;
        }
        if (updateUserDto.tipo_doc) {
            const docEntity = await this.docRepository.findOne({
                where: { id_doc: updateUserDto.tipo_doc },
            });
            if (!docEntity) {
                throw new common_1.HttpException('Doc not found', common_1.HttpStatus.NOT_FOUND);
            }
            updatedData.tipo_doc = docEntity;
        }
        const updatedUser = Object.assign(user, updatedData);
        return this.userRepository.save(updatedUser);
    }
    async remove(id) {
        const deleteResult = await this.userRepository.delete(id);
        if (deleteResult.affected === 0) {
            throw new common_1.HttpException('User not found', common_1.HttpStatus.NOT_FOUND);
        }
        return { message: 'User deleted successfully' };
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(rol_entity_1.Rol)),
    __param(2, (0, typeorm_1.InjectRepository)(colegio_entity_1.Colegio)),
    __param(3, (0, typeorm_1.InjectRepository)(doc_entity_1.Doc)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], UserService);
//# sourceMappingURL=user.service.js.map