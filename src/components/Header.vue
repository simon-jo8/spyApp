<script setup>
    const { isActive } = defineProps({
        isActive: Boolean,
    });

</script>

<template>
    <div class="flex items-center">
        <img src="../assets/img/logo-sentinelle.svg" alt="" :class="{ 'rotate': isActive }" @click="test">
            <span id="text"
            :class="['text-red', 'font-oswald', 'text-xl', 'font-medium', 'ml-3', { 'opacity': isActive }]">{{ isActive ?
                'SENTINEL' : 'TINSEL' }}</span>
    </div>
</template>

<style scoped>
* {
    transition: all 0.2s ease-out;
}

.rotate {
    animation: rotateAnimation 1.5s linear forwards;
}

@keyframes rotateAnimation {
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(180deg);
    }
}

.opacity {
    animation: opacityAnimation 1.5s linear forwards;
}

@keyframes opacityAnimation {
    0% {
        opacity: 0;
    }

    50% {
        opacity: 0;
    }

    100% {
        opacity: 1;
    }
}

</style>