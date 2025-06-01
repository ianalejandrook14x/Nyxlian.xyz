const meses = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

const handler = async (m, { args }) => {
    const db = global.db;
    if (!db || !db.data || !db.data.users) return m.reply("Error: Base de datos no disponible.");
    const user = db.data.users[m.sender];
    if (!user) return m.reply("*No registrado en la base de datos*");

    if (!('birth' in user)) user.birth = '';

    if (!args[0]) {
        if (user.birth) {
            return m.reply(`*Tu cumpleaños registrado es el: ${user.birth}*`);
        } else {
            return m.reply("*Necesitas establecer tu cumpleaños*.\n> *Ejemplo: birth 15-3 (10 de marzo)*");
        }
    }

    // Verifica formato (día-mes)
    const match = args[0].match(/^(\d{1,2})-(\d{1,2})$/);
    if (!match) return m.reply("*Formato inválido. Usa: birth 10-3 (10 de marzo)*");

    let dia = parseInt(match[1]);
    let mes = parseInt(match[2]);

    if (mes < 1 || mes > 12) return m.reply("El mes debe estar entre 1 y 12.");
    if (dia < 1 || dia > 31) return m.reply("El día debe estar entre 1 y 31.");

    // Chequeo simple de días en cada mes (no contempla años bisiestos)
    const diasPorMes = [31,28,31,30,31,30,31,31,30,31,30,31];
    if (dia > diasPorMes[mes - 1]) return m.reply(`El mes de ${meses[mes-1]} solo tiene ${diasPorMes[mes-1]} días.`);

    user.birth = `${dia} de ${meses[mes-1]}`;
    m.reply(`*Tu cumpleaños fue registrado como: ${user.birth}*`);
};

handler.command = ['birth'];
export default handler;