import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Board } from '../boards/boards.entity';

@Entity()
export class User {
  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }
  @PrimaryGeneratedColumn()
  id: Number;

  @Column({ type: 'varchar', length: 300 })
  email: string;

  @Column({ type: 'varchar', length: 300 })
  password: string;

  @OneToMany(
    () => Board,
    board => board.user,
  )
  // defining this is also optional because by default,
  // the referenced foreign key is named as <column_name>_id or account_id
  board: Board[];
}
