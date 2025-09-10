## Movie Booking - Fullstack Setup

This project includes a Node/Express + MongoDB backend and the existing Vite + React frontend.

### Prerequisites
- Node.js 18+
- MongoDB Community server running locally (defaults to `mongodb://127.0.0.1:27017`)

### Backend

Location: `server/`

1) Install deps
```
cd server
npm install
```

2) Run API (default `http://localhost:4000`)
```
npm start
```
The API will connect to `mongodb://127.0.0.1:27017/movie_booking_local` and seed:
- Admin user: email `lalit@gmail.com`, password `123456`
- Sample movies and a sample booking

Optional env in `server/.env`:
```
MONGO_URI=mongodb://127.0.0.1:27017/movie_booking_local
JWT_SECRET=your_secret
PORT=4000
```

### Frontend

Location: project root

1) Install deps
```
npm install
```

2) Create `.env` file at project root (used by Vite)
```
VITE_API_URL=http://localhost:4000
```

3) Run frontend
```
npm run dev
```

### Admin Panel
- After login with the admin credentials above, an `Admin` link appears in the header.
- Admin page lists all bookings from the database with user and movie info.

### Notes
- Frontend `AuthContext` and `BookingContext` call backend APIs for login/register, movies, and bookings. JWT is stored in `localStorage` as `auth_token`.
- Existing local seat-grid remains client-side; bookings will still block chosen seats for the session and send to server.


