import { controller, get, use } from "../../utils/decorator";
import { Request, Response } from "express";
import {getResponseData, IPageBodyRequest, ResultCode, ResultErrorMsg} from "../../utils/utils";
import FriendsService from "../service/FriendsService";
import TeamService from "../service/TeamService";
import { validateCookieID } from "../../utils/middleware/validateCookieID";
import {setPageOrPageSize} from "../../utils/middleware/setPageOrPageSize";
interface BodyRequest extends Request {
  body: { [key: string]: string | undefined };
}

/**
 * 用户关注接口
 */
@controller
export default class FriendController {

  /**
   * 获取关注的好友
   * @param const {type, page, pageSize }  = req.query
   * @param res
   */
  @get("friend/user")
  @use(setPageOrPageSize)
  @use(validateCookieID)
  async getFriendList(req: IPageBodyRequest, res: Response) {
    let uid = req.session.login;
    let page:number = parseInt(req.query.page );
    let pageSize:number = parseInt(req.query.pageSize);
    const id: number = parseInt(uid);
    try {
      const friends = await FriendsService.getFriendList(id,page, pageSize);
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
  /**
   * 获取关注的团队
   * @param const {type, page, pageSize }  = req.query
   * @param res
   */
  @get("friend/team")
  @use(setPageOrPageSize)
  @use(validateCookieID)
  async getTeamListByUId(req: IPageBodyRequest, res: Response) {
    let uid = req.session.login;
    let page:number = parseInt(req.query.page);
    let pageSize:number = parseInt(req.query.pageSize);
    const id: number = parseInt(uid);
    try {
      const friends = await TeamService.getTeamListByUId(id,page, pageSize);
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

  /**
   * 获取用户的粉丝
   * @param const {type, page, pageSize }  = req.query
   * @param res
   */
  @get("user/fans/:id")
  @use(setPageOrPageSize)
  @use(validateCookieID)
  async getFansList(req: IPageBodyRequest, res: Response) {
    let uid = req.session.login;
    const id: number = parseInt(uid);
    let page:number = parseInt(req.query.page);
    let pageSize:number = parseInt(req.query.pageSize);
    try {
      const friends = await FriendsService.getFansList(id,page,pageSize);
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
