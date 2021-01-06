import { Tasklist } from 'src/tasklists/tasklists.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class Task {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column()
  done: boolean;

  @Column()
  tasklist_id!: number;

  @ManyToOne(() => Tasklist, taskList => taskList.tasks, { cascade: true, onDelete: "CASCADE" })
  @JoinColumn({ name: "tasklist_id" })
  taskList: Promise<Tasklist>;
}