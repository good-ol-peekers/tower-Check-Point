import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"


class EventsService {
   async createEvent(eventData) {
        const event = await dbContext.Events.create(eventData)
        await event.populate('profile', 'name picture')
        return event
    }




    async getAllEvents() {
        const events = await dbContext.Events.find()
        return events
    }

    
}
export const eventsService = new EventsService()