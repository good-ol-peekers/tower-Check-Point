import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const CommentsSchema = new Schema(
  {
  body: { type: String, required: true, minLength: 1, maxLength: 5000 },
  creatorId: { type: Schema.Types.ObjectId, ref: 'Account', },
  eventId: { type: Schema.Types.ObjectId, ref: 'Event', required: true },
  isAttending: { type: Boolean, default: true },
  },
  { timestamps: true, toJSON: { virtuals: true } }
)
CommentsSchema.virtual('creator', {
  ref: 'Account',
  localField: 'creator',
  foreignField: '_id',
  justOne: true
})
