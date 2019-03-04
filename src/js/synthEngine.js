import noteFrequencies from "./noteFrequencies";

const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const convolver = audioContext.createConvolver();
const masterGainNode = audioContext.createGain();
let currentOsc;
let currentOscWaveform;

const impulseResponse = (duration, decay, reverse) => {
  var sampleRate = audioContext.sampleRate;
  var length = sampleRate * duration;
  var impulse = audioContext.createBuffer(2, length, sampleRate);
  var impulseL = impulse.getChannelData(0);
  var impulseR = impulse.getChannelData(1);

  if (!decay) decay = 2.0;
  for (var i = 0; i < length; i++) {
    var n = reverse ? length - i : i;
    impulseL[i] = (Math.random() * 2 - 1) * Math.pow(1 - n / length, decay);
    impulseR[i] = (Math.random() * 2 - 1) * Math.pow(1 - n / length, decay);
  }
  return impulse;
};

masterGainNode.connect(audioContext.destination);

const playTone = note => {
  const osc = audioContext.createOscillator();

  osc.type = currentOscWaveform;
  osc.frequency.value = noteFrequencies[note];

  convolver.buffer = impulseResponse(4, 4, false);

  osc.connect(convolver);
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

export { playTone, stopTone, changeOscWaveform, changeVolume };
