// src/common/services/entity-validation.service.ts
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DataSource, ObjectLiteral, Repository } from 'typeorm';

@Injectable()
export class EntityValidationService {
  constructor(private readonly dataSource: DataSource) {}

  async findEntityById(
    repository: Repository<any>,
    id: number,
    primaryKeyName: string | null = null, // ¡Añade este parámetro!
  ): Promise<any> {
    const metadata = repository.metadata;
    const entityName = metadata.name;
    const keyName = primaryKeyName || metadata.primaryColumns[0].propertyName;

    const entity = await repository.findOne({
      where: {
        [keyName]: id,
      },
    });

    if (!entity) {
      throw new HttpException(
        `La entidad ${entityName} con ID ${id} no fue encontrada.`,
        HttpStatus.NOT_FOUND,
      );
    }
    return entity;
  }

  capitalize(str: string): string {
    if (!str) return str;
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }
}
