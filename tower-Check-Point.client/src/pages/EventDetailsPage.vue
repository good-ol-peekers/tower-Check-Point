<template>
  <div class="EventDetailsPage container-fluid" v-if="event">
    <div class="row eventCard">
      <div class="col-4">
        <img :src="event.coverImg" alt="image">
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
  </div>
</template>

<script>
import { eventsService } from '../services/EventsService.js';
import Pop from '../utils/Pop.js';
import { useRoute, useRouter } from 'vue-router';
import { watchEffect, computed } from 'vue';
import { AppState } from '../AppState.js';

export default {
  setup() {

    const route = useRoute()
    const router = useRouter()


  async function getEventById() {
    try {
      const eventId = route.params.eventId
      
      await eventsService.getEventById(eventId);

    } catch (error) {
      Pop.error(error.message)
      router.push('/')
    }
  }
  
  watchEffect(() => {
    if (route.params.eventId){
      getEventById()
    }
  })

    return {
      event: computed(() => AppState.event),
    }
  }
}
</script>

<style scoped lang="scss">

.eventCard{
  // box-shadow: 5px, black, inset;
  border: 5px solid blue;
  height: 50vh;
  overflow: hidden;
}

img {
    height: 50vh;
    object-fit: cover;
    // object-position: bottom;
  }


</style>