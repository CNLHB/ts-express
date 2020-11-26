import Chat from "../models/Chat";
import Sequelize from "sequelize";
import Message from "../models/Message";
import {IPage, pageResult} from "../../utils/utils";
import Users from "../models/Users";

const Op = Sequelize.Op;
export default class ChatService {
    constructor() {
    }

    /**
     * // 查看用户与另一个用户的聊天信息   belong = fromId
     * @param fromId
     * @param toId
     */
    static async getChatListByFromIdAndToId(
        fromId: number,
        toId: number
    ): Promise<Chat[]> {
        try {
            let messages = await Chat.findAll({
                where: {
                    belong: fromId,
                    status: false,
                    [Op.or]: [
                        {fromId: fromId, toId: toId},
                        {fromId: toId, toId: fromId},
                    ],
                },
                attributes: {
                    exclude: ["deleted_at"],
                },
            });
            return messages;
        } catch (err) {
            console.log(err);
        }
        return [];
    }

    /**
     * 创建聊天窗口
     * @param fromId
     * @param toId
     */
    static async createChatByFromIdAndToId(
        fromId: number,
        toId: number
    ): Promise<Chat> {
        let ret: Chat;
        try {
            ret = await Chat.findOne({
                where: {
                    belong: fromId,
                    status: false,
                    [Op.or]: [
                        {fromId: fromId, toId: toId},
                        {fromId: toId, toId: fromId},
                    ],
                },
                attributes: {
                    exclude: ["deleted_at"],
                },
            });
            let retToId: Chat = await Chat.findOne({
                where: {
                    belong: toId,
                    status: false,
                    [Op.or]: [
                        {fromId: fromId, toId: toId},
                        {fromId: toId, toId: fromId},
                    ],
                },
            });
            let chatRet: Chat;
            if (ret == null) {
                chatRet = await Chat.create({
                    fromId,
                    toId,
                    belong: fromId,
                    status: false,
                });
            }
            if (retToId == null) {
                await Chat.create({
                    fromId,
                    toId,
                    belong: toId,
                    status: false,
                });
            }
            return ret || chatRet;
        } catch (err) {
            console.log(err);
            return new Chat();
        }
    }

    /**
     * 按查询聊天窗口并分页
     * @param uid
     * @param type   可选值  all or 。。。
     * @param page
     * @param pageSize
     */
    static async queryChatListById(
        uid: number,
        type: string,
        page: number,
        pageSize: number
    ) {
        let obj = {isRead: true};
        if (type === "all") {
            delete obj.isRead;
        } else if (type === "unread") {
            obj.isRead = false;
        }
        let chatList: {
            rows: Chat[];
            count: number;
        } = await Chat.findAndCountAll({
            where: {
                belong: uid,
                status: false,
                ...obj,
                [Op.or]: [{fromId: uid}, {toId: uid}],
            },
            offset: (page - 1) * pageSize,
            limit: pageSize,
            attributes: {
                exclude: ["deleted_at", "isRead"],
            },
            include: [
                {
                    model: Message,
                    attributes: {
                        exclude: ["deleted_at"],
                    },
                }
            ],
        });
        for (const item of chatList.rows) {
            let id: number;
            if (item.fromId == uid) {
                id = item.toId
            } else {
                id = item.fromId
            }
            let user = await Users.findOne({
                where: {
                    id: id
                },
                attributes: ["id", "userName", 'nickname', "image"],
            })
            item.dataValues.user = user
        }

        return pageResult(page,
            pageSize,
            chatList.rows.length,
            chatList.rows
        );
    }
}
