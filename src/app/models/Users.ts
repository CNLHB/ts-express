import { Table, Column, Model, HasOne } from "sequelize-typescript";
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

  @Column({ field: "user_name" })
  userName: string;
  @Column
  nickname: string;
  @Column({ field: "name_update_date" })
  nameUpdateDate: Date;
  @Column
  phone: string;
  @Column
  image: string;
  @Column
  email: string;
  @Column
  account: string;
  @Column
  password: string;
  @Column({ field: "bind_wx" })
  bindWx: boolean;
  @HasOne(() => UserInfo, "userId")
  userInfo: UserInfo;

  isActive: number;
  static async getList<T extends Users>() {
    const results = await this.findAll({
      raw: true,
      attributes: {
        exclude: ["password", "deleted_at"],
      },
    });
    return results as T[];
  }
}
