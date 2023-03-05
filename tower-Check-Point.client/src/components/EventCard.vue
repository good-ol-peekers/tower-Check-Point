<template>
    <router-link class="selectable" :to="{ name: 'Event', params: { eventId: events.id } }">

        <div v-if="events.capacity == 0" class="canceled">
            <div class="eventCard">
                <img class="eventImg image-fluid" :src="events.coverImg" alt="image should be here">
                <h5>{{ events.name }}</h5>
                <h5>{{ events.type }}</h5>
                <h5>{{ events.capacity }}</h5>
            </div>
        </div>

        <div v-else="events.capacity">
            <div class="eventCard">
                <img class="eventImg image-fluid" :src="events.coverImg" alt="image should be here">
                <div class="cardText">
                    <h5>{{ events.type }}</h5>
                    <h5>{{ events.name }}</h5>
                    <h5>{{ events.capacity }}</h5>
                </div>
            </div>
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
.eventCard {
    border: 2px solid black;
    overflow: hidden;
}

.eventImg {
    height: 40vh;
    width: auto;
    object-fit: cover;
    // overflow:hidden;
}

.cardText {
    margin: 5px 0px 5px 10px;
}


.canceled {
    color: rgba(230, 17, 17, 0.3)
}
</style>