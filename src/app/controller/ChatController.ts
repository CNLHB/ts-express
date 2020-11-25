import { controller, get, post, use } from "../../utils/decorator";
import { Response, Request } from "express";
import {
  getResponseData,
  pageResult,
  ResultCode,
  ResultErrorMsg,
} from "../../utils/utils";
import ChatService from "../service/ChatService";
import Chat from "../models/Chat";
import { validateCookieID } from "../../utils/validateCookieID";

@controller
class ChatController {
  @post("/chat")
  async createChatByFromIdAndToId(req: Request, res: Response) {
    const { fromId, toId } = req.body;
    if (fromId && toId) {
      let chat = await ChatService.createChatByFromIdAndToId(
        parseInt(fromId),
        parseInt(toId)
      );
      res.json(getResponseData(chat));
    } else {
      res.json(
        getResponseData(
          "",
          ResultErrorMsg.ERROR_BAD_REQUEST,
          ResultCode.BAD_REQUEST_CODE
        )
      );
    }
  }

  /**
   * 获取用户所用聊天窗口
   * @param path:uid
   * @param req
   * @param res
   */
  @get("/chat")
  @use(validateCookieID)
  async queryChatListById(req: Request, res: Response) {
    const uid: string = req.session.login;
    let { type = "all", page = 1, pageSize = 10 } = req.query;
    page = parseInt(page as string);
    pageSize = parseInt(pageSize as string);

    let chatList = await ChatService.queryChatListById(
      parseInt(uid),
      type as string,
      page,
      pageSize
    );
    res.json(
      //pageResult(page, pageSize, chatList.count, chatList.rows)
      getResponseData(chatList.rows)
    );
  }
}
