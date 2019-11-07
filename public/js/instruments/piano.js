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

function hideRemote(key) {
    key.className =  key.className.replace(' remote-active', '');
}

function displayRemote(key) {
    key.className += ' remote-active';
    setTimeout(function(){ hideRemote(key); }, 1000);
}

socket.on('play-piano', function(data) {
    const note = data.note;
    const dataattr = note[0] + '-' + note[1];
    for (let key of $('#piano .key')) {
        if (key.dataset.key === dataattr) {
            displayRemote(key);
            playPiano(note);
            break;
        }
    }
});
