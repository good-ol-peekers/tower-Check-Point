<template>
    <div class="CommentCard">
        <div class="commentsStyle my-2">

            <img :src="comment.creator.picture" alt="">
            <h1>{{ comment.body }}</h1>
            <h3>{{ comment.creator.name }}</h3>
            <button class="btn btn-outline-danger" @click="deleteComment(comment.id)">Delete Comment</button>
        </div>
    </div>
</template>


<script>
import { AppState } from '../AppState';
import { Comment } from '../models/Comment';
import { commentsService } from '../services/CommentsService.js';
import Pop from '../utils/Pop';
export default {
    props: { comment: { type: Comment, required: true } },
    setup() {

        return {
            async deleteComment(commentId) {
                try {
                    await commentsService.deleteComment(commentId)
                } catch (error) {
                    Pop.error(error, 'cannot delete that comment')
                }
            }
        }
    }
}

</script>


<style lang="scss" scoped>
.commentsStyle {
    border: 1px solid black;
}
</style>