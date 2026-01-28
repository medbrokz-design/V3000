const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const https = require('https');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

const TG_TOKEN = "8330712299:AAEFWZlY2vzEQAsgStCdQyMdlItsGIpgOIM";
const TG_CHAT_ID = "8001840446";

app.post('/api/contact', (req, res) => {
    const { name, email, service, message } = req.body;
    
    const text = `🚀 *Новая заявка V3000*\n\n` +
                 `👤 *Имя:* ${name}\n` +
                 `📧 *Email:* ${email}\n` +
                 `🛠 *Модуль:* ${service || 'Не указан'}\n` +
                 `📝 *Сообщение:* ${message || 'Без сообщения'}`;

    if (TG_TOKEN && TG_CHAT_ID) {
        const url = `https://api.telegram.org/bot${TG_TOKEN}/sendMessage`;
        const data = JSON.stringify({
            chat_id: TG_CHAT_ID,
            text: text,
            parse_mode: 'Markdown'
        });

        const tgReq = https.request(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': data.length
            }
        }, (tgRes) => {
            console.log(`Telegram status: ${tgRes.statusCode}`);
        });

        tgReq.on('error', (error) => {
            console.error('Telegram error:', error);
        });

        tgReq.write(data);
        tgReq.end();
    }

    res.status(200).json({ success: true, message: 'Заявка принята! Система анализирует ваш запрос.' });
});

app.listen(PORT, () => {
    console.log(`V3000 Server running on port ${PORT}`);
});

module.exports = app;
