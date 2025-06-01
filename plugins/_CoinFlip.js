async function handler(m, { args }) {
    const users = global.db?.data?.users || {};
    const user = users[m.sender] = users[m.sender] || {};

    if (typeof user.yenes !== 'number') user.yenes = 10;

    if (args.length < 2) {
        return m.reply('*Uso: coinflip <cara|cruz> <cantidad>* 🍃');
    }

    const choice = args[0].toLowerCase();
    const bet = parseInt(args[1], 10);

    if (!['cara', 'cruz'].includes(choice)) {
        return m.reply('*Debes elegir cara o "cruz"* 🍂');
    }

    if (isNaN(bet) || bet < 100) {
        return m.reply('*La apuesta mínima es 100*');
    }

    if (user.yenes < bet) {
        return m.reply('*No tienes suficiente dinero para apostar.*');
    }

    const result = Math.random() < 0.5 ? 'cara' : 'cruz';
    let message;

    if (choice === result) {
        user.yenes += bet;
        message = `*La moneda salio ${result} ganaste ${bet * 2} ${global.currency}*`;
    } else {
        user.yenes -= bet;
        message = `*La moneda salio ${result} perdiste ${bet} ${global.currency}*`;
    }

    return m.reply(message);
}

handler.command = ['cf', 'coinflip'];
export default handler;