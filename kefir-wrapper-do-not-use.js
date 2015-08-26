game.module(
  'plugins.reactive'
)
.body(function() { 'use strict';

  // Use game.Timers instead of browser time functions
  var setTimeout = function(fn, time) {
    return game.scene.addTimer(time, fn, false);
  };
  var clearTimeout = function(timer) {
    game.scene.removeTimer(timer);
  };
  var setInterval = function(fn, time) {
    return game.scene.addTimer(time, fn, true);
  };
  var clearInterval = function(timer) {
    game.scene.removeTimer(timer);
  };

  // game.R = // webpackBootstrap
  // Compiled source goes here

  /**
   * Create an reactive variable.
   *
   * Example:
   *   // Create with a initial value
   *   var x = game.R.variable(10);
   *
   *   // Modify value of this variable
   *   x.value = 20;
   *   x.value = 30;
   *   x.value = 40;
   *
   *   // Use it as getter
   *   x.value === 50; // => true
   *
   *   // Listen to its changes
   *   x.onValue(function(x) {
   *     console.log('x changed to %d', x);
   *   });
   *
   * @param  {*} value Initial value
   * @return {Function} A function can be used as getter or setter
   */
  game.R.variable = function(value) {
    var emitter;
    var currValue = value;

    var prop = game.R.stream(function(e) {
      emitter = e;
      return function() {
        emitter = null;
      };
    }).toProperty(function() {
      return value;
    });

    Object.defineProperty(prop, 'value', {
      get: function() {
        return currValue;
      },
      set: function(newValue) {
        if (newValue !== currValue) {
          currValue = newValue;
          emitter && emitter.emit(currValue);
        }
      }
    });

    return prop;
  }

});
