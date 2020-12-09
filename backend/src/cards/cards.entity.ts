import { List } from 'src/lists/lists.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class Card {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  list_id!: number;

  @ManyToOne(() => List, list => list.cards, { cascade: true, onDelete: "CASCADE" })
  @JoinColumn({ name: "list_id" })
  list: Promise<List>;
}