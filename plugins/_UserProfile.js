import PhoneNumber from 'awesome-phonenumber'
import fetch from 'node-fetch'
var handler = async (m, { conn, isPrems }) => {
let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
let pp = await conn.profilePictureUrl(who, 'image').catch(_ => 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=60')
let username = conn.getName(who)
let { currency, yenes, exp } = global.db.data.users[who]
let user = global.db.data.users[who]

let pareja = user.marry
let parejaTag = pareja ? '@' + pareja.replace(/@.+/, '') : 'Nadie'
let cumple = user.birth || 'Sin Información'

let perfil = `
> *Perfil de usuario*

✦ *Nombre:* ${username}
✦ *${global.currency}:* ${user.yenes || 'Sin Información'}
✦ *Experiencia:* ${user.exp || 'Sin Información'}
✦ *Casado con:* ${parejaTag}
✦ *Cumpleaños:* ${cumple}
`.trim()
conn.sendFile(m.chat, pp, 'perfil.jpg', perfil, m, { mentions: [who] })
}
handler.help = ['profile']
handler.tags = ['rpg']
handler.command = ['profile', 'perfil']
export default handler