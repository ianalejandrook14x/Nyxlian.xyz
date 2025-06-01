import fs from 'fs';
import path from 'path';

global.autoProfilePicture = global.autoProfilePicture || {
  intervalId: null,
  currentIndex: 0,
};

const IMAGES_DIR = './Profile/';
const INTERVAL = 10 * 1000; // 10 segundos

async function changeProfilePicture(conn) {
  let files = fs.readdirSync(IMAGES_DIR).filter(file => /\.(jpe?g|png)$/i.test(file));
  if (!files.length) throw 'No hay imágenes en la carpeta';
  let filePath = path.join(IMAGES_DIR, files[global.autoProfilePicture.currentIndex]);
  let img = fs.readFileSync(filePath);
  let userProfile = conn.user.jid || global.conn.user.jid;
  try {
    await conn.updateProfilePicture(userProfile, img);
    console.log(`[AutoProfile] changed image: ${files[global.autoProfilePicture.currentIndex]}`);
  } catch (e) {
    console.error(`[AutoProfile] Error changing photo:`, e);
  }
  global.autoProfilePicture.currentIndex = (global.autoProfilePicture.currentIndex + 1) % files.length;
}

let handler = async (m, { conn }) => {
  if (global.autoProfilePicture.intervalId) {
    return m.reply('*Automatic profile switching is now active.* 🍃');
  }
  m.reply('*Automatic transmission initiated* 🌸');
  await changeProfilePicture(conn);
  global.autoProfilePicture.intervalId = setInterval(() => {
    changeProfilePicture(conn);
  }, INTERVAL);
};

handler.command = /^Start|iniciar$/i;
handler.owner = true;

export default handler;