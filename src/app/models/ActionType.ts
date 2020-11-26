import {AllowNull, Column, HasMany, HasOne, Model, NotNull, Table} from "sequelize-typescript";
import Message from "./Message";
import Users from "./Users";

/**
 * 通知对应的动作表   action  点赞、收藏、项目转移、项目新成员加入
 */
@Table({
    tableName: "t_action_type"
})
export default class ActionType  extends Model<ActionType>{
    /**
     * 动作id
     */
    @Column({
        primaryKey: true,
        autoIncrement: true,
    })
    id: number;
    /**
     * 动作类型
     */
    @Column
    type: string


}
