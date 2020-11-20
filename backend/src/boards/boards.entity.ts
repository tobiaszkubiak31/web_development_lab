import { User_Board } from 'src/user_boards/user_boards.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Board {
  @PrimaryGeneratedColumn()
  id: Number;

  @Column()
  name: string;

  @OneToMany(() => User_Board, userBoard => userBoard.board)
  userConnection: Promise<User_Board[]>;
}
