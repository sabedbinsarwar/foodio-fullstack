import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { SeedService } from './seed/seed.service';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CategoriesModule } from './categories/categories.module';
import { MenuItemsModule } from './menu-items/menu-items.module';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'foodio',
      autoLoadEntities: true,
      synchronize: true,
    }),

    UsersModule, // ✅ UsersModule now exports User repository
    AuthModule,
    CategoriesModule,
    MenuItemsModule,
    OrdersModule,
  ],
  providers: [SeedService],
})
export class AppModule {}