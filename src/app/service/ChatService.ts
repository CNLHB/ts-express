import Seqeuelize from "sequelize";
import Chat from "../models/Chat";
export  default class ChatService{
    constructor() {
    }
    // 查看用户与另一个用户的聊天信息   belong = fromId
    static async getChatListByFromIdAndToId(fromId: number, toId: number): Promise<Chat[]> {

        try {
            let messages = await Chat.findAll({
                where:{
                    belong: fromId,
                    status: false,
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
    static async createChatByFromIdAndToId(fromId: number, toId: number):Promise<Chat>{
        let ret: Chat;
        try {
            ret = await Chat.findOne({
                where:{
                    belong: fromId,
                    status: false,
                    $or: [
                        { fromId: fromId, toId:toId },
                        { fromId: toId, toId:fromId }
                    ]
                }
            })
            let retToid: Chat = await Chat.findOne({
                where:{
                    belong: toId,
                    status: false,
                    $or: [
                        { fromId: fromId, toId:toId },
                        { fromId: toId, toId:fromId }
                    ]
                }
            })
            let chatRet: Chat;
            if (ret==null){
                chatRet =  await  Chat.create({
                    fromId,toId,belong:fromId,status:false
                })
            }
            if (retToid == null){
                await  Chat.create({
                    fromId,toId,belong: toId,status:false
                })
            }
            return chatRet

        }catch (err) {
            console.log(err)
        return new Chat()
    }
}

    static async queryChatListById(uid: number) {
        let chatList = await Chat.findAll({
            where:{
                belong: uid,
                status: false,
                $or: [
                    { fromId: uid },
                    { toId:uid }
                ]
            },
            attributes: {
                exclude:["deleted_at"]
            }
        })

        return chatList;
    }
}