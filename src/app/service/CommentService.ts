import Sequelize from "sequelize";
import Comment from "../models/Comment";
import {IPage, pageResult} from "../../utils/utils";
import Users from "../models/Users";
import Project from "../models/Project";

const Op = Sequelize.Op;
export default class CommentService {
    constructor() {
    }

    /**
     * 查看登录用户发表的评论
     * @param id
     * @param page
     * @param pageSize
     */
    static async queryProjectCommentListByUid(id: number, page: number, pageSize: number): Promise<IPage<Comment>> {
        const {rows, count} = await Comment.findAndCountAll({
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
                    attributes: ["id", "userName", "nickname", "image"]
                }, {
                    model: Users,
                    as: "owner",
                    attributes: ["id", "userName", "nickname", "image"]
                }, {
                    model: Project,
                    attributes: ["id", "name", "nickname"]
                }
            ],
            offset: (page - 1) * pageSize,
            limit: pageSize,
        });

        return pageResult(page, pageSize, count, rows);
    }
}

