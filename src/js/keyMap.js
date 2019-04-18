import noteFrequencies from "./noteFrequencies";

const keyMap = () => {
  const keys = [
    "CapsLock",
    "KeyQ",
    "KeyA",
    "KeyW",
    "KeyS",
    "KeyE",
    "KeyD",
    "KeyR",
    "KeyF",
    "KeyT",
    "KeyG",
    "KeyY",
    "KeyH",
    "KeyU",
    "KeyJ",
    "KeyI",
    "KeyK",
    "KeyO",
    "KeyL",
    "KeyP",
    "Semicolon",
    "BracketLeft",
    "Quote",
    "BracketRight"
  ];

  return keys.reduce(
    (o, k, i) => ({ ...o, [k]: Object.keys(noteFrequencies)[i] }),
    {}
  );
};

export { keyMap };
