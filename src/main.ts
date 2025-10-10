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

async function fhSound(url: string) {
  const myHeaders = new Headers();
  myHeaders.append("accept", "application/json");
  const encText = encodeURIComponent(url);
  return fetch(`http://${FURHATURI}/furhat/say?url=${encText}&blocking=true`, {
    method: "POST",
    headers: myHeaders,
    body: "",
  });
}

async function newGesture() {
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
}

// built-in BigSmile gesture implemented for testing (source code: https://docs.furhat.io/remote-api/#furhatgestures)
async function fhBigSmile() {
  const myHeaders = new Headers();
  myHeaders.append("accept", "application/json");
  return fetch(`http://${FURHATURI}/furhat/gesture?blocking=false`, {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify({
      name: "BigSmile",
      "frames":[
    {
      "time":[0.32,0.64],
      "persist":false, 
      "params":{
        "BROW_UP_LEFT":1,
        "BROW_UP_RIGHT":1,
        "SMILE_OPEN":0.4,
        "SMILE_CLOSED":0.7
        }
    },
    {
      "time":[0.96],
      "persist":false, 
      "params":{
        "reset":true
        }
    }],
  "class":"furhatos.gestures.Gesture"
    }),
  });
}

async function fhBigSurprise() {
  const myHeaders = new Headers();
  myHeaders.append("accept", "application/json");
  return fetch(`http://${FURHATURI}/furhat/gesture?blocking=false`, {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify({
      name: "BigSurprise",
      "frames":[
    {
      "time":[0.32,1.92],
      "persist":false, 
      "params":{
        "BROW_UP_LEFT":1,
        "BROW_UP_RIGHT":1,
        "PHONE_OH":1,
        "NECK_ROLL":5
        }
    },
    {
      "time":[2.4],
      "persist":false, 
      "params":{
        "reset":true
        }
    }],
  "class":"furhatos.gestures.Gesture"
    }),
  });
}
async function fhDisagree() {
  const myHeaders = new Headers();
  myHeaders.append("accept", "application/json");
  return fetch(`http://${FURHATURI}/furhat/gesture?blocking=false`, {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify({
      name: "Disagree",
      "frames":[
        {
      "time":[0.5,2.5],
      "persist":false, 
      "params":{
      "BROW_DOWN_LEFT": 0.8,
      "BROW_DOWN_RIGHT": 0.8,
      "SMILE_CLOSED": 0,
      "SMILE_OPEN": 0,
        }
    },
    {
      "time":[0.5,1],
      "persist":false, 
      "params":{
        "NECK_PAN": -40
        
        }
    },
    {
      "time":[1,1.5],
      "persist":false, 
      "params":{
        "NECK_PAN": 40
        }
    },
    {
      "time":[1.5,2],
      "persist":false, 
      "params":{
        "NECK_PAN": -40
        }
    },
    {
      "time":[2,2.5],
      "persist":false, 
      "params":{
        "NECK_PAN": 40
        }
    },
    {
      "time":[3],
      "persist":false, 
      "params":{
        "reset":true
        }
    }],
  "class":"furhatos.gestures.Gesture"
    }),
  });
}

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

async function fhGetUser() {
  const myHeaders = new Headers();
  myHeaders.append("accept", "application/json");
  return fetch(`http://${FURHATURI}/furhat/users`, {
    method: "GET",
    headers: myHeaders,
    //body:"",
  });
}

async function fhAttendUser() {
  const myHeaders = new Headers();
  myHeaders.append("accept", "application/json");
  return fetch(`http://${FURHATURI}/furhat/attend?user=CLOSEST`, {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify({enum: "CLOSEST"}),
  });
}

const dmMachine = setup({
  actors: {
    fhVoice: fromPromise<any, null>(async () => {
      return fhVoice("en-US-EchoMultilingualNeural");
    }),
    fhHello: fromPromise<any, null>(async () => {
      return fhSay("Hi");
    }),
    fhL: fromPromise<any, null>(async () => {
     return fhListen();
   }),
   fhBigSmile: fromPromise<any, null>(async () => {
     return fhBigSmile();
   }),
   fhBigSurprise: fromPromise<any, null>(async () => {
     return fhBigSurprise();
   }),
   fhDisagree: fromPromise<any, null>(async () => {
     return fhDisagree();
   }),
   fhAngerWithSound: fromPromise<any, null>(async () => {
     return Promise.all ([
     fhSound('https://raw.githubusercontent.com/guscaroot/xstate-furhat-starter/master/src/grrr-137901.wav'),
     fhGesture("ExpressAnger")])
   }),
   fhGetUser: fromPromise<any, null>(async () => {
     return fhGetUser();
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
          target: "GetUser",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    GetUser: {
      invoke: {
        src: "fhGetUser",      
        input: null,
        onDone: {
          target: "AttendUser",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    AttendUser: {
      invoke: {
        src: "fhAttendUser",      
        input: null,
        onDone: {
          target: "BigSurprise",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    BigSmile: {
      invoke: {
        src: "fhBigSmile",      
        input: null,
        onDone: {
          target: "BigSurprise",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    BigSurprise: {
      invoke: {
        src: "fhBigSurprise",      
        input: null,
        onDone: {
          target: "WaitAfterBigSurprise",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    WaitAfterBigSurprise: {
      after: { 3000: "Disagree" },
    },
    Disagree: {
      invoke: {
        src: "fhDisagree",      
        input: null,
        onDone: {
          target: "WaitAfterDisagree",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    WaitAfterDisagree: {
      after: { 3000: "Anger" },
    },
    Anger: {
      invoke: {
        src: "fhAngerWithSound",      
        input: null,
        onDone: {
          target: "Listen",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    Listen: {
    },
    Fail: {},
  },
});

const actor = createActor(dmMachine).start();
console.log(actor.getSnapshot().value);

actor.subscribe((snapshot) => {
  console.log(snapshot.value);
});

