import BaseController from "../utils/BaseController";
import { Auth0Provider } from "@bcwdev/auth0provider";
import { commentsService } from "../services/CommentsService.js"; 
import { eventsService } from "../services/EventsService.js";
import { dbContext } from "../db/DbContext";


export class EventsController extends BaseController {
    
    constructor() {
        super('api/events')
        this.router
        .get('', this.getAllEvents)
        // .get('/:eventId/comments', getEventComments)
        .get('/:eventId', this.getEventById)
        .use(Auth0Provider.getAuthorizedUserInfo)
        .post('', this.createEvent)
        // .put('/:eventId', editEvent)
        // .delete('/:eventId', cancelEvent)
    }
    async getAllEvents(req, res, next) {
        try {
            const events = await eventsService.getAllEvents()
            res.send(events)
        } catch (error) {
            next(error)
        }
    }

    async getEventById(req, res, next) {
        try {
            const eventId = req.params.eventId
            const event = await eventsService.getEventById(eventId)
            return res.send(event)
        } catch (error) {
            next(error)
        }
    }

    async createEvent(req, res, next) {
        try {
            const eventData = req.body
            eventData.creatorId = req.userInfo.id

            const newEvent = await eventsService.createEvent(eventData)
            return res.send(newEvent)

        } catch (error) {
            next(error)
        }
    }
}