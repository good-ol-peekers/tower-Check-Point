import BaseController from "../utils/BaseController";
import { Auth0Provider } from "@bcwdev/auth0provider";
import { commentsService } from "../services/CommentsService.js"; 
import { eventsService } from "../services/EventsService.js";
import { dbContext } from "../db/DbContext";
import { ticketsService } from "../services/TicketsService";


export class EventsController extends BaseController {
    
    constructor() {
        super('api/events')
        this.router
        .get('', this.getAllEvents)
        .get('/:eventId/tickets', this.getEventTickets)
        // .get('/:eventId/comments', getEventComments)
        .get('/:eventId', this.getEventById)
        .use(Auth0Provider.getAuthorizedUserInfo)
        .post('', this.createEvent)
        .put('/:eventId', this.editEvent)
        .delete('/:eventId', this.cancelEvent)
    }

    async getEventTickets(req, res, next){
        try {
            const eventId = req.params.eventId
            const tickets = await ticketsService.getEventTickets(eventId)
            return res.send(tickets)
        } catch (error) {
            next(error)
        }
    }
    async editEvent(req, res, next) {
        try {
            const eventId = req.params.eventId
            const editedEventData = req.body
            const creatorId = req.userInfo.id
            const editedEvent = await eventsService.editEvent(eventId, editedEventData, creatorId)
            return res.send(editedEvent)

        } catch (error) {
            next(error)
        }
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
    async cancelEvent(req, res, next) {
        try {
            const eventId = req.params.eventId
            const requestorId = req.userInfo.id
            const event = await eventsService.cancelEvent(eventId, requestorId)
            return res.send(event)
        } catch (error) {
            next(error)
        }

    }
}