import {
  Table,
  Column,
  Model,
  HasMany,
  HasOne
} from "sequelize-typescript";
import UserInfo from './UserInfo';

@Table({
  tableName: "users"
})
export default class Users extends Model<Users> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column({field:"user_name"})
  userName: string;
  @Column
  phone: string;
  @Column
  images: string;
  @Column
  email: string;
  @Column
  account: string;
  @Column
  password: string;

  @HasOne(() => UserInfo,"userId")
  userInfo: UserInfo;
  isActive:number
  static async getList<T extends Users>() {
    const results = await this.findAll({
      raw: true,
      attributes:{
        exclude:["password","deleted_at"]
      }
    });
    return results as T[];
  }
}
// attributes: { exclude: ['baz'] },