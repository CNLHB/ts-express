import {AllowNull, Column, Model, Table} from "sequelize-typescript";


@Table({
    tableName: "t_notify_announce_user"
})
export default class NotifyAnnounceUser  extends Model<NotifyAnnounceUser>{
    @Column({
        primaryKey: true,
        autoIncrement: true,
    })
    id: number;
    /**
     *  通知类型
     */
    @Column({ field: "announce_id" })
    announceID: number

    @Column({ field: "u_id" })
    uId: number
    /**
     *  公告是否已读 状态，已读|未读；
     */
    @AllowNull
    @Column
    status: boolean


}