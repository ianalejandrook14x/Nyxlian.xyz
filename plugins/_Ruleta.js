const handler = async (m, { args }) => {
    const db = global.db;
    if (!db || !db.data || !db.data.users) return m.reply("Error: Base de datos no disponible.");
    const user = db.data.users[m.sender];
    if (!user) return m.reply("*No registrado en la base de datos*");

    user.yenes = user.yenes || 0;

    if (args.length < 2) return m.reply("*Uso: rt <color> <monto>*\nEjemplo: rt red 300");

    const color = args[0].toLowerCase();
    const monto = parseInt(args[1]);

    if (!['red', 'black'].includes(color)) return m.reply("*Solo puedes elegir entre 'red' o 'black'* 🍃");
    if (isNaN(monto) || monto <= 100) return m.reply("*Debes apostar un monto mayor a 100.*");
    if (user.yenes < monto) return m.reply("*No tienes suficiente saldo para este juego.*");

    const resultado = Math.random() < 0.5 ? 'red' : 'black';

    if (color === resultado) {
        const recompensa = monto * 2;
        user.yenes += monto; 
        m.reply(`*La ruleta salió \`${resultado.toUpperCase()}\` Ganaste \`${recompensa}\` ${global.currency}*`);
    } else {
        user.yenes -= monto;
        m.reply(`*La ruleta salió \`${resultado.toUpperCase()}\` Perdiste \`${monto}\` ${global.currency}*`);
    }
};

handler.command = ['rt', 'ruleta'];
export default handler;