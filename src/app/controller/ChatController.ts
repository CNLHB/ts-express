import {controller, get, post} from "../../utils/decorator";
import {Response, Request} from "express";
import {getResponseData, ResultCode} from "../../utils/utils";
import ChatService from "../service/ChatService";
import Chat from "../models/Chat";

@controller
class ChatController{
    @post("/chat")
    async createChatByFromIdAndToId(req: Request, res: Response){
        const {fromId, toId} = req.body
        if (fromId&&toId){
            let chat = await ChatService.createChatByFromIdAndToId(parseInt(fromId),parseInt(toId))
            res.json(getResponseData(chat))
        }else {
            res.json(getResponseData("","Bad Request",ResultCode.BAD_REQUEST_CODE))
        }

    }

    /**
     * 获取用户所用聊天窗口
     * @param path:uid
     * @param req
     * @param res
     */
    @get("/chat/:uid")
    async queryChatListById(req: Request, res: Response){
        const {uid} = req.params
        let chatList: Chat[] = await ChatService.queryChatListById(parseInt(uid))
        res.json(getResponseData(chatList))
    }
}