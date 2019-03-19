'use strict';
import {TimelineMax, TweenLite} from "gsap";
import $ from 'jquery';
import styleInject from 'style-inject';

class Notify {
    constructor (props) {
        const initial_state = props ? props : {};
        const {
            max_count,
            auto_delete,
            default_message,
            delay,
            selector,
            custom_class,
            link_title
        } = initial_state;

        this.default_state = {
            MAX_COUNT: max_count ? max_count : 5,
            AUTO_DELETE: auto_delete ? auto_delete : false,
            DEFAULT_MESSAGE: default_message ? default_message : 'Whynotpack notify',
            DEFAULT_LINK_TITLE: link_title ? link_title : 'more',
            SHOW_TIME: delay ? delay * 1000 : 5 * 1000,
            SELECTOR: selector ? document.querySelector(selector) : document.querySelector('body'),
            DEFAULT_CLASS: custom_class ? custom_class : 'default',
            STYLES__APPEND__AREA: document.getElementsByTagName('HEAD')
        };

        this.state = {
            WRAPPER_ID: null,
            NOTIFIES: [],
            WAITING_NOTIFIES: []
        };

        //init notify
        this.addWrapper(() => {
            this.addStyles();
        });
        return this.makeNotify.bind(this);

    }

    //helpers
    make(tag) {
        return document.createElement(tag);
    }
    text (selector, content) {
        selector.textContent = content;
    }
    addClass (selector,class_name) {
        selector.classList.add(class_name);
    }
    removeClass (selector,class_name) {
        selector.classList.add(class_name);
    }
    addID (selector, id) {
        selector.setAttribute('id', id);
    }
    createChar () {
        const chars = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
        const minChar = 0;
        const maxChar = chars.length;
        let char = Math.floor(minChar+(maxChar-minChar)* Math.random());
        return chars[char];
    }
    createNumber () {
        let minNumber = 1;
        let maxNumber = 9;
        let num = minNumber + (maxNumber-minNumber)* Math.random();
        return Math.floor(num);
    }
    setID (length) {
        let result = [];
        for(let i = 0; i < length; i++) {
            result.push(this.createChar(), this.createNumber());
        }
        return result.join('');
    }
//-----------------------------------------------------------------

    addStyles () {
        const stylesString = '@import url(https://fonts.googleapis.com/css?family=Roboto:300,500);\n' +
            '@charset "UTF-8";.wnp-notify{width:300px;height:auto;margin:10px;-webkit-box-shadow:0 0 5px 0 rgba(0,0,0,.3);box-shadow:0 0 5px 0 rgba(0,0,0,.3);display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:start;-ms-flex-pack:start;justify-content:flex-start;background:#75a7be;color:#fff;position:relative;padding-left:60px;padding-right:30px;-webkit-transform:scale(.5) translateY(-30px);-ms-transform:scale(.5) translateY(-30px);transform:scale(.5) translateY(-30px);opacity:0}.wnp-notify,.wnp-notify>*{-webkit-box-sizing:border-box;box-sizing:border-box}@media (max-width:600px){.wnp-notify{width:calc(100% - 20px)}}.wnp-notify.isVisible{-webkit-transform:scale(1);-ms-transform:scale(1);transform:scale(1);opacity:1}.wnp-notify.error{background:#c74444}.wnp-notify.success{background:#3eb56e}.wnp-notify__wrapper{position:fixed;right:0;top:0;z-index:9999;font-family:Roboto,sans-serif}@media (max-width:600px){.wnp-notify__wrapper{width:100%}}.wnp-notify__wrapper.isVisible{opacity:1;visibility:visible}.wnp-notify__close{position:absolute;width:20px;height:20px;right:5px;top:5px;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;cursor:pointer}.wnp-notify__close:after{content:"✖";color:#fff;font-size:16px;font-weight:300;line-height:1}.wnp-notify__description{height:100%;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;-webkit-box-align:start;-ms-flex-align:start;align-items:flex-start;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;padding:10px 0}.wnp-notify__message{height:0;overflow:hidden;font-size:14px;line-height:1.5;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.isOpen .wnp-notify__message{height:auto}.wnp-notify__text{font-size:16px;margin:5px 0;line-height:1.5}.wnp-notify__desc,.wnp-notify__text{font-weight:300;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.wnp-notify__desc{font-size:13px;cursor:pointer;line-height:1}.isOpen .wnp-notify__desc{display:none}.wnp-notify__icon{width:40px;height:100%;left:0;top:0;position:absolute;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;margin-right:20px}.wnp-notify__icon:before{content:"";position:absolute;width:100%;height:100%;top:0;left:0;background:#5291ae;-ms-flex-negative:0;flex-shrink:0;z-index:0}.error .wnp-notify__icon:before{background:#a90d0e}.success .wnp-notify__icon:before{background:#319f5d}.wnp-notify__icon:after{content:"!";-ms-flex-negative:0;flex-shrink:0;position:relative;font-size:20px;z-index:1;font-weight:600;line-height:1;color:#fff}.success .wnp-notify__icon:after{content:"✔"}.error .wnp-notify__icon:after{content:"✖"}\n'
        styleInject(stylesString);
    }

