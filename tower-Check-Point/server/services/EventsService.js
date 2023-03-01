import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"


class EventsService {
    async getEventById(eventId) {
        const event = await dbContext.Events.findById(eventId).populate('profile', 'name picture')

        if (!event) {
            throw new BadRequest('back event ID')
        }
        return event
    }



   async createEvent(eventData) {
        const newEvent = await dbContext.Events.create(eventData)
        await newEvent.populate('profile', 'name picture')
        return newEvent
    }




    async getAllEvents() {
        const events = await dbContext.Events.find()
        return events
    }

    
}
export const eventsService = new EventsService()