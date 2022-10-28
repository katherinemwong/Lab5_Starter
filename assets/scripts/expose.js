// expose.js
window.addEventListener('DOMContentLoaded', init);

function init() {
  // constants 
  const horn = document.getElementById('horn-select');
  const imgbox = document.querySelector('img');
  const audio = document.querySelector('audio');
  const volume = document.getElementById('volume');
  const jsConfetti = new JSConfetti();


  // display correct horn and set correct audio file
  horn.addEventListener('change', (event) => {
    var img = 'assets/images/';
    var aud = 'assets/audio/';
    if (horn.value == 'air-horn') {
      img += 'air-horn.svg';
      aud += 'air-horn.mp3';
    }
    else if (horn.value == 'car-horn') {
      img += "car-horn.svg";
      aud += 'car-horn.mp3';
    }
    else if (horn.value == 'party-horn'){
      img += "party-horn.svg";
      aud += 'party-horn.mp3';
    }
    else {
      img += 'no-image.png';
    }
    imgbox.src = img;
    audio.src = aud;
  });

  // change volume img
  volume.addEventListener('change', (event) => {
    var volImg= document.querySelector('#volume-controls img');
    var volumeInput = volume.value;
    
    if (volumeInput == 0) {
      volImg.src = 'assets/icons/volume-level-0.svg';
    }
    else if (volumeInput < 33) {
      volImg.src = 'assets/icons/volume-level-1.svg';
    }
    else if (volumeInput < 67) {
      volImg.src = 'assets/icons/volume-level-2.svg';
    }
    else {
      volImg.src = 'assets/icons/volume-level-3.svg';
    }
    audio.volume = volumeInput / 100;
  });

  const button = document.querySelector('button');
  button.addEventListener('click', (event) => {
    audio.play();
    if (horn.value == 'party-horn') {
      jsConfetti.addConfetti();
    }
  });
}