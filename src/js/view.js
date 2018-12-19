import elements from "./uiElements";
import * as synthEngine from "./synthEngine";

const handleKeydown = event => synthEngine.playTone(event.target.dataset.note);

const handleKeyup = () => synthEngine.stopTone();

Array.from(elements.keys).forEach(key => {
  key.addEventListener("mousedown", handleKeydown);
  key.addEventListener("mouseup", handleKeyup);
});

elements.waveFormSelector.addEventListener("change", () => {
  synthEngine.changeOscWaveform(elements.waveFormSelector.value);
});

elements.masterVolumeControl.addEventListener("change", () => {
  synthEngine.changeVolume(elements.masterVolumeControl.value);
});

synthEngine.changeOscWaveform(elements.waveFormSelector.value);
synthEngine.changeVolume(elements.masterVolumeControl.value);
