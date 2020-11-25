import Users from "../models/Users";
import UserInfo from "../models/UserInfo";
import { where } from "sequelize";

export default class UserService {
  constructor() {}
  static async queryUserById(id: number): Promise<Users> {
    const userInfo = await Users.findOne({
      attributes: {
        exclude: ["password", "deleted_at"],
      },
      include: [
        {
          model: UserInfo,
          where: {
            id,
          },
          attributes: {
            exclude: ["deleted_at", "wx_code"],
          },
        },
      ],
    });
    return userInfo;
  }
  static async login(userName: string, password: string): Promise<Users> {
    let user = await Users.findOne({
      where: {
        userName,
        password,
      },
      attributes: {
        exclude: ["password", "deleted_at"],
      },
    });
    return user;
  }
}
