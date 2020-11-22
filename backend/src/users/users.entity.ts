import { Userboard } from 'src/userboards/userboards.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class User {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 300, unique: true, nullable: false })
  email!: string;

  @Column({ type: 'varchar', length: 300, nullable: false })
  password!: string;

  @OneToMany(() => Userboard, userBoard => userBoard.user)
  boardConnection: Promise<Userboard[]>;
}
