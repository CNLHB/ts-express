import {Request, Response, NextFunction} from "express";

const catchError = async (err,req: Request, res: Response, next: NextFunction) => {
    console.log("catchError++++++++++++++++++++++++++++")
    try {
        await next()
    } catch (error) {
        res.json({})
    }
}
export default catchError