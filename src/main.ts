import { setup, createActor, fromPromise, assign, waitFor } from "xstate";

const FURHATURI = "127.0.0.1:54321";

async function fhVoice(name: string) {
  const myHeaders = new Headers();
  myHeaders.append("accept", "application/json");
  const encName = encodeURIComponent(name);
  return fetch(`http://${FURHATURI}/furhat/voice?name=${encName}`, {
    method: "POST",
    headers: myHeaders,
    body: "",
  });
}

async function fhSay(text: string) {
  const myHeaders = new Headers();
  myHeaders.append("accept", "application/json");
  const encText = encodeURIComponent(text);
  return fetch(`http://${FURHATURI}/furhat/say?text=${encText}&blocking=true`, {
    method: "POST",
    headers: myHeaders,
    body: "",
  });
}

async function fhGesture(name:string) {
  return fetch(`http://${FURHATURI}/furhat/gesture?name=${name}&blocking=false`, {
    method: "POST",
    headers: { accept: "application/json" },
  });
}

async function initFaceEngine() {
  console.log("🧠 Initializing FaceEngine...");
  await fetch(`http://${FURHATURI}/furhat/face`, {
    method: "POST",
    headers: { "accept": "application/json" },
    body: JSON.stringify({
      mask: "adult",
      character: "Yi",
    }),
  });
  console.log("FaceEngine activated");
  await fhGesture("Blink");
  await new Promise((r) => setTimeout(r, 1000));
  console.log("😄 FaceEngine ready.");
}

// Implement user-tracking for Furhat to attend to the user.
async function fhAttendUser() {
  const myHeaders = new Headers();
  myHeaders.append("accept", "application/json");
  return fetch(`http://${FURHATURI}/furhat/attend/user/nearest`, {
    method: "POST",
    headers: myHeaders,
    body: "",
  });
}

// Gesture1
async function fhBrowRaise() {
  const myHeaders = new Headers();
  myHeaders.append("accept", "application/json");

  return fetch(`http://${FURHATURI}/furhat/gesture?blocking=false`, {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify({
      name: "BrowRaise",
      frames: [
        {
          time: 0.0,
          params: {
            BROW_UP_LEFT: 1.0,
            BROW_UP_RIGHT: 1.0,
            EYE_SQUINT_LEFT: 0.2,
            EYE_SQUINT_RIGHT: 0.2,
            MOUTH_SMILE_LEFT: 0.3,
            MOUTH_SMILE_RIGHT: 0.3
          },
        },
        {
          time: 1.0,
          params: {
            BROW_UP_LEFT: 0.0,
            BROW_UP_RIGHT: 0.0,
            EYE_SQUINT_LEFT: 0.0,
            EYE_SQUINT_RIGHT: 0.0,
            MOUTH_SMILE_LEFT: 0.0,
            MOUTH_SMILE_RIGHT: 0.0
          },
        },
      ],
      class: "furhatos.gestures.Gesture",
    }),
  });
}


// Gesture2
async function fhNod() {
  const myHeaders = new Headers();
  myHeaders.append("accept", "application/json");
  return fetch(`http://${FURHATURI}/furhat/gesture?blocking=false`, {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify({
      name: "HeadNod",
      frames: [
        {
          time: [0.0],
          params: { NECK_TILT: 10.0 },
        },
        {
          time: [0.5],
          params: { NECK_TILT: -10.0 },
        },
        {
          time: [1.0],
          params: { NECK_TILT: 0.0 },
        },
      ],
      class: "furhatos.gestures.Gesture",
    }),
  });
}


// Gesture3: Sound Gesture
async function fhSoundGesture() {
  const myHeaders = new Headers();
  myHeaders.append("accept", "application/json");
  return fetch(`http://${FURHATURI}/furhat/gesture?blocking=false`, {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify({
      name: "ConfusedWithSound",
      frames: [
        {
          time: 0.0,
          params: {
            BROW_DOWN_LEFT: 0.8,
            BROW_DOWN_RIGHT: 0.8,
            MOUTH_FROWN_LEFT: 0.3,
            MOUTH_FROWN_RIGHT: 0.3,
            NECK_ROLL: 10.0,
          },
        },
        {
          time: 0.5,
          params: { BLINK_LEFT: 1.0, BLINK_RIGHT: 1.0 },
        },
        {
          time: 1.0,
          params: {
            BLINK_LEFT: 0.0,
            BLINK_RIGHT: 0.0,
            BROW_DOWN_LEFT: 0.5,
            BROW_DOWN_RIGHT: 0.5,
          },
        },
        {
          time: 1.5,
          params: { reset: true },
        },
      ],
      class: "furhatos.gestures.Gesture",
    }),
  });
  await fetch(`http://${FURHATURI}/furhat/say?url=${encodeURIComponent(
    "https://furhat-files.s3.eu-west-1.amazonaws.com/sounds/hmm.wav"
  )}&blocking=true`, {
    method: "POST",
    headers: myHeaders,
  });
}


async function fhListen() {
  const myHeaders = new Headers();
  myHeaders.append("accept", "application/json");
  return fetch(`http://${FURHATURI}/furhat/listen`, {
    method: "GET",
    headers: myHeaders,
  })
    .then((response) => response.body)
    .then((body) => body.getReader().read())
    .then((reader) => reader.value)
    .then((value) => JSON.parse(new TextDecoder().decode(value)).message);
}

const dmMachine = setup({
  actors: {
    fhVoice: fromPromise<any, null>(async () => {
      return fhVoice("Joanna");
    }),
    fhHello: fromPromise<any, null>(async () => {
      return fhSay("Hi there!");
    }),
    fhL: fromPromise<any, null>(async () => {
     return fhListen();
   }),
   fhBrowRaise: fromPromise<any, null>(async () => {
    return fhBrowRaise();
   }),
   fhNod: fromPromise<any, null>(async () => {
    return fhNod();
   }),
   fhAttendUser: fromPromise<any, null>(async () => {
    return fhAttendUser();
   }),
   fhSoundGesture: fromPromise<any, null>(async () => {
    return fhSoundGesture();
   }),
  },
}).createMachine({
  id: "root",
  initial: "Start",
  states: {
    Start: { after: { 1000: "Next" } },
    Next: {
      invoke: {
        src: "fhHello",      
        input: null,
        onDone: {
          target: "Demo",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    Demo: {
      entry: async () => {
        console.log("Running PartA demonstration");
        await fhAttendUser();
        await fhSay("I can see you.");

        await fhBrowRaise();
        await new Promise(r => setTimeout(r, 1500));
        await fhSay("Did you see me raise my eyebrows?");
        await new Promise(r => setTimeout(r, 500));

        await fhNod();
        await fhSay("Now I am nodding my head!");
        await new Promise(r => setTimeout(r, 1500));

        await fhSoundGesture();
        await fhSay("Hmm? What do you mean?");
        await new Promise(r => setTimeout(r, 1500));

        await fhSay("Okay, now I will listen to you.");
      },
      after: { 1000: "Listen" },
    },

    Listen: {
      invoke: {
        src: "fhL",
        input: null,
        onDone: {
          target: "End",
          actions: ({ event }) => {
            console.log("User said:", event.output);
          },
        },
      },
    },
    End: { type: "final" },
    Fail: {},
  },
});

const actor = createActor(dmMachine).start();
console.log(actor.getSnapshot().value);

actor.subscribe((snapshot) => {
  console.log(snapshot.value);
});


