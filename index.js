'use strict'

class Notify {
    constructor ({...params} = {}) {

        const {
            customClass,
            defaultMessage,
            maxCount,
            customID,
            showTime,
            autoDelete,
        } = params;

        this.body = document.querySelector('body');
        this.id = customID ? customID : this.randomID(5);
        this.defaultMessage = defaultMessage ? defaultMessage : 'Whynotpack notify! ;)';
        this.customClass = customClass ? customClass : 'default';
        this.maxCount = maxCount ? maxCount : 10;
        this.showTime = showTime ? showTime : 5;
        this.autoDelete = autoDelete ? autoDelete : false;

        //init wrapper
        this.appendWrapper(this.id);

        // notify wrapper
        this.area = document.querySelector('#' + this.id);

        //notify array
        this.notify = [];

        //delete array
        this.autoDeleteArray = [];

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
        wrapper.classList.add('wnp-notify__wrapper');
        wrapper.setAttribute('id', id);
        return wrapper;
    }

    createElement (type,data,callback) {
        const notifyType = type === 'e' ? 'error' : type === 's' ? 'success' : 'info';
        const notifyText = data ? data : this.defaultMessage;
        const notifyID = this.randomID(3);

        //creating elements
        const box = this.make('div');
        const icon = this.make('div');
        const description = this.make('div');
        const title = this.make('span');
        const desc = this.make('span');
        const close = this.make('div');

        //adding classes
        box.classList.add('wnp-notify');
        box.setAttribute('id',notifyID);
        box.classList.add(this.customClass);
        box.classList.add(notifyType);
        icon.classList.add('wnp-notify__icon');
        description.classList.add('wnp-notify__description');
        title.classList.add('wnp-notify__text');
        desc.classList.add('wnp-notify__desc');
        close.classList.add('wnp-notify__close');

        //appending elements
        box.appendChild(icon);
        box.appendChild(close);
        title.textContent = notifyText;
        desc.textContent = 'View details';
        description.appendChild(title);
        description.appendChild(desc);
        box.appendChild(description);
        callback(box,notifyID);
    }

    showElement (id,callback) {
        this.setVisibility();
        setTimeout(() => {
            document.querySelector('#' + id).classList.add('isVisible');
        },50);
        callback();
    }

    appendWrapper (id) {
        const wrapper = this.createWrapper(id);
        this.body.appendChild(wrapper);
    }

    closeNotify (id) {
        document.querySelector('#' + id + ' .wnp-notify__close').removeEventListener('click', this.closeNotify.bind(this, id));
        this.notify.forEach((target, index) => {
            if (target.item.id === id) {
                clearTimeout(this.autoDeleteArray[index]);
                this.autoDeleteArray.splice(index, 1);
                this.deleteElement(this.notify.splice(index, 1)[0]);
            }
        });
        setTimeout(() => {
            this.setVisibility();
        }, 300);
    }

    checkChildren () {
         return [...this.area.children];
    }

    addElement (type, data, callback) {
        this.createElement(type, data, (item, id) => {
            this.notify.push({item});
            if (this.checkChildren().length <= 0) {
                this.area.appendChild(this.notify[this.notify.length - 1].item);
            } else {
                this.area.insertBefore(this.notify[this.notify.length - 1].item, this.checkChildren()[0]);
            }
            document.querySelector('#' + id + ' .wnp-notify__close').addEventListener('click', this.closeNotify.bind(this, id));
            callback(id);
        });

    }
    setVisibility () {
        if (this.notify.length > 0) {
            this.area.classList.add('isVisible');
        } else {
            this.area.classList.remove('isVisible');
        }
    }
    deleteElement (data) {
        if (this.autoDelete && !data) {
            this.autoDeleteArray.push(setTimeout(() => {
                if (this.notify.length > 0) {
                    const target = this.notify.shift();
                    target.item.classList.remove('isVisible');
                    setTimeout(() => {
                        this.area.removeChild(target.item);
                    }, 350);
                } else {
                    return false;
                }
            }, this.showTime * 1000));
        } else if (this.autoDelete && data) {
            data.item.classList.remove('isVisible');
            setTimeout(() => {
                this.area.removeChild(data.item);
            }, 350);
        } else if (!this.autoDelete && data) {
            data.item.classList.remove('isVisible');
            setTimeout(() => {
                this.area.removeChild(data.item);
            }, 350);
        } else {
            return false;
        }
        setTimeout(() => {
            this.setVisibility();
        }, 300);
    }

    message (type, data) {
        if (this.notify.length >= this.maxCount) return false;
        this.addElement(type,data, id => {
            this.showElement(id,() => {
                this.deleteElement();
            })
        });
    }
}

export {Notify}