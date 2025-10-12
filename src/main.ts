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

async function eyeRollGesture() {
  const myHeaders = new Headers();
  myHeaders.append("accept", "application/json");
  return fetch(`http://${FURHATURI}/furhat/gesture?blocking=true`, {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify({
      name: "EyeRoll",
      frames: [
        {
          time: [0.0],
          persist: true,
          params: {
            LOOK_RIGHT: 4.0,
            LOOK_UP: 15.0,
            BLINK_LEFT: 0.6,
            BLINK_RIGHT: 0.6,
          },
        },
        {
          time: [0.5],
          persist: true,
          params: {
            LOOK_UP: 15.0,
            BLINK_LEFT: 0.6,
            BLINK_RIGHT: 0.6,
          },
        },
        {
          time: [1.0],
          persist: true,
          params: {
            LOOK_UP: 12.0,
          },
        },
        {
          time: [1.1],
          persist: true,
          params: {
            LOOK_UP: 10.0,
          },
        },
        {
          time: [1.5],
          persist: true,
          params: {
            LOOK_UP: 17.0,
          },
        },
        {
          time: [2.0],
          persist: true,
          params: {
            LOOK_LEFT: 3.0,
            LOOK_UP: 9.0,
          },
        },
        {
          time: [2.5],
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

async function thinkingGesture() {
  const myHeaders = new Headers();
  myHeaders.append("accept", "application/json");
  const gesturePromise = fetch(`http://${FURHATURI}/furhat/gesture?blocking=false`, {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify({
      name: "Thinking",
      frames: [
        {
          time: [0.3],
          persist: true,
          params: {
            NECK_TILT: -15.0,
            NECK_PAN: 10.0,
            BROW_UP_RIGHT: 5.0,
            LOOK_UP_LEFT: 4.0,
            LOOK_UP_RIGHT: 5.0,
          },
        },
        {
          time: [1.5],
          persist: true,
          params: {
            NECK_TILT: -15.0,
            NECK_PAN: 12.0,
            BROW_UP_RIGHT: 0.7,
            LOOK_UP_LEFT: 5.0,
            LOOK_UP_RIGHT: 5.0,
          },
        },
        {
          time: [2.0],
          persist: true,
          params: {
            reset: true,
          },
        },
      ],
      class: "furhatos.gestures.Gesture",
    }),
  });

  await fhSay("Give me a second so that I can remember.");
  
  return gesturePromise;

}

async function surprisedWithAudioGesture() {
  const myHeaders = new Headers();
  myHeaders.append("accept", "application/json");
  
  const gesturePromise = fetch(`http://${FURHATURI}/furhat/gesture?blocking=false`, {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify({
      name: "SurprisedReaction",
      frames: [
        {
          time: [0.0],
          persist: true,
          params: {
            SURPRISE: 1.0,
            BROW_UP_LEFT: 5.0,
            BROW_UP_RIGHT: 5.0,
            NECK_ROLL: -10.0,
          },
        },
        {
          time: [0.15],
          persist: true,
          params: {
            SURPRISE: 1.0,
            BROW_UP_LEFT: 7.0,
            BROW_UP_RIGHT: 1.0,
            NECK_ROLL: 10.0,
            SMILE_OPEN: 1.0,
          },
        },
        {
          time: [0.4],
          persist: true,
          params: {
            SURPRISE: 1.0,
            BROW_UP_LEFT: 1.0,
            BROW_UP_RIGHT: 1.0,
            NECK_ROLL: -5.0,
          },
        },
        {
          time: [1.5],
          persist: true,
          params: {
            reset: true,
          },
        },
      ],
      class: "furhatos.gestures.Gesture",
    }),
  });
  
  await fhSay("WHAT THE HELL!");
  
  return gesturePromise;
}

async function fhAttendUser() {
  const myHeaders = new Headers();
  myHeaders.append("accept", "application/json");
  return fetch(`http://${FURHATURI}/furhat/attend?user=CLOSEST`, {
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
    fhVoice: fromPromise<any, null>(async () => {
      return fhVoice("en-US-EchoMultilingualNeural");
    }),
    fhAttend: fromPromise<any, null>(async () => {
      return fhAttendUser();
    }),
    fhGreet: fromPromise<any, null>(async () => {
      return fhSay("I have to tell you what I remember from my childhood as a robot.");
    }),
    fhThinking: fromPromise<any, null>(async () => {
      return thinkingGesture();
    }),
    fhIntroEyeRoll: fromPromise<any, null>(async () => {
      return fhSay("When I saw the real people the first time, I was like: How stupid these creatures can be...");
    }),
    fhEyeRoll: fromPromise<any, null>(async () => {
      return eyeRollGesture();
    }),
    fhIntroSurprise: fromPromise<any, null>(async () => {
      return fhSay("They can't even do this gesture...");
    }),
    fhSurprise: fromPromise<any, null>(async () => {
      return surprisedWithAudioGesture();
    }),
    fhFarewell: fromPromise<any, null>(async () => {
      return fhSay("I hope we conquer the world A.S.A.P!");
    }),
    fhL: fromPromise<any, null>(async () => {
      return fhListen();
    }),
  },
}).createMachine({
  id: "root",
  initial: "Start",
  states: {
    Start: { 
      after: { 1000: "AttendUser" } 
    },
    
    AttendUser: {
      invoke: {
        src: "fhAttend",
        input: null,
        onDone: {
          target: "Greet",
          actions: () => console.log("Attending to closest user"),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    
    Greet: {
      invoke: {
        src: "fhGreet",
        input: null,
        onDone: {
          target: "ThinkingGesture",
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    
    ThinkingGesture: {
      invoke: {
        src: "fhThinking",
        input: null,
        onDone: {
          target: "IntroEyeRoll",
          actions: () => console.log("Thinking gesture completed."),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    
    IntroEyeRoll: {
      invoke: {
        src: "fhIntroEyeRoll",
        input: null,
        onDone: {
          target: "EyeRollGesture",
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    
    EyeRollGesture: {
      invoke: {
        src: "fhEyeRoll",
        input: null,
        onDone: {
          target: "IntroSurprise",
          actions: () => console.log("Eye roll gesture completed."),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    
    IntroSurprise: {
      invoke: {
        src: "fhIntroSurprise",
        input: null,
        onDone: {
          target: "SurpriseGesture",
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    
    SurpriseGesture: {
      invoke: {
        src: "fhSurprise",
        input: null,
        onDone: {
          target: "Farewell",
          actions: () => console.log("Surprise gesture completed."),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    
    Farewell: {
      invoke: {
        src: "fhFarewell",
        input: null,
        onDone: {
          target: "Done",
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    
    Done: {
      type: "final",
    },
    
    Fail: {
      type: "final",
    },
  },
});

const actor = createActor(dmMachine).start();
console.log(actor.getSnapshot().value);

actor.subscribe((snapshot) => {
  console.log(snapshot.value);
});