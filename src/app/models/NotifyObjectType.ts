import {AllowNull, Column, Model, Table} from "sequelize-typescript";


@Table({
    tableName: "t_notify_obj_type"
})
export default class NotifyObjectType  extends Model<NotifyObjectType>{
    @Column({
        primaryKey: true,
        autoIncrement: true,
    })
    id: number;

    @Column
    type: string

    


}