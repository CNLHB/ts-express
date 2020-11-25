import { Column, Model, Table } from "sequelize-typescript";

@Table({
  tableName: "t_coupon",
})
export default class Coupon extends Model<Coupon> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column({ field: "type" })
  name: string;

  @Column({ field: "quota" })
  nickname: number;
  @Column
  term: Date;
}
