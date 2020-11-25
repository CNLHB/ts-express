import { Column, Model, Table } from "sequelize-typescript";
//
@Table({
  tableName: "t_team",
})
export default class Team extends Model<Team> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column
  name: string;
  @Column
  image: string;
  @Column
  nickname: string;
}
