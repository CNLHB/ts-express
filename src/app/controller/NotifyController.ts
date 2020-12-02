import {controller, get, use} from "../../utils/decorator";
import {Response, Request} from "express";
import {getResponseData, IPageBodyRequest} from "../../utils/utils";
import NotifyService from "../service/NotifyService";
import {validateCookieID} from "../../utils/middleware/validateCookieID";
import {setPageOrPageSize} from "../../utils/middleware/setPageOrPageSize";

@controller
class ChatController {
    /**
     * 获取登录用户通知
     * @param  const {type, read, page, pageSize} = req.query;
     * @param req
     * @param res
     */
    @get("/notify")
    @use(setPageOrPageSize)
    @use(validateCookieID)
    async getNotifyByUid(req: IPageBodyRequest, res: Response) {
        const {type, read, page, pageSize} = req.query;
        const uid: string = req.session.login;
        let notifys = await NotifyService.getNotifyByUid(
            parseInt(uid),
            type,
            read,
            parseInt(page),
            parseInt(pageSize)
        );
        res.json(getResponseData(notifys));
    }

    /**
     * 创建通知
     * @param path:uid
     * @param req
     * @param res
     */
    @get("/notify")
    async createNotifyByUId(req: Request, res: Response) {
        const {uid} = req.params;
        NotifyService.createNotifyByUId(parseInt(uid));
        res.json(getResponseData("notifys"));
    }
}
