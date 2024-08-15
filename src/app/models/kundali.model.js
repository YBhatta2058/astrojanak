import mongoose from 'mongoose'

const kundaliSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  requestMessage: { 
    type: String, 
    trim: true 
  },
  kundaliImage: { 
    type: String 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

export const Kundali = mongoose.models.Kundali || mongoose.model('Kundali', kundaliSchema);
