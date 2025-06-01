import fs from 'fs';
import path from 'path';

const CACHE_DIR = path.join(process.cwd(), 'Cache');

async function handler(m, { args, conn }) {
    // Verifica si la carpeta existe
    if (!fs.existsSync(CACHE_DIR)) {
        return m.reply('La carpeta Cache no existe.');
    }

    // Lee los archivos y filtra solo archivos (no carpetas)
    let files = fs.readdirSync(CACHE_DIR)
        .filter(file => fs.statSync(path.join(CACHE_DIR, file)).isFile());

    if (!files.length) return m.reply('*No hay archivos en la carpeta Cache.*');

    // Si no hay argumento, muestra la lista
    if (!args[0]) {
        let list = files.map((file, i) => `${i + 1}. ${file}`).join('\n');
        return m.reply(`*Archivos en Cache:*\n${list}\n\n*Usa ".get <número>" para obtener un archivo.*`);
    }

    // Obtiene el archivo por número
    const idx = parseInt(args[0], 10) - 1;
    if (isNaN(idx) || idx < 0 || idx >= files.length) {
        return m.reply('*Número inválido*');
    }
    const filePath = path.join(CACHE_DIR, files[idx]);
    const fileBuffer = fs.readFileSync(filePath);

    // Detecta el tipo de archivo
    const ext = path.extname(files[idx]).toLowerCase();
    if (['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(ext)) {
        return conn.sendMessage(m.chat, { image: fileBuffer, caption: files[idx] }, { quoted: m });
    } else if (['.mp4', '.mov', '.avi', '.mkv'].includes(ext)) {
        return conn.sendMessage(m.chat, { video: fileBuffer, caption: files[idx] }, { quoted: m });
    } else if (['.mp3', '.wav', '.ogg'].includes(ext)) {
        return conn.sendMessage(m.chat, { audio: fileBuffer, mimetype: 'audio/mp3' }, { quoted: m });
    } else if (ext === '.txt') {
        const textContent = fileBuffer.toString('utf-8');
        return m.reply(`*CONTENIDO DEL TEXTO* 📁\n\n${textContent}\n`);
    } else {
        return conn.sendMessage(m.chat, { document: fileBuffer, fileName: files[idx] }, { quoted: m });
    }
}

handler.command = ['get', 'obtener'];
export default handler;