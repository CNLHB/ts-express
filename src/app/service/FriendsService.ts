import Friends from "../models/Friends";
import Users from "../models/Users";
import Sequelize from "sequelize";
import { IPage, IPageCount, pageResult } from "../../utils/utils";
import { friendsUserAttr,friendsTeamAttr } from './../../config/config';
import Team from "../models/Team";
const Op = Sequelize.Op;
export default class FriendsService {
  constructor() {}
  //无操作0 ，关注 1 互相关注2
  static async getFriendList(
    fromId: number,
    page: number,
    pageSize: number
  ): Promise<IPage<Users>> {
    const results = await Friends.findAndCountAll({
      where: {
        fromId,
        type: 0,
      },
      offset: (page - 1) * pageSize,
      limit: pageSize,
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
        attributes: friendsUserAttr,
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
      return pageResult(page, pageSize, results.count, users);
    } catch (err) {
      console.log(err);
    }
    return;
  }
  static async getFansList(
    toId: number,
    page: number,
    pageSize: number
  ): Promise<IPage<Friends>> {
    const results: IPageCount<Friends> = await Friends.findAndCountAll({
      where: {
        toId,
      },
      offset: (page - 1) * pageSize,
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
      attributes:friendsUserAttr,
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
    return pageResult(page, pageSize, results.count, users);
  }
  static async activeFriendOrTeam(id:number,fromId:number,toId:number,type:number){
      Friends.insertOrUpdate({

      },{

      })
    let friend =await Friends.findOne({
      where:{
        fromId,toId,type
      },
      attributes:{
        exclude: ["deleted_at"]
      }
    })
    if (friend == null){
        await  Friends.create({
          fromId,toId,type
        })
      return "关注成功"
    }else {
      await  Friends.destroy({
        where:{
          fromId,toId,type
        }
      })
      return "取消关注"
    }

  }
  static async searchFriendUserOrTeam(type: string, q: string,page:number=1,pageSize:number=10){
    let ret:Users[]| Team[]
    let num = 0
    if (type=="user"){
      let {count,
        rows
      } = await Users.findAndCountAll({
          where: {
          [Op.or]:[{
            userName:{
              [Op.like]: `%${q}%`
            }
          },{
                email:{
                  [Op.like]: `%${q}%`
                }
          }]
          },
        attributes:friendsUserAttr,
        offset:(page-1)*pageSize,
        limit:pageSize
        })
      num = count
      ret = rows
      }else {
      let {count,
        rows
      } = await Team.findAndCountAll({
        where: {
          nickname:{
            [Op.like]: `%${q}%`
          }
        },
        attributes:friendsTeamAttr,
        offset:(page-1)*pageSize,
        limit:pageSize
      })
      num = count
      ret = rows
    }
    return pageResult(page, pageSize, num, ret)
  }

}
