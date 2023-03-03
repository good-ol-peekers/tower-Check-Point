import BaseController from "../utils/BaseController";
import { Auth0Provider } from "@bcwdev/auth0provider";
import { eventsService } from "../services/EventsService.js";
import { ticketsService } from "../services/TicketsService.js";
export class TicketsController extends BaseController {
constructor(){
    super('api/tickets')
    this.router
    .use(Auth0Provider.getAuthorizedUserInfo)
    .post('', this.createATicket)
    .delete('/:ticketId', this.deleteTicket)
    
}
async createATicket(req, res, next) {
    try {
        const ticketData = req.body
        ticketData.accountId = req.userInfo.id
        const ticket = await ticketsService.createATicket(ticketData)
        return res.send(ticket)
    } catch (error) {
        next(error)
    }
}
async deleteTicket(req, res, next){
    try {
        const creatorId = req.userInfo.id
        const ticketId = req.params.ticketId
        const ticket = await ticketsService.DeleteTicket(creatorId, ticketId)
        return res.send(ticket)
    } catch (error) {
        next(error)
    }
}

}