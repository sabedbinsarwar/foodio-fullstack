import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole } from '../users/entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class SeedService {

  constructor(
    @InjectRepository(User)
    private repo: Repository<User>,
  ) {}

  async seedAdmin() {

    const admin = await this.repo.findOne({ where: { email: 'admin@foodio.com' } });

    if (!admin) {

      const password = await bcrypt.hash('admin123', 10);

      await this.repo.save({
        name: 'Admin',
        email: 'admin@foodio.com',
        password,
        role: UserRole.ADMIN, // ✅ Use enum, not string
      });
    }
  }
}