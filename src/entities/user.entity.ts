import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column("text")
  introduction: string;

  @Column({
    default: "http://graph.facebook.com/{user-id}/picture?type=large"
  })
  avatar: string;

  @Column({
    default: "normal"
  })
  role: string;
}