import {controller, get, post} from "../../utils/decorator";
import {Response, Request} from "express";
import MessageService from "../service/MessageService";
import {getResponseData} from "../../utils/utils";

@controller
class MessageController{
    @get("/message/:fromId/:toId")
    async getMessageByFromIdAndToId(req: Request, res: Response){
        const fromId =  parseInt(req.params.fromId)
        const toId =  parseInt(req.params.toId)
        let messages = await MessageService.getMessageByFromIdAndToId(fromId,toId)
        res.json(getResponseData(messages))
    }

}