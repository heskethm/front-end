# PubSub

Simple library to provide Observer/Observable behavior enabling decoupled, interactive web interfaces.

## Available methods

    // e.g. PubSub.subscribe('task.added', sendEmail);
    PubSub.subscribe(channel, event);

    // e.g. PubSub.unsubscribe('task.added', sendEmail);
    PubSub.unsubscribe(channel, event);

    // e.g. PubSub.publish('task.added', {name: 'New Task', complete: false});
    PubSub.publish(channel, output);

## Example Usage

Logging to the console:

    /**
     * Log to console on page load.
     */
    var log = function (message) {
        console.log(message);
    };

    PubSub.subscribe('page.loaded', log);
    PubSub.publish('page.loaded', 'Page loaded');
    PubSub.unsubscribe('page.loaded', log);
    PubSub.publish('page.loaded', 'Should not be logged');

Adding product to basket:

    var basket_count = document.querySelector('#basket_count');
    var btn_add_to_cart = document.querySelector('#add_to_cart');
    var btn_view_cart = document.querySelector('#view_cart');

    var Product = {
        name: 'Elder Scrolls V: Skyrim,
        price: 3999,
        stock: 3
    };

    var Basket = {
        products: [],
        add: function(Product) {
            this.products.push(Product);
            PubSub.publish('basket.updated', this);
        },
        remove: function(Product) {
            var index = this.products.indexOf(Product);
            if (index !== -1) {
                this.products.splice(Product, 1);
                PubSub.publish('basket.updated', this);
            }
        }
    };

    // Add product to the basket
    btn_add_to_cart.addEventListener('click', function() {
        Basket.add(Product);
    });

    // Update cart total widget
    PubSub.subscribe('basket.updated', function() {
        basket_count.innerHTML = Basket.products.length;
    });

    // Show 'view cart' button
    PubSub.subscribe('basket.updated', function(Basket) {
        if (Basket.products.length) {
            btn_view_cart.classList.remove('hidden');
        } else {
            btn_view_cart.classList.add('hidden');
        }
    });