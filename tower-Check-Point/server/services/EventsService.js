import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"


class EventsService {
   async editEvent(eventId, editedEventData, creatorId) {
       const event = await this.getEventById(eventId)
        if (event.creatorId.toString() != creatorId) {
            throw new BadRequest('not your event to edit')
        }

        if (event.isCanceled == true) {
            throw new BadRequest('cannot edit this event is canceled')
        }
        event.name = editedEventData.name || event.name
        event.description = editedEventData.description || event.description
        event.coverImg = editedEventData.coverImg || event.coverImg
        event.location = editedEventData.location || event.location
        event.capacity = editedEventData.capacity || event.capacity
        event.startDate = editedEventData.startDate || event.startDate
        // event.isCanceled = event.isCanceled != null? event.isCanceled : event.isCanceled
        await event.save()
        return event

    }
    async cancelEvent(eventId, requestorId) {
        const event = await this.getEventById(eventId)

        if(event.creatorId.toString() != requestorId){
            throw new BadRequest('you dont have permission to cancel this event, try again bub')
        }
        // else if (event.isCanceled = true) {
        //     throw new BadRequest('cannot undo changes on canceled event')
        // }
        event.isCanceled = true
        await event.save()
        return event
    }
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