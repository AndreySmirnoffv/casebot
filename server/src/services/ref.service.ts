import { UserModel } from '../models/user.model';

export async function RefService(chatId: string): Promise<any>{
    return await new UserModel().getRefByChatId(chatId)
}
