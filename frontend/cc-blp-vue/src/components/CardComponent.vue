<template>
    <div class="card" :class="variant">
        <div class="title">{{ title }}</div>
        <div class="content"> {{ content }} </div>
    </div>
</template>

<script setup lang="ts">

defineProps({
    title: String,
    variant: String,
    content: String
});


</script>

<style lang="scss">
.card {
    width: 200px;
    height: 200px;
    background: #e6e6ea;
    margin: 1em;
    border-radius: 10px;
    font-size: 12px;
}

.title {

    font-size: 24px;
    padding: 5px;
}

.content {
    font-size: 30px;
    padding: 2em;
}

.neutral {}

.positive {
    background-color: rgb(140, 204, 140);
}

.negative {
    background-color: rgb(209, 178, 178);
}
</style>