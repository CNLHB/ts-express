import {controller, get, post, use} from "../../utils/decorator";
import {Response, Request} from "express";
import {
    getResponseData, IPageBodyRequest,
    ResultCode,
    ResultErrorMsg,
} from "../../utils/utils";
import ChatService from "../service/ChatService";
import {validateCookieID} from "../../utils/middleware/validateCookieID";
import {setPageOrPageSize} from "../../utils/middleware/setPageOrPageSize";

@controller
class ChatController {
    /**
     * 创建聊天窗口
     * @param req.body.fromId
     * @param req.body.toId
     */
    @post("/chat")
    async createChatByFromIdAndToId(req: Request, res: Response) {
        const {fromId, toId} = req.body;
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
                    ResultErrorMsg.BAD_REQUEST,
                    ResultCode.BAD_REQUEST_CODE
                )
            );
        }
    }

    /**
     * 获取用户聊天窗口   所有窗口 或者 有未读消息的窗口
     * @param query:type =  all or unread
     * @param req
     * @param res
     */
    @get("/chat")
    @use(setPageOrPageSize)
    @use(validateCookieID)
    async queryChatListById(req: IPageBodyRequest, res: Response) {
        const uid: string = req.session.login;
        let {type = "all", page, pageSize} = req.query;
        let chatList = await ChatService.queryChatListById(
            parseInt(uid),
            type,
            parseInt(page),
            parseInt(pageSize)
        );
        res.json(
            //pageResult(page, pageSize, chatList.count, chatList.rows)
            getResponseData(chatList)
        );
    }
}
