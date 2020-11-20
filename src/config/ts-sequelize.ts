import { Sequelize } from 'sequelize-typescript'
import {operatorsAliases} from './config'
import path from 'path'
export const sequelize = new Sequelize(
    {
        host: "47.101.196.193",
        database: 'second_stage',
        dialect: 'mysql',
        username: 'root',
        password: '123456',
        operatorsAliases: operatorsAliases,
        define:{
            timestamps: true,
            paranoid: true,//假删除，
            underscored: true,//下划线
            charset: 'utf8',
            freezeTableName: true//固定表名为单数  默认表名是xxxs
        }
}
)
    // 'mysql://root:123456@147.101.196.193:3306/ts_test') 
sequelize.addModels([path.resolve(__dirname, `../app/models/`)]);

 (async function(){
     try {
            await sequelize.sync()
            
     } catch (error) {
         console.log(error);
         
     }

})()

