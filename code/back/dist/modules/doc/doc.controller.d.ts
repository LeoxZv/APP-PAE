import { DocService } from './doc.service';
import { CreateDocDto } from './dto/create-doc.dto';
import { UpdateDocDto } from './dto/update-doc.dto';
export declare class DocController {
    private readonly docService;
    constructor(docService: DocService);
    create(createDocDto: CreateDocDto): Promise<import("./entities/doc.entity").Doc>;
    findAll(): Promise<import("./entities/doc.entity").Doc[]>;
    findOne(id: string): Promise<import("./entities/doc.entity").Doc>;
    update(id: string, updateDocDto: UpdateDocDto): Promise<import("./entities/doc.entity").Doc & UpdateDocDto>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
