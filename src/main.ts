import { setup, createActor, fromPromise, assign } from "xstate";
const FURHATURI = "127.0.0.1:54321";

async function fhSay(text: string) {
  const myHeaders = new Headers();
  myHeaders.append("accept", "application/json");
  const encText = encodeURIComponent(text);
  return fetch(`http://${FURHATURI}/furhat/say?text=${encText}&blocking=true`, {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify({
      language: "Language.ENGLISH_US",
      gender: "Gender.MALE"
    }),
  });
}

// Fetch users
async function fhFetchUser() {
  const myHeaders = new Headers();
  myHeaders.append("accept", "application/json");
  return fetch(`http://${FURHATURI}/furhat/users`, {
    method: "POST",
    headers: myHeaders,
    body: "",
  });
}

// Implement user-tracking for Furhat to attend to the user.
async function fhUserTracking() {
  const myHeaders = new Headers();
  myHeaders.append("accept", "application/json");
  return fetch(`http://${FURHATURI}/furhat/attend?user=RANDOM`, {
    method: "POST",
    headers: myHeaders,
    body: "",
  });
}

// Define Wink Gesture ---- two winks from left eye to right eye
async function fhWink() {
  const myHeaders = new Headers();
  myHeaders.append("accept", "application/json");
  return fetch(`http://${FURHATURI}/furhat/gesture?blocking=false`, {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify({
      name: "newGesture",
      frames: [
        {
          time: [1.32, 1.96], // Left eye winks
          persist: false,
          params: {
            "EPICANTHIC_FOLD": 0.3,
            "EYE_SQUINT_LEFT": 1.0,
            "BROW_DOWN_LEFT": 1.0
          },
        },
        {
          time: [1.96, 2.28], // Reset the gesture
          persist: false,
          params: {
            reset: true,
          },
        },
        {
          time: [2.28, 2.60], // Right eye winks
          persist: false,
          params: {
            "EPICANTHIC_FOLD": 0.3,
            "EYE_SQUINT_RIGHT": 1.0,
            "BROW_DOWN_RIGHT": 1.0
          },
        },
        {
          time: [2.60], // Two winks finish and reset facial expression
          persist: true,
          params: {
            reset: true,
          },
        },
      ],
      class: "furhatos.gestures.Gesture",
    }),
  });
}

// Define Smile Gesture, Neck roll and play crow sound
async function fhSmileAndCrow() {
  const myHeaders = new Headers();
  myHeaders.append("accept", "application/json");
  return fetch(`http://${FURHATURI}/furhat/gesture?blocking=false`, {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify({
      name: "smileAndCrow",
      frames: [
        {
          time: [5, 10], // Smile
          persist: false,
          params: {
            texture: "Elsa",
            //furhat.ledStrip.solid: "java.awt.Color.RED"
          },
        },
        {
          time: [3, 4], // Smile
          persist: false,
          params: {
            SMILE_CLOSED: 10.5
          },
        },
        {
          time: [4, 5], // Smile
          persist: false,
          params: {
            BROW_UP_LEFT: 10.0,
            BROW_UP_RIGHT: 10.0
          },
        },
        {
          time: [5, 10], // Smile and Neck Roll 
          persist: false,
          params: {
            BLINK_LEFT: 10.1,
            BLINK_RIGHT: 10.1,
            NECK_ROLL: 10 
          },
        },
        {
          time: [10.1], //Reset
          persist: true,
          params: {
            resetTexture: true, 
            resetLed: true,
            reset: true,
          },
        },
      ],
      class: "furhatos.gestures.Gesture",
    }),
  });
}
async function fhAudio() {
  const myHeaders = new Headers();
  myHeaders.append("accept", "application/json");
  const encURL = encodeURIComponent("https://bigsoundbank.com/UPLOAD/wav/0283.wav");
  return fetch(`http://${FURHATURI}/furhat/say?url=${encURL}&blocking=true`, {
    method: "POST",
    headers: myHeaders,
    body: "",
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
    fhHello: fromPromise<any, null>(async () => {
     return fhSay("hi I would like to tell you something");
    }),
    fhL: fromPromise<any, null>(async () => {
     return fhListen();
   }),
    fhFetchUser: fromPromise<any, null>(async () => {
     return fhFetchUser(), fhSay("I run to Fetch User");
    }),
    fhUserTracking: fromPromise<any, null>(async () => {
     return fhUserTracking(), fhSay("I run to User Tracking");
    }),
    fhWink: fromPromise<any, null>(async () => {
     return Promise.all([fhWink(), fhUserTracking(), fhSay("Good Morning"), fhAudio()])
     }),
    fhSmileAndCrow: fromPromise<any, null>(async () => {
     return fhSmileAndCrow(),fhUserTracking(), fhSay("I like you");
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
          target: "FetchUser",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    FetchUser: {
      invoke: {
        src: "fhFetchUser",
        input: null,
        onDone: {
          target: "TrackingUser",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    TrackingUser: {
      invoke: {
        src: "fhUserTracking",
        input: null,
        onDone: {
          target: "Wink",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    Wink: {
      invoke: {
        src: "fhWink",
        input: null,
        onDone: {
          target: "Wait",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    Wait: { after: { 2000: "SmileAndCrow" } },
    SmileAndCrow: {
      invoke: {
        src: "fhSmileAndCrow",
        input: null,
        onDone: {
          target: "Recognised",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    Recognised: {},
    Fail: {},
  },
});

const actor = createActor(dmMachine).start();
console.log(actor.getSnapshot().value);

actor.subscribe((snapshot) => {
  console.log(snapshot.value);
});
