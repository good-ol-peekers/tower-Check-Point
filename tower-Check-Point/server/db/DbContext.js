import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { ValueSchema } from '../models/Value'
import { CommentsSchema } from '../models/Comment';
import { EventsSchema } from '../models/Event';
import { TicketsSchema } from '../models/Ticket';
class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);

  Comments = mongoose.model('Comment', CommentsSchema);

  Events = mongoose.model('Event', EventsSchema);
  
  Tickets = mongoose.model('Ticket', TicketsSchema);



}

export const dbContext = new DbContext()
