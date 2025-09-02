# 📅 Setting up Baikal 0.9.3 with Apple Calendar and Fantastical on macOS

This guide explains how to connect **Baikal 0.9.3** (self-installed, non-Docker) to **Apple Calendar** and **Fantastical** on macOS.  
It assumes you have Baikal running on a subdomain of your server with a valid SSL certificate.  

---

## ✅ Apple Calendar Setup

1. In the Mac **menu bar**, left-click **Calendar**.  
2. Select **Add Account**.  
3. In the account type dialog, open the drop-down and select **Advanced**.  
4. Enter your credentials and server details:
   - **Username** → your Baikal username  
   - **Password** → your Baikal password  
   - **Server Address** → `your.server.com` *(no `https://` prefix)*  
   - **Server Path** → `/dav.php/principals/USERNAME/`  
     - Replace `USERNAME` with the Baikal username you entered above.  
   - **Port** → leave on **Automatic**  
   - ✅ Tick **Use SSL** (unless you don’t have a valid certificate, in which case untick and use port `80`)  

5. Click **OK**.  

> ℹ️ Tip: In Apple Calendar, you can configure the update interval. I set mine to **every 5 minutes** — note that changes won’t sync instantly.

---

## ✅ Fantastical Setup

Fantastical requires a slightly different server path:  

- **Server Path** → `/dav.php/calendars/USERNAME/CALENDARNAME/`  

Replace:
- `USERNAME` → your Baikal username  
- `CALENDARNAME` → the exact calendar name configured in Baikal  

---

## 🛠 Troubleshooting

- If syncing fails, try:
  - Deleting the account in Calendar  
  - Rebooting your Mac  
  - Setting up the account again from scratch  

- Make sure your **username** matches exactly what is set up in Baikal.  
  - Example: a simple one-word username works fine (it does not need to be a full email address).  

---

## 🔒 SSL Notes

- If you have a valid SSL certificate: ✅ **Enable SSL**  
- If you do not have a certificate: ❌ Disable SSL and use **Port 80**  

---

## Summary

- **Apple Calendar** works with `principals/USERNAME/` as server path.  
- **Fantastical** requires `calendars/USERNAME/CALENDARNAME/`.  
- Syncing isn’t instant; configure your preferred refresh interval.  

With these settings, Baikal 0.9.3 syncs reliably with both Apple Calendar and Fantastical.  
