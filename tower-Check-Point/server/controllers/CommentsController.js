import BaseController from "../utils/BaseController";
import { Auth0Provider } from "@bcwdev/auth0provider";
import { commentsService } from "../services/CommentsService.js"; 
export class CommentsController extends BaseController {
    constructor() {
        super('api/comments')
        this.router
        .use(Auth0Provider.getAuthorizedUserInfo)
        .post('', this.createComment)
        .delete('/:id', this.deleteComment)

    }

    async deleteComment(req, res, next){
        try {
            let commentId = req.params.id
            let creatorId = req.userInfo.id
            let comment = await commentsService.deleteComment(commentId, creatorId)
            return res.send(comment)
        } catch (error) {
            next(error)
        }
    }
    async createComment(req, res, next) {
        try {
            let commentData = req.body
            //  let creatorId = req.userInfo.id
            commentData.creatorId = req.userInfo.id
            let comment = await commentsService.createComment(commentData)
            return res.send(comment)            
        } catch (error) {
            next(error)
        }
    }
}
