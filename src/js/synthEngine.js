import noteFrequencies from "./noteFrequencies";

const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const masterGainNode = audioContext.createGain();
let currentOsc;
let currentOscWaveform;

const togglePower = state => {
  if (state) {
    return audioContext.suspend();
  }
  return audioContext.resume();
};

masterGainNode.connect(audioContext.destination);

const playTone = note => {
  const osc = audioContext.createOscillator();

  osc.type = currentOscWaveform;
  osc.frequency.value = noteFrequencies[note];

  osc.connect(masterGainNode);

  osc.start();

  currentOsc = osc;
  return osc;
};

const stopTone = () => {
  currentOsc.stop();
};

const changeVolume = value => {
  masterGainNode.gain.value = value;
};

const changeOscWaveform = waveform => {
  currentOscWaveform = waveform;
};

export { playTone, stopTone, changeOscWaveform, changeVolume, togglePower };
