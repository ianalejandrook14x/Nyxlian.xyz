const handler = async (m, { args }) => {
    // Asegura que global.botConfig esté inicializado
    global.botConfig = global.botConfig || {
        name: "Ian",
        banner: "https://qu.ax/RoEhs.jpg",
        prefix: "."
    };

    if (!args[0]) {
        return m.reply(`Proporciona un nombre`);
    }

    const oldName = global.botConfig.name;
    global.botConfig.name = args.join(" ");

    m.reply(`*Nombre cambiado a: "${global.botConfig.name}"*`);
};

handler.command = ['setname'];
handler.owner = true;

export default handler;
