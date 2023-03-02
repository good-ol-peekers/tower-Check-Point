<template>
    <router-link class="selectable" :to="{ name: 'Event', params: { eventId: events.id } }">
        <div class="eventCard">
            <img class="eventImg" :src="events.coverImg" alt="image should be here">
            <h1>{{ events.name }}</h1>
            <h1>{{ events.type }}</h1>
            <h1>{{ events.capacity }}</h1>
        </div>
    </router-link>
</template>


<script>
import { Event } from '../models/Event';

export default {
    props: { events: { type: Event, required: true } },
    setup() {

        return {}
    }
}
</script>


<style lang="scss" scoped>
.eventImg {
    height: 30vh;
    width: auto;

}

.eventCard {
    border: 2px solid black;

}
</style>