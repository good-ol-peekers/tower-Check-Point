import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const EventsSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true, minLength: 1, maxLength: 5000 },
    coverImg:  { type: String, required: true, minLength: 1, maxLength: 5000 },
    location: { type: String, required: true, minLength: 1, maxLength: 5000 },
    capacity: { type: Number, required: true, minLength: 1, maxLength: 1000000 },
    startDate: { type: Date, required: true, minLength: 1, maxLength: 5000 },
    type: { type: String, required: true, enum: ['concert', 'convention', 'sport', 'digital'] },

    
    isCanceled: { type: Boolean, required: true, default: false },
    creatorId: { type: Schema.Types.ObjectId, required: true, ref:'Account' },
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

EventsSchema.virtual('profile', {
  ref: 'Account',
  localField: 'creatorId',
  foreignField: '_id',
  justOne: true
})

