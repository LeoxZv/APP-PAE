import { Repository } from 'typeorm';
import { Doc } from './entities/doc.entity';
import { CreateDocDto } from './dto/create-doc.dto';
import { UpdateDocDto } from './dto/update-doc.dto';
export declare class DocService {
    private readonly docRepository;
    constructor(docRepository: Repository<Doc>);
    create(createDocDto: CreateDocDto): Promise<Doc>;
    findAll(): Promise<Doc[]>;
    findOne(id: number): Promise<Doc>;
    update(id: number, updateDocDto: UpdateDocDto): Promise<Doc & UpdateDocDto>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
