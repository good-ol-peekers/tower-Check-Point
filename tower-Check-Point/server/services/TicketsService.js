import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"
import { eventsService } from "./EventsService.js"
import { EventsSchema } from "../models/Event.js"
import { TicketsSchema } from "../models/Ticket.js"


class TicketsService {
   async DeleteTicket(creatorID, ticketId) {

       // find the ticket I want to delete
       // after I find the ticket, I need to find the event that the ticket is for
    //    remove the ticket
    // increase the event capacity
// !ticket.accountId != creatorID.toString()

       const ticket = await dbContext.Tickets.findById(ticketId)
       if (!ticket) {
         throw new BadRequest('ticket was not found during delete')
       }
       let eventTicket = await eventsService.getEventById(ticket.eventId)
       if (ticket.eventId.toString() != eventTicket.id) {
        throw new BadRequest('ticket Id doesnt match event Id')
       }
       if(ticket.accountId != creatorID){
         throw new BadRequest('not your ticket to delete')
       }
       eventTicket.capacity += 1
       await eventTicket.save()
       await ticket.remove()
 
         return 'ticket was deleted'
   }
   async getEventTickets(eventId) {
    //    const event = await dbContext.Events.find({eventId}) 
       const tickets = await dbContext.Tickets.find({eventId})
       .populate('profile')
    //    if(tickets.eventId == event.id)
       return tickets
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
      if (event.capacity == 0){
         throw new BadRequest('there is no tickets left for this event.')
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