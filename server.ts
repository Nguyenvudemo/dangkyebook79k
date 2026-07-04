import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

const app = express();
const PORT = 3000;

app.use(express.json());

// Google Sheet Webhook Configuration:
// CÁCH CẤU HÌNH DÁN TRỰC TIẾP LINK GOOGLE SHEET:
// Hãy thay thế dòng dưới đây bằng đường dẫn Web App URL từ Google Apps Script của bạn.
// Hoặc bạn có thể thiết lập biến môi trường GOOGLE_SHEET_WEBHOOK_URL trong file .env
const GOOGLE_SHEET_WEBHOOK_URL = process.env.GOOGLE_SHEET_WEBHOOK_URL || "https://script.google.com/macros/s/AKfycbyRMY6ULBFXfJ8eNLaWYHTs3DjW7C2d4g0SojJcHrGTX_YvO9JsIdk9r938_McOivom/exec";

// Memory store for registered leads (simple server list)
const leadsList: any[] = [];

// API Endpoint to register a lead and synchronize with Google Sheet
app.post("/api/register-lead", async (req, res) => {
  try {
    const { name, email, phone, niche, webhookUrl } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({ error: "Vui lòng nhập đầy đủ các thông tin bắt buộc." });
    }

    // 1. Validate Phone Number (Starts with 0, only digits, exactly 10 characters)
    const cleanPhone = phone.replace(/\s+/g, '');
    if (!/^\d+$/.test(cleanPhone)) {
      return res.status(400).json({ error: "Số điện thoại chỉ được chứa ký tự số." });
    }
    if (!cleanPhone.startsWith('0')) {
      return res.status(400).json({ error: "Số điện thoại phải bắt đầu bằng số 0." });
    }
    if (cleanPhone.length !== 10) {
      return res.status(400).json({ error: `Số điện thoại phải có đúng 10 số (hiện tại: ${cleanPhone.length} số).` });
    }

    // 2. Validate Gmail format
    const cleanEmail = email.trim().toLowerCase();
    const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    if (!gmailRegex.test(cleanEmail)) {
      return res.status(400).json({ error: "Vui lòng nhập đúng định dạng Gmail (...@gmail.com)." });
    }

    // 3. Format phone number with leading single quote so Google Sheets treats it as text and preserves the leading zero
    const sheetPhone = `'${cleanPhone}`;

    const newLead = {
      id: `lead-${Date.now()}`,
      name: name.trim(),
      email: cleanEmail,
      phone: cleanPhone, // raw phone
      sheetPhone: sheetPhone, // with leading zero fixer for Google Sheets
      niche: niche?.trim() || "Nhận Quà Ebook",
      createdAt: new Date().toLocaleDateString('vi-VN') + ' ' + new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
    };

    leadsList.push(newLead);

    // Google Sheet webhook integration (Ưu tiên dùng GOOGLE_SHEET_WEBHOOK_URL ở trên nếu đã cấu hình)
    const actualWebhook = GOOGLE_SHEET_WEBHOOK_URL && GOOGLE_SHEET_WEBHOOK_URL !== "ĐƯỜNG_DẪN_WEB_APP_URL_CỦA_BẠN"
      ? GOOGLE_SHEET_WEBHOOK_URL
      : (webhookUrl || "");
    let sheetSyncStatus = "not_configured";
    let sheetError = null;

    if (actualWebhook && actualWebhook.startsWith("http")) {
      try {
        const payload = {
          id: newLead.id,
          name: newLead.name,
          email: newLead.email,
          phone: sheetPhone, // Prepend with single quote for sheet import to fix '0' dropping!
          niche: newLead.niche,
          createdAt: newLead.createdAt
        };

        const response = await fetch(actualWebhook, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(payload)
        });

        if (response.ok) {
          sheetSyncStatus = "success";
        } else {
          sheetSyncStatus = "failed";
          sheetError = `HTTP Status: ${response.status}`;
        }
      } catch (err: any) {
        console.error("Sync to Google Sheets failed:", err);
        sheetSyncStatus = "error";
        sheetError = err.message || "Lỗi kết nối mạng";
      }
    }

    return res.json({
      success: true,
      lead: newLead,
      sheetSyncStatus,
      sheetError
    });

  } catch (error: any) {
    console.error("Error in register-lead API:", error);
    return res.status(500).json({ error: error.message || "Lỗi hệ thống khi đăng ký." });
  }
});

// API Endpoint to fetch registered leads
app.get("/api/leads", (req, res) => {
  res.json(leadsList);
});

// Configure Vite or serve production build
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
