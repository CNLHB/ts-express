import Sequelize from "sequelize";
import Comment from "../models/Comment";
import { IPage, pageResult } from "../../utils/utils";
import Users from "../models/Users";
import Project from "../models/Project";
import { friendsUserAttr } from "./../../config/config";
import {FilteredModelAttributes} from "sequelize-typescript/lib/models/Model";

const Op = Sequelize.Op;
export default class CommentService {
  constructor() {}

  /**
   * 查看登录用户发表的评论
   * @param id
   * @param page
   * @param pageSize
   */
  static async queryProjectCommentListByUid(
    id: number,
    type:string,
    page: number,
    pageSize: number
  ): Promise<IPage<Comment>> {
    const { rows, count } = await Comment.findAndCountAll({
      where: {
        toId: id,
      },

      attributes: {
        exclude: ["deleted_at"],
      },
      include: [
        {
          model: Users,
          as: "commentUser",
          attributes: friendsUserAttr,
        },
        {
          model: Users,
          as: "owner",
          attributes: friendsUserAttr,
        },
        {
          model: Project,
          attributes: ["id", "name", "nickname"],
        },
      ],
      offset: (page - 1) * pageSize,
      limit: pageSize,
    });
    if (type!=="me"){
      return pageResult(page, pageSize, count, rows)
    }
    let map = new Map<number, FilteredModelAttributes<Comment>>()
    rows.forEach((item)=>{
      let  value = item.dataValues

      if (map.get(value.projectId)){
        map.get((value.projectId)).comments.push(value.content)
        map.get((value.projectId)).updatedAt = value.updatedAt
        map.get((value.projectId)).createdAt = value.updatedAt
      }else{
        value.comments = [value.content]
        map.set(value.projectId, value)
      }
    })
    let arr = []
    for (const value of map){
      arr.push(value[1])
      delete value[1].content
    }
    return pageResult(page, pageSize, count, arr);
  }
}
