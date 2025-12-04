Dashboard for when a user logs in or registers
Hardcoded values will be replaced with backend calls

<template>
    <div class="dashboard">
        <ClubHeader :role="role" :club="club"></ClubHeader>
        <div class="content-grid">
            <UpcomingEvents :events="events"></UpcomingEvents>
            <TaskList v-if="role === 'officer'" :tasks="tasks"></TaskList>
            <Notifications :notification="notifications"></Notifications>
        </div>
    </div>
</template>

<script setup>
import ClubHeader from '@/components/dashboard/dashboardHeader.vue'
import UpcomingEvents from '@/components/dashboard/upcomingEvents.vue'
import Notifications from '@/components/dashboard/notifications.vue'
import TaskList from '@/components/dashboard/taskList.vue'

//replace with backend call, send a SELECT query to db
const role = 'member' // or 'officer'
const club ={
    name: 'Nevada Cyber Club'
}
const events = [ //queried by navigating through user -> club membership -> club -> events
    { id: 1, title: "Welcome Night", description: "Meet the officers!", date: "8/30/25"},
    { id: 2, title: "Workshop", description: "Learn Linux basics.", date: "9/5/25"},
    
]
const notifications = [ //queried by navigating through user -> club membership -> club -> notifications
  { id: 1, message: "Welcome Night is about to start!" },
  { id: 2, message: "Dues are due on 9/30!" }
]

//if an officer
const tasks = [ //queried by navigating through user -> club membership (check role) -> club -> tasks
  { id: 1, title: "Prepare Workshop", description: "Finish materials", dueDate: "9/4/25" }
]
</script>

<style scoped>
.content-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 20px;
}
</style>