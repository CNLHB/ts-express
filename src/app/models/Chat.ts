import {
  Column,
  HasMany,
  HasOne,
  Model,
  Table,
} from "sequelize-typescript";
import Message from "./Message";
import Users from "./Users";

/**
 * 聊天窗口表
 */
@Table({
  tableName: "t_chat",
})
export default class Chat extends Model<Chat> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;
  /**
   * 最后一次发送的消息
   * afterMessage： string
   */
  @Column({ field: "after_message" })
  afterMessage: string;
  /**
   * 聊天窗口是否删除  true已删除  false未删除
   */
  @Column
  status: boolean;
  /**
   * 窗口是否有未读的消息  ture有未读消息。false无未读消息
   */
  @Column({ field: "is_read" })
  isRead: boolean;
  /**
   * 主动建立聊天窗口的用户id
   */
  @Column({ field: "from_id" })
  fromId: number;
  /**
   * 接受消息的用户id
   */
  @Column({ field: "to_id" })
  toId: number;
  /**
   * ；聊天窗口所属。。  对应fromID or toID
   */
  @Column
  belong: number;
  /**
   * 聊天窗口对应的聊天信息。
   */
  @HasMany(() => Message, "cId")
  messages: Message;

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
