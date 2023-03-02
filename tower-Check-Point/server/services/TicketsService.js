import { dbContext } from "../db/DbContext.js"
import { Forbidden } from "../utils/Errors.js"
import { eventsService } from "./EventsService.js"

class TicketsService {
   async createATicket(ticketData) {
      const event = await eventsService.getEventById(ticketData.eventId)
      if (event.isCanceled) {
        throw new Forbidden('cant attend events that are canceled')
      }
      event.capacity =- 1
      const ticket = await dbContext.Tickets.create(ticketData)
      await ticket.populate('profile', 'name picture')
      await ticket.populate('event')

      return ticket
    }

    
}
export const ticketsService = new TicketsService()