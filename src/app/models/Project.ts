import { Column, Model, Table } from "sequelize-typescript";

@Table({
  tableName: "t_project",
})
export default class Project extends Model<Project> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;
  @Column({ field: "u_id" })
  uId: number;
  @Column
  name: string;
  @Column
  nickname: string;
}
