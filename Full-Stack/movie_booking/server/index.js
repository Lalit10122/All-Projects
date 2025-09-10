import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Mongo connection (local default)
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/movie_booking_local';
await mongoose.connect(MONGO_URI, { dbName: 'movie_booking_local' });

// Models
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, index: true },
    email: { type: String, required: true, unique: true, index: true },
    phone: { type: String, index: true },
    address: { type: String },
    age: { type: Number, index: true },
    preferences: { type: [String], default: [] },
    membershipStatus: { type: String, enum: ['none', 'silver', 'gold', 'platinum'], default: 'none', index: true },
    bookingHistory: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Booking' }],
    passwordHash: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
    verified: { type: Boolean, default: true }
  },
  { timestamps: true }
);

const movieSchema = new mongoose.Schema(
  {
    title: String,
    genre: String,
    duration: String,
    rating: Number,
    description: String,
    image: String,
    price: Number,
    showTimes: [String]
  },
  { timestamps: true }
);

const bookingSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    movieId: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true },
    movieTitle: String,
    showTime: String,
    seats: [String],
    totalAmount: Number,
    status: { type: String, enum: ['confirmed', 'pending', 'cancelled', 'refunded'], default: 'confirmed' },
    paymentMethod: { type: String, enum: ['card', 'upi', 'netbanking', 'wallet'], default: 'card' },
    paymentStatus: { type: String, enum: ['paid', 'failed', 'refunded', 'pending'], default: 'paid' },
    bookingDate: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

// Theater hierarchy
const theaterSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    location: { type: String },
  },
  { timestamps: true }
);

const screenSchema = new mongoose.Schema(
  {
    theaterId: { type: mongoose.Schema.Types.ObjectId, ref: 'Theater', required: true },
    name: { type: String, required: true },
    seatLayout: {
      rows: Number,
      cols: Number,
      tiers: [
        {
          name: String,
          rows: [String],
          price: Number
        }
      ]
    }
  },
  { timestamps: true }
);

const showtimeSchema = new mongoose.Schema(
  {
    movieId: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true, index: true },
    theaterId: { type: mongoose.Schema.Types.ObjectId, ref: 'Theater', required: true },
    screenId: { type: mongoose.Schema.Types.ObjectId, ref: 'Screen', required: true },
    startAt: { type: Date, required: true, index: true },
    language: { type: String },
    availableSeats: { type: Number, default: 0 }
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);
const Movie = mongoose.model('Movie', movieSchema);
const Booking = mongoose.model('Booking', bookingSchema);
const Theater = mongoose.model('Theater', theaterSchema);
const Screen = mongoose.model('Screen', screenSchema);
const Showtime = mongoose.model('Showtime', showtimeSchema);

// Seed admin and sample data
async function seed() {
  const adminEmail = 'lalit@gmail.com';
  let admin = await User.findOne({ email: adminEmail });
  if (!admin) {
    const passwordHash = await bcrypt.hash('123456', 10);
    admin = await User.create({
      name: 'Admin Lalit',
      email: adminEmail,
      phone: '9999999999',
      passwordHash,
      isAdmin: true,
      verified: true
    });
  }

  const movieCount = await Movie.countDocuments();
  if (movieCount === 0) {
    try {
      const jsonPath = path.join(process.cwd(), 'server', 'movies.json');
      const file = fs.readFileSync(jsonPath, 'utf-8');
      const items = JSON.parse(file);
      if (Array.isArray(items) && items.length) {
        await Movie.insertMany(items);
      }
    } catch {
      // fallback silently
    }
  }

  // Seed a couple of bookings for demo
  const movies = await Movie.find();
  const anyBooking = await Booking.findOne();
  if (!anyBooking && movies.length) {
    await Booking.create({
      userId: admin._id,
      movieId: movies[0]._id,
      movieTitle: movies[0].title,
      showTime: movies[0].showTimes[0],
      seats: ['A1', 'A2'],
      totalAmount: 400,
      status: 'confirmed'
    });
  }
}

await seed();

// Helpers
const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret_key';
function authRequired(req, res, next) {
  const auth = req.headers.authorization || '';
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : null;
  if (!token) return res.status(401).json({ message: 'Unauthorized' });
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    next();
  } catch {
    return res.status(401).json({ message: 'Invalid token' });
  }
}

function adminRequired(req, res, next) {
  if (!req.user?.isAdmin) return res.status(403).json({ message: 'Forbidden' });
  next();
}

// Routes
app.get('/health', (req, res) => res.json({ ok: true }));

