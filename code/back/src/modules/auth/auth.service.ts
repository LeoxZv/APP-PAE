import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async validateUser(documento: string, password_user: string): Promise<any> {
    const user = await this.usersRepository.findOne({
      where: { numero_documento: documento },
    });

    if (user && user.password_user === password_user) {
      const { password_user, ...result } = user;
      return result;
    }
    return null;
  }

  getHello(): string {
    return 'Hello World!';
  }
}
