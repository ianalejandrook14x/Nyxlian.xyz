// Detiene el proceso de cambio de perfil

let handler = async (m) => {
  if (global.autoProfilePicture && global.autoProfilePicture.intervalId) {
    clearInterval(global.autoProfilePicture.intervalId);
    global.autoProfilePicture.intervalId = null;
    m.reply('*Automatic profile switching stopped* 🌸');
  } else {
    m.reply('*Profile switching was not active* 🍃');
  }
};

handler.command = /^stop|parar$/i;
handler.owner = true;

export default handler;