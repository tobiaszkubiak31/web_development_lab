import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../users/users.entity';
@Entity()
export class Board {
  @PrimaryGeneratedColumn()
  id: Number;

  @Column()
  name: string;

  // Probably needs to be changed

  @ManyToOne(type => User)
  // User zamiast Number
  user: User;
}
