import {Table, Column, Model, HasOne, Length, AllowNull} from "sequelize-typescript";
import UserInfo from "./UserInfo";

@Table({
  tableName: "users",
})
export default class Users extends Model<Users> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;
  @AllowNull(false)
  @Column({ field: "user_name" })
  userName: string;
  @Column
  nickname: string;
  @Column({ field: "name_update_date" })
  nameUpdateDate: Date;
  @Length({min: 11, max: 11})
  @Column
  phone: string;
  @Column
  image: string;
  @Column
  email: string;
  @Column
  account: string;
  @AllowNull(false)
  @Column
  password: string;
  @Column({ field: "bind_wx" })
  bindWx: boolean;
  @HasOne(() => UserInfo, "userId")
  userInfo: UserInfo;

  isActive: number;
}
