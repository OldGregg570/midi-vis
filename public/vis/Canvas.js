'use strict';

(function () {

  let app = angular.module('MidiVis');

  app.controller('CanvasCtrl', function CanvasCtrl ($scope) {
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');

    canvas.width = 600;
    canvas.height = 400;
    context.globalAlpha = 1.0;
    context.beginPath();

  });

}());
