import fs from 'fs';
import path from 'path';

const cacheDir = path.join(process.cwd(), 'Cache');
if (!fs.existsSync(cacheDir)) {
    fs.mkdirSync(cacheDir, { recursive: true });
}

function getNextFileName(type, ext) {
    const files = fs.readdirSync(cacheDir).filter(f => f.startsWith(type));
    let idx = 1;
    while (fs.existsSync(path.join(cacheDir, `${type}_${idx}.${ext}`))) {
        idx++;
    }
    return `${type}_${idx}.${ext}`;
}

// Helper to enforce 25 file limit
function enforceLimit() {
    const files = fs.readdirSync(cacheDir)
        .map(f => ({ name: f, time: fs.statSync(path.join(cacheDir, f)).mtime.getTime() }))
        .sort((a, b) => a.time - b.time);
    while (files.length >= 25) {
        fs.unlinkSync(path.join(cacheDir, files[0].name));
        files.shift();
    }
}

const handler = async (m, { quoted, args }) => {
    enforceLimit();

    // Si hay texto directo en el comando (por ejemplo: .save Hola)
    if (args && args.length > 0) {
        const text = args.join(' ');
        const fileName = getNextFileName('Texto', 'txt');
        fs.writeFileSync(path.join(cacheDir, fileName), text, 'utf8');
        return m.reply(`*Mensaje guardado 🍃*`);
    }

    // Buscar mensaje citado o multimedia
    const q = quoted || m.quoted || m.message?.extendedTextMessage?.contextInfo?.quotedMessage || m.message?.imageMessage || m.message?.videoMessage;

    if (q) {
        // Guardar imagen
        if ((q.mimetype && q.mimetype.startsWith('image/')) || q.imageMessage) {
            let buffer, ext;
            if (q.download) {
                buffer = await q.download();
                ext = q.mimetype ? q.mimetype.split('/')[1] : 'jpg';
            } else if (q.imageMessage) {
                buffer = await m.download('image');
                ext = 'jpg';
            }
            const fileName = getNextFileName('Imagen', ext || 'jpg');
            fs.writeFileSync(path.join(cacheDir, fileName), buffer);
            return m.reply(`*Imagen guardada 🍂*`);
        }

        // Guardar video
        if ((q.mimetype && q.mimetype.startsWith('video/')) || q.videoMessage) {
            let buffer, ext;
            if (q.download) {
                buffer = await q.download();
                ext = q.mimetype ? q.mimetype.split('/')[1] : 'mp4';
            } else if (q.videoMessage) {
                buffer = await m.download('video');
                ext = 'mp4';
            }
            const fileName = getNextFileName('Video', ext || 'mp4');
            fs.writeFileSync(path.join(cacheDir, fileName), buffer);
            return m.reply(`*Video guardado 🍁*`);
        }

        // Guardar mensaje de texto citado
        if (q.text || q.conversation || q.extendedTextMessage?.text) {
            const text = q.text || q.conversation || q.extendedTextMessage?.text;
            const fileName = getNextFileName('Texto', 'txt');
            fs.writeFileSync(path.join(cacheDir, fileName), text, 'utf8');
            return m.reply(`*Mensaje guardado 🍃*`);
        }
    }

    m.reply('*Responde a un texto, imagen o video ⚙*');
};

handler.command = ['save', 'guardar'];
export default handler;