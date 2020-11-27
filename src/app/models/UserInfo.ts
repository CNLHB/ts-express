import {
  Table,
  Column,
  Model,
  ForeignKey,
  AllowNull,
} from "sequelize-typescript";
import Users from "./Users";

@Table({
  tableName: "user_info"
})
export default class UserInfo extends Model<UserInfo> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;
  @ForeignKey(() => Users)
  @AllowNull
  @Column({ field: "u_id" })
  userId: number;

  @Column
  adress: string;
  @Column
  website: string;
  //公司
  @Column
  company: string;
  //职业
  @Column
  occupation: string;
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
  @Column
  share: boolean;


}
// attributes: { exclude: ['baz'] },
