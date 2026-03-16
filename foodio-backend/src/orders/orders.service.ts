import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order, OrderStatus } from './entities/order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderItem } from './entities/order-item.entity';

// src/orders/orders.service.ts
@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private repo: Repository<Order>,
    @InjectRepository(OrderItem) private itemRepo: Repository<OrderItem>, // Inject this
  ) {}

  async create(data: CreateOrderDto) {
    // 1. Create the main Order
    const order = await this.repo.save({
      user: data.user,
      totalPrice: data.totalPrice,
      status: OrderStatus.PENDING,
    });

    // 2. Save each item from the cart into OrderItem table
    const orderItems = data.items.map(item => ({
      order: order,
      menuItem: { id: item.menuItemId },
      quantity: item.quantity,
      price: item.price, // Save price at time of purchase
    }));

    await this.itemRepo.save(orderItems);

    return order;
  }
}