import { Table, Column, Model } from "sequelize-typescript";


@Table({
  tableName: "friends",
  timestamps: true
})
export default class Friends extends Model<Friends> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column
  fromId: number;

  @Column
  toId: number;

}
