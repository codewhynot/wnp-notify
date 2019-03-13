class Notify {
    constructor ({...params} = {}) {

        const {
            customClass,
            defaultMessage,
            maxCount,
            customID,
            debounceDelay,
            showTime,
        } = params;

        this.body = document.querySelector('body');
        this.id = customID ? customID : this.randomID(5);
        this.defaultMessage = defaultMessage ? defaultMessage : 'Whynotpack notify! ;)';
        this.customClass = customClass ? customClass : 'default';
        this.maxCount = maxCount ? maxCount : 5;
        this.debounceDelay = debounceDelay ? debounceDelay : 0.3;
        this.showTime = showTime ? showTime : 2;

        //init wrapper
        this.appendWrapper(this.id);

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

    createWrapper (id) {
        const wrapper = this.make('div');
        wrapper.classList.add('notify__wrapper');
        wrapper.setAttribute('id', id);
        return wrapper;
    }

    debounce (callback, delay) {
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
            callback();
        }, delay)
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
        box.classList.add('notify' + this.id);
        box.classList.add(this.customClass);
        box.classList.add(notifyType);
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

    showElement (type, data) {
        const area = document.querySelector('#' + this.id);
        area.appendChild(this.createElement(type,data))
    }

    appendWrapper (id) {
        const wrapper = this.createWrapper(id);
        this.body.appendChild(wrapper);
    }

    getLength () {
        const items = document.querySelectorAll('.notify' + this.id);
        return [...items].length;
    }

    message (type, data) {
        if (this.getLength() >= this.maxCount) return false;
        this.debounce(() => {
            this.showElement(type,data);
        }, this.debounceDelay * 1000);
    }
}

export {Notify}