const handler = async (m, { args }) => {
    const db = global.db;
    if (!db || !db.data || !db.data.users) return m.reply("Error: Base de datos no disponible.");

    const user = db.data.users[m.sender];
    if (!user) return m.reply("*No registrado en la base de datos*");

    if (!args[0]) return m.reply("Uso: deposit <cantidad>");

    user.bank = user.bank || 0;
    user.yenes = user.yenes || 0;

    // Depositar todo
    if (args[0].toLowerCase() === "all") {
        if (user.yenes < 100) return m.reply("*No tienes suficientes yenes para depositar.*");
        user.bank += user.yenes;
        const cantidadDepositada = user.yenes;
        user.yenes = 0;
        return m.reply(`Has depositado *${cantidadDepositada}* ${global.currency} en el banco.`);
    }

    // Depositar una cantidad
    const cantidad = parseInt(args[0]);
    if (isNaN(cantidad) || cantidad < 100) return m.reply("*El minimo para depostar es de 100*");
    if (user.yenes < cantidad) return m.reply("*No tienes esa cantidad.*");

    user.yenes -= cantidad;
    user.bank += cantidad;

    return m.reply(`Has depositado exitosamente *${cantidad}* Yenes en tu banco.`);
};

handler.command = ['deposit', 'depositar', 'dep'];
handler.creator = 'Ian';

export default handler;