import Users from "../models/Users";
import UserInfo from "./../models/UserInfo";

export default class UserService {
  constructor() {}
  /**
   * 查询用户信息
   * @param id
   */
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
  /**
   * 用户登录
   * @param userName
   * @param password
   */
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
  /**
   * 用户注册
   * @param userName
   * @param password
   */
  static async register(userName: string, password: string): Promise<Boolean> {
    let [ret, flag] = await Users.findOrCreate({
      where: {
        userName,
      },
      defaults: {
        userName,
        password,
      },
    });
    if (flag) {
      UserInfo.create({
        userId: ret.id,
      });
      return flag;
    } else {
      return flag;
    }
  }
  static async updateUserInfo(
    uId: number,
    skill:any,
    adress: string,
    website: string,
    company: string,
    occupation: string,
    school: string,
    education: string,
    profile: string,
    share: boolean
  ): Promise<Boolean> {
    let [count, flag] = await UserInfo.update(
      {
        skill: skill.join(","),
        adress,
        website,
        company,
        occupation,
        school,
        education,
        profile,
        share,
      },
      {
        where: {
          userId:uId
        },
      }
    );
    if (count==0) {

      return false;
    } else {
      return true;
    }
  }
}
