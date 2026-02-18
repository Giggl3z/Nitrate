# Troubleshooting

## App exits immediately

### Cause
`config.json` is missing or `token` is empty.

### Fix
1. Copy config template:
   - PowerShell: `Copy-Item .\config.example.json .\config.json`
   - bash: `cp config.example.json config.json`
2. Add your token and retry `npm start`.

---

## Install warnings about deprecated packages

This project currently uses old dependencies (`discord.js@11`, `request`).
These warnings do not always mean install failure.

If install completed and `npm start` works, you can proceed.

---

## Notification popups not appearing

- Ensure notifications are enabled for your terminal/app in OS settings.
- Disable Focus mode / Do Not Disturb.
- Run app in an interactive user session (not headless service).

---

## Blacklist command doesn't work

Checklist:
- `selfbot` is set to `true`
- command format is exact:
  - `$blacklist add <id>`
  - `$blacklist remove <id>`
- `<id>` must be numeric

---

## Gift links seen but no redeem output

Possible reasons:
- Invalid/expired gift code
- Account lacks permission/eligibility
- Discord API request rejected
- Link already attempted in current runtime (dedupe)

Watch console output for response message details.
