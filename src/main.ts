import { setup, createActor, fromPromise, assign } from "xstate";

const FURHATURI = "127.0.0.1:54321";


async function fhAttendToUser() {
  const myHeaders = new Headers();
  myHeaders.append("accept", "application/json");
  return fetch(`http://${FURHATURI}/furhat/attend?user=CLOSEST`, {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify({ // not sure if this part is needed?
      enum: "CLOSEST",
    }),
  });
}

async function fhAudioSound(url: string) {
  const myHeaders = new Headers();
  myHeaders.append("accept", "application/json");
  const encURL = encodeURIComponent(url);
  
  return fetch(`http://${FURHATURI}/furhat/say?url=${encURL}&blocking=true`, {
    method: "POST",
    headers: myHeaders,
    body: "",
  });
}

async function fhLed() {
  const myHeaders = new Headers();
  myHeaders.append("accept", "application/json");
  return fetch(`http://${FURHATURI}/furhat/led?red=250&green=50&blue=50`), {
    method: "POST",
    headers: myHeaders,
    body: "",
  }
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

async function WinkGesture() {
  const myHeaders = new Headers();
  myHeaders.append("accept", "application/json");
  return fetch(`http://${FURHATURI}/furhat/gesture?blocking=false`, {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify({
      name: "winkGesture",
      frames: [
        {
          time: [0.3, 0.8], //ADD THE TIME FRAME OF YOUR LIKING, from one frame 0 to other ex. 0.4
          persist: true,
          params: {
            //ADD PARAMETERS HERE IN ORDER TO CREATE A GESTURE, add in quotes
            // "EYE_LOOK_DOWN_RIGHT" : 0.4 the degree of how potent the expression is, 1 is the highest
            "BLINK_RIGHT" : 0.8,
            "NECK_PAN" : -20.0,
            "SMILE_CLOSED" : 0.4,
            "BROW_UP_LEFT": 0.3
          },
        },
        {
          time: [0.9], //ADD TIME FRAME IN WHICH YOUR GESTURE RESETS, gets the duration of the gesture
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
}

async function ScaredGesture() {
  const myHeaders = new Headers();
  myHeaders.append("accept", "application/json");
  return fetch(`http://${FURHATURI}/furhat/gesture?blocking=false`, {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify({
      name: "scaredGesture",
      frames: [
        {
          time: [0.2, 0.9], //ADD THE TIME FRAME OF YOUR LIKING, from one frame 0 to other ex. 0.4
          persist: true,
          params: {
            //ADD PARAMETERS HERE IN ORDER TO CREATE A GESTURE, add in quotes
            // "EYE_LOOK_DOWN_RIGHT" : 0.4 the degree of how potent the expression is, 1 is the highest
            "EXPR_FEAR" : 0.9,
            "PHONE_AAH" : 0.9,
            "BROWN_DOWN_LEFT": 0.4,
            "BROWN_DOWN_RIGHT": 0.4, 
            "LOOK_DOWN_LEFT": 0.7,
            "LOOK_DOWN_RIGHT": 0.7
          },
        },
        {
          time: [1.0], //ADD TIME FRAME IN WHICH YOUR GESTURE RESETS, gets the duration of the gesture
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
}

// this one is for retrieving ready - made gestures from Furhat
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


const dmMachine = setup({
  actors: {
    fhHello: fromPromise<any, {message: string}>(async ({input}) => {
      return Promise.all([
        fhSay(input.message),
        WinkGesture(),
        fhAttendToUser(),
        fhLed()  // why does the led not work?
      ])
    }),
    fhSpeak: fromPromise<any, {message: string}>(async ({input}) => {
      return Promise.all([
        fhSay(input.message),
        fhAttendToUser()
      ])
    }),
    fhGesture: fromPromise<any, {message: string}>(async ({input}) => {
      return Promise.all([
        fhSay(input.message), 
        fhGesture("Surprise")
      ])
    }),
    fhL: fromPromise<any, null>(async () => {
     return Promise.all([
      fhListen(),
      fhAttendToUser()
     ])
    }),
    scaredGesture: fromPromise<any,any>(async () => {
      return Promise.all([
        ScaredGesture(),
        fhAudioSound("https://raw.githubusercontent.com/Anurni/xstate-furhat-starter/master/scream-3-244948.wav")
      ])
    }),
    fhAttend : fromPromise<any, null>(async () => {
      return Promise.all([
        fhAttendToUser(),
        fhLed()
      ])
    }),
    fhShowLed : fromPromise<any, null>(async () => {
      return fhLed()
    })
   }
}).createMachine({
  id: "root",
  initial: "Start",
  states: {
    Start: { after: { 1000: "Greet" } },
    Greet: {
      invoke: {
        src: "fhHello",
        input: {message: "Hi there you beautiful thing! Tell me something."},
        onDone: {
          target: "Listen1",
          actions: ({ event }) => console.log(event.output),
          },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
          },
        },
      },
  
    Listen1: {
      invoke: {
        src: "fhL",
        onDone: {
          target: "Surprised",
          actions: [({ event }) => console.log(event.output), assign({ lastResult: ({ event }) => event.output,}),
            ]},
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
          },
        },
      },

    Surprised: {
      invoke: {
        src : "fhGesture",
        input: { message: "My oh my! That's so cool!" },
        onDone: {
          target:"Speak",
          actions: ({ event }) => console.log(event.output)
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event)
      }
    },
  },

    Speak: {
      invoke: {
        src: "fhSpeak",
        input: { message: "Now tell me something scary please, since it's soon Halloween...!" },
        onDone: {
          target:"Listen2",
          actions: ({ event }) => console.log(event.output)
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event)
      }
      }
    },

    Listen2: {
      invoke: {
        src: "fhL",
        onDone: {
          target: "Scared",
          actions: [({ event }) => console.log(event.output), assign({ lastResult: ({ event }) => event.output,}),
            ]},
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
          },
        },
      },

    Scared : {
      invoke: {
        src: "scaredGesture",
        onDone: {
          target:"Recognised",
          actions: ({ event }) => console.log(event.output)
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event)
      }
        }
      },

    Recognised: {},
    Fail: {
    },
      }
});

const actor = createActor(dmMachine).start();
console.log(`this is actor.getSnapshot().value --> ${actor.getSnapshot().value}`);

actor.subscribe((snapshot) => {
  console.log(`this is snapshot.value --> ${snapshot.value}`);
});
