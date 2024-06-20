<template>
    <div>
        <div id="task-container">
            <div class="taskview-item" id="taskview-item-add">
                <v-text-field type="text" label="Add a new task" v-model="newTask" hide-details="auto" @keyup.enter="addTask"></v-text-field>
            </div>
            <div class="taskview-item" v-for="task in tasks" :key="task.id">
                <div class="taskview-item-content">
                    <v-checkbox hide-details="true" v-model="task.finished"></v-checkbox>
                    <span>{{ task.content }}</span>
                </div>
                <v-icon @click="deleteTask(task.id)">mdi-delete</v-icon>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            newTask: '',
            tasks: [
                { id: 1, content: 'Task 1', finished: false },
                { id: 2, content: 'Task 2', finished: false },
                { id: 3, content: 'Task 3', finished: false },
                { id: 4, content: 'Task 4', finished: false },
                { id: 5, content: 'Task 5', finished: false },
            ]
        };
    },
    methods: {
        addTask() {
            if (!this.newTask) {
                return;
            }
            this.tasks.push({ id: this.tasks.length + 1, content: this.newTask, finished: false });
            this.newTask = '';
        },
        deleteTask(id) {
            this.tasks = this.tasks.filter(task => task.id !== id);
        }
    }
};
</script>

<style scoped>
#task-container {
    display: flex;
    flex-direction: column;
    gap: 10px;
}
.taskview-item {
    min-width: 300px;
    background: #2e2e2e;
    padding: 10px;
    border-radius: 5px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}
.taskview-item-content {
    display: flex;
    flex-direction: row;
    align-items: center;
}
</style>
