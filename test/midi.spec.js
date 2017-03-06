'use strict';

describe('midi service', () => {
  let midiService,
      window;

  beforeEach(angular.mock.module('MidiVis'));

  beforeEach(inject((_midi_, $window) => {
    midiService = _midi_;
    window = $window;
  }));


  it('should exist', () => {
    expect(midiService).toBeDefined();
  });

  it('init should request midi access from the $window service', (done) => {
    spyOn( window.navigator, 'requestMIDIAccess' ).and.callFake( function() {
        done();
    });

    midiService.init({
      noteOn: () => {}
    });
  });
});
