// Enable WebMidi API and handle any errors if it fails to enable.
// This is necessary to work with MIDI devices in the web browser.
await WebMidi.enable();
import { MusicNotation } from "./MusicNotation.js";
// Initialize variables to store the first MIDI input and output devices detected.
// These devices can be used to send or receive MIDI messages.
let myInput = WebMidi.inputs[0];
let myOutput = WebMidi.outputs[0];

const notation = new MusicNotation(120);
let tempoBox = document.getElementById("tempoBox");
tempoBox.addEventListener("change", function () {
  notation.updateMM(parseInt(tempoBox.value));
});
// Get the dropdown elements from the HTML document by their IDs.
// These dropdowns will be used to display the MIDI input and output devices available.
let dropIns = document.getElementById("dropdown-ins");
let dropOuts = document.getElementById("dropdown-outs");

// For each MIDI input device detected, add an option to the input devices dropdown.
// This loop iterates over all detected input devices, adding them to the dropdown.
WebMidi.inputs.forEach(function (input, num) {
  dropIns.innerHTML += `<option value=${num}>${input.name}</option>`;
});

// Similarly, for each MIDI output device detected, add an option to the output devices dropdown.
// This loop iterates over all detected output devices, adding them to the dropdown.
WebMidi.outputs.forEach(function (output, num) {
  dropOuts.innerHTML += `<option value=${num}>${output.name}</option>`;
});

const playTheLick = function (pitch) {
  let counter = 0;
  myOutput.sendNoteOn(pitch, { time: WebMidi.time });
  myOutput.sendNoteOff(pitch, { time: WebMidi.time + notation.eigth() });
  counter = notation.eigth();

  myOutput.sendNoteOn(pitch + 2, { time: WebMidi.time + counter });
  myOutput.sendNoteOff(pitch + 2, {
    time: WebMidi.time + counter + notation.eigth(),
  });
  counter = counter + notation.eigth();

  myOutput.sendNoteOn(pitch + 3, { time: WebMidi.time + counter });
  myOutput.sendNoteOff(pitch + 3, {
    time: WebMidi.time + counter + notation.eigth(),
  });
  counter = counter + notation.eigth();

  myOutput.sendNoteOn(pitch + 5, { time: WebMidi.time + counter });
  myOutput.sendNoteOff(pitch + 5, {
    time: WebMidi.time + counter + notation.eigth(),
  });
  counter = counter + notation.eigth();

  myOutput.sendNoteOn(pitch + 2, { time: WebMidi.time + counter });
  myOutput.sendNoteOff(pitch + 2, {
    time: WebMidi.time + counter + notation.quarter(),
  });
  counter = counter + notation.quarter();

  myOutput.sendNoteOn(pitch - 2, { time: WebMidi.time + counter });
  myOutput.sendNoteOff(pitch - 2, {
    time: WebMidi.time + counter + notation.eigth(),
  });
  counter = counter + notation.eigth();

  myOutput.sendNoteOn(pitch, { time: WebMidi.time + counter });
  myOutput.sendNoteOff(pitch, {
    time: WebMidi.time + counter + notation.quarter() + notation.eigth(),
  });
  counter = 0;
};
// Add an event listener for the 'change' event on the input devices dropdown.
// This allows the script to react when the user selects a different MIDI input device.
dropIns.addEventListener("change", function () {
  // Before changing the input device, remove any existing event listeners
  // to prevent them from being called after the device has been changed.
  if (myInput.hasListener("noteon")) {
    myInput.removeListener("noteon");
  }
  if (myInput.hasListener("noteoff")) {
    myInput.removeListener("noteoff");
  }

  // Change the input device based on the user's selection in the dropdown.
  myInput = WebMidi.inputs[dropIns.value];

  // After changing the input device, add new listeners for 'noteon' and 'noteoff' events.
  // These listeners will handle MIDI note on (key press) and note off (key release) messages.
  myInput.addListener("noteon", function (someMIDI) {
    // When a note on event is received, send a note on message to the output device.
    // This can trigger a sound or action on the MIDI output device.
    playTheLick(someMIDI.note.number);
  });

  // myInput.addListener("noteoff", function (someMIDI) {
  //   // Similarly, when a note off event is received, send a note off message to the output device.
  //   // This signals the end of a note being played.
  // });
});

// Add an event listener for the 'change' event on the output devices dropdown.
// This allows the script to react when the user selects a different MIDI output device.
dropOuts.addEventListener("change", function () {
  // Change the output device based on the user's selection in the dropdown.
  // The '.channels[1]' specifies that the script should use the first channel of the selected output device.
  // MIDI channels are often used to separate messages for different instruments or sounds.
  myOutput = WebMidi.outputs[dropOuts.value].channels[1];
});
