const handler = async (m, { conn }) => {
    const db = global.db;
    if (!db || !db.data || !db.data.users) return m.reply("Error: Base de datos no disponible.");

    const users = db.data.users;
    const ranking = Object.entries(users)
        .map(([jid, data]) => ({
            jid,
            name: data.name || jid.split("@")[0], // Usa el nombre si está, o el número
            total: (data.yenes || 0) + (data.bank || 0)
        }))
        .filter(u => u.total > 100)
        .sort((a, b) => b.total - a.total);

    // Top 10
    const top10 = ranking.slice(0, 10);

    let text = "🍁 *Balance Tops:* 🍁\n\n";
    for (let i = 0; i < top10.length; i++) {
        let usuario = top10[i];
        let mention = usuario.jid === m.sender ? "(You)" : "";
        text += `${i + 1}. ${usuario.name} - *${usuario.total}* ${global.currency} ${mention}\n`;
    }

    const myPos = ranking.findIndex(u => u.jid === m.sender) + 1;

    text += `\n*Tu puesto es el:* \`${myPos > 0 ? myPos : "Fuera del top"}\``;

    m.reply(text.trim());
};

handler.command = ['top', 'baltop'];
export default handler;