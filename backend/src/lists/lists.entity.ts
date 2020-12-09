import { Board } from 'src/boards/boards.entity';
import { Card } from 'src/cards/cards.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';

@Entity()
export class List {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @ManyToOne(() => Board, board => board.lists, { cascade: true, onDelete: "CASCADE" })
  @JoinColumn({ name: "board_id" })
  board: Promise<Board>;

  @OneToMany(() => Card, card => card.list)
  cards: Promise<Card[]>;
}