    createWrapper (callback) {
        const wrapper = this.make('div');
        const newID = this.setID(5);
        this.state.WRAPPER_ID = newID;
        wrapper.classList.add('wnp-notify__wrapper');
        wrapper.setAttribute('id', newID);
        if (callback) callback(wrapper, newID);
    }
    addWrapper (callback) {
        this.createWrapper((item,id) => {
            this.default_state.SELECTOR.appendChild(item);
            if (callback) callback();
        });
    }
    createNotify (data,callback) {
        const {
            type,
            title,
            description,
            link_title,
            custom_class,
        } = data;

        //variables
        const notify_type = type && type === 'error' || type === 'success' || type === 'info' ? type : 'no_type';
        const notify_class_name = custom_class ? custom_class.toString() : this.default_state.DEFAULT_CLASS;
        const notify_default_title = title ? title : this.default_state.DEFAULT_MESSAGE;
        const notify_id = this.setID(3);
        const notify_default_link_title = link_title ? link_title.toString() : this.default_state.DEFAULT_LINK_TITLE;

        //create elements
        const notify = this.make('div');
        const notify_icon = this.make('div');
        const notify_text_area = this.make('div');
        const notify_title = this.make('span');
        const notify_close = this.make('div');
        const notify_description = this.make('span');
        const notify_link = this.make('span');

        //classes
        this.addClass(notify,'wnp-notify');
        this.addClass(notify,notify_class_name);
        this.addClass(notify, notify_type);
        this.addID(notify, notify_id);
        this.addClass(notify_icon,'wnp-notify__icon');
        this.addClass(notify_text_area,'wnp-notify__description');
        this.addClass(notify_title,'wnp-notify__text');
        this.addClass(notify_close,'wnp-notify__close');

        if (description) {
            this.addClass(notify_description,'wnp-notify__message');
            this.addClass(notify_link,'wnp-notify__desc');
        }

        //appends elements
        notify.appendChild(notify_icon);
        notify.appendChild(notify_close);
        notify.appendChild(notify_text_area);

        this.text(notify_title,notify_default_title);

        if (description) {
            this.text(notify_description, description);
            this.text(notify_link, notify_default_link_title);
        }

        notify_text_area.appendChild(notify_title);

        if (description) {
            notify_text_area.appendChild(notify_description);
            notify_text_area.appendChild(notify_link);
        }
        if (callback) callback(notify);
    }

    saveNotify (element, callback) {
        if (this.state.NOTIFIES.length  < this.default_state.MAX_COUNT) {
            this.state.NOTIFIES.push(element);
            if (callback) callback(this.state.NOTIFIES, this.state.WAITING_NOTIFIES);
        } else {
            this.state.WAITING_NOTIFIES.push(element);
            if (callback) callback(this.state.NOTIFIES, this.state.WAITING_NOTIFIES);
        }
    }

    closeNotify (target) {
        document.querySelector('#' + target + ' .wnp-notify__close').removeEventListener('click', this.closeNotify.bind(this, target));
        this.deleteNotify(target);
    }

    updateState(data) {
        this.state.NOTIFIES.forEach((target, i) => {
            if (target.id === data.id) {
                this.state.NOTIFIES.splice(i,1);
            }
        });
        if (this.state.WAITING_NOTIFIES.length > 0 && this.state.NOTIFIES.length < this.default_state.MAX_COUNT) {
            const waitingElement = this.state.WAITING_NOTIFIES.shift();
            this.state.NOTIFIES.push(waitingElement);
            this.addNotify({prevState: this.state.NOTIFIES}, target => {
                this.showNotify(target)
            })
        }
    }

