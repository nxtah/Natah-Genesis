# 🤖 Quick Start: Botpress Integration

Panduan singkat untuk setup Botpress AI Chatbot (5-10 menit).

---

## Step 1: Buat Akun Botpress

1. Buka https://botpress.com
2. Klik **"Get Started"**
3. Sign up dengan Google/GitHub/Email
4. Login ke Dashboard

---

## Step 2: Create Bot

1. Klik **"+ Create Bot"**
2. Name: `Natah Genesis AI`
3. Template: **"Customer Support"** atau **"Blank"**
4. Klik **"Create"**

---

## Step 3: Design Basic Flow

Di Botpress Studio:

### Welcome Flow:
```
Text: "Hi! 👋 Saya AI dari Natah Genesis. Ada yang bisa dibantu?"

Buttons:
- "Lihat Services"
- "Tanya Harga"
- "Chat dengan Tim"
```

### Services Flow:
```
Text: "Kami punya 3 paket:
✅ Basic Website
✅ Smart Website (AI Chatbot)
✅ Automation System

Mau info lebih detail?"
```

### WhatsApp Redirect:
```
Text: "Chat langsung dengan tim via WhatsApp?"
Button: "Chat via WhatsApp"
Action: Open URL → https://wa.me/6281234567890
```

---

## Step 4: Get Credentials

1. Klik **"Integrations"** → **"Web Chat"**
2. Copy:
   - Bot ID
   - Client ID
   - Webhook ID

---

## Step 5: Update Website

Edit `index.html`, cari bagian Botpress script:

```javascript
window.botpressWebChat.init({
    "botId": "PASTE_BOT_ID",           // ⬅️ GANTI
    "clientId": "PASTE_CLIENT_ID",     // ⬅️ GANTI
    "webhookId": "PASTE_WEBHOOK_ID",   // ⬅️ GANTI
    // ... rest of config
});
```

Save file.

---

## Step 6: Publish & Test

1. Di Botpress Studio, klik **"Publish"**
2. Wait 30-60 seconds
3. Open `index.html` di browser
4. Test chatbot di bottom-right corner

**Done! 🎉**

---

## Need Detailed Guide?

Lihat file [BOTPRESS_SETUP.md](BOTPRESS_SETUP.md) untuk panduan lengkap dengan:
- Advanced conversation flows
- AI training tips
- Customization options
- Troubleshooting

---

**Pro Tips:**

💡 Gunakan buttons lebih dari free text (easier for users)  
💡 Keep responses short dan friendly  
💡 Selalu provide "talk to human" option  
💡 Monitor analytics dan improve based on data  

---

📞 **Support:** Contact via WhatsApp jika ada kesulitan
