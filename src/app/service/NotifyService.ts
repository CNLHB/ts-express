import { notify_action_type, statusMap, objTypeMap } from "../../config/config";
import { notifyTemp, INotifyObj } from "../../config/Notifytemplate";
import NotifyEvent from "../models/NotifyEvent";
import Project from "../models/Project";
import Users from "../models/Users";
import Team from "../models/Team";
import Coupon from "../models/Coupon";
import { pageResult, IPage, IPageCount } from "../../utils/utils";
import Comment from "../models/Comment";

interface INotifyResult {
  status?: string;
  content?: string;
  updated_at?: Date;
  created_at?: Date;
  type?: string;
}

export default class NotifyService {
  constructor() {}
  // 获取通知
  static async getNotifyByUid(
    uId: number,
    type: string,
    read: string,
    page: number,
    pageSize: number
  ): Promise<IPage<NotifyEvent>> {
    let condition = {};
    if (type == "all" && read == undefined) {
      condition = {
        uId,
      };
    } else if (type == "all" && read == "false") {
      condition = {
        uId,
        status: false,
      };
    } else if (type == "all" && read == "true") {
      condition = {
        uId,
        status: true,
      };
    } else if (type == "system") {
      condition = {
        uId,
        actionId: 9,
      };
    } else if (type == "comment") {
      condition = {
        uId,
        actionId: 3,
      };
    } else {
      condition = {
        uId,
      };
    }
    let notifys = await this.createNotifys(condition, page, pageSize);
    let results: INotifyResult[] = [];

    for (const notify of notifys.rows) {
      let ret: INotifyResult;
      ret = await this.createNotifyResult(
        notify,
        notify_action_type[notify.actionId]
      );

      results.push(ret);
    }

    return pageResult(page, pageSize, notifys.count, results);
  }

  static async createNotifys(
    where: any,
    page: number,
    pageSize
  ): Promise<IPageCount<NotifyEvent>> {
    let notifys: {
      rows: NotifyEvent[];
      count: number;
    } = await NotifyEvent.findAndCountAll({
      where: where,
      attributes: {
        exclude: ["deleted_at"],
      },
      offset: (page - 1) * pageSize,
      limit: pageSize,
    });

    return notifys;
  }

  static async createNotifyResult(
    notify: NotifyEvent,
    action: string
  ): Promise<INotifyResult> {
    let ret: INotifyResult = {};
    let obj;

    if (objTypeMap[notify.objTypeId] == "user") {
      obj = await Users.findOne({
        raw: true,
        where: {
          id: notify.objId,
        },
        attributes: ["id", "userName", "nickname"],
      });
    } else if (objTypeMap[notify.objTypeId] == "project") {
      obj = await Project.findOne({
        raw: true,
        where: {
          id: notify.objId,
        },
        attributes: ["id", "name", "nickname"],
      });
    } else if (objTypeMap[notify.objTypeId] == "team") {
      obj = await Team.findOne({
        raw: true,
        where: {
          id: notify.objId,
        },
        attributes: ["id", "name", "nickname"],
      });
    } else if (objTypeMap[notify.objTypeId] == "system") {
      obj = {};
    }
    let effObj;
    if (notify.effObjType) {
      if (objTypeMap[notify.effObjType] == "user") {
        effObj = await Users.findOne({
          raw: true,
          where: {
            id: notify.effObjId,
          },
          attributes: ["id", "userName", "nickname"],
        });
      } else if (objTypeMap[notify.effObjType] == "project") {
        effObj = await Project.findOne({
          raw: true,
          where: {
            id: notify.effObjId,
          },
          attributes: ["id", "name", "nickname"],
        });
      } else if (objTypeMap[notify.effObjType] == "team") {
        effObj = await Team.findOne({
          raw: true,
          where: {
            id: notify.effObjId,
          },
          attributes: ["id", "name", "nickname"],
        });
      } else if (objTypeMap[notify.effObjType] == "coupon") {
        effObj = await Coupon.findOne({
          raw: true,
          where: {
            id: notify.effObjId,
          },
          attributes: ["id", "name", "nickname"],
        });
      }
    }

    ret.content = await this.createNotifyContent(action, obj, effObj);
    ret.status = statusMap[Number(notify.status)];
    ret.type = notify_action_type[notify.actionId].split("_")[0];
    ret.created_at = notify.created_at;
    ret.updated_at = notify.updated_at;

    return ret;
  }
  /**
   * 根据模板创建通知内容
   * @param actionType 
   * @param obj 
   * @param effectObj 
   */
  static async createNotifyContent(
    actionType: string,
    obj: INotifyObj,
    effectObj?: INotifyObj
  ): Promise<string> {
    let comment: any = {};
    if (actionType == "comment") {
      comment = await Comment.findOne({
        where: {
          projectId: effectObj.id,
          fromId: obj.id,
        },
      });
      console.log(comment);
    }
    return notifyTemp(actionType, obj, effectObj, comment ? comment : {});
  }
  //创建通知
  static async createNotifyByUId(uId: number): Promise<void> {
    await NotifyEvent.create({
      uId: 1,
      actionId: 5,
      status: false,
      objId: 2,
      objTypeId: 2,
    });
  }
}
