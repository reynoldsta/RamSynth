const elements = {
  waveFormSelector: document.querySelector("[data-waveform-selector]"),
  masterVolumeControl: document.querySelector("[data-master-volume]"),
  distortionGainControl: document.querySelector("[data-distortion-gain]"),
  powerButton: document.querySelector("[data-power]"),
  distortionPowerButton: document.querySelector("[data-distortion-power]"),
  keyBoard: document.querySelector("[data-keys]"),
  keys: document.querySelector("[data-keys]").children
};

export default elements;
