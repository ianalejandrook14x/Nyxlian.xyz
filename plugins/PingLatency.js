let handler = async (m, { conn }) => {
    const sentMsg = await conn.reply(m.chat, 'Ping', m);
    const msgTimestamp = m.messageTimestamp || m.msgTimestamp || 0;
    const latency = msgTimestamp ? Date.now() - Number(msgTimestamp) * 1000 : 0;
    await conn.sendMessage(m.chat, { text: `*${latency} MS ⚙*`, edit: sentMsg.key });
};

handler.command = ['ping'];
export default handler;
