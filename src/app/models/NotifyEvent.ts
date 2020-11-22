import {AllowNull, Column, Model, Table} from "sequelize-typescript";


@Table({
    tableName: "t_notify_event"
})
export default class NotifyEvent  extends Model<NotifyEvent>{
    @Column({
        primaryKey: true,
        autoIncrement: true,
    })
    id: number;
    /**
     *  通知用户id
     */
    @Column({ field: "u_id" })
    uId: number
    /**
     *  提醒动作 如：捐款/更新/评论/收藏
     */
    @Column
    action: string
    /**
     * 通知状态 false未读  true 已读
     */
    @Column
    status: boolean

    /**
     * 对象ID，如：⽂章ID 用户ID，团队ID；
     */
    @Column({ field: "object_id" })
    objectId: string;
    /**
     * 对象所属类型，如：⼈、⽂章、活动、视频等；
     */
    @Column({ field: "object_type" })
    objectType: string


}