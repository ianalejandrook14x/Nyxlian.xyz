import fs from 'fs';
import path from 'path';

const CACHE_DIR = './Cache/';

const handler = async (m, { conn }) => {
    try {
        if (!fs.existsSync(CACHE_DIR)) {
            await conn.reply(m.chat, 'No hay archivos guardados.', m);
            return;
        }

        const files = fs.readdirSync(CACHE_DIR);
        if (files.length === 0) {
            await conn.reply(m.chat, '*No hay archivos guardados ⚙*', m);
            return;
        }

        let message = '*Archivos guardados 📁*\n*🍃 = Texto*\n*🌸 = Imagen*\n*🍂 = Video*\n*_________________*\n\n';
        files.forEach((file, idx) => {
            const ext = path.extname(file).toLowerCase();
            let tipo = '🍃';
            if (['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(ext)) tipo = '🌸';
            else if (['.mp4', '.mkv', '.webm', '.avi'].includes(ext)) tipo = '🍂';
            message += `${idx + 1}. ${tipo} ${file}\n`;
        });

        await conn.reply(m.chat, message, m);
    } catch (e) {
        await conn.reply(m.chat, '*Ocurrió un error.*', m);
    }
};

handler.command = ['list'];
export default handler;