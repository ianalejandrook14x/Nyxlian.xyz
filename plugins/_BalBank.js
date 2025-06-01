const handler = async (m) => {
    const db = global.db;
    if (!db || !db.data || !db.data.users) return m.reply("Error: Base de datos no disponible.");

    const user = db.data.users[m.sender];
    if (!user) return m.reply("*No registrado en la base de datos*");

    user.bank = user.bank || 0;
    user.yenes = user.yenes || 0;

    m.reply(
        `🍃 *Tu saldo actual:*\n\n` +
        `*Dentro del banco: \`${user.bank}\` ${global.currency}*\n` +
        `*Fuera del banco: \`${user.yenes}\` ${global.currency}*\n\n` +
        `> *Para retirar el dinero del banco utiliza: #with*`
    );
};

handler.command = ['bal', 'lb'];
export default handler;