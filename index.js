class Notify {
    constructor ({...params}) {

        const {customClass, defaultMessage, maxCount} = params;

        this.body = document.querySelector('body');
        this.defaultMessage = defaultMessage !== undefined && defaultMessage !== ''
            ? defaultMessage : 'Whynotpack notify! ;)';

        this.customClass = customClass !== undefined && customClass !== ''
            ? customClass : 'default';

        this.maxCount = maxCount !== undefined && maxCount < 10
            ? maxCount : 5;
    }
    make (tag) {
        return document.createElement(tag);
    }

    generateChar () {
        let chars = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
        let min = 0;
        let max = chars.length;
        let char = Math.floor(min+(max-min)* Math.random());
        return chars[char];
    }

    generateID () {
        let min = 1;
        let max = 9;
        let result = min + (max-min)* Math.random();
        return Math.round(result);
    }

    randomID (length) {
        let result = [];
        for(let i = 0; i < length; i++) {
            result.push(this.generateChar(), this.generateID());
        }
        return result.join('');
    }

    createElement (type,data) {
        const notifyType = type === 'e' ? 'error' : type === 's' ? 'success' : 'warning';

        const notifyText = data !== undefined ? data
            : this.defaultMessage;

        //creating elements
        const box = this.make('div');
        const icon = this.make('div');
        const description = this.make('div');
        const text = this.make('span');

        //adding classes
        box.classList.add('notify');
        box.classList.add(this.customClass);
        box.classList.add(notifyType);
        box.setAttribute('id', this.randomID(3));
        icon.classList.add('notify__icon');
        description.classList.add('notify__description');
        text.classList.add('notify__text');

        //appending elements
        box.appendChild(icon);
        text.textContent = notifyText;
        description.appendChild(text);
        box.appendChild(description);

        return box;
    }
}

export {Notify}