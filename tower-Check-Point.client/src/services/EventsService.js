import { AppState } from "../AppState.js"
import { Event } from "../models/Event.js"
import { api } from "./AxiosService.js"
import { logger } from "../utils/Logger.js"
class EventsService{


    async getAllEvents() {
        const res = await api.get('api/events')
        const events = res.data.map(e => new Event(e))
        AppState.events = events
        logger.log('getting all albums from API looks like..', AppState.events)
    }

    async createNewEvent(formData) {
        const res = await api.post('api/events', formData)
        logger.log('creating new event res.data looks like...', res.data)
        AppState.events.push(res.data)
        return res.data
    }

    async getEventById(eventId) {
        AppState.event = null
        const res = await api.get('api/events/' + eventId)
        AppState.event = new Event(res.data)
        logger.log('your single eventById looks like...', AppState.event)
    }
}
export const eventsService = new EventsService()