// otp-server.js
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

const MSG91_AUTHKEY = "your_msg91_authkey"; // Replace with your real Auth Key
const TEMPLATE_ID = "your_template_id";     // Flow template ID from MSG91
const SENDER_ID = "your_sender_id";         // E.g., "MSGIND"

app.post("/send-otp", async (req, res) => {
    const { phone } = req.body;
    try {
        const response = await axios.post(
            "https://control.msg91.com/api/v5/otp",
            {
                mobile: `91${phone}`,
                authkey: MSG91_AUTHKEY,
                template_id: TEMPLATE_ID,
                sender: SENDER_ID
            }
        );
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

app.post("/verify-otp", async (req, res) => {
    const { phone, otp } = req.body;
    try {
        const response = await axios.get(
            `https://control.msg91.com/api/v5/otp/verify?mobile=91${phone}&otp=${otp}&authkey=${MSG91_AUTHKEY}`
        );
        res.json({ success: response.data.message === "OTP verified successfully" });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

app.listen(3000, () => console.log("Server running on port 3000"));
