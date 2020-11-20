import {Column, Model, Table} from "sequelize-typescript";


@Table({
    tableName: "t_chat"
})
export default class Chat  extends Model<Chat>{
    @Column({
        primaryKey: true,
        autoIncrement: true,
    })
    id: number;

    @Column({ field: "after_message" })
    afterMessage: string
    /**
     * 聊天窗口是否删除
     */
    @Column
    status: boolean

    @Column({ field: "from_id" })
    fromId: number;
    @Column({ field: "to_id" })
    toId: number
    @Column
    belong: number

}