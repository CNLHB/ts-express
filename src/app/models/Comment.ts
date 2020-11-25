import {
  Column,
  Model,
  Table,
  HasOne,
    BelongsToMany,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import Users from "./Users";
import Project from "./Project";

@Table({
  tableName: "t_comment",
})
export default class Comment extends Model<Comment> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;
  /**
   * 是否已读
   */
  @Column
  status: boolean;
  @ForeignKey(() => Project)
  @Column({ field: "project_id" })
  projectId: number;
  @ForeignKey(() => Users)
  @Column({ field: "from_id" })
  fromId: number;
  @ForeignKey(() => Users)
  @Column({ field: "to_id" })
  toId: number;
  @Column
  content: string;
  @BelongsTo(() => Users, { as:"fromUser",foreignKey: "fromId" })
  fromUser
  @BelongsTo(() => Users, { as:"owner",foreignKey: "toId" })
  owner;
  @BelongsTo(() => Project)
  project
}
