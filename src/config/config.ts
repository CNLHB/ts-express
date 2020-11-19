// import Sequelizen{Sequelize} from 'sequelize'
let sequelize; 
console.log(__dirname);

(async () => {
    const Sequelize = require("sequelize");
    // 建立连接
    sequelize = new Sequelize("second_stage", "root", "123456", {
        host: "47.101.196.193",
        dialect: "mysql", //定义数据库类型
        operatorsAliases: false
    });
    console.log("建立链接");

    // 定义模型
    const Fruit = sequelize.define("Fruit", {
        name: { type: Sequelize.STRING(20), allowNull: false },
        price: { type: Sequelize.FLOAT, allowNull: false },
        stock: { type: Sequelize.INTEGER, defaultValue: 0 }
    });
    // 同步数据库，force: true则会删除已存在表 Fruit.sync({force: true})
    let ret = await Fruit.sync()
    console.log('sync',ret)
    ret = await Fruit.create({
        name: "香蕉",
        price: 3.5
    })
    console.log('create',ret)
    ret = await Fruit.findAll()
    await Fruit.update(
        { price: 4 },
        { where: { name:'香蕉'} }
    )
    console.log('findAll',JSON.stringify(ret))
    const Op = Sequelize.Op;
    ret = await Fruit.findAll({
        // where: { price: { [Op.lt]:4 }, stock: { [Op.gte]: 100 } }
        where: { price: { [Op.lt]: 4, [Op.gt]: 2 } }
    })
        console.log('findAll')
    })()
    export default sequelize