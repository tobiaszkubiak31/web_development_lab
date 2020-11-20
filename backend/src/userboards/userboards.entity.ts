import { User } from '../users/users.entity';
import { Entity, PrimaryColumn, ManyToOne, JoinColumn, Column } from 'typeorm';
import { Board } from '../boards/boards.entity';

@Entity()
export class Userboard {

  @PrimaryColumn()
  user_id!: number;

  @PrimaryColumn()
  board_id!: number;

  @Column()
  user_role: string;

  @ManyToOne(() => User, user => user.boardConnection, { primary: true, cascade: true, onDelete: "CASCADE" })
  @JoinColumn({ name: "user_id" })
  user: Promise<User>;

  @ManyToOne(() => Board, board => board.userConnection, { primary: true, cascade: true, onDelete: "CASCADE" })
  @JoinColumn({ name: "board_id" })
  board: Promise<Board>;
}