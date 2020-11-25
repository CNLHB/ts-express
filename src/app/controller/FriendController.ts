import { controller, get, use } from "../../utils/decorator";
import { Request, Response } from "express";
import { getResponseData, ResultCode, ResultErrorMsg } from "../../utils/utils";
import FriendsService from "../service/FriendsService";
import TeamService from "../service/TeamService";
import { validateCookieID } from "../../utils/validateCookieID";
interface BodyRequest extends Request {
  body: { [key: string]: string | undefined };
}

@controller
export default class UserController {
  @get("friend/user")
  @use(validateCookieID)
  async getFriendList(req: BodyRequest, res: Response) {
    let uid = req.session.login;
    const id: number = parseInt(uid);
    try {
      const friends = await FriendsService.getFriendList(id);
      res.json(getResponseData(friends));
    } catch (error) {
      res.json(
        getResponseData(
          "",
          ResultErrorMsg.ERROR_BAD_REQUEST,
          ResultCode.BAD_REQUEST_CODE
        )
      );
    }
  }
  @get("friend/team")
  @use(validateCookieID)
  async getTeamListByUId(req: BodyRequest, res: Response) {
    let uid = req.session.login;
    let page = req.query.page as string;
    let pageSize = req.query.page as string;

    const id: number = parseInt(uid);
    try {
      const friends = await TeamService.getTeamListByUId(id);
      res.json(getResponseData(friends));
    } catch (error) {
      res.json(
        getResponseData(
          "",
          ResultErrorMsg.ERROR_BAD_REQUEST,
          ResultCode.BAD_REQUEST_CODE
        )
      );
    }
  }
  @get("user/fans/:id")
  @use(validateCookieID)
  async getFansList(req: BodyRequest, res: Response) {
    let uid = req.session.login;
    const id: number = parseInt(uid);
    try {
      const friends = await FriendsService.getFansList(id);
      res.json(getResponseData(friends));
    } catch (error) {
      res.json(
        getResponseData(
          "",
          ResultErrorMsg.ERROR_BAD_REQUEST,
          ResultCode.BAD_REQUEST_CODE
        )
      );
    }
  }
}
