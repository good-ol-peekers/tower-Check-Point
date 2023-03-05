import { Profile } from "./Account.js"

export class Attendee extends Profile {
    constructor(data) {
        super(data.profile)
        this.id = data.id
     this.name = data.name
    this.picture = data.picture
    }
}