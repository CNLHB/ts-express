import { Table, Column, Model } from "sequelize-typescript";
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


}
