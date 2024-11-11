import TelegramBot from "node-telegram-bot-api";
import dotenv from 'dotenv';
import { addUser, checkUserExists } from './assets/scripts/insertUser.js';
import { webAppKeyboard } from './assets/keyboard/keyboard.js';
import axios from "axios";

dotenv.config({ path: './assets/modules/.env' });

const bot = new TelegramBot(process.env.TOKEN, { polling: true });

bot.on('message', async (msg) => {
    if (msg.text.includes("/start")) {
        const ref = `${process.env.BOT_LINK}?start=${msg.chat?.id}`;
        console.info(`Referral link: ${ref}`);
        console.log(msg)
        const userId = msg.from?.id;
        const chatId = msg.chat?.id;
        const firstName = msg.from?.first_name;
        const lastName = msg.from?.last_name;
        const username = msg.from?.username;
        const origin = msg.text.replace("/start ", "") || "";

        checkUserExists(userId, async (error, exists) => {
            if (error) {
                return console.error('Error checking user');
            }

            if (!exists) {
                await addUser(userId, chatId, firstName, lastName, username, ref, origin, 0, 0, 0, (error) => {
                    if (error) {
                        return console.error('Error adding user.');
                    }
                    console.info('User added to the database');
                });
            }

            await bot.sendMessage(msg.chat?.id, `Привет ${msg.from?.username}`, webAppKeyboard);
            console.info('User already exists in the database');
        });
    }
});

bot.on('polling_error', console.log);
