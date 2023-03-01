import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const EventsSchema = new Schema(
  {
    name: [{ type: String, unique: true }],
    description: { type: String, required: true, minLength: 1, maxLength: 5000 },
    coverImg:  { type: String, required: true, minLength: 1, maxLength: 5000 },
    location: { type: String, required: true, minLength: 1, maxLength: 5000 },
    capacity: { type: Number, required: true, minLength: 1, maxLength: 5000 },
    startDate: { type: String, required: true, minLength: 1, maxLength: 5000 },
    type: { type: String, required: true, minLength: 1, maxLength: 5000 },

    
    isCanceled: { type: Boolean, required: true, default: false },
    creatorId: { type: Schema.Types.ObjectId, required: true, ref:'Account' },
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

      
     
