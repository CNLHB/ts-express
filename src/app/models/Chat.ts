import {
  AllowNull,
  Column,
  HasMany,
  HasOne,
  Model,
  NotNull,
  Table,
} from "sequelize-typescript";
import Message from "./Message";
import Users from "./Users";

@Table({
  tableName: "t_chat",
})
export default class Chat extends Model<Chat> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column({ field: "after_message" })
  afterMessage: string;
  /**
   * 聊天窗口是否删除
   */
  @Column
  status: boolean;
  @Column({ field: "is_read" })
  isRead: boolean;
  @Column({ field: "from_id" })
  fromId: number;
  @Column({ field: "to_id" })
  toId: number;
  @Column
  belong: number;
  @HasMany(() => Message, "cId")
  messages: Message;
  @HasOne(() => Users, "id")
  user: Users;
}
// var include = [{
//     model: Customer,
//     required: true,
//     attributes: ['name'],
// }]
// Order.findAll({include:include, attributes:[[sequelize.fn('SUM', sequelize.col('price')), 'sum']],
// group:'Customer.name', having:['COUNT(?)>?', 'name', 1], raw:true, rollup:true}).then(function(result){
//     console.log(result);
// })
