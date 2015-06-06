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
   * Create a observable property.
   * @param  {Object} target Whose property is going to be defined.
   * @param  {String} key    Key of the property to define
   * @return {game.R.Property} The observable property object.
   */
  game.R.defineProperty = function(target, key) {
    var value = target[key];
    var emitter;

    // Create a Kefir property
    var prop = game.R.stream(function(e) {
      emitter = e;
    }).toProperty(function() {
      return value;
    });

    // Save the property to target.prop
    target.prop || (target.prop = {});
    target.prop[key] = prop;

    // Define the REAL property for target
    Object.defineProperty(target, key, {
      set: function(newValue) {
        value = newValue;
        emitter && emitter.emit(value);
      },
      get: function() {
        return value;
      }
    });

    return prop;
  }

  /**
   * Create an reactive variable.
   *
   * Example:
   *   // Create with a initial value
   *   var x = game.R.variable(10);
   *
   *   // Modify value of this variable
   *   x(20)(30)(40)(50);
   *
   *   // Use it as getter
   *   x() === 50; // => true
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
    var prop = Kefir.stream(function(e) {
      emitter = e;
    }).toProperty();

    var foo = function(newVal) {
      if (arguments.length === 0) {
        return foo.val;
      }
      else {
        foo.val = newVal;
        emitter && emitter.emit(foo.val);
      }
    };

    foo.val = value;
    foo.prop = prop;

    foo.onValue = function(f) {
      prop.onValue(f);
    };
    foo.offValue = function(f) {
      prop.offValue(f);
    };
    foo.log = function() {
      prop.log();
    };
    foo.offLog = function() {
      prop.offLog();
    };

    return foo;
  }

});
