import { Request, Response } from 'express';
import { RefService } from '../services/ref.service';
import logger from '../../../assets/logger/logger';

export async function getRef (req: Request, res: Response) {
    const { chatId } = req.body;

    try {
        const ref = await RefService(chatId);
        if (!ref) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({ ref });
    } catch (error) {
        logger.error("get ref error: ", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};
