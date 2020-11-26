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
  //地址
  @Column
  adress: string;
  //个人网站
  @Column
  website: string;
  //公司
  @Column
  company: string;
  //职业
  @Column
  occupation: string;
  //学校
  @Column
  school: string;
  //学历
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
