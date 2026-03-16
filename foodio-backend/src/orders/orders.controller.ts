import { Controller, Post, Body, Get, Patch, Param, UseGuards, Req } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { IsEnum, IsNumber } from 'class-validator';
import { OrderStatus } from './entities/order.entity';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';

// DTOs
export class UpdateOrderStatusDto {
  @IsEnum(OrderStatus)
  status: OrderStatus;
}

export class CreateOrderControllerDto {
  @IsNumber()
  totalPrice: number;
}

@Controller('orders')
export class OrdersController {

  constructor(private service: OrdersService) {}

  // Create order (authenticated user)
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() body: CreateOrderControllerDto, @Req() req) {
    // Pass user from JWT payload
    const createOrderDto = {
      totalPrice: body.totalPrice,
      user: req.user, // injected by JwtAuthGuard
    };
    return this.service.create(createOrderDto);
  }

  // Get all orders (Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Get()
  async findAll() {
    return this.service.findAll();
  }

  // Update order status (Admin only)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Patch(':id/status')
  async updateStatus(
    @Param('id') id: number,
    @Body() body: UpdateOrderStatusDto,
  ) {
    return this.service.updateStatus(id, body.status);
  }
}