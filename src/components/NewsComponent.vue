<template>
    <div class="p-6 bg-center border border-highlight text-left" :style="{ 'background-image': 'url(\'src/assets/img/home-' + bg + '.jpg\')', 'flex': width }">
        <p class="text-2xl font-oswald mb-4">{{ title }}</p>
        <p class="text-md">{{ text }}</p>
    </div>
</template>
    
<script>
export default {
    props: ['title', 'text', 'bg', 'width']
}
</script>

<style scoped>
</style>