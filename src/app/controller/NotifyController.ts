import { controller, get } from "../../utils/decorator";
import { Response, Request } from "express";
import { getResponseData, ResultCode } from "../../utils/utils";
import NotifyService from "../service/NotifyService";

@controller
class ChatController {
  /**
   * 获取用户所用通知
   * @param path:uid
   * @param req
   * @param res
   */
  @get("/notify")
  async getNotifyByUid(req: Request, res: Response) {
    const { type, read, page = 1, pageSize = 10 } = req.query;
    if (!req.session) {
      return res.json(
        getResponseData("", "placse login", ResultCode.FORBIDDEN_CODE)
      );
    }
    const uid: string = req.session.login;
    let notifys = await NotifyService.getNotifyByUid(
      parseInt(uid),
      type as string,
      read as string,
      parseInt(page as string),
      parseInt(pageSize as string)
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
    const { uid } = req.params;
    NotifyService.createNotifyByUId(parseInt(uid));
    res.json(getResponseData("notifys"));
  }
}
