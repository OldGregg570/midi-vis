'use strict';

describe('Drum Shape Visualizer service', () => {
  let VisDrumShapes;

  beforeEach(angular.mock.module('MidiVis'));

  beforeEach(inject((_VisDrumShapes_) => {
    VisDrumShapes = _VisDrumShapes_;
  }));


  it('should exist', () => {
    expect(VisDrumShapes).toBeDefined();
  });

  it('setup should append splatter elements to the document body', () => {
    VisDrumShapes.setup();
  });
});
