'use strict';

(function () {

    let app = angular.module('MidiVis');

    function getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++ ) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    app.service('VisSquares', function VisDrumShapes($timeout) {
        return {
            /**
             * Set up the document body
             */
            setup: function () {
                const ROWS = 100,
                      COLS = 100;

                for (var i = 0; i < ROWS; i++) {
                    $(`<div id='square-row${i}'></div>`).appendTo('#visualizer');
                    for (var j = 0; j < COLS; j++) {
                        $(`<div class='square'></div>`).appendTo('#square-row' + i);
                    }
                }
            },

            /**
             * Based on the drum type, make something pulse in the GUI.
             * Drum order is from the Ableton 808 Junior rack
             */
            noteOn: function (data) {
                let note = data[1] - 36;
                if (note === 0) {
                    $('.square').each(function () {
                        $(this).css({
                            'background-color' : getRandomColor()
                        });
                    });
                } else if (note === 2) {
                    // Duplicated in vis.js
                    var filterVal = 'blur(20px)';

                    $('#visualizer').css({
                        'filter':filterVal,
                        'transition':'all 0.1s'
                    });

                    $timeout(function() {
                        filterVal = 'blur(0px)'
                        $('#visualizer').css({
                            'filter':filterVal,
                            'transition':'all 0.2s'
                        });
                    }, 100);
                }

            }
        }
    });

}());
