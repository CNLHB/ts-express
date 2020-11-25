import Friends from "../models/Friends";
import Users from "../models/Users";
import Sequelize from "sequelize";
const Op = Sequelize.Op;
export default class FriendsService {
  constructor() {}
  //无操作0 ，关注 1 互相关注2
  static async getFriendList(fromId: number): Promise<Users[]> {
    const results = await Friends.findAll({
      where: {
        fromId,
        type: 0,
      },
    });

    const ids: number[] = results.map((item: Friends) => {
      return item.toId;
    });
    try {
      let users = await Users.findAll({
        raw: true,
        where: {
          id: { [Op.in]: ids },
        },
        attributes: ["id", "userName", "image"],
      });
      for (let item of users) {
        const ret: Friends = await Friends.findOne({
          raw: true,
          where: {
            fromId: item.id,
            toId: fromId,
          },
        });
        if (ret == null) {
          item.isActive = 1;
        } else {
          item.isActive = 2;
        }
      }
      return users;
    } catch (err) {
      console.log(err);
    }
    return [];
  }
  static async getFansList(toId: number): Promise<Users[]> {
    const results: Friends[] = await Friends.findAll({
      where: {
        toId,
      },
      raw: true,
    });
    const ids: number[] = results.map((item: Friends) => {
      return item.fromId;
    });
    let users = await Users.findAll({
      raw: true,
      where: {
        id: { [Op.in]: ids },
      },
      attributes: ["id", "userName", "image"],
    });
    for (let item of users) {
      const ret: Friends = await Friends.findOne({
        raw: true,
        where: {
          fromId: toId,
          toId: item.id,
        },
      });
      if (ret == null) {
        item.isActive = 1;
      } else {
        item.isActive = 2;
      }
    }
    return users;
  }
}
