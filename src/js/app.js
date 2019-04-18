import elements from "./uiElements";
import { keyMap as createKeyMap } from "./keyMap";
import * as synthEngine from "./synthEngine";

const keyMap = createKeyMap();

const activateMouseEvent = element => {
  return eventType => {
    const event = new MouseEvent(eventType, {
      view: window,
      bubbles: true,
      cancelable: true
    });

    element.dispatchEvent(event);
  };
};

const handleKeydown = event => synthEngine.playTone(event.target.dataset.note);

const handleKeyup = () => synthEngine.stopTone();

const keyDown = event => {
  if (event.code in keyMap) {
    const keyBoardKey = elements.keyBoard.querySelector(
      `[data-note=${keyMap[event.code]}]`
    );
    keyBoardKey.focus();
    activateMouseEvent(keyBoardKey)("mousedown");
  }
};

const keyUp = event => {
  if (event.code in keyMap) {
    const keyBoardKey = elements.keyBoard.querySelector(
      `[data-note=${keyMap[event.code]}]`
    );
    keyBoardKey.blur();
    activateMouseEvent(keyBoardKey)("mouseup");
  }
};

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

elements.powerButton.addEventListener("click", event => {
  const state = event.target.classList.contains("rs-PowerButton--on");
  synthEngine.togglePower(state).then(() => {
    event.target.classList.toggle("rs-PowerButton--on");
  });
});

window.addEventListener("keydown", keyDown);

window.addEventListener("keyup", keyUp);

synthEngine.changeOscWaveform(elements.waveFormSelector.value);
synthEngine.changeVolume(elements.masterVolumeControl.value);
