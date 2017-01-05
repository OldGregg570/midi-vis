'use strict';

(function () {
  window.onload = main;

  function main () {
    window.navigator.requestMIDIAccess().then(onMIDISuccess, onMIDIFailure);

    function onMIDISuccess (midi) {
      var inputs = midi.inputs.values();
      for(var input = inputs.next(); input && !input.done; input = inputs.next()) {
        input.value.onmidimessage = onMIDIMessage;
      }
    }

    function onMIDIFailure () { }

    function onMIDIMessage(m) {
      if (m.data[0] === 144) {
        pulse(m.data[1]);
      }
    }
  };

  function pulse(note) {
    let drum = { 0: { class: 'kick', color: '#15d' },
                 2: { class: 'snare', color: '#d51' },
                 6: { class: 'hats', color: '#5d1' } }[ note - 36 ];

    if (drum) {
      $('.' + drum.class).animate({
       'background-color': 'white'
      }, 40, function() { $(this).animate({ 'background-color': drum.color }, 60); });
    }
  }
})();
