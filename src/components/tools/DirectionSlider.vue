<template>
    <div class="direction-wrapper">
        <label for="direction_slider">Direction:</label>
        <div class="slider-wrap" id="slider-container">
            <round-slider
                :change="changed"
                start-angle="90"
                width="6"
                min="0"
                max="360"
                step="1"
                radius="40"
            />
        </div>
    </div>
</template>

<script>
import VueRoundsliderEsm from "vue-three-round-slider";

export default {
    name: "DirectionSlider",
    components: {
        'round-slider': VueRoundsliderEsm,
    },
    data() {
        return {
            degree: 90
        }
    },
    methods: {
        tooltipFormat() {
            return {
                'font-size': '10px'
            }
        },
        changed(val) {
            this.$emit('direction-updated');
        }
    }
}
</script>

<style scoped lang="scss">
    .direction-wrapper {
        padding-bottom: 7px;

        .slider-wrap {
            padding-top: 10px;
        }
    }
</style>
