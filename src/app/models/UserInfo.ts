import { Table, Column, Model, ForeignKey } from "sequelize-typescript";
import Users from "./Users";

@Table({
  tableName: "user_info",
})
export default class UserInfo extends Model<UserInfo> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;
  @ForeignKey(() => Users)
  @Column({ field: "u_id" })
  userId: number;
  @Column({ field: "wx_code" })
  wxCode: string;
  @Column
  adress: string;
  @Column
  website: string;
  @Column
  company: string;
  @Column
  occupation: string;
  @Column
  school: string;
  @Column
  education: string;
  //技能
  @Column
  get skill(): string {
    return this.getDataValue("skill")
      ? this.getDataValue("skill").split(",")
      : [];
  }
  set skill(value: string) {
    this.setDataValue("skill", value);
  }
  //简介
  @Column
  profile: string;

  isActive: number;
}
