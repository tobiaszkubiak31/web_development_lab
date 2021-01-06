import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Label {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  color!: string;
}