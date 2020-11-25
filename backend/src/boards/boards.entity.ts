import { Userboard } from 'src/userboards/userboards.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Board {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @OneToMany(() => Userboard, userBoard => userBoard.board)
  userConnection: Promise<Userboard[]>;
}
