import { setup, createActor, fromPromise, assign } from "xstate";

//const FURHATURI = "http://192.168.1.11:54321";
const FURHATURI = "127.0.0.1:54321" 

//Voice function

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

//Say function

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

//Attend function

//Get only the closest user

async function fhAttend() {
  const users = await (await fetch(`http://${FURHATURI}/furhat/users`)).json();
  //console.log(await (await fetch(`http://${FURHATURI}/furhat/users`)).json())
  const myHeaders = new Headers();
  myHeaders.append("accept", "application/json");
  return users[0].id
} 

//Disappointment gesture

async function DisappointedAndDisgusted() {
  const myHeaders = new Headers();
  myHeaders.append("accept", "application/json");
  return fetch(`http://${FURHATURI}/furhat/gesture?blocking=false`, {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify({
      name: "DisappointedAndDisgusted",
      frames: [
        {
          time: [0.32, 5], 
          persist: true,
          priority: 10,
          params: {
            MOUTH_FROWN_RIGHT: 1.5,
            MOUTH_FROWN_LEFT: 1.5,
            BROW_OUTER_UP_LEFT: 1.5,
            BROW_OUTER_UP_RIGHT: 0.5,
            NOSE_SNEER_LEFT: 1,
            EYE_SQUINT_LEFT: 0.5,
            EYE_SQUINT_RIGHT: 0.5
          },
        },
        {
          time: [0.16, 3.5], 
          persist: true,
          params: {
            GAZE_TILT: -15,
            NECK_PAN: 20,
          },
        },
        {
          time: [2, 4], 
          persist: true,
          params: {
            MOUTH_FROWN_RIGHT: 1.5,
            MOUTH_FROWN_LEFT: 1.5,
            GAZE_TILT: 15,
            NECK_PAN: -20,
          },
        },
        {
          time: [4, 5], 
          persist: true,
          params: {
            MOUTH_FROWN_RIGHT: 1.5,
            MOUTH_FROWN_LEFT: 1.5,
            GAZE_TILT: -15,
            NECK_PAN: 20,
          },
        },
        {
          time: [5], 
          persist: true,
          params: {
            reset: true}
        }
      ],
      class: "furhatos.gestures.Gesture",
    }),
  })
}

//Delighted gesture

async function DelightedandApproving() {
  const myHeaders = new Headers();
  myHeaders.append("accept", "application/json");
  return fetch(`http://${FURHATURI}/furhat/gesture?blocking=false`, {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify({
      name: "DelightedandApproving",
      frames: [
        {
          time: [0.10, 3], 
          persist: true,
          params: {
            MOUTH_SMILE_LEFT: 0.7,
            BROW_INNER_UP: 1,
            MOUTH_SMILE_RIGHT: 0.7,
            MOUTH_STRETCH_LEFT: 0.5,
            MOUTH_STRETCH_RIGHT: 0.5,
            MOUTH_PUCKER: 1,
            BLINK_LEFT: 1,
            BLINK_RIGHT: 1
          },
        },
        {
          time: [0.10, 1], 
          persist: true,
          params: {
            NECK_TILT: 10,
          },
        },
        {
          time: [1.1, 2], 
          persist: true,
          params: {
            NECK_TILT: -20,
          },
        },
        {
          time: [2.1, 3], 
          persist: true,
          params: {
            NECK_TILT: 10,
            MOUTH_SMILE_LEFT: 1.5,
            MOUTH_SMILE_RIGHT: 1.5,
            BROW_INNER_UP: 1.5,
          },
        },
        {
          time: [6], 
          persist: true,
          params: {
            reset: true}
        }
      ],
      class: "furhatos.gestures.Gesture",
    }),
  });
}

//Audio gesture

async function AudioGesture(url: string) {
  const myHeaders = new Headers();
  myHeaders.append("accept", "application/json");
  const encURL = encodeURIComponent(url);
  return fetch(`http://${FURHATURI}/furhat/say?url=${encURL}&blocking=true`, {
    method: "POST",
    headers: myHeaders,
    body: ""
  });
}

//Surprise gesture

async function fhSurprise() {
  const myHeaders = new Headers();
  myHeaders.append("accept", "application/json");
  return fetch(
    `http://${FURHATURI}/furhat/gesture?blocking=false`,
    {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify({
       frames: [
         {
           time: [0.10, 3], 
           persist: true,
           params: {
             SURPRISE: 1.5,
           },
         },
         {
           time: [3], 
           persist: true,
           params: {
             reset: true}
         }
       ],
    class: "furhatos.gestures.Gesture",
     }),
    },
  );
}

