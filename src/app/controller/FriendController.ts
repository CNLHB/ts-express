import { controller, get, post } from "../../utils/decorator";
import { Request, Response } from "express";
import { getResponseData } from "../../utils/utils";
import Friends from "../models/Friends";
import FriendsService from "../service/FriendsService";
interface BodyRequest extends Request {
  body: { [key: string]: string | undefined };
}

@controller
export default class UserController {
  @get("user/friend/:id")
  async getFriendList(req: BodyRequest, res: Response) {
    const id: number = parseInt(req.params.id);
    try {
      const friends = await FriendsService.getFriendList(id);
      res.json(getResponseData(friends));
    } catch (error) {
      res.json(getResponseData("", "request error"));
    }
  }
  @get("user/fans/:id")
  async getFansList(req: BodyRequest, res: Response) {
    const id: number = parseInt(req.params.id);

    try {
      const friends = await FriendsService.getFansList(id);
      res.json(getResponseData(friends));
    } catch (error) {
      res.json(getResponseData("", "request error"));
    }
  }
}
