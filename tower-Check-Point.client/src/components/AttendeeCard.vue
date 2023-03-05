<template>
    <div class="AttendeeCard">

        <h1>
            {{ attendee.profile.name }}
        </h1>

        <img :src="attendee.profile.picture" alt="image here">

    </div>
</template>


<script>
import { EventAttendee } from '../models/Event';


export default {
    props: { attendee: { type: EventAttendee, required: true } },
    setup() {
        return {}
    }
}
</script>


<style lang="scss" scoped></style>