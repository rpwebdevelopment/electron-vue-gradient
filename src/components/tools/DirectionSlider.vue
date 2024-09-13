<template>
    <div class="direction-wrapper">
        <label for="direction_slider">Direction:</label>
        <div class="slider-wrap">
            <round-slider
                :v-model="degree"
                name="direction_slider"
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
            degree: 0
        }
    },
    methods: {
        tooltipFormat() {
            return {
                'font-size': '10px'
            }
        }
    }
}
</script>

<style scoped lang="scss">
    .direction-wrapper {
        padding-bottom: 10px;

        .slider-wrap {
            padding-top: 10px;
        }
    }
</style>
