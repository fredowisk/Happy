import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Orphanage from "./Orphanage";

@Entity("users")
class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Orphanage, orphanage => orphanage.user)
  orphanage: Orphanage[];

}

export default User;