    openNotify (id) {
        document.querySelector('#' + id + ' .wnp-notify__close').removeEventListener('click', this.openNotify.bind(this, id));
        this.state.NOTIFIES.forEach((target, index) => {
            if (target.id === id) {
                document.querySelector('#' + id).classList.add('isOpen');
            }
        });
    }
    getElement (state) {
        const {prevState} = state;
        const element = prevState[prevState.length - 1];
        return element;
    }

    move (type, evt, id, client) {
        const point = type === 'touch' ? client.targetTouches[0].clientX : client.clientX;
        const x = type === 'touch' ? evt.changedTouches[0].clientX - point : evt.clientX - point;
        let opacity = 0;
        TweenLite.to(`#${id}`, 0.2, {x: x, onUpdate: () => {
                if (x < -40 || x > 40) {
                    opacity--
                    opacity = opacity / 2
                } else {
                    opacity = 1;
                }
                TweenLite.to(`#${id}`, 0.3, {opacity: opacity, onComplete: () => {
                        if (opacity < 0.8) {
                            TweenLite.to(`#${id}`, 0, {opacity: 0});
                            this.deleteNotify(id);
                        }
                    }})
            }});
    }

    moveEvent (event, id) {
        if (event.type === 'mousedown') {
            $(window).on('mousemove', (mouse) => {
                this.move('mouse', mouse, id, event);
            });
            $(window).on('mouseup',  () => {
                $(window).unbind('mousemove',null);
                $(window).unbind('mouseup',null);
            });
            $('body').on('mouseleave',  () => {
                $(window).unbind('mousemove', null);
                $(window).unbind('mouseup', null);
            });
        } else {
            $(window).on('touchmove',  (touch) => {
                this.move('touch', touch, id,event);
            });
            $(window).on('touchend',  () => {
                $(window).unbind('touchmove',null);
                $(window).unbind('touchend',null);
            })
        }
    }

    checkChildren () {
        const area = document.querySelector(`#${this.state.WRAPPER_ID}`);
        return [...area.children];
    }

    addNotify (state, callback) {
        const target = this.getElement(state);
        const area = document.querySelector(`#${this.state.WRAPPER_ID}`);
        area.appendChild(target);
        if (this.checkChildren().length <= 0) {
            area.appendChild(target);
        } else {
            area.insertBefore(target, this.checkChildren()[0]);
        }
        [...target.children].forEach(item => {
            [...item.children].forEach(child => {
                if (child.className === 'wnp-notify__desc') {
                    document.querySelector(`#${target.id} .wnp-notify__desc`).addEventListener('click', this.openNotify.bind(this, target.id));
                }
            });
        });

        document.querySelector(`#${target.id} .wnp-notify__close`).addEventListener('click', this.closeNotify.bind(this, target.id));
        $(`#${target.id}`).bind('mousedown', (mouse)=> {
            this.moveEvent(mouse, target.id)
        });
        $(`#${target.id}`).bind('touchstart', (touch)=> {
            this.moveEvent(touch, target.id)
        });
        if (callback) callback(target);
    }

    showNotify (target) {
        const tl = new TimelineMax();
        tl.to(`#${target.id}`,0.3, {opacity: 1, scale: 1, y: 0, ease: Back.easeOut.config(2)});
    }

    hideNotify (target, callback) {
        const tl = new TimelineMax();
        tl.to(`#${target}`,0.2, {opacity: 0, scale: 0.5, y: 0, ease: Circ.easeIn, onComplete: () => {
                if (callback) callback();
            }});
    }

    deleteNotify (target) {
        this.hideNotify(target, () => {
            const area = document.querySelector(`#${this.state.WRAPPER_ID}`);
            const element = document.querySelector(`#${target}`);
            setTimeout(() => {
                area.removeChild(element);
                this.updateState(element);
            }, 10)
        });
    }

    makeNotify (data) {

        this.createNotify(data, notify => {
            this.saveNotify(notify,(prevState,newState) => {
                this.addNotify({prevState,newState}, target => {
                    this.showNotify(target)
                })
            })
        });
    }
}

export {Notify}