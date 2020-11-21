import {AllowNull, Column, Model, Table} from "sequelize-typescript";


@Table({
    tableName: "t_notify_announce"
})
export default class NotifyAnnounce  extends Model<NotifyAnnounce>{
    @Column({
        primaryKey: true,
        autoIncrement: true,
    })
    id: number;
    /**
     *  通知类型
     */
    @Column({ field: "sender_id" })
    senderID: string
    /**
     *  公告是否删除
     */
    @AllowNull
    @Column
    status: boolean
    @Column
    title: string;
    @Column
    content: number


}