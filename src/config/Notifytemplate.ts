import Users from "../app/models/Users";
export interface INotifyObj {
  name?: string;
  nickname: string;
  userName: string;
}
interface NotifyTempFn {
  (actionType: string, obj: any, effectObj?: any): string;
}
export const notifyTemp: NotifyTempFn = function (
  actionType: string,
  obj: INotifyObj,
  effectObj?: INotifyObj
) {
  let content: string = "";

  switch (actionType) {
    case "focus":
      content = `<a href='https://lceda.cn/${obj.userName}' target='_blank' style='text-decoration: none; color:#58f;'>${obj.nickname}</a> 关注了你`;
      break;
    case "project_change":
      content = `你所在的工程 <a href='https://lceda.cn/lceda-editor-training/${
        obj.name
      }' \
target='_blank' style='text-decoration: none; color:#58f;'>${obj.nickname}</a>\
的所有者由 <a href='https://lceda.cn/#meTODO' target='_blank' style='text-decoration: none; color:#58f;'>\
爱华</a> 更变为 <a href='https://lceda.cn/${
        effectObj.userName ? effectObj.userName : effectObj.name
      }' \
target='_blank' style='text-decoration: none; color:#58f;'>\
${effectObj.nickname}</a>`;
      break;
    case "project_add":
      content = `你的所在的团队 <a href='https://lceda.cn/lceda-editor-training/${obj.name}' \
target='_blank' style='text-decoration: none; color:#58f;'>${obj.nickname}</a>\
有新的成员 <a href='https://lceda.cn/${effectObj.userName}' target='_blank' style='text-decoration: none; color:#58f;'>\
${effectObj.nickname}</a> 加入`;
      break;
    case "system_coupon":
      content = `系统给你发放了一张优惠卷 <a href='https://lceda.cn/account/user/coupon/use' target='_blank' style='text-decoration: none; color:#58f;'>优惠卷${effectObj.nickname}</a>`;
      break;
  }
  return content;
};
