# Panda Reactive

Panda Reactive is a reactive programming plugin for Panda.js based on [Kefir](http://pozadi.github.io/kefir/).


# Examples

## Define Object Property

```javascript
game.createClass('Player', {
    // Set default value of properties here.
    // If you do not set it here, its value will be `undefined`.
    health: 3,

    init: function() {
        // Create observable `health` property.
        game.R.defineProperty(this, 'health');

        // This will fire an event when `health` is empty
        var getKilled = this.prop.health.filter(function(c) {
            return c <= 0;
        });
        // Call `remove` when received the killed event
        getKilled.onValue(this.remove.bind(this));
    },
    receiveDamage: function(damage) {
        // Change the health property just like what you always do
        this.health -= damage;
    },
    remove: function() {
        // Remove sprite, body, do whatever to clean up
        console.log('Remove from world');
    }
});

function anywhere() {
    var player = new game.Player();

    // Subscribe so that we'll get noticed whenever health changed
    player.prop.health.onValue(function(h) {
        console.log('Player health: %d', h);
    });

    // Let's make some blood
    player.receiveDamage(2); // => Player health: 1
    player.receiveDamage(1); // => Remove from world
                             // => Player health: 0
}
```

## Create Reactive Variable

```javascript
// Create a new variable with init value 0
var myScore = game.R.variable(0);

// Get current value
console.log(myScore()); // => 0

// Set new value
myScore(10);
myScore(myScore() + 10);
myScore(30)(40);

// Listen to its changes
myScore.onValue(function(v) {
    if (v > 100) {
        console.log('You Win!');
    }
});
```

## Advanced Timer

```javascript
// Speed factor is also supported
game.Timer.speedFactor = 0.5;

// Emit a number every second
var srcEvents = game.R.sequentially(1000, [
    1, 2, 3, 4, 5, 6
]);
// Listen to timed events (like a normal timer)
srcEvents.onValue(function(t) {
    console.log('- %is passed -', t);
});

// Create a new stream without events emitted at 3x seconds.
var logStream = srcEvents.filter(function(x) {
    return (x % 3 !== 0);
});
logStream.onValue(function(t) {
    console.log('[Event]: spawned at %is', t);
});

// Create more streams.
// Note: If a stream is not yet subscribed
// it will not get updated. It means
// creating streams causes zero overhead.
var s = srcEvents.map(function(t) {
    return t * 2;
});
var s1 = srcEvents.debounce(100);
var s2 = s1.throttle(1500);
```


# API Document

You can access full Kefir API from `game.R`. Check them from its [official site](http://pozadi.github.io/kefir/).


## Extra API

```javascript
/**
 * Create a observable property.
 * @param  {Object} target Whose property is going to be defined.
 * @param  {String} key    Key of the property to define
 * @return {game.R.Property} The observable property object.
 */
game.R.defineProperty(target, key);

/**
 * Create an reactive variable.
 * @param  {*} value Initial value
 * @return {Function} A function can be used as getter or setter
 */
game.R.variable(value);
```


---

The MIT License (MIT)

Copyright (c) 2015 Sean Bohan

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
