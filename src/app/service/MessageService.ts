import Sequelize from "sequelize";
const Op: Sequelize.Operators = Sequelize.Op;
import Message from "../models/Message";
import Chat from "../models/Chat";
import Users from "../models/Users";
import {IBaseIncludeOptions} from "sequelize-typescript/lib/interfaces/IBaseIncludeOptions";
import {IFindOptions} from "sequelize-typescript";
export  enum MESSAGE_TYPE  {
    UN_READ_TYPE = 0,
    ALL= 1
}
export default class MessageService {
    constructor() {
    }

    // 查看用户与另一个用户的聊天信息   belong = fromId
    static async getMessageByFromIdAndToId(fromId: number, toId: number): Promise<Message[]> {
        try {
            let messages = await Message.findAll({
                where: {
                    belong: fromId,
                    [Op.or]: [
                        {fromId: fromId, toId: toId},
                        {fromId: toId, toId: fromId}
                    ]
                },
                attributes: {
                    exclude: ["deleted_at"]
                }
            })
            return messages
        } catch (err) {
            console.log(err);
        }
        return [];
    }
    static async  readMessage(id:number):Promise<boolean>{
        let [count] = await Message.update({status: true},{
            where:{
                id
            }
        })
        if (count==0){
            return false
        }
        return true
    }

    static async  getMessageListByUId(id:number,type: MESSAGE_TYPE):Promise<Chat[]>{
        let chatList: Chat[];
        let find;
        if (type == MESSAGE_TYPE.ALL){
            find = {}
        }else if (type == MESSAGE_TYPE.UN_READ_TYPE){
            find = {
                status:  false
            }
        }
        try {
            chatList = await Chat.findAll({
                attributes:{
                    exclude:["deleted_at","status","created_at"]
                },
                where:{
                    belong:id,
                    status:false
                },
                include:[{
                    model:Message,
                    attributes: {
                        exclude:["deleted_at","status","updated_at"]
                    },
                    where:find
                },{
                    model:Users,
                    attributes: ["id","image","nickname"]
                }
                ],
            })


            return chatList
        } catch (err) {
            console.log(err);
        }
        return [];
    }
    static async sendMessageToUser(cId: number, fromId: number, toId: number, message: string) {


        try {
            /**
             * 接受用户的chat ID
             */
            const chat: Chat = await Chat.findOne({
                raw: true,
                where: {
                    belong: toId,
                    $or:[
                        {
                            fromId: fromId, toId: toId
                        },
                        {
                            fromId: toId, toId: fromId
                        }
                    ]
                }
            })
            await Message.create({
                fromId, toId, message, cId, belong: fromId, status: false
            })
            await Chat.update({
                afterMessage: message
            }, {
                where: {
                    belong: toId,
                    $or:[
                        {
                            fromId: fromId, toId: toId
                        },
                        {
                            fromId: toId, toId: fromId
                        }
                    ]
                }
            })

            await Message.create({
                fromId: fromId, toId: toId, message, cId: chat.id, belong: toId, status: false
            })
            await Chat.update({
                afterMessage: message
            }, {
                where: {
                    id:cId
                }
            })
        }catch (e) {
            console.log(e)
        }

    }
}