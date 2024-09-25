<template>
    <div class="header-wrap">
        <vue-slider @change="resetGradient" ref="slider" v-model="dots"></vue-slider>
        <direction-slider @direction-updated="resetGradient"></direction-slider>
    </div>

    <colour-picker v-for="i in index" :index="i - 1" @colour-updated="resetGradient"></colour-picker>

    <div class="button-wrap">
        <button v-on:click="incrementIndex" class="add-button">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 448 512">
                <path d="M64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-320c0-35.3-28.7-64-64-64L64 32zM200 344l0-64-64 0c-13.3 0-24-10.7-24-24s10.7-24 24-24l64 0 0-64c0-13.3 10.7-24 24-24s24 10.7 24 24l0 64 64 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-64 0 0 64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"/>
            </svg>
            Add
        </button>
        <button v-on:click="decrementIndex" class="remove-button">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 448 512">
                <path d="M64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-320c0-35.3-28.7-64-64-64L64 32zm88 200l144 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-144 0c-13.3 0-24-10.7-24-24s10.7-24 24-24z"/>
            </svg>
            Remove
        </button>
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
        background: #F9F9F9;
        -webkit-app-region: drag;

        & > * {
          -webkit-app-region: none;
        }

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
            display: flex;
            margin-bottom: 20px;

            button {
                display: flex;
                align-items: center;
                justify-content: center;
                border: none;
                padding: 5px 10px;
                border-radius: 4px;
                cursor: pointer;
                width: 110px;
                color: #fff;
            }

            .add-button {
                background-color: rgb(102, 153, 255);
                margin-right: 8px;
            }

            .remove-button {
                background-color: #ee4949;
            }

            svg {
                fill: #fff;
                margin-right: 5px;
            }
        }
    }
</style>
