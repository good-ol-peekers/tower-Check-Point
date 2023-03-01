import BaseController from "../utils/BaseController";
import { Auth0Provider } from "@bcwdev/auth0provider";
import { commentsService } from "../services/CommentsService.js"; 
import { eventsService } from "../services/EventsService.js";
import { ticketsService } from "../services/TicketsService.js";
export class TicketsController extends BaseController {
constructor(){
    super('api/tickets')
    this.router
}
}