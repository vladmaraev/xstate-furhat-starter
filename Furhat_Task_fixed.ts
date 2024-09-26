// import { createMachine, createActor, fromPromise, assign } from "xstate";

// const FURHATURI = "127.0.0.1:54321"

// async function fhSay(text: string) {
//   const myHeaders = new Headers();
//   myHeaders.append("accept", "application/json");
//   const encText = encodeURIComponent(text);
//   return fetch(
//     `http://${FURHATURI}/furhat/say?text=${encText}&blocking=true`,
//     {
//       method: "POST",
//       headers: myHeaders,
//       body: "",
//     },
//   );
// }

// async function newGesture() {
//   const myHeaders = new Headers();
//   myHeaders.append("accept", "application/json");
//   return fetch(`http://${FURHATURI}/furhat/gesture?blocking=false`, {
//     method: "POST",
//     headers: myHeaders,
//     body: JSON.stringify({
//       "name":"newGesture",
//       "frames":[
//         {
//           "time":[], //ADD THE TIME FRAME OF YOUR LIKING
//           "persist":true, 
//           "params":{
//           //ADD PARAMETERS HERE IN ORDER TO CREATE A GESTURE
//           }
//         },
//         {
//           "time":[], //ADD TIME FRAME IN WHICH YOUR GESTURE RESETS
//           "persist":true, 
//           "params":{
//             "reset":true
//             }
//         }
//         //ADD MORE TIME FRAMES IF YOUR GESTURE REQUIRES THEM
//       ], 
//       "class":"furhatos.gestures.Gesture"
//     })
//   })
// } 



// async function fhGesture(text:string) {
//   const myHeaders = new Headers();
//   myHeaders.append("accept", "application/json");
//   return fetch(`http://${FURHATURI}/furhat/gesture?name=${text}&blocking=true`, {
//     method: "POST",
//     headers: myHeaders,
//     body: "",
//   })
// }

// async function fhListen() {
//   const myHeaders = new Headers();
//   myHeaders.append("accept", "application/json");
//   return fetch(`http://${FURHATURI}/furhat/listen`, {
//     method: "GET",
//     headers: myHeaders,
//   })
//     .then((response) => response.body)
//     .then((body) => body.getReader().read())
//     .then((reader) => reader.value)
//     .then((value) => JSON.parse(new TextDecoder().decode(value)).message);
// }

// const dmMachine = createMachine({
//   id: "root",
//   initial: "Start",
//   states: {
//     Start: { after: { 1000: "Next" } },
//     Next: {
//       invoke: {
//         id: "fhHello",
//         src: fromPromise(async () => {
//           return fhSay("Hi");
//         }),
//         onDone: {
//           target: "Fetch",
//           actions: ({ event }) => console.log(event.output),
//         },
//         onError: {
//           target: "Fail",
//           actions: ({ event }) => console.error(event),
//         },
//       },
//     },
//     Recognised: {},
//     Fail: {},
//   },
// });

// const actor = createActor(dmMachine).start();
// console.log(actor.getSnapshot().value);

// actor.subscribe((snapshot) => {
//   console.log(snapshot.value);
// });

import { setup, createActor, fromPromise, assign } from "xstate";

const FURHATURI = "127.0.0.1:54321";

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

async function fhGesture() {
  const myHeaders = new Headers();
  myHeaders.append("accept", "application/json");
  return fetch(
    `http://${FURHATURI}/furhat/gesture?name=Nod&blocking=true`,
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
      fhHello: fromPromise<any, { text: string }>(async ({ input }) => {
        return fhSay(`${input.text}`);
      }),
      fhL: fromPromise<any, null>(async () => {
        return fhListen();
      }),
      fhGesture: fromPromise<any, null>(async () => {
        return fhGesture();
      }),
      speakG: fromPromise<any, { text: string }>(async ({ input }) => {
        return Promise.all([
          fhSay(input.text), // Now TypeScript knows that input.text exists
          fhGesture()
        ]);
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
        input: () => ({ 
          text: "Hi there!" 
        }), 
        onDone: {
          target: "Hello",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    Hello: {
      invoke: {
        src: "fhL",
        onDone: {
          target: "Fetch",
          actions: [({ event }) => console.log(event.output),
            assign({ 
              lastResult: ({ event }) => event.output,
            }),
        ]},
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    Fetch: {
      invoke: {
        src: "speakG",
        input: ({ context }) => ({
          text: `You said ${context.lastResult}`
        }),
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