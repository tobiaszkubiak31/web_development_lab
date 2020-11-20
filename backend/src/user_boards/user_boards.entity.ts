import { User } from '../users/users.entity';
import { Entity, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Board } from '../boards/boards.entity';

@Entity()
export class User_Board {

  @PrimaryColumn()
  userId: number;

  @PrimaryColumn()
  boardId: number;

  @ManyToOne(() => User, user => user.boardConnection, { primary: true, cascade: true, onDelete: "CASCADE" })
  @JoinColumn({ name: "userId" })
  user: Promise<User>;

  @ManyToOne(() => Board, board => board.userConnection, { primary: true, cascade: true, onDelete: "CASCADE" })
  @JoinColumn({ name: "boardId" })
  board: Promise<Board>;
}