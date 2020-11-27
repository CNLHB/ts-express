import { Table, Column, Model } from "sequelize-typescript";
import Seqeuelize from "sequelize";
import Users from "./Users";
const Op = Seqeuelize.Op;
@Table({
  tableName: "friends",
})
export default class Friends extends Model<Friends> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column({ field: "from_id" })
  fromId: number;

  @Column({ field: "to_id" })
  toId: number;
  @Column
  type: number;

}
