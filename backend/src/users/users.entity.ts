import { User_Board } from 'src/user_boards/user_boards.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

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

  @OneToMany(() => User_Board, userBoard => userBoard.user)
  boardConnection: Promise<User_Board[]>;
}
