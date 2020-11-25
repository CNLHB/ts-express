import { Sequelize } from "sequelize-typescript";
export const notify_action_type = {
    1: "like",
    2: "conllected",
    3: "commented",
    4: "updated",
    5: "focus",
    6: "project_change",
    7: "project_add",
    8: "team_add",
    9: "system_coupon",
  },
  notify_object_type = ["project", "comment", "user"],
  effect_object_type = ["project", "comment", "user"];

export const statusMap = {
  0: "unread",
  1: "read",
};

export const objTypeMap = {
  1: "project",
  2: "user",
  3: "team",
  4: "system",
  5: "coupon",
};
interface IActionType {
  [key: number]: string;
}
export const ActionMap: Map<number, string> = new Map<number, string>();

const Op = Sequelize.Op;
export const operatorsAliases = {
  $eq: Op.eq,
  $ne: Op.ne,
  $gte: Op.gte,
  $gt: Op.gt,
  $lte: Op.lte,
  $lt: Op.lt,
  $not: Op.not,
  $in: Op.in,
  $notIn: Op.notIn,
  $is: Op.is,
  $like: Op.like,
  $notLike: Op.notLike,
  $iLike: Op.iLike,
  $notILike: Op.notILike,
  $regexp: Op.regexp,
  $notRegexp: Op.notRegexp,
  $iRegexp: Op.iRegexp,
  $notIRegexp: Op.notIRegexp,
  $between: Op.between,
  $notBetween: Op.notBetween,
  $overlap: Op.overlap,
  $contains: Op.contains,
  $contained: Op.contained,
  $adjacent: Op.adjacent,
  $strictLeft: Op.strictLeft,
  $strictRight: Op.strictRight,
  $noExtendRight: Op.noExtendRight,
  $noExtendLeft: Op.noExtendLeft,
  $and: Op.and,
  $or: Op.or,
  $any: Op.any,
  $all: Op.all,
  $values: Op.values,
  $col: Op.col,
};
