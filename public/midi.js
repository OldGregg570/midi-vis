'use strict';

(function () {

  const MSG_NOTE_ON = 144,
        MSG_NOTE_OFF = 127;

  let app = angular.module('MidiVis');

  app.factory('midi', function ($window) {
    return {
      init: function (midiMessageHandlers) {
        return new Promise((resolve, reject) => {

          // Get access to the browser's midi API
          $window.navigator.requestMIDIAccess().then(onSuccess, function onFailure (e) {
            reject(e);
          });

          // For each available midi input, bind the onMessage handler
          function onSuccess (midi) {
            var inputs = midi.inputs.values();
            for(var input = inputs.next(); input && !input.done; input = inputs.next()) {
              if (input.value.name === "Visualizer") {
                  input.value.onmidimessage = handlers;
              }
            }
            resolve();
          }

          // Called when an input recieves a midi message
          function handlers(message) {
            if (MSG_NOTE_ON === message.data[0]) {
              midiMessageHandlers.noteOn(message.data);
            } else if (MSG_NOTE_OFF === 127) {

            } else {
              console.log(message.data);
            }

          }
        });
      }
    }
  });
})();
