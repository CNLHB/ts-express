import {Column, Model, Table} from "sequelize-typescript";


@Table({
    tableName: "t_message"
})
export default class Message  extends Model<Message>{

    @Column({
        primaryKey: true,
        autoIncrement: true,
    })
    id: number;

    @Column
    message: string
    /**
     * 消息是否已读
     */
    @Column
    status: boolean
    @Column({ field: "from_id" })
    fromId: number;
    @Column({ field: "to_id" })
    toId: number
    @Column
    belong: number
    @Column({ field: "c_id" })
    cId: number

}