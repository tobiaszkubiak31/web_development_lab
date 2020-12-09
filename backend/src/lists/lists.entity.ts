import { Board } from 'src/boards/boards.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class List {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @ManyToOne(() => Board, board => board.lists, { cascade: true, onDelete: "CASCADE" })
  @JoinColumn({ name: "board_id" })
  board: Promise<Board>;
}