import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';

export enum OrderStatus {

  PENDING = 'Pending',
  PREPARING = 'Preparing',
  READY = 'Ready',
  COMPLETED = 'Completed'

}

@Entity()
export class Order {

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(()=>User)
  user: User;

  @Column({
    type:'enum',
    enum:OrderStatus,
    default:OrderStatus.PENDING
  })
  status: OrderStatus;

  @Column()
  totalPrice: number;

}