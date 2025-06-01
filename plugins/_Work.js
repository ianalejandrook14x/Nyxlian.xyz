const workMessages = [
    { msg: "Limpiaste un parque y te ganaste \`{amount}\` Yenes", min: 800, max: 1700, type: "win" },
    { msg: "Conseguiste vender a una Loli y ganaste \`{amount}\` Yenes", min: 200, max: 1200, type: "win" },
    { msg: "Lograste que te pagaran una deuda de \`{amount}\` Yenes", min: 600, max: 1900, type: "win" },
    { msg: "Trabajaste de mesero y recibiste \`{amount}\` Yenes", min: 550, max: 1000, type: "win" },
    { msg: "Limpiaste tu cuarto y encontraste \`{amount}\` Yenes", min: 500, max: 8800, type: "win" },
    { msg: "Ayudaste a un anciano y te dio \`{amount}\` Yenes", min: 800, max: 2200, type: "win" }
];

const fineMessages = [
    { msg: "Te cobraron una multa por exceso de velocidad, pierdes \`{amount}\` Yenes", min: 100, max: 600, type: "lose" },
    { msg: "Pagaste una deuda atrasada y pierdes \`{amount}\` Yenes", min: 200, max: 500, type: "lose" },
    { msg: "Perdiste una apuesta y te quitaron \`{amount}\` Yenes", min: 300, max: 400, type: "lose" },
    { msg: "Fuiste asaltado y perdiste \`{amount}\` Yenes", min: 500, max: 8000, type: "lose" },
    { msg: "Se te cayó la billetera y perdiste \`{amount}\` Yenes", min: 250, max: 550, type: "lose" }
];

const allMessages = [...workMessages, ...fineMessages];

const handler = async (m, { conn }) => {
    const db = global.db;
    if (!db || !db.data || !db.data.users) return m.reply("Error: Base de datos no disponible.");

    const user = db.data.users[m.sender];
    if (!user) return m.reply("*No registrado en la base de datos*");

    const action = allMessages[Math.floor(Math.random() * allMessages.length)];
    const amount = Math.floor(Math.random() * (action.max - action.min + 1)) + action.min;

    if (action.type === "win") {
        user.yenes = (user.yenes || 0) + amount;
        m.reply(action.msg.replace("{amount}", amount));
    } else {
        user.yenes = Math.max(0, (user.yenes || 0) - amount);
        m.reply(action.msg.replace("{amount}", amount));
    }

    user.lastWork = now;
};

handler.command = ['work', 'w', 'trabajar'];
handler.creator = 'Ian';

export default handler;