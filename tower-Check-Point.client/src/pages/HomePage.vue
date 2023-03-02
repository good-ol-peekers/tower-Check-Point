<template>
  <div>
    <h1>
      home page
  </h1>
  
  <div v-if="events" class="container-fluid">
    <div class="row">
      <div class="col-2" v-for="e in events">
          <eventCard :events="e"/>
      </div>
    </div>
  </div>
 
  <div class="container-fluid">
    <div class="row">
      <div class="col-6">
  <div>
      <form @submit.prevent="createNewEvent()">
        <div>
          <label for="name" class="form-label" >event name</label>
          <input v-model="editable.name" required type="text" class="form-control" name="name" id="name" aria-describedby="enter event name">
        </div>
        <div>
            <label for="description" class="form-label">event description</label>
            <input v-model="editable.description" required type="text" class="form-control" name="description" id="description" aria-describedby="enter event description">
        </div>
         <div>
              <label for="coverImg" class="form-label">event cover image</label>
              <input v-model="editable.coverImg" required type="url" class="form-control" name="coverImg" id="coverImg" aria-describedby="enter event cover image url">
        </div>
         <div>
              <label for="location" class="form-label">event location</label>
               <input v-model="editable.location" required type="text" class="form-control" name="location" id="location" aria-describedby="enter event location">
         </div>
          <div>
                <label for="capacity" class="form-label">event capacity</label>
                <input v-model="editable.capacity" required type="number" class="form-control" name="capacity" id="capacity" aria-describedby="enter event capacity">
          </div>
                 <div>
                <label for="startDate" class="form-label">event start date</label>
                <input v-model="editable.startDate" required type="date" class="form-control" name="startDate" id="startDate" aria-describedby="enter event start date">
          </div>
          <div>
                <label for="type" class="form-label">event type</label>
               <select v-model="editable.type" class="form-select mb-4" required name="type" id="type">
                 <option selected value="concert">concert</option>
                 <option value="convention">convention</option>
                 <option value="sport">sport</option>
                 <option value="digital">digital</option>
                </select>
          </div>
        <button class="btn btn-outline-success" type="submit"> create new event </button>
      </form>
    </div>
      </div>
    </div>
  </div>
  

</div>
</template>

<script>
import { onMounted, computed, ref } from 'vue';
import { AppState } from '../AppState.js';
import { eventsService } from '../services/EventsService.js';
import { logger } from '../utils/Logger';
import Pop from '../utils/Pop.js';
import EventCard from '../components/EventCard.vue';

export default {
  setup() {

    async function getAllEvents() {
      try {
        await eventsService.getAllEvents();
      } catch (error) {
        Pop.error
      }
    }
    
    onMounted(() => {
      getAllEvents();
    });
    
    const editable = ref({ type: 'concert' });
      
    return {
      editable,

      events: computed(() => AppState.events),

      async createNewEvent() {
        try {
          const formData = editable.value
          await eventsService.createNewEvent(formData)
          editable.value = {}
        } catch (error) {
          logger.error(error)
          Pop.error(error.message)
        }
      }
    };
  },
  components: { EventCard }
}
</script>

<style scoped lang="scss">
.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;

  .home-card {
    width: 50vw;

    >img {
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}
</style>
