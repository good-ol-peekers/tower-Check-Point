<template>
    <!-- <router-link > -->
        <div class="eventCard">
            <img :src="events.coverImg" alt="image should be here">
            <h1>{{ events.name }}</h1>
            <h1>{{ events.type }}</h1>
            <h1>{{ events.capacity }}</h1>
        </div>
    <!-- </router-link> -->
</template>
class="selectable" :to="{ name: 'Event', params: { eventId: event.id }}"

<script>
export default {
    props: { events: { type: Event, required: true} },
    setup(){
        
        return {}
    }
}
</script>


<style lang="scss" scoped>

</style>