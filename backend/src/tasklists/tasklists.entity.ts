import { Card } from 'src/cards/cards.entity';
import { Task } from 'src/tasks/tasks.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn, ManyToOne } from 'typeorm';

@Entity()
export class Tasklist {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column()
  card_id!: number;

  @ManyToOne(() => Card, card => card.tasklists, { cascade: true, onDelete: "CASCADE" })
  @JoinColumn({ name: "card_id" })
  card: Promise<Card>;

  @OneToMany(() => Task, task => task.taskList)
  tasks: Promise<Task[]>;
}