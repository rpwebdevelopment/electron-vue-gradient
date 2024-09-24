<template>
    <div class="header-wrap">
        <vue-slider @change="resetGradient" ref="slider" v-model="dots"></vue-slider>
        <direction-slider @direction-updated="resetGradient"></direction-slider>
    </div>

    <colour-picker v-for="i in index" :index="i - 1" @colour-updated="resetGradient"></colour-picker>

    <div class="button-wrap">
        <button v-on:click="incrementIndex">Add Point</button>
        <button v-on:click="decrementIndex">Remove Point</button>
    </div>

    <code-editor
        v-model="content"
        :languages="[['css']]"
        :tab-spaces="4"
        :wrap="false"
        :read-only="true"
        min-width="580px"
        max-width="580px"
        border-radius="4px"
    >
    </code-editor>
</template>

<script>

import ColourPicker from "./tools/ColourPicker.vue";
import DirectionSlider from "./tools/DirectionSlider.vue";
import HexToRgb from "../assets/js/HexToRgb";

export default {
    name: "App",
    data() {
        return {
            index: 3,
            gradient: '',
            mozGradient: '',
            webkitGradient: '',
            fallback: '',
            dots: [0,50,100],
            content: "background: #000000;\n" +
                "background: -moz-linear-gradient(0deg, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 1) 50%, rgba(0, 0, 0, 1) 100%);\n" +
                "background: -webkit-linear-gradient(0deg, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 1) 50%, rgba(0, 0, 0, 1) 100%);\n" +
                "background: linear-gradient(0deg, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 1) 50%, rgba(0, 0, 0, 1) 100%);",
        }
    },
    components: {
        'colour-picker': ColourPicker,
        'direction-slider': DirectionSlider,
    },
    methods: {
        setGradient() {
            let styling = '',
                elements = [],
                direction = (
                    document
                        .getElementById('slider-container')
                        .getElementsByTagName('input')
                )[0].value + 'deg';

            elements.push(direction);
            this.fallback = document.getElementById(`colour_0`).value;

            for (let i = 0; i < this.index; i++) {
                let colourBase = document.getElementById(`colour_${i}`).value,
                    opacityBase = document.getElementById(`opacity_${i}`).value,
                    opacity = (100 - opacityBase) / 100,
                    colour = HexToRgb.setHex(colourBase).setOpacity(opacity).toRgb(),
                    position = `${this.$refs.slider.dots[i].pos}%`;

                elements.push(`${colour} ${position}`);
            }

            styling = elements.join(', ');
            this.gradient = `linear-gradient(${styling})`;
            this.mozGradient = `-moz-${this.gradient}`;
            this.webkitGradient = `-webkit-${this.gradient}`;
            this.content = `background: ${this.fallback};` + "\n" +
                `background: ${this.mozGradient};` + "\n" +
                `background: ${this.webkitGradient};` + "\n" +
                `background: ${this.gradient};`;
        },
        resetGradient() {
            setTimeout(this.setGradient, 10);
        },
        setPoints() {
            let percent = 100 / (this.index - 1);

            this.dots = [];
            for (let i = 0; i < this.index; i++) {
              this.dots.push(i * percent)
            }

            this.$refs.slider.setValue(this.dots);
        },
        incrementIndex() {
            this.index += 1;
            this.setPoints()
            this.resetGradient();
        },
        decrementIndex() {
            if (this.index > 2) {
                this.index -= 1;
                this.setPoints();
                this.resetGradient();
            }
        },
    },
    mounted() {
        this.resetGradient();
    }
}
</script>

<style lang="scss">
    body {
        font-family: Roboto, Helvetica, Arial !important;

        .header-wrap {
            display: flex;
            align-items: end;
            justify-content: space-between;
            min-width: 580px;
            max-width: 580px;
            margin-bottom: 20px;

            label {
                line-height: 12px;
                font-size: 12px;
            }

            .vue-slider {
                height: 80px !important;
                max-width: 450px;
                min-width: 450px;

                .vue-slider-rail {
                    background: url("../assets/images/transparent.png");
                    background-size: auto 100%;
                    border-radius: 4px;
                    border: 1px solid #ccc;
                    z-index: 1;

                    &:after {
                        content: '';
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        border-radius: 4px;
                        background: v-bind(fallback);
                        background: v-bind(mozGradient);
                        background: v-bind(webkitGradient);
                        background: v-bind(gradient);
                        z-index: 2;
                    }

                    .vue-slider-process {
                        background-color: unset !important;
                    }

                    .vue-slider-dot {
                        width: 20px !important;
                        height: 82px !important;

                        .vue-slider-dot-handle {
                            border-radius: 3px !important;
                        }

                        .vue-slider-dot-tooltip-inner {
                            background-color: rgb(102, 153, 255) !important;
                            border-color: rgb(102, 153, 255) !important;
                        }
                    }
                }
            }
        }

        .button-wrap {
            margin-bottom: 20px;
        }
    }
</style>
