import { List } from 'src/lists/lists.entity';
import { Tasklist } from 'src/tasklists/tasklists.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';

@Entity()
export class Card {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  time_limit: string;

  @Column()
  label_ids: string;

  @Column()
  list_id!: number;

  @ManyToOne(() => List, list => list.cards, { cascade: true, onDelete: "CASCADE" })
  @JoinColumn({ name: "list_id" })
  list: Promise<List>;

  @OneToMany(() => Tasklist, tasklist => tasklist.card_id)
  tasklists: Promise<Tasklist[]>;
}