'use strict';

(function () {

  let app = angular.module('MidiVis');

  app.service('VisDrumShapes', function VisDrumShapes($timeout) {
    return {
      /**
       * Set up the document body
       */
      setup: function () {
        for (var i = 0; i < 100; i++) {
          $(`<div class='splatter'></div>`).appendTo('#visualizer');
        }

        for (var i = 0; i < 20; i++) {
          $('#visualizer').append('<div class="cowbell"></div>');
        }

        for (var i = 0; i < 20; i++) {
          $('#visualizer').append('<div class="clave"></div>');
        }
        $('#visualizer').append(`<div id="circles">
                <div id="circle" class="snare"></div>
                <div id="circle" class="kick"></div>
                <div id="circle" class="hats"></div>
              </div>`)
      },

      /**
       * Based on the drum type, make something pulse in the GUI.
       * Drum order is from the Ableton 808 Junior rack
       */
      noteOn: function (data) {
        let handleNoteOn = {
          0: kick,
          1: rim,
          2: snare,
          3: clap,
          4: congaLow,
          5: congaMid,
          6: hats,
          7: congaHigh,
          8: maraca,
          9: tomLow,
         10: hatsOpen,
         11: tomMid,
         12: tomHigh,
         13: crash,
         14: cowbell,
         15: clave
        }[ data[1] - 36 ];
        handleNoteOn();
        
        /**
         * Animate an element based on the note being played. The
         * animation is defined as follows:
         *   drum.el   - the jquery selector for the element(s) that are being animated
         *   drum.prop - the css property to be animated
         *   drum.on   - the css value to animate to
         *   drum.off  - the original css value (Duplicately defined in the css right now)
         */
        function animate (drum) {
          $(drum.el).animate({ [ drum.prop ] : drum.on }, { duration: 100, queue: false });

          $timeout(function() {
            $(drum.el).animate({ [ drum.prop ]: drum.off }, { duration: 100, queue: false });
          }, 100);
        }

        // Animate .kick element's background-color
        function kick () {
          animate({ el: '.kick',  prop: 'background-color', on: '#fff',  off: '#000' });
        }

        // Animate document body border
        function rim () {
          animate({ el:  'body',   prop: 'border-color',     on: 'white', off: 'black' });
        }

        // Animate the .snare element's background-color
        function snare () {
          animate({ el: '.snare', prop: 'background-color', on: '#fff',  off: '#000' });
        }

        // Animate the page's background-color
        function clap () {
          animate({ el: 'body',   prop: 'background-color', on: '#fff',  off: '#000' });
        }

        // Animate the .kick element's border size
        function congaLow () {
          animate({ el: '.kick',  prop: 'border-width',     on: '20px',  off: '0px' });
          animate({ el: '.kick',  prop: 'top',              on: '280px', off: '300px' });
          animate({ el: '.kick',  prop: 'left',             on: '780px', off: '800px' });

        }

        // Animate the .snare element's border size
        function congaMid () {
          animate({ el: '.snare',  prop: 'border-width',    on: '20px',   off: '0px' });
          animate({ el: '.snare',  prop: 'top',             on: '280px', off: '300px' });
          animate({ el: '.snare',  prop: 'left',            on: '1280px', off: '1300px' });
        }

        // Animate the .hats element's border size
        function congaHigh () {
          animate({ el: '.hats',  prop: 'border-width',     on: '20px',   off: '0px' });
          animate({ el: '.hats',  prop: 'top',              on: '280px', off: '300px' });
          animate({ el: '.hats',  prop: 'left',             on: '280px', off: '300px' });
        }

        // Animate the .hats element's background-color
        function hats () {
          animate({ el: '.hats',  prop: 'background-color', on: '#fff',  off: '#000' });
        }

        // Randomize the position of all .splatter elements and animate their background-color
        function maraca () {
         $('.splatter').each(function () {
           $(this).css({
              top: (Math.random() * 1040) + 'px',
              left: (Math.random() * 1900) + 'px'
            });
          });
          animate({ el: '.splatter',  prop: 'background-color', on: '#fff',  off: '#000' });
          animate({ el: '.splatter',  prop: 'opacity', on: '1.0',   off: '0' });
        }

        function tomLow () {
          animate({ el: '.kick',  prop: 'border-radius', on: '0%',  off: '50%' });
        }

        function tomMid () {
          animate({ el: '.snare',  prop: 'border-radius', on: '0%',  off: '50%' });
        }

        function tomHigh () {
          animate({ el: '.hats',  prop: 'border-radius', on: '0%',  off: '50%' });
        }

        function hatsOpen () {
         animate({ el: '.hats',  prop: 'border-width',     on: '20px',  off: '0px' });
         animate({ el: '.hats',  prop: 'top',              on: '280px', off: '300px' });
         animate({ el: '.hats',  prop: 'left',             on: '280px', off: '300px' });
         animate({ el: '.hats',  prop: 'background-color', on: '#fff',  off: '#000' });

        }

        function crash () {
          var filterVal = 'blur(20px)';

          $('#visualizer').css({
              'filter':filterVal,
              'transition':'all 0.1s ease-out'
          });

          $timeout(function() {
            filterVal = 'blur(0px)'
            $('#visualizer').css({
                'filter':filterVal,
                'transition':'all 1s ease-out'
            });
          }, 100);
        }

        function cowbell () {
         $('.cowbell').each(function () {
           $(this).css({
              top: (Math.random() * 940) + 'px',
              left: (Math.random() * 1800) + 'px',
              transform: 'rotate(' + (Math.random() * 360) + 'deg)'
            });
          });
          animate({ el: '.cowbell',  prop: 'background-color', on: '#fff',   off: '#000' });
          animate({ el: '.cowbell',  prop: 'opacity', on: '1.0',   off: '0' });
        }

        function clave () {
         $('.clave').each(function () {
           $(this).css({
              top: (Math.random() * 940) + 'px',
              height: (Math.random() * 15) + 'px',
              transform: 'rotate(' + (Math.random() * 360) + 'deg)'
            });
          });
          animate({ el: '.clave',  prop: 'background-color', on: '#fff',   off: '#000' });
          animate({ el: '.clave',  prop: 'opacity', on: '1.0',   off: '0' });

        }
      }
    }
  });

}());
