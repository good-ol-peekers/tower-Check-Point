import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const TicketsSchema = new Schema(
  {
    eventId: { type: Schema.Types.ObjectId, ref: 'Event', required: true },
    accountId: { type: Schema.Types.ObjectId, required: true, ref:'Account' }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)
TicketsSchema.virtual('profile', {
  ref: 'Account',
  localField: 'accountId',
  foreignField: '_id',
  justOne: true
})
TicketsSchema.virtual('event',{
  ref:'Event',
  localField: 'eventId',
  foreignField: '_id',
  justOne: true
})

TicketsSchema.index({accountId: 1, eventId: 1}, { unique: true })