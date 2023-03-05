<template>
  <div class="AccountPage text-center">
    <h1>Welcome {{ account.name }}</h1>
    <img class="rounded" :src="account.picture" alt="" />
    <p>{{ account.email }}</p>
  </div>

  <div v-if="myEvents" class="container-fluid">
    <div class="row">
      <div class="col-3 mt-4" v-for="e in myEvents">
        <eventCard :events="e" />
      </div>
    </div>
  </div>
</template>

<script>

import { eventsService } from '../services/EventsService.js';
import { onMounted, computed } from 'vue';
import { AppState } from '../AppState.js';
import Pop from '../utils/Pop.js';
import EventCard from '../components/EventCard.vue';

export default {
  setup() {

    onMounted(() => {
      getMyEvents()
    })

    async function getMyEvents() {
      try {
        await eventsService.getMyEvents();
      } catch (error) {
        Pop.error
      }
    }





    return {
      attendees: computed(() => AppState.attendees),
      account: computed(() => AppState.account),
      myEvents: computed(() => AppState.myEvents),
      events: computed(() => AppState.events)

    }
  },
  components: { EventCard }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
