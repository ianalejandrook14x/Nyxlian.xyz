let handler = async (m, { conn }) => {
  let socket = await global.botConfig.name;
  let banner = global.botConfig.banner;
  let txt = `*Hola - ${socket}*

  *.list*
  *.get <num>*
  *.start*
  *.stop*
  *.remove*
  *.save*
  
> *Additional Commands*
  
  *.cf <cara/cruz> <monto>*
  *.bal*
  *.deposit <monto> - all*
  *.white <monto> - all*
  *.w - work*
  *.ping*
  *.sentame <name>*
  *.setbanner <img>*
  *.perfil*
  *.baltop*
  *.birth*
  *.rt <red/black> <monto>*
  *.claim*
  
> *Downloaders*

  *.facebook <link>*
  *.tiktok <link>*`.trim();
  
m.react('✅')
let perfil = await conn.profilePictureUrl(m.sender, 'image').catch(_ => 'https://qu.ax/QGAVS.jpg')

  //await conn.sendFile(m.chat, imagen1, 'menu.jpg', txt, m);
  //await conn.sendMini(m.chat, botname, textbot, , img, img, rcanal, estilo)
  await conn.sendMessage(m.chat, { text: txt, contextInfo: { externalAdReply: { title: socket, body: info, thumbnailUrl: banner, mediaType: 1, showAdAttribution: true, renderLargerThumbnail: true }}} , { quoted: m })
};

handler.command = ['menu', 'allmenu', 'help', 'ayuda'];

export default handler;
