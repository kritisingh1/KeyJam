/**
 * dependencies: audiosynth.js, socket.io
 */
const piano = Synth.createInstrument('piano');

$("#piano .key").click(function(event) {
    // Get pitch and octave of key played
    var note = $(this).attr('data-key').split('-');
    // Briefly show a blue gradient on the key just played
    $(this).addClass('active').delay(100).removeClass('active');
    playPiano(note);

    socket.emit('play-piano', { note });
});

function playPiano(note) {
    // Use Audiosynth to play the piano note
    // For example: piano.play('C', 4, 2)
    piano.play(note[0], note[1], 2.5);
}

socket.on('play-piano', function(data) {
    const note = data.note;
    playPiano(note);
});
