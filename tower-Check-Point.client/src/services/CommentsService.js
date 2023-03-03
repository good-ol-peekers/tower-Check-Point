import { AppState } from "../AppState.js"
import { api } from "./AxiosService.js"
import { Comment } from "../models/Comment.js"
import { logger } from "../utils/Logger.js"

class CommentsService {


    async deleteComment(commentId){
        const res = await api.delete('api/comments/' + commentId)
        console.log(res)
        let i = AppState.comments.findIndex(c => c.id == commentId)
        if(i != -1){
            AppState.comments.splice(i, 1)
        }
    }
    async createComment(formData){
        const res = await api.post('api/comments', formData)
        logger.log('CREATING COMMENT', res.data)
        AppState.comments.push(new Comment(res.data))
        return res.data 
    }

    async getAllComments(eventId){
        const res = await api.get('api/events/' + eventId + '/comments')
        AppState.comments = res.data.map(c => new Comment(c))
        console.log(AppState.comments)
    }

}
export const commentsService = new CommentsService()