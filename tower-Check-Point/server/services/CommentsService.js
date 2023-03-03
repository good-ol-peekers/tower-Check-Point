import { dbContext } from "../db/DbContext.js"
import { BadRequest } from "../utils/Errors.js"
import { eventsService } from "./EventsService.js"
class CommentsService {
   async deleteComment(commentId) {
       let comment = await dbContext.Comments.findById(commentId)
       if (!comment) {
        throw new BadRequest('there is no comment with that id')
       }
       await comment.remove()
       return 'comment successfully deleted'
   }
   async getEventComments(eventId) {
    // get all the comments that have this event ID

       let comments = await dbContext.Comments.find({eventId}).populate('creator')
       return comments
   }
   async createComment(commentData) {
        // const eventId = await eventsService.getEventById(commentData.eventId)
        
        const newComment = await dbContext.Comments.create(commentData)
        await newComment.populate('creator', 'name picture')
        return newComment
    }


    
}
export const commentsService = new CommentsService()