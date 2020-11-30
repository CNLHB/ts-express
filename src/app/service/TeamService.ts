import Sequelize from "sequelize";
import Friends from "../models/Friends";
import Team from "../models/Team";
import {pageResult,IPage} from "../../utils/utils";
import { friendsTeamAttr } from "../../config/config";
const Op = Sequelize.Op;
export default class ChatService {
  constructor() {}
  static async getTeamListByUId(fromId: number, page:number=1,pageSize:number=10): Promise<IPage<Team>>{
    const results = await Friends.findAndCountAll({
      where: {
        fromId,
        type: 1,
      },
      offset:(page-1)*pageSize,
      limit: pageSize
    });

    const ids: number[] = results.rows.map((item: Friends) => {
      return item.toId;
    });
    try {
      let teams = await Team.findAll({
        raw: true,
        where: {
          id: { [Op.in]: ids },
        },
        attributes: friendsTeamAttr,
      });
      teams.forEach((item)=>{
        item.isActive = 1;

      })

      pageResult(page,pageSize,results.count, teams)
      return pageResult(page,pageSize,results.count, teams);
    } catch (err) {
      console.log(err);
    }
    return;
  }
}
