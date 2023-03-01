import BaseController from "../utils/BaseController";
import { Auth0Provider } from "@bcwdev/auth0provider";
import { commentsService } from "../services/CommentsService.js"; 
import { eventsService } from "../services/EventsService.js";

export class EventsController extends BaseController {
    
    constructor() {
        super('api/events')
        this.router
        // .get('', getAllEvents)
        // .get('/:eventId/comments', getEventComments)
        // .get('/:eventId', getEventById)
        // .post('', createEvent)
        // .put('/:eventId', editEvent)
        // .delete('/:eventId', cancelEvent)
    }
}