// Auth
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: 'Email already registered' });
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, phone, passwordHash, verified: true });
    const token = jwt.sign({ id: user._id, email: user.email, name: user.name, isAdmin: user.isAdmin }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: user._id, name: user.name, email: user.email, phone: user.phone, verified: user.verified, isAdmin: user.isAdmin } });
  } catch (e) {
    res.status(500).json({ message: 'Registration failed' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });
    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return res.status(400).json({ message: 'Invalid credentials' });
    const token = jwt.sign({ id: user._id, email: user.email, name: user.name, isAdmin: user.isAdmin }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: user._id, name: user.name, email: user.email, phone: user.phone, verified: user.verified, isAdmin: user.isAdmin } });
  } catch (e) {
    res.status(500).json({ message: 'Login failed' });
  }
});

// Movies
app.get('/api/movies', async (req, res) => {
  const movies = await Movie.find();
  res.json(movies);
});

// Admin Movies CRUD
app.post('/api/admin/movies', authRequired, adminRequired, async (req, res) => {
  try {
    const created = await Movie.create(req.body);
    res.status(201).json(created);
  } catch (e) {
    res.status(400).json({ message: 'Create movie failed' });
  }
});

app.put('/api/admin/movies/:id', authRequired, adminRequired, async (req, res) => {
  try {
    const updated = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Movie not found' });
    res.json(updated);
  } catch (e) {
    res.status(400).json({ message: 'Update movie failed' });
  }
});

app.delete('/api/admin/movies/:id', authRequired, adminRequired, async (req, res) => {
  try {
    const deleted = await Movie.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Movie not found' });
    res.json({ ok: true });
  } catch (e) {
    res.status(400).json({ message: 'Delete movie failed' });
  }
});

// Admin: reload movies from JSON file
app.post('/api/admin/movies/reload', authRequired, adminRequired, async (req, res) => {
  try {
    const jsonPath = path.join(process.cwd(), 'server', 'movies.json');
    const file = fs.readFileSync(jsonPath, 'utf-8');
    const items = JSON.parse(file);
    if (!Array.isArray(items)) return res.status(400).json({ message: 'Invalid JSON' });
    await Movie.deleteMany({});
    const created = await Movie.insertMany(items);
    res.json({ ok: true, count: created.length });
  } catch (e) {
    res.status(400).json({ message: 'Reload failed' });
  }
});

// Bookings
app.post('/api/bookings', authRequired, async (req, res) => {
  try {
    const { movieId, showTime, seats } = req.body;
    const movie = await Movie.findById(movieId);
    if (!movie) return res.status(404).json({ message: 'Movie not found' });
    const totalAmount = seats.length * (movie.price || 0);
    const booking = await Booking.create({
      userId: req.user.id,
      movieId: movie._id,
      movieTitle: movie.title,
      showTime,
      seats,
      totalAmount,
      status: 'confirmed'
    });
    res.status(201).json(booking);
  } catch (e) {
    res.status(500).json({ message: 'Create booking failed' });
  }
});

app.get('/api/bookings/me', authRequired, async (req, res) => {
  const bookings = await Booking.find({ userId: req.user.id }).sort({ createdAt: -1 });
  res.json(bookings);
});

// Admin routes
app.get('/api/admin/bookings', authRequired, adminRequired, async (req, res) => {
  const bookings = await Booking.find().populate('userId', 'name email').populate('movieId', 'title').sort({ createdAt: -1 });
  res.json(bookings);
});

app.delete('/api/admin/bookings/:id', authRequired, adminRequired, async (req, res) => {
  try {
    await Booking.findByIdAndDelete(req.params.id);
    res.json({ ok: true });
  } catch {
    res.status(400).json({ message: 'Delete booking failed' });
  }
});

// Users CRUD (admin)
app.get('/api/admin/users', authRequired, adminRequired, async (req, res) => {
  const { q, membershipStatus, minAge, maxAge, page = 1, limit = 20 } = req.query;
  const filter = {};
  if (q) {
    filter.$or = [
      { name: { $regex: String(q), $options: 'i' } },
      { email: { $regex: String(q), $options: 'i' } },
      { phone: { $regex: String(q), $options: 'i' } }
    ];
  }
  if (membershipStatus) filter.membershipStatus = membershipStatus;
  if (minAge || maxAge) filter.age = { ...(minAge ? { $gte: Number(minAge) } : {}), ...(maxAge ? { $lte: Number(maxAge) } : {}) };
  const skip = (Number(page) - 1) * Number(limit);
  const [items, total] = await Promise.all([
    User.find(filter).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)),
    User.countDocuments(filter)
  ]);
  res.json({ items, total, page: Number(page), limit: Number(limit) });
});

app.post('/api/admin/users', authRequired, adminRequired, async (req, res) => {
  try {
    const { name, email, phone, address, age, preferences, membershipStatus, password } = req.body;
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Email already exists' });
    const passwordHash = await bcrypt.hash(password || '123456', 10);
    const user = await User.create({ name, email, phone, address, age, preferences, membershipStatus, passwordHash, verified: true });
    res.status(201).json(user);
  } catch (e) {
    res.status(400).json({ message: 'Create user failed' });
  }
});

