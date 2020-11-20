import {
  Table,
  Column,
  Model,
  ForeignKey,
  AllowNull,
  BelongsTo,
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
    return this.getDataValue("name")
      ? this.getDataValue("name").split(",")
      : [];
  }
  set name(value: string) {
    this.setDataValue("name", value);
  }
  //简介
  @Column
  profile: string;
  
  isActive:number

}
// attributes: { exclude: ['baz'] },
