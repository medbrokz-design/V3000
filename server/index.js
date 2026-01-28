const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

app.post('/api/contact', (req, res) => {
    const { name, email, service, message } = req.body;
    console.log('New Lead Received:', { name, email, service, message });
    // Здесь можно добавить отправку в Telegram или на почту
    res.status(200).json({ success: true, message: 'Заявка принята! Мы свяжемся с вами в течение часа.' });
});

app.listen(PORT, () => {
    console.log(`V3000 Server running on port ${PORT}`);
});
