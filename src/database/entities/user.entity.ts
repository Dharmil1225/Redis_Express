import { BaseEntity } from "./base.entity";
import { Column, Entity } from "typeorm";

@Entity("User")
export class User extends BaseEntity {
  @Column({ type: "varchar" })
  name: string;

  @Column({ type: "varchar" })
  email: string;

  @Column({ type: "text" })
  address: string;

  @Column({ type: "int", default: 0 })
  pinCode: number;

  @Column({type:'int', default:0 })
  score: number;
}
