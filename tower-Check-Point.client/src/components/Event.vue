<template>
    <router-link class="selectable" :to="{ name: 'Event', params: { eventId: event.id }}">
        <div class="event">
            <img :src="event.coverImg" alt="image should be here">
            <h1>{{ event.name }}</h1>
            <h1>{{ event.type }}</h1>
            <h1>{{ event.capacity }}</h1>
        </div>
    </router-link>
</template>


<script>
export default {
    props: { event: { type: Event, required: true} },
    setup(){
        
        return {}
    }
}
</script>


<style lang="scss" scoped>

</style>