<template>
    <header class="club-header">
        <h1>Hey there, {{ role === 'officer' ? 'Officer : 'Member' }}!</h1>

        <div class="date">{{ formattedDate }}</div>

        <div class="club-row">
            <div class="icon"></div>
            <h2>{{ club.name }}</h2>
        </div>
    </header>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
    role: String,
    club: Object,
})

const formattedDate = computed(() =>
    new Date().toLocaleDateString("en-US",{
        month: "long",
        day: "numeric",
        year: "numeric"
    })
)
</script>

<style scoped>
.club-header{
    margin-bottom: 25px;
}
.date {
    background: #1f4e79;
    color: white;
    padding: 8px 12px;
    border-radius: 8px;
    display: inline-block;
    margin-top: 10px;
}
.club-row {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-top: 15px;
}
//placeholder for club icon
.icon {
    width: 45px;
    height: 45px;
    background: #ccc
    border-radius: 50%;
}
</style>