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
import { validateCookieID } from "../../utils/middleware/validateCookieID";
import CommentService from "../service/CommentService";

@controller
class CommentController {
  @get("/comment")
  @use(validateCookieID)
  async queryProjectCommentListByUid(req: Request, res: Response) {
    let uid = req.session.login;
    let comments = await CommentService.queryProjectCommentListByUid(uid);
    res.json(getResponseData(comments));
  }
}
