<template>
    <div class="colour-wrapper">
        <a class="colour-picker" href="#" v-if="dropperSupported" v-on:click.prevent="dropper">
            <dropper></dropper>
        </a>
        <input class="colour-select" type="color" v-model="colour" />
        <input class="colour-text" type="text" v-model="colour" />
    </div>
    <div class="opacity-wrapper">
        <input class="slider" type="range" min="0" max="100" v-model="opacity" />
    </div>
</template>

<script>

import Dropper from "./../icons/Dropper.vue";

const hasSupport = () => ('EyeDropper' in window);
const eyeDropper = new window.EyeDropper();

export default {
    name: "ColourPicker",
    components: {
        'dropper': Dropper
    },
    data() {
        return {
            dropperSupported: hasSupport,
            colour: '#000000',
            opacity: 0,
        }
    },
    methods: {
        dropper() {
            eyeDropper
                .open()
                .then((result) => {
                    this.colour = result.sRGBHex;
                })
                .catch(e => {
                    console.error(e);
                });
        }
    }
}
</script>

<style scoped lang="scss">
    .colour-wrapper {
        display: flex;

        .colour-picker {
            width: 28px;
            min-width: 28px;
            max-width: 28px;
            height: 28px;
            display: flex;
            padding: 5px;
            border-radius: 4px;
            justify-content: center;
            align-items: center;
            border: 1px solid #858585;
            margin-right: 5px;

            &:hover {
                background-color: #f4f4f4;
            }
        }

        .colour-select {
            height: 40px;
            width: 50px;
            min-width: 50px;
            max-width: 50px;
            border-radius: 4px 0 0 4px;
            border: 1px solid #858585;
            border-right: none;
        }

        .colour-text {
            color: #858585;
            border: 1px solid #858585;
            border-radius: 0 4px 4px 0;
            padding-left: 8px;
            font-size: 18px;
            line-height: 20px;
            width: 200px;
            min-width: 200px;
            max-width: 200px;

            &:focus-visible {
                outline: none;
            }
        }
    }

    .opacity-wrapper {
        padding-top: 10px;

        .slider {
            position: relative;
            border-radius: 4px;
            -webkit-appearance: none;
            width: 305px;
            height: 25px;
            background: url("../../assets/images/transparent.png");
            background-size: auto 100%;
            outline: none;
            -webkit-transition: .2s;
            transition: opacity .2s;
            z-index: 1;

            &:after {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                border-radius: 4px;
                background: linear-gradient(
                    90deg,
                    rgba(89, 89, 89, 1) 0%,
                    rgba(240, 240, 240, 0) 100%
                );
                z-index: 2;
            }
        }

        .slider::-webkit-slider-thumb {
          position: relative;
          -webkit-appearance: none;
          appearance: none;
          width: 25px;
          height: 25px;
          background: rgb(102, 153, 255);
          cursor: pointer;
          border-radius: 4px;
          border: 1px solid white;
          z-index: 3;
        }
    }
</style>
