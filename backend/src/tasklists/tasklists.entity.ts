import { Task } from 'src/tasks/tasks.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Tasklist {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @OneToMany(() => Task, task => task.taskList)
  tasks: Promise<Task[]>;
}