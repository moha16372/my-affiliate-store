const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static('public'));

const DATA_FILE = path.join(__dirname, 'data.json');

// تأكد من وجود ملف البيانات عند البدء
if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify({
        projectName: "مشروعي الجديد",
        logo: "🚀",
        bio: "أهلاً بك في منصة المنتجات الخاصة بي",
        theme: "glass",
        socialLinks: [],
        products: []
    }));
}

// جلب البيانات للويب
app.get('/api/data', (req, res) => {
    const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    res.json(data);
});

// حفظ الإعدادات من لوحة التحكم
app.post('/api/save', (req, res) => {
    fs.writeFileSync(DATA_FILE, JSON.stringify(req.body, null, 2));
    res.send({ success: true, message: "تم الحفظ بنجاح" });
});

app.listen(3000, () => console.log('✅ المنصة جاهزة على http://localhost:3000'));