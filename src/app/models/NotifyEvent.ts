import { AllowNull, Column, Model, Table } from "sequelize-typescript";

@Table({
  tableName: "t_notify_event",
})
export default class NotifyEvent extends Model<NotifyEvent> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;
  /**
   *  被通知用户id
   */
  @Column({ field: "u_id" })
  uId: number;
  /**
   *  提醒动作 如：点赞/更新/评论/收藏
   */
  @Column({ field: "action_id" })
  actionId: number;
  /**
   * 通知状态 false未读  true 已读
   */
  @Column
  status: boolean;

  /**
   * 对象ID，如：⽂章ID 用户ID，团队ID；
   */
  @Column({ field: "object_id" })
  objId: number;
  /**
   * 对象所属类型，如：⼈、⽂章、活动、视频等；
   */
  @Column({ field: "object_type_id" })
  objTypeId: number;

  /**
   * 作用对象ID，如：⽂章ID 用户ID，团队ID；
   */
  @Column({ field: "effect_object_id" })
  effObjId: number;
  /**
   * 作用对象所属类型，如：⼈、⽂章、活动、视频等；
   */
  @Column({ field: "effect_object_type_id" })
  effObjType: number;

  @Column
  created_at: Date;
  @Column
  updated_at: Date;
  content: string;
}
