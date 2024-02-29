<template>
    <button class="w-full bg-highlight py-3">
        <slot></slot>
    </button>
</template>

<style scoped>
button{
    transition: all 0.3s ease-out;
}
button:hover{
    background-color: #088ae7;
}
</style>