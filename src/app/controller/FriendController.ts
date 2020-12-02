import {controller, get, post, use} from "../../utils/decorator";
import { Request, Response } from "express";
import {getResponseData, IPageBodyRequest, ResultCode, ResultErrorMsg} from "../../utils/utils";
import FriendsService from "../service/FriendsService";
import TeamService from "../service/TeamService";
import { validateCookieID } from "../../utils/middleware/validateCookieID";
import {setPageOrPageSize} from "../../utils/middleware/setPageOrPageSize";

/**
 * 用户关注接口
 */
@controller
export default class FriendController {

  /**
   * 获取关注的好友
   * @param const {type, page, pageSize }  = req.query
   * @param req
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
          ResultErrorMsg.BAD_REQUEST,
          ResultCode.BAD_REQUEST_CODE
        )
      );
    }
  }
  /**
   * 获取关注的团队
   * @param const {type, page, pageSize }  = req.query
   * @param req
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
          ResultErrorMsg.BAD_REQUEST,
          ResultCode.BAD_REQUEST_CODE
        )
      );
    }
  }

  /**
   * 获取用户的粉丝
   * @param const {type, page, pageSize }  = req.query
   * @param req
   * @param res
   */
  @get("user/fans")
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
          ResultErrorMsg.BAD_REQUEST,
          ResultCode.BAD_REQUEST_CODE
        )
      );
    }
  }

  /**
   * 取消/增加好友或团队
   * @param req  {fromId toId  type} = req.body
   * @param res
   */
  @post("friend")
  @use(validateCookieID)
  async createFriend(req: Request, res: Response){
    let uid = req.session.login;
    let fromId = parseInt(req.body.fromId)
    let toId = parseInt(req.body.toId)
    let type = parseInt(req.body.type)
    const id: number = parseInt(uid);
    try {
      let msg = await FriendsService.activeFriendOrTeam(id,fromId,toId,type)
      res.json(getResponseData("",msg));
    } catch (error) {
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
   * 搜索好友/团队
   * @param {type, q, page, pageSize} = req.query
   * @param req
   * @param res
   */
  @get("friend/search")
  @use(setPageOrPageSize)
  async searchFriendUserOrTeam(req: IPageBodyRequest, res: Response){
    let type = req.query.type
    let q = req.query.q
    let page:number = parseInt(req.query.page);
    let pageSize:number = parseInt(req.query.pageSize);
    try {
      let ret = await FriendsService.searchFriendUserOrTeam(type, q ,page,pageSize)
      res.json(getResponseData(ret));
    } catch (error) {
      res.json(
          getResponseData(
              "",
              ResultErrorMsg.BAD_REQUEST,
              ResultCode.BAD_REQUEST_CODE
          )
      );
    }
  }


}
