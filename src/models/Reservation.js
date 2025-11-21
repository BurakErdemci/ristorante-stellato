import mongoose from 'mongoose';

const ReservationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Lütfen adınızı giriniz.'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Lütfen e-posta adresinizi giriniz.'],
  },
  phone: {
    type: String,
    required: [true, 'Lütfen telefon numaranızı giriniz.'],
  },
  date: {
    type: Date, 
    required: true,
  },
  guests: {
    type: Number,
    required: true,
    min: 1,
    max: 10,
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled'], 
    default: 'pending',
  },
  notes: {
    type: String,
    trim: true,
  },
tableId: {
    type: Number, 
    required: true,
  },
  
  
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Reservation || mongoose.model('Reservation', ReservationSchema);