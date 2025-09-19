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
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntityValidationService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
let EntityValidationService = class EntityValidationService {
    dataSource;
    constructor(dataSource) {
        this.dataSource = dataSource;
    }
    async findEntityById(repository, id, primaryKeyName = null) {
        const metadata = repository.metadata;
        const entityName = metadata.name;
        const keyName = primaryKeyName || metadata.primaryColumns[0].propertyName;
        const entity = await repository.findOne({
            where: {
                [keyName]: id,
            },
        });
        if (!entity) {
            throw new common_1.HttpException(`La entidad ${entityName} con ID ${id} no fue encontrada.`, common_1.HttpStatus.NOT_FOUND);
        }
        return entity;
    }
    capitalize(str) {
        if (!str)
            return str;
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }
};
exports.EntityValidationService = EntityValidationService;
exports.EntityValidationService = EntityValidationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], EntityValidationService);
//# sourceMappingURL=entity-validation.service.js.map