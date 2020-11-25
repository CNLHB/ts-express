import Sequelize from "sequelize";
import Comment from "../models/Comment";
import { IPage } from "../../utils/utils";
import Users from "../models/Users";
import Project from "../models/Project";
const Op = Sequelize.Op;
export default class CommentService {
  constructor() {}
  // 查看用户与另一个用户的聊天信息   belong = fromId
  static async queryProjectCommentListByUid(id: number): Promise<Comment[]> {
    let commens = await Comment.findAll({
      where: {
        toId: id,
      },
      attributes: {
        exclude: ["deleted_at"],
      },
      include: [
        {
          model: Users,
          as:"commentUser",
          attributes: ["id","userName","nickname","image"]
        },{
          model: Users,
          as:"owner",
          attributes: ["id","userName","nickname","image"]
        },{
          model: Project,
          attributes:["id","name","nickname"]
        }
      ],
    });
    return commens;
  }
}

