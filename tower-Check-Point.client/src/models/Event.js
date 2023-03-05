import { Profile } from "./Account.js"

export class Event {
    constructor(data){
        this.id = data.id
        this.name = data.name
        this.description = data.description
        this.coverImg = data.coverImg
        this.location = data.location
        this.capacity = data.capacity
        this.startDate = new Date(data.startDate).toDateString()
        this.type = data.type
        this.isCanceled = data.isCanceled
        this.creatorId =  data.creatorId
    }
}
export class EventAttendee extends Event {
    constructor(data) {
        super(data.profile)
        this.profile = new Profile(data.profile)
        // this.name = data.name
        // this.id = data.id
    }
}