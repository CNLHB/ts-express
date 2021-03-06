export const notify_action_type:ImapType = {
    1: "like",
    2: "conllect",
    3: "comment",
    4: "update",
    5: "focus",
    6: "project_change",
    7: "project_add",
    8: "team_add",
    9: "system_coupon",
  },
  notify_object_type = ["project", "comment", "user"],
  effect_object_type = ["project", "comment", "user"];

export const statusMap:ImapType = {
  0: "unread",
  1: "read",
};

export const objTypeMap:ImapType = {
  1: "project",
  2: "user",
  3: "team",
  4: "system",
  5: "coupon",
};
interface ImapType {
  [key: number]: string;
}
export const ActionMap: Map<number, string> = new Map<number, string>();
const baicAttr = ["id", "nickname", "image"];
export const friendsUserAttr = ["userName", ...baicAttr];
export const friendsTeamAttr = ["name", ...baicAttr];
export const CoupAttr = ["name","id", "nickname"];
export const projectAttr = ["name","id", "nickname","u_id"];
