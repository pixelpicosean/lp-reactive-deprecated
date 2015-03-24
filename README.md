# Panda Reactive

Panda Reactive is a reactive programming plugin for Panda.js with features provided by [Kefir](http://pozadi.github.io/kefir/). It's been slightly modified for better Panda.js support.


# Examples

## Advanced Timer

```javascript
// Speed factor is also supported
game.Timer.speedFactor = 0.5;

// Emit a number every second
var srcEvents = game.Reactive.sequentially(1000, [
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
// it will not get updated so it has no cost
// creating more streams and don't use
var s = srcEvents.map(function(t) {
    return t * 2;
});
var s1 = srcEvents.reduce(function(prev, next) {
    return prev + next;
});
var s2 = srcEvents.throttle(1500);
```

More examples coming soon :D


# Document

Please see the official site of [kefir](http://pozadi.github.io/kefir/) for more details.

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
