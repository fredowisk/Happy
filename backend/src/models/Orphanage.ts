import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
  ManyToOne,
} from "typeorm";

import Image from "./Image";
import User from "./User";

@Entity("orphanages")
export default class Orphanage {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  name: string;

  @Column()
  latitude: number;

  @Column()
  longitude: number;

  @Column()
  about: string;

  @Column()
  instructions: string;

  @Column()
  opening_hours: string;

  @Column()
  open_on_weekends: boolean;

  @Column()
  user_id: string;

  @ManyToOne(() => User, user => user.orphanage)
  @JoinColumn({ name: "user_id" })
  user: User;

  @OneToMany(() => Image, (image) => image.orphanage, {
    //toda vez que o orfanato for criado ou atualizado, cadastre novamente as imagens
    cascade: ["insert", "update"],
  })
  @JoinColumn({ name: "orphanage_id" })
  images: Image[];
}
