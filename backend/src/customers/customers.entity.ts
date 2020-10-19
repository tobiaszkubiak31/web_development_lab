import { Entity, Column, PrimaryGeneratedColumn, Long } from 'typeorm';

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  id: Number;

  @Column()
  first_name: string;

  @Column()
  last_name: string;
}