app.put('/api/admin/users/:id', authRequired, adminRequired, async (req, res) => {
  try {
    const data = { ...req.body };
    if (data.password) {
      data.passwordHash = await bcrypt.hash(data.password, 10);
      delete data.password;
    }
    const updated = await User.findByIdAndUpdate(req.params.id, data, { new: true });
    if (!updated) return res.status(404).json({ message: 'User not found' });
    res.json(updated);
  } catch (e) {
    res.status(400).json({ message: 'Update user failed' });
  }
});

app.delete('/api/admin/users/:id', authRequired, adminRequired, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ ok: true });
  } catch (e) {
    res.status(400).json({ message: 'Delete user failed' });
  }
});

app.post('/api/admin/users/bulk-delete', authRequired, adminRequired, async (req, res) => {
  const { ids } = req.body;
  await User.deleteMany({ _id: { $in: ids || [] } });
  res.json({ ok: true });
});

app.post('/api/admin/users/bulk-update', authRequired, adminRequired, async (req, res) => {
  const { ids, update } = req.body;
  await User.updateMany({ _id: { $in: ids || [] } }, { $set: update || {} });
  res.json({ ok: true });
});

// Theaters / Screens / Showtimes basic CRUD
app.post('/api/admin/theaters', authRequired, adminRequired, async (req, res) => {
  const t = await Theater.create(req.body);
  res.status(201).json(t);
});
app.get('/api/admin/theaters', authRequired, adminRequired, async (_req, res) => {
  res.json(await Theater.find());
});
app.put('/api/admin/theaters/:id', authRequired, adminRequired, async (req, res) => {
  const t = await Theater.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(t);
});
app.delete('/api/admin/theaters/:id', authRequired, adminRequired, async (req, res) => {
  await Theater.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
});

app.post('/api/admin/screens', authRequired, adminRequired, async (req, res) => {
  const s = await Screen.create(req.body);
  res.status(201).json(s);
});
app.get('/api/admin/screens', authRequired, adminRequired, async (req, res) => {
  const { theaterId } = req.query;
  res.json(await Screen.find(theaterId ? { theaterId } : {}));
});
app.put('/api/admin/screens/:id', authRequired, adminRequired, async (req, res) => {
  const s = await Screen.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(s);
});
app.delete('/api/admin/screens/:id', authRequired, adminRequired, async (req, res) => {
  await Screen.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
});

app.post('/api/admin/showtimes', authRequired, adminRequired, async (req, res) => {
  const st = await Showtime.create(req.body);
  res.status(201).json(st);
});
app.get('/api/admin/showtimes', authRequired, adminRequired, async (req, res) => {
  const { movieId, theaterId } = req.query;
  const filter = { ...(movieId ? { movieId } : {}), ...(theaterId ? { theaterId } : {}) };
  res.json(await Showtime.find(filter).sort({ startAt: 1 }));
});
app.put('/api/admin/showtimes/:id', authRequired, adminRequired, async (req, res) => {
  const st = await Showtime.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(st);
});
app.delete('/api/admin/showtimes/:id', authRequired, adminRequired, async (req, res) => {
  await Showtime.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
});

// Analytics endpoints (basic aggregations)
app.get('/api/admin/analytics/revenue', authRequired, adminRequired, async (req, res) => {
  const { from, to, by = 'day' } = req.query;
  const match = { ...(from ? { createdAt: { $gte: new Date(String(from)) } } : {}), ...(to ? { createdAt: { ...(from ? { $gte: new Date(String(from)) } : {}), $lte: new Date(String(to)) } } : {}) };
  const groupId = by === 'month' ? { y: { $year: '$createdAt' }, m: { $month: '$createdAt' } } : by === 'week' ? { y: { $isoWeekYear: '$createdAt' }, w: { $isoWeek: '$createdAt' } } : { y: { $year: '$createdAt' }, m: { $month: '$createdAt' }, d: { $dayOfMonth: '$createdAt' } };
  const data = await Booking.aggregate([
    { $match: match },
    { $group: { _id: groupId, revenue: { $sum: '$totalAmount' }, count: { $sum: 1 } } },
    { $sort: { '_id.y': 1, '_id.m': 1, '_id.d': 1 } }
  ]);
  res.json(data);
});

app.get('/api/admin/analytics/popular-movies', authRequired, adminRequired, async (_req, res) => {
  const data = await Booking.aggregate([
    { $group: { _id: '$movieTitle', count: { $sum: 1 }, revenue: { $sum: '$totalAmount' } } },
    { $sort: { count: -1 } },
    { $limit: 20 }
  ]);
  res.json(data);
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});


