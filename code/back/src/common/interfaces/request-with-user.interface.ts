// src/common/interfaces/request-with-user.interface.ts

import { Request } from 'express';
import { User } from '../../modules/user/entities/user.entity'; // Adjust the path as needed

export interface RequestWithUser extends Request {
  user: User;
}
