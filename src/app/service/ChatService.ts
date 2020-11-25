import Chat from "../models/Chat";
import Sequelize from "sequelize";
import Message from "../models/Message";
import { IPage } from "../../utils/utils";
const Op = Sequelize.Op;
export default class ChatService {
  constructor() {}
  // 查看用户与另一个用户的聊天信息   belong = fromId
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
            { fromId: fromId, toId: toId },
            { fromId: toId, toId: fromId },
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
            { fromId: fromId, toId: toId },
            { fromId: toId, toId: fromId },
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
            { fromId: fromId, toId: toId },
            { fromId: toId, toId: fromId },
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

  static async queryChatListById(
    uid: number,
    type: string,
    page: number,
    pageSize: number
  ) {
    let obj = { isRead: true };
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
        [Op.or]: [{ fromId: uid }, { toId: uid }],
      },
      offset: (page - 1) * pageSize,
      limit: pageSize,
      attributes: {
        exclude: ["deleted_at"],
      },
      include: [
        {
          model: Message,
          attributes: {
            exclude: ["deleted_at"],
          },
        },
      ],
    });

    return chatList;
  }
}
