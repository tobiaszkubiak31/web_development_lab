import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: Number;

  @Column()
  email: string;

  @Column()
  password: string;
}