# Reactive for LesserPanda

Reactive is a reactive programming plugin for LesserPanda engine based on [Kefir](http://pozadi.github.io/kefir/).


# Examples

## Reactive Variable

```javascript
// Create a variable with default value 0
var myScore = game.R.variable(0);

// Get current value
console.log(myScore.value); // => 0

// Set new value
myScore.value = 10;
myScore.value += 10;

// Listen to its changes
myScore.onValue(function(v) {
    if (v > 100) {
        console.log('You Win!');
    }
});

// You can do whatever you want since it's a "Property"
myScore.filter(function(v) {
    return v > 0;
})
.take(5);
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
 * Create a variable.
 * @param  {*} value Initial value
 * @return {game.R.Property} A property that you can easily get/set its current value
 */
game.R.variable(value);
```

# ChangeLog

## 0.2.0

- Kefir updated to v2.7.0
- `game.R.variable` now is a `Property`, and use `value` to set/get instead of function calls


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
