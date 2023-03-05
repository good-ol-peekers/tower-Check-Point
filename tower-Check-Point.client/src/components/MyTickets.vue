<template>
    <div class="MyTickets">

        <div v-if="tickets">
        <h1>{{ tickets.id }}</h1>
        </div>

    </div>
</template>


<script>
import { EventAttendee } from '../models/Event';
export default {
    props:{ tickets: {type: EventAttendee, required: true} },
    setup(){
        return {}
    }
}
</script>


<style lang="scss" scoped>

</style>