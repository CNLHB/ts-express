import { Table, Column, Model,CreatedAt,UpdatedAt,DeletedAt } from "sequelize-typescript";
interface IUser{
  name: string;
  email: string;
  account: string;
  password: string;
}

@Table({
  tableName: "users",
  timestamps: true
})
export default class Users extends Model<Users> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column
  name: string;

  @Column
  email: string;
  @Column
  account: string;
  @Column
  password: string;

  static async getList<T extends Users>() {
    const results = await this.findAll({
      raw: true,
    });
    return results as T[];
  }
}
