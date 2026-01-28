const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const https = require('https');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// БЕЗОПАСНОСТЬ: Используем переменные окружения
const TG_TOKEN = process.env.TG_TOKEN;
const TG_CHAT_ID = process.env.TG_CHAT_ID;

app.post('/api/contact', (req, res) => {
    const { name, email, company, message } = req.body;
    
    const text = `🚀 *V3000 NEW LEAD*\n\n` +
                 `👤 *Name:* ${name}\n` +
                 `🏢 *Company:* ${company}\n` +
                 `📧 *Email:* ${email}\n` +
                 `📝 *Msg:* ${message || 'No details'}`;

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
            },
            timeout: 5000 // Таймаут для стабильности
        }, (tgRes) => {
            console.log(`TG Status: ${tgRes.statusCode}`);
        });

        tgReq.on('error', (e) => console.error('TG Error:', e));
        tgReq.write(data);
        tgReq.end();
    } else {
        console.warn('TG Credentials missing in environment');
    }

    res.status(200).json({ success: true, message: 'Received' });
});

app.listen(PORT, () => console.log(`Core Active: ${PORT}`));

module.exports = app;