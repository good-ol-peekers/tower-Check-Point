import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const CommentsSchema = new Schema(
  {
  body: { type: String, required: true, minLength: 1, maxLength: 5000 },
  creator: { type: Schema.Types.ObjectId, ref: 'Account', required: true },
  eventId: { type: Schema.Types.ObjectId, ref: 'Event', required: true },



  },
  { timestamps: true, toJSON: { virtuals: true } }
)

