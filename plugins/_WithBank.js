const handler = async (m, { args }) => {
    const db = global.db;
    if (!db || !db.data || !db.data.users) return m.reply("Error: Base de datos no disponible.");

    const user = db.data.users[m.sender];
    if (!user) return m.reply("*No registrado en la base de datos*");

    user.bank = user.bank || 0;
    user.yenes = user.yenes || 0;

    if (!args[0]) return m.reply("Uso: with <cantidad>");

    if (args[0].toLowerCase() === "all") {
        if (user.bank < 100) return m.reply("*No tienes suficiente dinero en el banco*");
        const cantidadRetirada = user.bank;
        user.yenes += user.bank;
        user.bank = 0;
        return m.reply(`*Has retirado ${cantidadRetirada} ${global.currency} del banco.*`);
    }

    const cantidad = parseInt(args[0]);
    if (isNaN(cantidad) || cantidad < 100) return m.reply("*El mínimo de retiro es 100*");
    if (user.bank < cantidad) return m.reply("*No tienes suficientes saldos en el banco.*");

    user.bank -= cantidad;
    user.yenes += cantidad;

    return m.reply(`*Has retirado \`${cantidad}\` ${global.currency} del banco.*`);
};

handler.command = ['with', 'white', 'retirar'];
handler.creator = 'Ian';

export default handler;