<template>
    <div>
        <v-switch v-model="editMode"></v-switch>
        <div class="grid-container" :class="{ 'edit-mode': editMode }">
            <div v-for="item in items" :key="item.id" class="grid-item" :style="{ height: item.height + 'px' }"
                :draggable="editMode" @dragstart="dragStart(item)" @dragover="dragOver" @drop="drop(item)">
                {{ item.content }}
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            editMode: false,
            items: [
                { id: 1, content: 'Item 1', height: 100 },
                { id: 2, content: 'Item 2', height: 150 },
                { id: 3, content: 'Item 3', height: 300 },
                { id: 4, content: 'Item 4', height: 100 },
                { id: 5, content: 'Item 5', height: 450 },
                { id: 6, content: 'Item 6', height: 100 },
                { id: 7, content: 'Item 7', height: 350 },
                { id: 8, content: 'Item 8', height: 590 },
                { id: 9, content: 'Item 9', height: 200 },
            ]
        };
    },
    methods: {
        dragStart(item) {
            event.dataTransfer.setData('text/plain', item.id);
        },
        dragOver(event) {
            event.preventDefault();
        },
        drop(targetItem) {
            if (!this.editMode) {
                return;
            }
            const draggedItemId = event.dataTransfer.getData('text/plain');
            const draggedItem = this.items.find(item => item.id === Number(draggedItemId));
            const targetIndex = this.items.findIndex(item => item.id === targetItem.id);
            const draggedItemIndex = this.items.indexOf(draggedItem);

            // Check if the dragged item is being dropped in a different column
            if (draggedItemIndex !== targetIndex) {
                // Remove the dragged item from its original column
                this.items.splice(draggedItemIndex, 1);
                // Insert the dragged item at the target column
                this.items.splice(targetIndex, 0, draggedItem);
            }
        }

    }
};
</script>

<style scoped>
.edit-mode .grid-item {
    cursor: move;
    opacity: 0.5;
}

.grid-container {
    columns: 6 250px;
    column-gap: 1rem;
    grid-gap: 10px;
    width: 90%;

    div {
        background: #2e2c2a;
        color: white;
        margin: 0 1rem 1rem 0;
        display: inline-block;
        width: 100%;
        text-align: center;
        font-family: system-ui;
        font-weight: 900;
        font-size: 2rem;
    }
}

.grid-item {
    color: #000000;
    background-color: #f2f2f2;
    padding: 10px;
    border-radius: 5px;
    transition: transform 0.3s ease-in-out;
}

.edit-mode .grid-item {
    cursor: move;
}
</style>