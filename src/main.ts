import { error } from "console";
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


/*async function newGesture() {
  const myHeaders = new Headers();
  myHeaders.append("accept", "application/json");
  return fetch(`http://${FURHATURI}/furhat/gesture?blocking=false`, {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify({
      name: "newGesture",
      frames: [
        {
          time: [], //ADD THE TIME FRAME OF YOUR LIKING
          persist: true,
          params: {
            //ADD PARAMETERS HERE IN ORDER TO CREATE A GESTURE
          },
        },
        {
          time: [], //ADD TIME FRAME IN WHICH YOUR GESTURE RESETS
          persist: true,
          params: {
            reset: true,
          },
        },
        //ADD MORE TIME FRAMES IF YOUR GESTURE REQUIRES THEM
      ],
      class: "furhatos.gestures.Gesture",
    }),
  });
}*/

async function fhGesture(text: string) {
  const myHeaders = new Headers();
  myHeaders.append("accept", "application/json");
  return fetch(
    `http://${FURHATURI}/furhat/gesture?name=${text}&blocking=true`,
    {
      method: "POST",
      headers: myHeaders,
      body: "",
    },
  );
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

// Attending to the user
async function fhAttend() {
  const myHeaders = new Headers();
  myHeaders.append("accept", "application/json");
  return fetch(`http://${FURHATURI}/furhat/attend?user=CLOSEST`, {
    method: "POST",
    headers: myHeaders,
    body: ""
  });
}


// GESTURES

//Gesture 1: a Big Smile
async function bigSmileGesture() {
  const myHeaders = new Headers();
  myHeaders.append("accept", "application/json");
  return fetch(`http://${FURHATURI}/furhat/gesture?blocking=true`, {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify({
      name: "bigSmile",
      frames: [
        {
          time: [0.0, 1.2],
          persist: true,
          params: {
            SMILE_OPEN: 1.0,
            CHEEK_RAISER: 0.8,
            BROW_UP_LEFT: 0.3,
            BROW_UP_RIGHT: 0.3,
          },
        },
        {
          time: [1.2, 1.5],
          persist: true,
          params: { 
            reset: true 
          },
        },
      ],
      class: "furhatos.gestures.Gesture",
    }),
  });
}

//Gesture 2: Thinking
async function thinkingGesture() {
  const myHeaders = new Headers();
  myHeaders.append("accept", "application/json");
  return fetch(`http://${FURHATURI}/furhat/gesture?blocking=true`, {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify({
      name: "thinking",
      frames: [
        {
          time: [0.0, 0.5],
          persist: true,
          params: {
            LOOK_UP: 0.4,           
            NECK_TILT: 0.15,        
          },
        },
        {
          time: [0.5, 1.5],
          persist: true,
          params: {
            LOOK_UP: 0.4,
            LOOK_RIGHT: 0.3,        
            NECK_TILT: 0.15,
            BROW_IN_LEFT: 0.2,      
            BROW_IN_RIGHT: 0.2,
          },
        },
        {
          time: [1.5, 2.0],
          persist: true,
          params: {
            reset: true 
          },
        },
      ],
      class: "furhatos.gestures.Gesture",
    }),
  });
}

// Gesture 3: Suprised
async function surprisedGesture() {
  const myHeaders = new Headers();
  myHeaders.append("accept", "application/json");
  return fetch(`http://${FURHATURI}/furhat/gesture?blocking=true`, {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify({
      name: "surprised",
      frames: [
        {
          time: [0.0, 0.15],
          persist: true,
          params: {
            BROW_UP_LEFT: 0.9,
            BROW_UP_RIGHT: 0.9,
            EXPR_SURPRISE: 0.7,    
            EYE_SQUINT: -0.3, 
          },
        },
        {
          time: [0.15, 1.0],
          persist: true,
          params: {
            BROW_UP_LEFT: 0.9,
            BROW_UP_RIGHT: 0.9,
            EXPR_SURPRISE: 0.7,
            EYE_SQUINT: -0.3,
            NECK_TILT: -0.05,       
            LOOK_UP: 0.1,           
          },
        },
        {
          time: [1.0, 1.3],
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

// Gesture 4: Laugh with Audio mp3
async function laughGestureWithSound() {
  const myHeaders = new Headers();
  myHeaders.append("accept", "application/json");
  return fetch(`http://${FURHATURI}/furhat/gesture?blocking=true`, {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify({
      name: "laughWithSound",
      frames: [
        {
          time: [0.0, 0.3],
          persist: true,
          params: {
            SMILE_OPEN: 0.9,       
            CHEEK_RAISER: 0.7,      
            EYE_SQUINT: 0.4,        
            NECK_TILT: 0.1,         
          },
          audio: {
            url: "https://raw.githubusercontent.com/sharon7rd/xstate-furhat-starter/src/woman-laugh-6421.mp3"
          },
        },
        {
          time: [0.3, 0.6],
          persist: true,
          params: {
            SMILE_OPEN: 1.0,        
            CHEEK_RAISER: 0.8,
            EYE_SQUINT: 0.5,
            NECK_TILT: -0.05,       
          },
        },
        {
          time: [0.6, 1.0],
          persist: true,
          params: {
            SMILE_OPEN: 0.8,        
            CHEEK_RAISER: 0.6,
            EYE_SQUINT: 0.3,
            NECK_TILT: 0.1,
          },
        },
        {
          time: [1.0, 1.3],
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

// Demo Dialogue
const dmMachine = setup({
  actors: {
    fhVoice: fromPromise<any, null>(async () => {
      return fhVoice("en-US-EchoMultilingualNeural");
    }),
    fhAttendUser: fromPromise<any, null>(async () => {
      return fhAttend();
    }),
    fhGreeting: fromPromise<any, null>(async () => {
      return fhSay("Hi! Ask me anything?");
    }),
    fhListen1: fromPromise<any, null>(async () => {
      return fhListen(); //what's your plans for today?
    }),
    fhThinkingDemo: fromPromise<any, null>(async () => {
      await thinkingGesture();
      return fhSay("Hmm nothing much. How about you?");
    }),
    fhListen2: fromPromise<any, null>(async () => {
      return fhListen(); //I'm going to relax all weekend
    }),
    fhSurprisedDemo: fromPromise<any, null>(async () => {
      await surprisedGesture();
      return fhSay("That's wonderful to hear!");
    }),
    fhListen3: fromPromise<any, null>(async () => {
      return fhListen(); //I need to go now, bye!!!
    }),
    fhLaughDemo: fromPromise<any, null>(async () => {
      await laughGestureWithSound();
      return fhSay("Ok goodbye, enjoy your weekend!");
    }),
  },
}).createMachine({
  id: "root",
  initial: "Start",
  states: {
    Start: { after: { 1000: "SetVoice" } },
    SetVoice: {
      invoke: {
        src: "fhVoice",
        input: null,
        onDone: { 
          target: "AttendUser",
          actions: ({ event }) => console.log(event.output)
        },
        onError: { 
          target: "Fail",
          actions: ({ event }) => console.error(event)
        },
      },
    },
    AttendUser: {
      invoke: {
        src: "fhAttendUser",
        input: null,
        onDone: { 
          target: "Greeting",
          actions: ({ event }) => console.log(event.output)
        },
        onError: { 
          target: "Fail",
          actions: ({ event }) => console.error(event)
        },
      },
    },
    Greeting: {
      invoke: {
        src: "fhGreeting",
        input: null,
        onDone: { 
          target: "Listen1",
          actions: ({ event }) => console.log(event.output)
        },
        onError: { 
          target: "Fail",
          actions: ({ event }) => console.error(event)
        },
      },
    },
    Listen1: {
      invoke: {
        src: "fhListen1",
        input: null,
        onDone: { 
          target: "Speak1",
          actions: ({ event }) => console.log(event.output)
        },
        onError: { 
          target: "Fail",
          actions: ({ event }) => console.error(event)
        },
      },
      after: { 5000: "Speak1" },
    },
    Speak1: {
      invoke: {
        src: "fhThinkingDemo",
        input: null,
        onDone: { 
          target: "Listen2",
          actions: ({ event }) => console.log(event.output)
        },
        onError: { 
          target: "Fail",
          actions: ({ event }) => console.error(event)
        },
      },
    },
    Listen2: {
      invoke: {
        src: "fhListen2",
        input: null,
        onDone: { 
          target: "Speak2",
          actions: ({ event }) => console.log(event.output)
        },
        onError: { 
          target: "Fail",
          actions: ({ event }) => console.error(event)
        },
      },
      after: { 5000: "Speak2" },
    },
    Speak2: {
      invoke: {
        src: "fhSurprisedDemo",
        input: null,
        onDone: { 
          target: "Listen3",
          actions: ({ event }) => console.log(event.output)
        },
        onError: { 
          target: "Fail",
          actions: ({ event }) => console.error(event)
        },
      },
    },
    Listen3: {
      invoke: {
        src: "fhListen3",
        input: null,
        onDone: { 
          target: "Goodbye",
          actions: ({ event }) => console.log(event.output)
        },
        onError: { 
          target: "Fail",
          actions: ({ event }) => console.error(event)
        },
      },
      after: { 5000: "Goodbye" },
    },
    Goodbye: {
      invoke: {
        src: "fhLaughDemo",
        input: null,
        onDone: { 
          target: "Done",
          actions: ({ event }) => console.log(event.output)
        },
        onError: { 
          target: "Fail",
          actions: ({ event }) => console.error(event)
        },
      },
    },
    Done: { 
      entry: ({ event }) => console.log(event.output),
      type: "final"
    },
    Fail: { 
      entry: () => console.error(error)
    },
  },
});

const actor = createActor(dmMachine).start();
console.log(actor.getSnapshot().value);

actor.subscribe((snapshot) => {
  console.log(snapshot.value);
});

