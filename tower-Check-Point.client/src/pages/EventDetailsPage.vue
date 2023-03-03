<template>
  <div class="EventDetailsPage mb-5 container-fluid" v-if="event">
    <div v-if="event.capacity == 0 || event.isCanceled == true" class="row eventCard canceled">
      <div class="col-6 canceledImg">
        <img class="img-fluid" :src="event.coverImg" alt="image">
      </div>
      <div class="col-6">
        <h1> {{ event.name }} </h1>
        <h1>{{ event.startDate }}</h1>
        <h2>{{ event.location }}</h2>
        <h2>{{ event.type }}</h2>
        <p>{{ event.description }}</p>
        <h1>{{ event.capacity }}</h1>
        <button class="btn btn-warning">Attend</button>
      </div>
    </div>
    <div v-else="event.capacity" class="row eventCard">
      <div class="col-4 d-flex align-items-center">
        <img class="img-fluid" :src="event.coverImg" alt="image">
      </div>
      <div class="col-6 d-flex align-items-center">
        <div class="row">
          <h1 class="col-12"> {{ event.name }} </h1>
          <h1 class="col-12">{{ event.startDate }}</h1>
          <h2 class="col-12">Location: {{ event.location }}</h2>
          <h2 class="col-12">Type: {{ event.type }}</h2>
          <p class="col-12">{{ event.description }}</p>
          <h1>Capacity: {{ event.capacity }}</h1>
          <button class="btn btn-warning col-2">Attend</button>
        </div>
      </div>
    </div>
  </div>

  <!-- v-if="event.capacity == 0 || event.isCanceled == true" -->

  <div class="container">
    <div class="row">
      <div class="col-10">
        <div>
          <form @submit.prevent="createComment()">
            <div class="mb-3">
              <label for="newComment" class="form-label">Create new comment</label>
              <input v-model="editable.body" required type="text" class="form-control" name="newComment" id="newComment"
                aria-describedby="enter new comment here">
            </div>
            <button class="btn btn-outline-success" type="submit"> create new comment </button>
          </form>
        </div>
      </div>
      <div class="col-10">
        <div v-for="c in comments">
          <CommentCard :comment="c" />
        </div>
      </div>
    </div>
  </div>


  <div>

  </div>
</template>

<script>
import { eventsService } from '../services/EventsService.js';
import Pop from '../utils/Pop.js';
import { useRoute, useRouter } from 'vue-router';
import { watchEffect, computed, onMounted, ref } from 'vue';
import { AppState } from '../AppState.js';
import { commentsService } from '../services/CommentsService.js';
import { logger } from '../utils/Logger';
import CommentCard from '../components/CommentCard.vue';

export default {
  setup() {

    const route = useRoute()
    const router = useRouter()

    const editable = ref({})



    async function getEventById() {
      try {
        const eventId = route.params.eventId

        await eventsService.getEventById(eventId);

      } catch (error) {
        Pop.error(error.message)
        router.push('/')
      }
    }

    // onMounted(() => {

    // })
    async function getAllComments() {
      try {
        const eventId = route.params.eventId
        await commentsService.getAllComments(eventId)
      } catch (error) {
        Pop.error(error, 'getAllComments() broken')
      }
    }



    watchEffect(() => {
      if (route.params.eventId) {
        getEventById()
        getAllComments()

      }
    })

    return {
      editable,
      event: computed(() => AppState.event),
      comments: computed(() => AppState.comments),

      async createComment() {
        try {

          let formData = editable.value
          formData.eventId = route.params.eventId
          let newComment = await commentsService.createComment(formData)
          logger.log(newComment)
          // editable = {}
        } catch (error) {
          Pop.error(error, 'Create a New Comment is Broken Yo!')
        }
      }


    }
  },
  components: { CommentCard }
}
</script>

<style scoped lang="scss">
.eventCard {
  // box-shadow: 5px, black, inset;
  border: 5px solid blue;
  height: 70vh;
  overflow: hidden;
}

img {
  height: 50vh;
  object-fit: cover;
  // object-position: bottom;
}

.canceled {
  color: rgba(230, 17, 17, 0.1)
}

.canceledImg {
  opacity: .08;
}
</style>