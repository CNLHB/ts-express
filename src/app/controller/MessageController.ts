import {controller, get, post, put, use} from "../../utils/decorator";
import {Response, Request} from "express";
import MessageService, {MESSAGE_TYPE} from "../service/MessageService";
import {getResponseData, ResultCode} from "../../utils/utils";
import {validateCookieID} from "../../utils/middleware/validateCookieID";

@controller
class MessageController {

    @get("/message/:fromId/:toId")
    async getMessageByFromIdAndToId(req: Request, res: Response) {
        const fromId = parseInt(req.params.fromId)
        const toId = parseInt(req.params.toId)
        let messages = await MessageService.getMessageByFromIdAndToId(fromId, toId)
        res.json(getResponseData(messages))
    }

    @get("/unreadmessage/:id")
    async getUnreadMessageListById(req: Request, res: Response) {
        const id = parseInt(req.params.id)
        let messages = await MessageService.getMessageListByUId(id, MESSAGE_TYPE.UN_READ_TYPE)
        res.json(getResponseData(messages))
    }

    @get("/message/:id")
    async getAllMessageListById(req: Request, res: Response) {
        const id = parseInt(req.params.id)
        let messages = await MessageService.getMessageListByUId(id, MESSAGE_TYPE.ALL)
        res.json(getResponseData(messages))
    }

    /**
     * 发送消息  聊天窗口id  发送者id  接受者id  消息内容message
     * @param  const {cId, fromId, toId, message} = req.body
     * @param res
     */
    @post("/message")
    async sendMessageToUser(req: Request, res: Response) {
        const {cId, fromId, toId, message} = req.body
        if (cId && fromId && toId && message) {
            await MessageService.sendMessageToUser(cId, fromId, toId, message)
            res.json(getResponseData("send message sucess!"))
            return
        }
        res.json(getResponseData("", "bad requset", ResultCode.BAD_REQUEST_CODE))
    }

    /**
     * 读信息。接受信息id
     * @param id =  req.params.id
     * @param res
     */
    @put("/message")
    @use(validateCookieID)
    async readMessage(req: Request, res: Response) {
        let uid = req.session.login;
        const id: number[] = req.body.id
        console.log(uid)
        console.log(id)
        if (uid) {
            let ret = await MessageService.readMessage(id)
            if (ret) {
                return res.json(getResponseData("read message sucess!"))
            }
            res.json(getResponseData("", "message read error", ResultCode.ERROR_CODE))
        }
        res.json(getResponseData("", "bad requset", ResultCode.BAD_REQUEST_CODE))
    }


}