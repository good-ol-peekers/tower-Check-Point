import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"
import { eventsService } from "./EventsService.js"



class TicketsService {
   async getEventTickets(eventId) {
       const tickets = await dbContext.Events.find({eventId}) 
       .populate('profile')
       return tickets
    //    
       
   }




   async getMyTickets(accountId) {
    // const events = await eventsService.getAllEvents()

    const myTickets = await dbContext.Tickets.find({accountId})
    .populate('event')
   
    // if(events.profile._id)
    //     throw new BadRequest('go buy some tickets, cus you dont have any yo!')
    
    return myTickets
   }





   async createATicket(ticketData) {
      const event = await eventsService.getEventById(ticketData.eventId)
      if (event.isCanceled) {
        throw new Forbidden('cant attend events that are canceled')
      }
      const ticket = await dbContext.Tickets.create(ticketData)
      await ticket.populate('profile', 'name picture')
      await ticket.populate('event')
      event.capacity = event.capacity -1
      await event.save()

      return ticket
    }

    
}
export const ticketsService = new TicketsService()