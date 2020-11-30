import {controller, get, post, use} from "../../utils/decorator";
import {Response } from "express";
import {
    getResponseData, IPageBodyRequest,
} from "../../utils/utils";
import {validateCookieID} from "../../utils/middleware/validateCookieID";
import CommentService from "../service/CommentService";
import {setPageOrPageSize} from "../../utils/middleware/setPageOrPageSize";

@controller
class CommentController {
    /**
     * 获取请求登录用户发表的评论
     * @param req.session.login
     */
    @get("/comment")
    @use(setPageOrPageSize)
    @use(validateCookieID)
    async queryProjectCommentListByUid(req: IPageBodyRequest, res: Response) {
        let uid = req.session.login;
        const {type,page, pageSize} = req.query
        let comments = await CommentService.queryProjectCommentListByUid(uid,type, parseInt(page),
            parseInt(pageSize));
        res.json(getResponseData(comments));
    }
}
