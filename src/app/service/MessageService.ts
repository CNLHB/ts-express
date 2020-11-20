import Friends from "../models/Friends";
import Users from "../models/Users";
import Seqeuelize from "sequelize";
import Message from "../models/Message";
const Op = Seqeuelize.Op;
export  default class MessageService{
    constructor() {
    }
    // 查看用户与另一个用户的聊天信息   belong = fromId
    static async getMessageByFromIdAndToId(fromId: number, toId: number): Promise<Message[]> {

        try {
            let messages = await Message.findAll({
                where:{
                    belong: fromId,
                    $or: [
                        { fromId: fromId, toId:toId },
                        { fromId: toId, toId:fromId }
                    ]
                },
                attributes: {
                    exclude:["deleted_at"]
                }
            })
            return messages
        } catch (err) {
            console.log(err);
        }
        return [];
    }
    static async getFansList(toId: number): Promise<Users[]> {
        const results: Friends[] = await Friends.findAll({
            where: {
                toId,
            },
            raw: true,
        });
        const ids: number[] = results.map((item: Friends) => {
            return item.fromId;
        });
        let users = await Users.findAll({
            where: {
                id: { [Op.in]: ids },
            },
            attributes: ["id", "userName", "image"],
        });
        for (let item of users) {
            const ret: Friends = await Friends.findOne({
                raw: true,
                where: {
                    fromId: toId,
                    toId: item.id,
                },
            });
            if(ret == null){
                item.isActive = 1;
                console.log(1111);
            }else{
                item.isActive = 2;
            }
        }
        return users;
    }
}