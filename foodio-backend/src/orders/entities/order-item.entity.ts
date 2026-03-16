import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Order } from './order.entity';
import { MenuItem } from '../../menu-items/entities/menu-item.entity';

@Entity()
export class OrderItem {

  @PrimaryGeneratedColumn()
  id:number;

  @ManyToOne(()=>Order)
  order:Order;

  @ManyToOne(()=>MenuItem)
  menuItem:MenuItem;

  @Column()
  quantity:number;

  @Column()
  price:number;

}