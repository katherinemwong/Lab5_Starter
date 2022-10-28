// explore.js

window.addEventListener('DOMContentLoaded', init);

function init() {
  function populateVoiceList() {
    if (typeof speechSynthesis === 'undefined') {
      return;
    }
    const voices = speechSynthesis.getVoices();
    for (let i = 0; i < voices.length; i++) {
      const option = document.createElement('option');
      option.textContent = `${voices[i].name} (${voices[i].lang})`;
  
      if (voices[i].default) {
        option.textContent += ' — DEFAULT';
      }
      
      option.setAttribute('data-lang', voices[i].lang);
      option.setAttribute('data-name', voices[i].name);
      document.getElementById("voice-select").appendChild(option);
    }
  }
  
  populateVoiceList();
  if (typeof speechSynthesis !== 'undefined' && speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = populateVoiceList;
  }

  const button = document.querySelector('button');

  button.addEventListener('click', (event) => {
    const synth = window.speechSynthesis;
    const voices = speechSynthesis.getVoices();
    const text = document.getElementById('text-to-speak');
    const utterThis = new SpeechSynthesisUtterance(text.value);
    const selectedOption = document.getElementById("voice-select").selectedOptions[0].getAttribute('data-name');
    for (let i = 0; i < voices.length ; i++) {
      if (voices[i].name === selectedOption) {
        utterThis.voice = voices[i];
      }
    }
    synth.speak(utterThis);
    const img = document.querySelector('img');
    if (synth.speaking == true) {
      img.src = 'assets/images/smiling-open.png';
    }
    utterThis.addEventListener("end", (event) => {
      img.src = "assets/images/smiling.png";
    });
  });



}