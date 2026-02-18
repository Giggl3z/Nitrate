# Nitrate (Nitro Auto Redeemer)

Automatically attempts to redeem Nitro gift links found in Discord servers.

> ⚠️ **Warning:** This behavior may violate Discord Terms of Service. Use at your own risk.

---

## Requirements

- Node.js 16+
- npm
- git

---

## Setup

1. Clone repo

```bash
git clone https://github.com/Giggl3z/Nitrate.git
cd Nitrate
```

2. Install dependencies

```bash
npm install
```

3. Create your local config file

```bash
cp config.example.json config.json
```

4. Configure token in `config.json`

```json
{
  "token": "YOUR_TOKEN_HERE",
  "presence": true,
  "selfbot": true,
  "blacklisted": []
}
```

5. Run

```bash
npm start
```

---

## Commands

When `selfbot` is enabled, use:

- `$blacklist add <id>`
- `$blacklist remove <id>`

Blacklist supports guild/user/channel IDs.

---

## Notes

- Uses Discord API gift redeem endpoint.
- Deduplicates repeated gift codes during runtime.
- Shows desktop notifications for redeem responses.
