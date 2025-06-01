const handler = async (m) => {
    const db = global.db;
    if (!db || !db.data || !db.data.users) return m.reply("Error: Base de datos no disponible.");
    const user = db.data.users[m.sender];
    if (!user) return m.reply("*No registrado en la base de datos*");

    const now = Date.now();
    const oneDay = 24 * 60 * 60 * 1000;

    if (!('lastClaim' in user)) user.lastClaim = 0;
    if (!('claimStreak' in user)) user.claimStreak = 0;

    if (now - user.lastClaim < oneDay) {
        const nextClaim = user.lastClaim + oneDay;
        const msLeft = nextClaim - now;
        const hours = Math.floor(msLeft / 3600000);
        const minutes = Math.floor((msLeft % 3600000) / 60000);
        const seconds = Math.floor((msLeft % 60000) / 1000);
        return m.reply(`*Ya reclamaste tu recompensa diaria, vuelve en ${hours}h*`);
    }

    // Si han pasado más de 48 horas, reinicia la racha
    if (now - user.lastClaim > (2 * oneDay)) {
        user.claimStreak = 0;
    }

    user.claimStreak += 1;
    const recompensa = 3000 + (user.claimStreak - 1) * 500;
    user.yenes = (user.yenes || 0) + recompensa;
    user.lastClaim = now;

    m.reply(`*Reclamaste tu recompensa diaria: \`${recompensa}\` ${global.currency}*`);
};

handler.command = ['claim', 'recompensa'];
export default handler;