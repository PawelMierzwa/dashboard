<template>
    <div>
        <div class="toggle-switch" @click="toggleEditMode">
            <input type="checkbox" v-model="editMode" class="toggle-switch-checkbox">
            <label class="toggle-switch-label" for="toggle-switch-checkbox"></label>
        </div>
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
                { id: 3, content: 'Item 3', height: 200 },
                { id: 4, content: 'Item 4', height: 100 },
                { id: 5, content: 'Item 5', height: 150 },
                { id: 6, content: 'Item 6', height: 200 },
                { id: 7, content: 'Item 7', height: 100 },
                { id: 8, content: 'Item 8', height: 150 },
                { id: 9, content: 'Item 9', height: 200 },
            ]
        };
    },
    methods: {
        toggleEditMode() {
            this.editMode = !this.editMode;
        },
        dragStart(item) {
            event.dataTransfer.setData('text/plain', item.id);
        },
        dragOver(event) {
            event.preventDefault();
        },
        drop(targetItem) {
            const draggedItemId = event.dataTransfer.getData('text/plain');
            const draggedItem = this.items.find(item => item.id === Number(draggedItemId));
            const targetIndex = this.items.findIndex(item => item.id === targetItem.id);
            this.items.splice(targetIndex, 0, this.items.splice(this.items.indexOf(draggedItem), 1)[0]);
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
    @for $i from 1 through 36 {
        div:nth-child(#{$i}) {
            $h: (
                random(400) + 100) + px;
            height: $h;
            line-height: $h;
        }
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

.toggle-switch {
    position: relative;
    display: inline-block;
    width: 60px;
    height: 34px;
}

.toggle-switch-checkbox {
    display: none;
}

.toggle-switch-label {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #ccc;
    border-radius: 34px;
    cursor: pointer;
}

.toggle-switch-checkbox:checked+.toggle-switch-label {
    background-color: #2196F3;
}

.toggle-switch-label:before {
    content: '';
    position: absolute;
    top: 4px;
    left: 4px;
    width: 26px;
    height: 26px;
    background-color: white;
    border-radius: 50%;
    transition: transform 0.3s ease-in-out;
}

.toggle-switch-checkbox:checked+.toggle-switch-label:before {
    transform: translateX(26px
    );
}
</style>