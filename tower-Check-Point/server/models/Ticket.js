import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const TicketsSchema = new Schema(
  {
    eventId: { type: Schema.Types.ObjectId, ref: 'Event', required: true },
    accountId: { type: Schema.Types.ObjectId, required: true, ref:'Account' },
    profile: { object: },
  },
  { timestamps: true, toJSON: { virtuals: true } }
)
