import { Profile } from "./Account.js"
import { Event } from "./Event.js"

export class Attendee extends Event {
    constructor(data) {
        super(data.profile)
        this.id = data.id
    //  this.name = data.name
    // this.picture = data.picture
    this.eventId = data.eventId
    this.accountId = data.accountId
    
    }
}