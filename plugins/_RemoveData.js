import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.join(__dirname, '../Cache');

let handler = async (m, { args }) => {
    if (!args[0] || isNaN(args[0])) {
        return m.reply('*Indica el número.* ⚙');
    }
    const index = parseInt(args[0], 10) - 1;
    fs.readdir(DATA_DIR, (err, files) => {
        if (err) return m.reply('*Error al leer la carpeta de datos.*');
        if (index < 0 || index >= files.length) {
            return m.reply('*El número no es valido* ⚙');
        }
        const fileToRemove = path.join(DATA_DIR, files[index]);
        fs.unlink(fileToRemove, (err) => {
            if (err) return m.reply('*No se pudo eliminar el contenido.*');
            m.reply(`*Contenido eliminado. 📁*`);
        });
    });
};

handler.command = ['remove', 'remover'];
handler.help = ['remove <número>'];
handler.tags = ['tools'];
export default handler;