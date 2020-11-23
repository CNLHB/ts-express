import {AllowNull, Column, HasMany, HasOne, Model, NotNull, Table} from "sequelize-typescript";
import Message from "./Message";
import Users from "./Users";


@Table({
    tableName: "t_action_type"
})
export default class ActionType  extends Model<ActionType>{
    @Column({
        primaryKey: true,
        autoIncrement: true,
    })
    id: number;

    @Column
    type: string


}
