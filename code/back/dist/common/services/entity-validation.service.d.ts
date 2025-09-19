import { DataSource, Repository } from 'typeorm';
export declare class EntityValidationService {
    private readonly dataSource;
    constructor(dataSource: DataSource);
    findEntityById(repository: Repository<any>, id: number, primaryKeyName?: string | null): Promise<any>;
    capitalize(str: string): string;
}
