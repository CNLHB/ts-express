import { Sequelize } from 'sequelize-typescript'
import path from 'path'
export const sequelize: Sequelize = new Sequelize(
    {
        host: "47.101.196.193",
        database: 'second_stage',
        dialect: 'mysql',
        username: 'root',
        password: '123456',
        define:{
            timestamps: true,
            paranoid: true,//假删除，
            underscored: true,//下划线
            charset: 'utf8',
            freezeTableName: true//固定表名为单数  默认表名是xxxs
        }
}
)
sequelize.addModels([path.resolve(__dirname, `../app/models/`)]);

 (async function(){
     try {
            await sequelize.sync()
            
     } catch (error) {
         console.log(error);
         
     }

})()

