<div align="center">

# 📅 BookMe — Booking App (Server)

### Express · MongoDB · Passport Google OAuth · Nodemailer

The backend for the BookMe booking app: Google sign-in, booking submission with unique date + time enforcement, and confirmation / open-spot emails.

![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Passport](https://img.shields.io/badge/Passport-34E27A?style=for-the-badge&logo=passport&logoColor=white)

</div>

---

## ✨ What it does

| Endpoint / feature | Details |
| --- | --- |
| `POST /submit-form` | Saves a booking; MongoDB enforces a unique `{ date, time }` index, so a taken slot returns a double-booking error instead of a duplicate |
| `GET /data`, `GET /getDate` | Reads bookings and available dates for the calendar |
| `POST /email-open-spots` | Emails users when a spot opens up |
| Google OAuth | Passport Google strategy with session support (`/auth/google`, `/auth/google/callback`) |
| Confirmation emails | Nodemailer via Gmail, with a cancellation link built from `APP_URL` + the booking ID |
| Cancellation | `POST /cancel` removes a booking by its document ID |

## 🧩 How it fits together

```
bookedCRA-client (React, port 3000)
        │  REST + Google OAuth
        ▼
bookedCRA-server (this repo, Express, port 3001)
        │  Mongoose, Passport, Nodemailer
        ▼
MongoDB · Gmail confirmation emails
```

> **Client repo:** [bookedCRA-client](https://github.com/afshinmalek/bookedCRA-client)

## 🚀 Run it locally

```bash
npm install
cp .env.example .env   # then fill in the values below
npm start
```

## 🔑 Environment variables

See `.env.example`. Never commit a real `.env` file — it is ignored by `.gitignore`.

| Variable | Used for |
| --- | --- |
| `PORT` | Server port |
| `MONGO` | MongoDB connection string |
| `CLIENT_ID` / `CLIENT_SECRET` | Google OAuth credentials |
| `SESSION_SECRET` | Express session secret |
| `APP_URL` | Public server URL, used in cancellation links |
| `GMAIL` | Gmail app password for confirmation emails (use an app password, never your account password) |

## ⚠️ Notes

- This project was originally deployed on Heroku; the Heroku URLs in older code are historical. Run it locally with the steps above.
- Dependencies are from the original project era (Node 14 era, `react-scripts` on the client). If a fresh install fails on a modern Node version, use Node 14 or update the lockfiles first.

## 🛠️ Tech

Express · Mongoose · Passport (Google OAuth 2.0) · express-session · Nodemailer · dotenv
