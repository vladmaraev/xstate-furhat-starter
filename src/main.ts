import { setup, createActor, fromPromise, assign } from "xstate";

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

// Gesture1: Eye Roll
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
          time: [0.0], 
          params: {
            BROW_UP_LEFT: 1.0,
            BROW_UP_RIGHT: 1.0
          }
        },
        {
          time: [0.8], 
          params: {
            BROW_UP_LEFT: 0.0,
            BROW_UP_RIGHT: 0.0
          },
        },
        {
          time: [1.2],
          params: {
            reset: true
          },
        },
      ],
      class: "furhatos.gestures.Gesture",
    }),
  });
}

// Gesture2: Shake Head
async function fhNod() {
  const myHeaders = new Headers();
  myHeaders.append("accept", "application/json");
  return fetch(
    `http://${FURHATURI}/furhat/gesture?blocking=false`,
    {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify({
        name: "Nod",
        frames: [
          {
            time: [0.0],
            params: {
              GAZE_PITCH: -10.0
            }
          },
          {
            time: [0.4],
            params: {
              GAZE_PITCH: 10.0
            }
          },
          {
            time: [0.8],
            params: {
              GAZE_PITCH: 0.0
            }
          },
          {
            time: [1.2],
            params: {
              reset: true
            },
          },
        ],
        class: "furhatos.gestures.Gesture",
      }),
    },
  );
}

// Gesture3: Sound Gesture
async function fhSoundGesture() {
  const myHeaders = new Headers();
  myHeaders.append("accept", "application/json");
  return fetch(`http://${FURHATURI}/furhat/gesture?blocking=false`, {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify({
      name: "SoundGesture",
      frames: [
        { time: [0.0], params: {Smile: 0.4 } },
        { time: [0.4], params: { AudioFile: "Click.wav" } },
        { time: [0.8], params: {Smile: 0.0 } },
      ],
      class: "furhatos.gestures.Gesture",
    }),
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
        await fhSay("Did you see me raise my eyebrows?");

        await fhNod();
        await fhSay("Now I am nodding my head!");

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



(async () => {
  console.log("Testing BrowRaise and Nod gestures...");
  await fhBrowRaise();
  await new Promise(r => setTimeout(r, 1500));
  await fhNod();
})();