//Listen gesture

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
      return fhVoice("en-US-Ruth-Neural")
    }),
    fhSpeak: fromPromise<any, string>(async ({input}) => {
      return fhSay(input);
    }),
    fhListen: fromPromise<any, null>(async () => {
     return fhListen();
   }),
    fhApprove: fromPromise<any, null>(async () => {
     return DelightedandApproving();
   }),
    fhDisapprove: fromPromise<any, null>(async () => {
     return DisappointedAndDisgusted();
   }),
    fhAttend: fromPromise<any, null>(async () => {
     return fhAttend();
   }),
  fhSurprise: fromPromise<any, null>(async () => {
     return fhSurprise();
   }),
   fhSurpriseSound: fromPromise<any, string>(async ({input}) => {
      return ([
        AudioGesture(input),
        fhSurprise()
      ])
    }),
  fhDisapproveSpeak: fromPromise<any, string>(async ({input}) => {
      return ([
        DisappointedAndDisgusted(),
        fhSay(input)
      ])
    }),
  fhApproveSpeak: fromPromise<any, string>(async ({input}) => {
      return ([
        DelightedandApproving(),
        fhSay(input)
      ])
    }),
  },
}).createMachine({
  id: "root",
  initial: "AttendingUser",
  context: {result: null, succes: null, city1: null, city2: null, correct1: null, correct2: null},
  states: {
    AttendingUser: {
      invoke: {
        src: "fhAttend",
        onDone: {
          target: "AttendingFeedback",
          actions: 
          [
           assign(({event}) => ({result: event.output})),
           assign({ succes: 1 }),
           ({ event }) => console.log(event.output)
          ],
        },
        onError: {
          target: "AttendingFeedback",
          actions: [
          assign({ succes: null }),
          ],
        },
      },          
    },

    Test: {
      invoke: {
        src: "fhSpeak",      
        input: "Hello there human"
      },
    },

    AttendingFeedback: {
      invoke: {
        src: "fhSpeak",      
        input: ({context}) => {
          if (context.result) {
            return `Hello there, ${context.result}`} 
            else { return `I can't see you. Where are you?`}
        },
      },
      after: { 3000: [
          {
            target: 'Question1',
            guard: ({ context }) => context.succes == 1
          },
          {
            target: 'AttendingUser'
          }
        ]}
    },

    Question1: {
      invoke: {
        src: "fhSpeak",
        input: "What is the capital of France?",
        onDone: {
          target: "Listen1"
        }
      },
    },

    Listen1: {
      invoke: {
        src: "fhListen",
        input: null,
        onDone: {
          target: "EvaluateAnswer1",
          actions: [
            assign(({event}) => ({city1: event.output})), 
            ({ event }) => console.log(event.output)
          ], 
        }
      }
    },

    EvaluateAnswer1: {
      always: [
        {
          target: "Approve1",
          //console.log(city1),
          guard: ({ context }) => context.city1 == "paris"

        },
        { 
          target: "Disapprove1",
          guard: ({ context }) => context.city1 != "paris" && context.city1 != false

        },
        { 
          target: "CantHear1",
          guard: ({ context }) => context.city1 == false
        }
      ]
    },

    CantHear1: {
      invoke: {
        src: "fhSpeak",
        input: "I didn't catch that, let's try again."
      },
      after: {
        3000: [
          {
          target: "Question1"
          }
        ]
      }
    },

    Approve1: {

      invoke: {
        src: "fhApproveSpeak",
        input: "Good job, correct!",
      },
      after: {
        5000: [
          {
          target: "Question2"
          }
        ]
      }
    },

    Disapprove1: {

      invoke: {
        src: "fhDisapproveSpeak",
        input: "Terrible! Incorrect! Let's try again",
      },
      after: {
        5000: [
          {
          target: "Question1"
          }
        ]
      }
    },

    Question2: {
      invoke: {
        src: "fhSpeak",
        input: "What is the capital of Germany?",
        onDone: {
          target: "Listen2"
        }
      },
    },

    Listen2: {
      invoke: {
        src: "fhListen",
        input: null,
        onDone: {
          target: "EvaluateAnswer2",
          actions: [
            assign(({event}) => ({city2: event.output})), 
          ], 
        }
      }
    },

    EvaluateAnswer2: {
      always: [
        {
          target: "Approve2",
          guard: ({ context }) => context.city2 == "berlin"
        },
        { 
          target: "Disapprove2",
          guard: ({ context }) => context.city2 != "berlin" && context.city2 != false

        },
        { 
          target: "CantHear2",
          guard: ({ context }) => context.city2 == false
        }
      ]
    },

    CantHear2: {
      invoke: {
        src: "fhSpeak",
        input: "I didn't catch that, let's try again."
      },
      after: {
        3000: [
          {
          target: "Question2"
          }
        ]
      }
    },

    Approve2: {

      invoke: {
        src: "fhApproveSpeak",
        input: "Good job, correct!",
      },
      after: {
        5000: [
          {
          target: "End"
          }
        ]
      }
    },

    Disapprove2: {

      invoke: {
        src: "fhDisapproveSpeak",
        input: "Terrible! Incorrect! Let's try again",
      },
      after: {
        5000: [
          {
          target: "Question2"
          }
        ]
      }
    },

    End: { 
      invoke: {
        src: "fhSurpriseSound",
        input: "https://bigsoundbank.com/UPLOAD/bwf-en/0283.wav"
      }
    }
  },
},
  
);

const actor = createActor(dmMachine).start();
console.log(actor.getSnapshot().value);

actor.subscribe((snapshot) => {
  console.log(snapshot.value);
});

