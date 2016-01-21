/**
 * Publish Subscribe
 *
 * @type {{subscribe, unsubscribe, publish}}
 *
 * @author Mark Hesketh <contact@markhesketh.co.uk>
 * @license MIT (https://raw.githubusercontent.com/heskethm/front-end/master/LICENSE)
 */
var PubSub = (function (window, undefined) {

    /**
     * Channels
     *
     * @type {object}
     */
    var channels = {};

    /**
     * Subscribe to a channel
     *
     * @param {string} channel
     * @param {function} event
     */
    var subscribe = function (channel, event) {
        event = event || function () {};

        channels[channel] = channels[channel] || [];
        channels[channel].push(event);
    };

    /**
     * Unsubscribe from a channel
     *
     * @param {string} channel
     * @param {function} event
     */
    var unsubscribe = function (channel, event) {
        channels[channel] = channels[channel] || [];

        var index = channels[channel].indexOf(event);
        if (index !== -1) {
            channels[channel].splice(index, 1);
        }
    };

    /**
     * Publish all events subscribed to a channel
     *
     * @param {string} channel
     * @param {object} output
     */
    var publish = function (channel, output) {
        output = output || {};

        if (!channels[channel] || channels[channel].length < 1) {
            return;
        }

        channels[channel].forEach(function (event) {
            event(output);
        });
    };

    /**
     * Public interface
     */
    return {
        subscribe: subscribe,
        unsubscribe: unsubscribe,
        publish: publish
    };
})(window);