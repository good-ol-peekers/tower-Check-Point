import BaseController from "../utils/BaseController";
import { Auth0Provider } from "@bcwdev/auth0provider";
import { commentsService } from "../services/CommentsService.js"; 
export class CommentsController extends BaseController {
    constructor() {
        super('api/comments')
        // .post('', createComment)
        // .delete('/:commentId', deleteComment)
// FIGURE OUT PROFILE IN THE MODEL BEFORE CONTINUING
    }
}
