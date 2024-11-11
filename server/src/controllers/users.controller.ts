import { Request, Response } from "express";
import { getAllUsers, getCurrentUserBalance } from "../models/db.users.model";

export async function allUsers(req: Request, res: Response): Promise<any> {
    const response = await getAllUsers();
    
    return res.json(response);
   
}

export async function userBalance(req: Request, res: Response): Promise<any>{
    const {id} = req.body

    const response = await getCurrentUserBalance(id)

    return res.json(response)
}