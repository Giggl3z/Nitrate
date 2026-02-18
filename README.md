# Nitrate

Nitrate monitors Discord server messages and attempts to redeem Nitro gift links when they appear.

> ⚠️ **Important**
> - This project may violate Discord Terms of Service.
> - You are responsible for how you use this code.
> - Do **not** share your account token with anyone.

![Nitrate](./nitro-png-2.png)

## Features

- Watches guild channels for gift links:
  - `discord.gift/<code>`
  - `discordapp.com/gifts/<code>`
  - `discord.com/gifts/<code>`
- Attempts redeem requests immediately
- De-duplicates previously seen codes in the running session
- Optional rich presence
- Optional selfbot blacklist commands (`$blacklist add/remove <id>`)
- Desktop notifications for redeem responses

---

## Requirements

- Node.js 16+
- npm
- Git
- Windows/macOS/Linux shell

---

## Quick Start

### 1) Clone

```bash
git clone https://github.com/Giggl3z/Nitrate.git
cd Nitrate
```

### 2) Install

```bash
npm install
```

### 3) Create config

**PowerShell (Windows):**

```powershell
Copy-Item .\config.example.json .\config.json
```

**bash/zsh (Linux/macOS/Git Bash):**

```bash
cp config.example.json config.json
```

### 4) Edit `config.json`

```json
{
  "token": "YOUR_TOKEN_HERE",
  "presence": true,
  "selfbot": true,
  "blacklisted": []
}
```

### 5) Run

```bash
npm start
```

---

## Configuration

| Key | Type | Default | Description |
|---|---|---:|---|
| `token` | string | `""` | Discord user token. Required. |
| `presence` | boolean | `true` | Enables rich presence block. |
| `selfbot` | boolean | `true` | Enables `$blacklist` self commands. |
| `blacklisted` | string[] | `[]` | Guild/user/channel IDs to ignore. |

---

## Commands

When `selfbot` is enabled and you send messages from your own account:

- `$blacklist add <id>` → ignore that guild/user/channel ID
- `$blacklist remove <id>` → remove from ignore list

---

## Troubleshooting

### "Missing token in config.json"
Add your token to `config.json` and restart.

### Rich presence fails
Set `"presence": false` to disable it.

### Desktop notifications do not show
Check OS-level notification permissions and Focus/Do Not Disturb settings.

### Dependency warnings during `npm install`
This project depends on older packages (`discord.js@11`, `request`) that are deprecated.
Warnings are expected.

---

## Security Notes

- `config.json` is intentionally ignored by git to reduce accidental token leaks.
- Rotate your token immediately if you suspect exposure.
- Never paste tokens in issues, logs, or screenshots.

---

## Disclaimer

This repository is provided as-is for educational purposes. No warranty is provided.
