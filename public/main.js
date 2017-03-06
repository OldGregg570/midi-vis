'use strict';

var logger = console;

(function () {

  const MSG_NOTE_ON = 144;
  let app = angular.module('MidiVis', []);

  app.controller('mainCtrl', function ($scope, $filter, $window, midi, VisSquares, VisDrumShapes) {
    $scope.visualization = VisSquares;

    main();

    // Set up MIDI connection and midi message handler
    function main () {
      let midiHandlers = {
        noteOn: function (message) {
            $scope.visualization.noteOn(message);
        },
        programChange: function (message) {
            logger.debug(message);
        }
      };

      $scope.visualization.setup();


      midi.init(midiHandlers).then(() => {
          logger.debug("Midi connected");
      });
    }

    /**
     * Return a list of patterns based on the selected visualization type
     */
    $scope.getVisualizationSelection = function(selectedType) {
      return $filter('filter')($scope.options, selectedType)[0].patterns;
    };

    /**
     * Initialize and switch to the selected visualization
     */
    $scope.setVisualizationSelection = function(selectedType) {
        logger.debug(vis);
    };
  });
})();
