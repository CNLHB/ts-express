import Sequelize from "sequelize";
import Friends from "../models/Friends";
import Team from "../models/Team";
const Op = Sequelize.Op;
export default class ChatService {
  constructor() {}
  static async getTeamListByUId(fromId: number) {
    const results = await Friends.findAll({
      where: {
        fromId,
        type: 1,
      },
    });

    const ids: number[] = results.map((item: Friends) => {
      return item.toId;
    });
    try {
      let users = await Team.findAll({
        raw: true,
        where: {
          id: { [Op.in]: ids },
        },
        attributes: ["id", "name", "nickname", "image"],
      });

      return users;
    } catch (err) {
      console.log(err);
    }
    return [];
  }
}
