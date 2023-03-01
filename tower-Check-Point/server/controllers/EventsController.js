import BaseController from "../utils/BaseController";
import { Auth0Provider } from "@bcwdev/auth0provider";
import { commentsService } from "../services/CommentsService.js"; 
import { eventsService } from "../services/EventsService.js";


export class EventsController extends BaseController {
    
    constructor() {
        super('api/events')
        this.router
        .get('', this.getAllEvents)
        // .get('/:eventId/comments', getEventComments)
        // .get('/:eventId', getEventById)
        .use(Auth0Provider.getAuthorizedUserInfo)
        .post('', this.createEvent)
        // .put('/:eventId', editEvent)
        // .delete('/:eventId', cancelEvent)
    }
    async getAllEvents(req, res, next) {
        try {
            const event = await eventsService.getAllEvents()
            res.send(event)
        } catch (error) {
            next(error)
        }
    }

    async createEvent(req, res, next) {
        try {
            const eventData = req.body
            eventData.creatorId = req.userInfo.id

            const event = await eventsService.createEvent(eventData)
            return res.send(event)

        } catch (error) {
            next(error)
        }
    }
}