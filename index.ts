import { Telegraf, Context } from 'telegraf';
import dotenv from 'dotenv';
import logger from './assets/logger/logger';
import { addUser, checkUserExists } from './assets/scripts/insertUser';
import { webAppKeyboard } from './assets/keyboard/keyboard';

dotenv.config({ path: './assets/modules/.env' });

const bot = new Telegraf(String(process.env.TOKEN));

bot.command('start', async (ctx: Context) => {
    const ref = `${process.env.BOT_LINK}?start=${ctx.chat?.id}`;
    logger.info(`Referral link: ${ref}`)

    const userId = ctx.from?.id as number;
    const chatId = ctx.chat?.id as number;
    const firstName = ctx.from?.first_name as string;
    const lastName = ctx.from?.last_name as string;
    const username = ctx.from?.username as string;
    const origin = ctx.text
        ? Number(ctx.text.replace(/^\/start\s*/, '') || null)
        : null;

    checkUserExists(userId, async (error, exists) => {
        if (error) {
            logger.error('Error checking user');
            return;
        }

        if (!exists) {
            await addUser(userId, chatId, firstName, lastName, username, ref, origin, 0, 0, 0, (error) => {
                if (error) {
                    logger.error('Error adding user.');
                    return;
                }
                logger.info('User added to the database');
            });
        }

        await bot.telegram.sendMessage(Number(ctx.chat?.id), `Привет ${ctx.from?.username}`, webAppKeyboard);
        logger.info('User already exists in the database');
    });
});

bot.launch().catch(async (error) => {
    logger.error('Launch error:', error);
});
