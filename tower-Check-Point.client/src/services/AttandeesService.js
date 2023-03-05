import { AppState } from "../AppState.js"
import { EventAttendee } from "../models/Event.js"
import { api } from "./AxiosService"

class AttendeesService {
    async attendEvent(eventId) {
        console.log(eventId, "event id" )
        const res = await api.post('api/tickets', {eventId})
        AppState.attendees.push(res.data)
        AppState.myEvents.push(res.data)
    }


   async getAttendees(eventId) {
const res = await api.get('api/events/' + eventId + '/tickets')
AppState.attendees = res.data.map(e => new EventAttendee(e))
   }

}
export const attendeesService = new AttendeesService()