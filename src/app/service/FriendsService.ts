import Friends from "../models/Friends";
import Users from "../models/Users";
import Sequelize from "sequelize";
import {IPage, IPageCount,pageResult} from "../../utils/utils";
const Op = Sequelize.Op;
export default class FriendsService {
  constructor() {}
  //无操作0 ，关注 1 互相关注2
  static async getFriendList(fromId: number,page:number=1,pageSize:number=10): Promise<IPage<Users>> {
    const results = await Friends.findAndCountAll({
      where: {
        fromId,
        type: 0,

      },
      offset:(page-1)*pageSize,
      limit: pageSize
    });

    const ids: number[] = results.rows.map((item: Friends) => {
      return item.toId;
    });
    try {
      let users = await Users.findAll({
        raw: true,
        where: {
          id: { [Op.in]: ids },
        },
        attributes: ["id", "userName",'nickname', "image"],
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

      return pageResult(page,pageSize,results.count,users);

    } catch (err) {
      console.log(err);
    }
    return ;
  }
  static async getFansList(toId: number,page:number,pageSize:number): Promise<IPage<Friends>> {
    const results: IPageCount<Friends> = await Friends.findAndCountAll({
      where: {
        toId,
      },
      offset:(page-1)*pageSize,
      limit: pageSize,
      raw: true,
    });
    const ids: number[] = results.rows.map((item: Friends) => {
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
    return pageResult(page, pageSize,results.count,users);
  }
}
