<template>
    <direction-slider></direction-slider>
    <colour-picker></colour-picker>
</template>

<script>

import ColourPicker from "./tools/ColourPicker.vue";
import DirectionSlider from "./tools/DirectionSlider.vue";

export default {
    name: "App",
    components: {
        'colour-picker': ColourPicker,
        'direction-slider': DirectionSlider,
    }
}
</script>

<style scoped>

</style>
