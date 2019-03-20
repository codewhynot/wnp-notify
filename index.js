"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.Notify = void 0;

var _gsap = require("gsap");

var _jquery = _interopRequireDefault(require("jquery"));

var _styleInject = _interopRequireDefault(require("style-inject"));

var Notify =
    /*#__PURE__*/
    (function() {
        function Notify(props) {
            var _this = this;

            var initial_state = props ? props : {};
            var max_count = initial_state.max_count,
                default_message = initial_state.default_message,
                selector = initial_state.selector,
                link_title = initial_state.link_title,
                default_class = initial_state.default_class,
                default_styles = initial_state.default_styles;
            this.default_state = {
                DEFAULT_STYLES: default_styles === false ? false : true,
                MAX_COUNT: max_count ? Number(max_count) : 5,
                DEFAULT_MESSAGE: default_message
                    ? default_message
                    : "Whynotpack notify",
                DEFAULT_CLASS: default_class ? default_class : "default",
                DEFAULT_LINK_TITLE: link_title ? link_title : "Show",
                SELECTOR: selector
                    ? document.querySelector(selector)
                    : document.querySelector("body")
            };
            this.state = {
                WRAPPER_ID: null,
                NOTIFIES: [],
                WAITING_NOTIFIES: []
            }; //init notify

            this.addWrapper(function() {
                if (_this.default_state.DEFAULT_STYLES) {
                    _this.addStyles();
                }
            });
            return this.makeNotify.bind(this);
        } //helpers

        var _proto = Notify.prototype;

        _proto.make = function make(tag) {
            return document.createElement(tag);
        };

        _proto.text = function text(selector, content) {
            selector.textContent = content;
        };

        _proto.addClass = function addClass(selector, class_name) {
            selector.classList.add(class_name);
        };

        _proto.removeClass = function removeClass(selector, class_name) {
            selector.classList.add(class_name);
        };

        _proto.addID = function addID(selector, id) {
            selector.setAttribute("id", id);
        };

        _proto.createChar = function createChar() {
            var chars = [
                "a",
                "b",
                "c",
                "d",
                "e",
                "f",
                "g",
                "h",
                "i",
                "j",
                "k",
                "l",
                "m",
                "n",
                "o",
                "p",
                "q",
                "r",
                "s",
                "t",
                "u",
                "v",
                "w",
                "x",
                "y",
                "z"
            ];
            var minChar = 0;
            var maxChar = chars.length;
            var char = Math.floor(minChar + (maxChar - minChar) * Math.random());
            return chars[char];
        };

        _proto.createNumber = function createNumber() {
            var minNumber = 1;
            var maxNumber = 9;
            var num = minNumber + (maxNumber - minNumber) * Math.random();
            return Math.floor(num);
        };

        _proto.setID = function setID(length) {
            var result = [];

            for (var i = 0; i < length; i++) {
                result.push(this.createChar(), this.createNumber());
            }

            return result.join("");
        }; //-----------------------------------------------------------------

        _proto.addStyles = function addStyles() {
            var stylesString =
                "@import url(https://fonts.googleapis.com/css?family=Roboto:300,500);\n" +
                '@charset "UTF-8";.wnp-notify{width:300px;height:auto;margin:10px;-webkit-box-shadow:0 0 5px 0 rgba(0,0,0,.3);box-shadow:0 0 5px 0 rgba(0,0,0,.3);display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:start;-ms-flex-pack:start;justify-content:flex-start;background:#75a7be;color:#fff;position:relative;padding-left:60px;padding-right:30px;-webkit-transform:scale(.5) translateY(-30px);-ms-transform:scale(.5) translateY(-30px);transform:scale(.5) translateY(-30px);opacity:0}.wnp-notify,.wnp-notify>*{-webkit-box-sizing:border-box;box-sizing:border-box}@media (max-width:600px){.wnp-notify{width:calc(100% - 20px)}}.wnp-notify.isVisible{-webkit-transform:scale(1);-ms-transform:scale(1);transform:scale(1);opacity:1}.wnp-notify.error{background:#c74444}.wnp-notify.success{background:#3eb56e}.wnp-notify__wrapper{position:fixed;right:0;top:0;z-index:9999;font-family:Roboto,sans-serif}@media (max-width:600px){.wnp-notify__wrapper{width:100%}}.wnp-notify__wrapper.isVisible{opacity:1;visibility:visible}.wnp-notify__close{position:absolute;width:20px;height:20px;right:5px;top:5px;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;cursor:pointer}.wnp-notify__close:after{content:"✖";color:#fff;font-size:16px;font-weight:300;line-height:1}.wnp-notify__description{width:100%;height:100%;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;-webkit-box-align:start;-ms-flex-align:start;align-items:flex-start;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;padding:10px 0}.wnp-notify__message{width:100%;height:0;overflow:hidden;font-size:14px;line-height:1.5;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.isOpen .wnp-notify__message{height:auto}.wnp-notify__text{font-size:16px;margin:5px 0;line-height:1.5}.wnp-notify__desc,.wnp-notify__text{font-weight:300;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.wnp-notify__desc{font-size:13px;cursor:pointer;line-height:1}.isOpen .wnp-notify__desc{display:none}.wnp-notify__icon{width:40px;height:100%;left:0;top:0;position:absolute;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;margin-right:20px}.wnp-notify__icon:before{content:"";position:absolute;width:100%;height:100%;top:0;left:0;background:#5291ae;-ms-flex-negative:0;flex-shrink:0;z-index:0}.error .wnp-notify__icon:before{background:#a90d0e}.success .wnp-notify__icon:before{background:#319f5d}.wnp-notify__icon:after{content:"!";-ms-flex-negative:0;flex-shrink:0;position:relative;font-size:20px;z-index:1;font-weight:600;line-height:1;color:#fff}.success .wnp-notify__icon:after{content:"✔"}.error .wnp-notify__icon:after{content:"✖"}\n';
            (0, _styleInject.default)(stylesString);
        };

        _proto.createWrapper = function createWrapper(callback) {
            var wrapper = this.make("div");
            var newID = this.setID(5);
            this.state.WRAPPER_ID = newID;
            wrapper.classList.add("wnp-notify__wrapper");
            wrapper.setAttribute("id", newID);

            if (callback) {
                callback(wrapper, newID);
            }
        };

        _proto.addWrapper = function addWrapper(callback) {
            var _this2 = this;

            this.createWrapper(function(item, id) {
                _this2.default_state.SELECTOR.appendChild(item);

                if (callback) {
                    callback();
                }
            });
        };

        _proto.createNotify = function createNotify(data, callback) {
            var type = data.type,
                title = data.title,
                description = data.description,
                link_title = data.link_title,
                custom_class = data.custom_class,
                auto_delete = data.auto_delete,
                delay = data.delay;
            var AUTO_DELETE = auto_delete ? auto_delete : false;
            var DELAY = delay ? delay * 1000 : 5000; //variables

            var notify_type =
                (type && type === "error") || type === "success" || type === "info"
                    ? type
                    : "no_type";
            var notify_class_name = custom_class
                ? custom_class.toString()
                : this.default_state.DEFAULT_CLASS;
            var notify_default_title = title
                ? title
                : this.default_state.DEFAULT_MESSAGE;
            var notify_id = this.setID(3);
            var notify_default_link_title = link_title
                ? link_title.toString()
                : this.default_state.DEFAULT_LINK_TITLE; //create elements

            var notify = this.make("div");
            var notify_icon = this.make("div");
            var notify_text_area = this.make("div");
            var notify_title = this.make("span");
            var notify_close = this.make("div");
            var notify_description = this.make("span");
            var notify_link = this.make("span"); //classes

            this.addClass(notify, "wnp-notify");
            this.addClass(notify, notify_class_name);
            this.addClass(notify, notify_type);
            this.addID(notify, notify_id);
            this.addClass(notify_icon, "wnp-notify__icon");
            this.addClass(notify_text_area, "wnp-notify__description");
            this.addClass(notify_title, "wnp-notify__text");
            this.addClass(notify_close, "wnp-notify__close");

            if (description) {
                this.addClass(notify_description, "wnp-notify__message");
                this.addClass(notify_link, "wnp-notify__desc");
            } //appends elements

            notify.appendChild(notify_icon);
            notify.appendChild(notify_close);
            notify.appendChild(notify_text_area);
            this.text(notify_title, notify_default_title);

            if (description) {
                this.text(notify_description, description);
                this.text(notify_link, notify_default_link_title);
            }

            notify_text_area.appendChild(notify_title);

            if (description) {
                notify_text_area.appendChild(notify_description);
                notify_text_area.appendChild(notify_link);
            }

            if (callback) {
                callback({
                    element: notify,
                    state: {
                        auto_delete: AUTO_DELETE,
                        delay: DELAY
                    }
                });
            }
        };

        _proto.saveNotify = function saveNotify(data, callback) {
            var element = data.element,
                state = data.state;

            if (this.state.NOTIFIES.length < this.default_state.MAX_COUNT) {
                this.state.NOTIFIES.push({
                    elem: element,
                    currentState: state
                });

                if (callback) {
                    callback(this.state.NOTIFIES, this.state.WAITING_NOTIFIES);
                }
            } else {
                this.state.WAITING_NOTIFIES.push({
                    elem: element,
                    currentState: state
                });

                if (callback) {
                    callback(this.state.NOTIFIES, this.state.WAITING_NOTIFIES);
                }
            }
        };

        _proto.closeNotify = function closeNotify(target) {
            document
                .querySelector("#" + target + " .wnp-notify__close")
                .removeEventListener("click", this.closeNotify.bind(this, target));
            this.deleteNotify(target);
        };

        _proto.updateState = function updateState(data) {
            var _this3 = this;

            var _a = this.state.NOTIFIES;

            var _f = function _f(target, i) {
                if (target.elem.id === data.id) {
                    _this3.state.NOTIFIES.splice(i, 1);
                }
            };

            for (var _i = 0; _i < _a.length; _i++) {
                _f(_a[_i], _i, _a);
            }

            undefined;

            if (
                this.state.WAITING_NOTIFIES.length > 0 &&
                this.state.NOTIFIES.length < this.default_state.MAX_COUNT
            ) {
                var waitingElement = this.state.WAITING_NOTIFIES.shift();
                this.state.NOTIFIES.push(waitingElement);
                this.addNotify(
                    {
                        prevState: this.state.NOTIFIES
                    },
                    function(target, newState) {
                        _this3.showNotify(target);

                        if (newState.auto_delete) {
                            _this3.autoDelete(target, newState.delay);
                        }
                    }
                );
            }
        };

        _proto.openNotify = function openNotify(id) {
            document
                .querySelector("#" + id + " .wnp-notify__close")
                .removeEventListener("click", this.openNotify.bind(this, id));
            var _a2 = this.state.NOTIFIES;

            var _f2 = function _f2(target) {
                if (target.elem.id === id) {
                    document.querySelector("#" + id).classList.add("isOpen");
                }
            };

            for (var _i2 = 0; _i2 < _a2.length; _i2++) {
                _f2(_a2[_i2], _i2, _a2);
            }

            undefined;
        };

        _proto.getElement = function getElement(state) {
            var prevState = state.prevState;
            var element = prevState[prevState.length - 1].elem;
            var newState = prevState[prevState.length - 1].currentState;
            return {
                element: element,
                newState: newState
            };
        };

        _proto.move = function move(type, evt, id, client) {
            var _this4 = this;

            var point =
                type === "touch" ? client.targetTouches[0].clientX : client.clientX;
            var x =
                type === "touch"
                    ? evt.changedTouches[0].clientX - point
                    : evt.clientX - point;
            var opacity = 0;

            _gsap.TweenLite.to("#" + id, 0.2, {
                x: x,
                onUpdate: function onUpdate() {
                    if (x < -70 || x > 70) {
                        opacity--;
                        opacity = opacity / 2;
                    } else {
                        opacity = 1;
                    }

                    _gsap.TweenLite.to("#" + id, 0.3, {
                        opacity: opacity,
                        onComplete: function onComplete() {
                            if (x < 70) {
                                _gsap.TweenLite.to("#" + id, 0.3, {
                                    x: 0
                                });
                            }

                            if (x > -70) {
                                _gsap.TweenLite.to("#" + id, 0.3, {
                                    x: 0
                                });
                            }

                            if (opacity < 0.8) {
                                _gsap.TweenLite.to("#" + id, 0, {
                                    opacity: 0
                                });

                                _this4.deleteNotify(id);
                            }
                        }
                    });
                }
            });
        };

        _proto.moveEvent = function moveEvent(event, id) {
            var _this5 = this;

            if (event.type === "mousedown") {
                (0, _jquery.default)(window).on("mousemove", function(mouse) {
                    _this5.move("mouse", mouse, id, event);
                });
                (0, _jquery.default)(window).on("mouseup", function() {
                    (0, _jquery.default)(window).unbind("mousemove", null);
                    (0, _jquery.default)(window).unbind("mouseup", null);
                });
                (0, _jquery.default)("body").on("mouseleave", function() {
                    (0, _jquery.default)(window).unbind("mousemove", null);
                    (0, _jquery.default)(window).unbind("mouseup", null);
                });
            } else {
                (0, _jquery.default)(window).on("touchmove", function(touch) {
                    _this5.move("touch", touch, id, event);
                });
                (0, _jquery.default)(window).on("touchend", function() {
                    (0, _jquery.default)(window).unbind("touchmove", null);
                    (0, _jquery.default)(window).unbind("touchend", null);
                });
            }
        };

        _proto.checkChildren = function checkChildren() {
            var area = document.querySelector("#" + this.state.WRAPPER_ID);
            return [].concat(area.children);
        };

        _proto.addNotify = function addNotify(state, callback) {
            var _this6 = this;

            var _this$getElement = this.getElement(state),
                element = _this$getElement.element,
                newState = _this$getElement.newState;

            var target = element;
            var area = document.querySelector("#" + this.state.WRAPPER_ID);
            area.appendChild(target);

            if (this.checkChildren().length <= 0) {
                area.appendChild(target);
            } else {
                area.insertBefore(target, this.checkChildren()[0]);
            }

            var _a3 = [].concat(target.children);

            var _f3 = function _f3(item) {
                var _a4 = [].concat(item.children);

                var _f4 = function _f4(child) {
                    if (child.className === "wnp-notify__desc") {
                        document
                            .querySelector("#" + target.id + " .wnp-notify__desc")
                            .addEventListener(
                                "click",
                                _this6.openNotify.bind(_this6, target.id)
                            );
                    }
                };

                for (var _i4 = 0; _i4 < _a4.length; _i4++) {
                    _f4(_a4[_i4], _i4, _a4);
                }

                undefined;
            };

            for (var _i3 = 0; _i3 < _a3.length; _i3++) {
                _f3(_a3[_i3], _i3, _a3);
            }

            undefined;
            document
                .querySelector("#" + target.id + " .wnp-notify__close")
                .addEventListener("click", this.closeNotify.bind(this, target.id));
            (0, _jquery.default)("#" + target.id).bind("mousedown", function(mouse) {
                _this6.moveEvent(mouse, target.id);
            });
            (0, _jquery.default)("#" + target.id).bind("touchstart", function(touch) {
                _this6.moveEvent(touch, target.id);
            });

            if (callback) {
                callback(target, newState);
            }
        };

        _proto.showNotify = function showNotify(target) {
            var tl = new _gsap.TimelineMax();
            tl.to(
                "#" + target.id,
                0.5,
                {
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    ease: Back.easeOut.config(2)
                },
                0.1
            );
        };

        _proto.hideNotify = function hideNotify(target, callback) {
            var tl = new _gsap.TimelineMax();
            tl.to("#" + target, 0.2, {
                opacity: 0,
                scale: 0.5,
                y: 0,
                ease: Circ.easeIn,
                onComplete: function onComplete() {
                    if (callback) {
                        callback();
                    }
                }
            });
        };

        _proto.autoDelete = function autoDelete(target, delay) {
            var _this7 = this;

            setTimeout(function() {
                _this7.deleteNotify(target.id);
            }, delay);
        };

        _proto.deleteNotify = function deleteNotify(target) {
            var _this8 = this;

            this.hideNotify(target, function() {
                var area = document.querySelector("#" + _this8.state.WRAPPER_ID);
                var element = document.querySelector("#" + target);

                if (element) {
                    setTimeout(function() {
                        area.removeChild(element);

                        _this8.updateState(element);
                    }, 100);
                }
            });
        };

        _proto.makeNotify = function makeNotify(data) {
            var _this9 = this;

            this.createNotify(data, function(notify) {
                _this9.saveNotify(notify, function(prevState, newState) {
                    _this9.addNotify(
                        {
                            prevState: prevState,
                            newState: newState
                        },
                        function(target, state) {
                            _this9.showNotify(target);

                            if (state.auto_delete) {
                                _this9.autoDelete(target, state.delay);
                            }
                        }
                    );
                });
            });
        };

        return Notify;
    })();

exports.Notify = Notify;
