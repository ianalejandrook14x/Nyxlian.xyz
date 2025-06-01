import { fileTypeFromBuffer } from 'file-type';
import crypto from 'crypto';
async function setBanner(newImage) {
    const newBannerUrl = await imageToUrl(newImage);
    global.botConfig.banner = newBannerUrl;
    return newBannerUrl;
}

const handler = async (m, { args }) => {
    let imageInput = args[0];

    if (m.quoted && m.quoted.mimetype && m.quoted.mimetype.startsWith('image/')) {
        const buffer = await m.quoted.download?.();
        if (!buffer) return m.reply('No pude obtener la imagen.');
        imageInput = buffer;
    }

    if (!imageInput) {
        return m.reply('*Responde a una imagen*');
    }

    const urlFinal = await setBanner(imageInput);
    m.reply(`*Banner actualizado*`);
};

handler.command = ['setbanner'];

export default handler;
async function catbox(content) {
    const { ext, mime } = (await fileTypeFromBuffer(content)) || {};
    const blob = new Blob([content instanceof Uint8Array ? content : new Uint8Array(content)], { type: mime });
    const formData = new FormData();
    const randomBytes = crypto.randomBytes(5).toString("hex");
    formData.append("reqtype", "fileupload");
    formData.append("fileToUpload", blob, randomBytes + "." + ext);

    const response = await fetch("https://catbox.moe/user/api.php", {
        method: "POST",
        body: formData,
        headers: {
            "User-Agent":
                "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.157 Safari/537.36",
        },
    });

    return (await response.text()).trim();
}

// Sobrescribe imageToUrl para usar catbox
async function imageToUrl(imageInput) {
    if (typeof imageInput === 'string' && imageInput.startsWith('http')) {
        return imageInput;
    }
    return await catbox(imageInput);
}