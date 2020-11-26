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
  static async register(userName: string, password: string): Promise<Boolean> {
    let [ret,flag] = await Users.findOrCreate({
      where:{
        userName
      },
      defaults:{
        userName,
        password,
      }
    })
    if (flag){
      UserInfo.create({
        userId: ret.id
      })
      return flag;
    }else{
      return flag;
    }
    // let user = await Users.create({
    //     userName,
    //     password,
    // });
    // UserInfo.create({
    //   userId:user.id
    // })
    // return user;
  }

}
