import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"
import { eventsService } from "./EventsService.js"
class CommentsService {
   async deleteComment(commentId, creatorId) {

       let comment = await dbContext.Comments.findById(commentId)
    
       if (!comment) {
        throw new BadRequest('there is no comment with that id')
       }
       if(comment.creatorId != creatorId){
        throw new Forbidden('not your comment to delete')
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