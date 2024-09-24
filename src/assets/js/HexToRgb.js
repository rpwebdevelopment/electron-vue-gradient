class HexToRgb {
    constructor() {
        this.hexVal = '#000000';
        this.opacity = 1;
    };

    isValid(val) {
        return /^#([A-Fa-f0-9]{3}){1,2}$/.test(val)
    };

    setHex(val) {
        if (!this.isValid(val)) {
            return this;
        }

        if (val.length === 7) {
            this.hexVal = val;
        } else if (val.length === 4) {
            let part = val.substr(val.length - 3);
            this.hexVal = val + part;
        }

        return this;
    };

    setOpacity(opacity)  {
        if (isNaN(opacity) || opacity > 1 || opacity < 0) {
            return this;
        }

        this.opacity = opacity;

        return this;
    };

    toRgb() {
        let r = parseInt(this.hexVal.slice(1, 3), 16),
            g = parseInt(this.hexVal.slice(3, 5), 16),
            b = parseInt(this.hexVal.slice(5, 7), 16);

        return `rgba(${r}, ${g}, ${b}, ${this.opacity})`;
    }
}

export default new HexToRgb();
