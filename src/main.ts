import { setup, createActor, fromPromise, assign } from "xstate";

const FURHATURI = "192.168.1.11:54321";//"127.0.0.1:54321";

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


async function sound(url: string) {
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
    name :"newGesture", //this is a copy for the big smile 
    frames:[
    {
      time:[0.32,0.64],
      persist:false,
      params:{
        //"BROW_UP_LEFT":0.7,
        "BROW_UP_RIGHT":0,
        "SMILE_OPEN":1,
        "SMILE_CLOSED":1,
        //"LOOK_DOWN_RIGHT": 1,
        //"SURPRISE":1

        }
    },
    {
      time:[0.96], 
    persist:false, 
      params:{
        reset:true
        }
    }],
  class:"furhatos.gestures.Gesture"
}),
});
}


async function disappointment() {
  const myHeaders = new Headers();
  myHeaders.append("accept", "application/json");
  return fetch(`http://${FURHATURI}/furhat/gesture?blocking=false`, {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify({
    name :"newGesture", //this is a copy for the big smile 
    frames:[
    {
      time:[0.80, 0.90],//[0.32,0.64],
      persist:true,
      params:{
        //"BROW_UP_LEFT":0.7,
        "BROW_UP_RIGHT":1,
        "BROW_UP_LEFT":1,
        "SMILE_CLOSED":1,
        "GAZE_TILT": 60,
       // "LOOK_UP_RIGHT": 1,
       // "LOOK_UP_LEFT": 1,
        //"SURPRISE":1

        }
    },
    {
      time:[1.20], 
    persist:false, 
      params:{
        reset:true
        }
    }],
  class:"furhatos.gestures.Gesture"
}),
});
}


//shaking face
async function shakinghead() {
  const myHeaders = new Headers();
  myHeaders.append("accept", "application/json");
  
  return fetch(`http://${FURHATURI}/furhat/gesture?blocking=false`, {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify({
      name: "newGesture", 
      frames: [
        {
          time: [0.20, 0.30], 
          persist: true,
          params: {
            "NECK_PAN": 20,     
            "SMILE_CLOSED": 1,      
            "LOOK_UP_RIGHT": 0.5     
          }
        },
        {
          time: [1.00], 
          persist: true,
          params: {
            "NECK_PAN": -20,       
            "LOOK_UP_LEFT": 0.5      
          }
        },
        {
          time: [1.20, 1.30], 
          persist: true,
          params: {
            "NECK_PAN": 20,     
            "SMILE_CLOSED": 1,      
            "LOOK_UP_RIGHT": 0.5     
          }
        },
        {
          time: [1.40], 
          persist: true,
          params: {
            "NECK_PAN": -20,       
            "LOOK_UP_LEFT": 0.5       
          }
        },
        {
          time: [1.60, 1.70], 
          persist: true,
          params: {
            "NECK_PAN": 20,
            "SMILE_CLOSED": 1,
            "LOOK_UP_RIGHT": 0.5
          }
        },
        {
          time: [1.80], 
          persist: true,
          params: {
            "NECK_PAN": -20,
            "LOOK_UP_LEFT": 0.5
          }
        },



        {
          time: [2.00], 
          persist: false, 
          params: {
            reset: true              
          }
        },





      ],
      class: "furhatos.gestures.Gesture"
    })
  });
}


async function fhGetUser() {
  const myHeaders = new Headers();
  myHeaders.append("accept", "application/json");
  return fetch(`http://${FURHATURI}/furhat/users`, {
    method: "GET",
    headers: myHeaders,
  })
}



async function AttendToUser() {
  const myHeaders = new Headers();
  myHeaders.append("accept", "application/json");
  return fetch(`http://${FURHATURI}/furhat/attend?user=CLOSEST`, {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify({
      enum: "CLOSEST",
    }),
  });
}







//not used gesture
async function brows() {
  const myHeaders = new Headers();
  myHeaders.append("accept", "application/json");
  return fetch(`http://${FURHATURI}/furhat/gesture?blocking=false`, {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify({
    name :"newGesture", //smile face 
    frames:[
    {
      time: [0.80,0.90],
      persist:false,
      params:{
        //"BROW_UP_LEFT":0.7,
        "BROW_UP_RIGHT":1,
        "BROW_UP_LEFT":1,
        "SMILE_CLOSED":1,
        "LOOK_UP":0.5,
        //"LOOK_DOWN_RIGHT": 1,
        //"LOOK_DOWN_LEFT": 1,
        //"SURPRISE":1

        }
    },
    

    {
      time:[0.80, 0.90],//[0.32,0.64],
      persist:false,
      params:{
        //"BROW_UP_LEFT":0.7,
        "BROW_UP_RIGHT":1,
        "BROW_UP_LEFT":1,
        "SMILE_CLOSED":1,
        "LOOK_UP":0.5,
        //"LOOK_DOWN_RIGHT": 1,
        //"LOOK_DOWN_LEFT": 1,
        //"SURPRISE":1

        }
    },


    {
      time:[0.96], 
    persist:false, 
      params:{
        reset:true
        }
    }],
  class:"furhatos.gestures.Gesture"
}),
});
}













/* this is the original 
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
 */






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
    fhHello: fromPromise<any, null>(async () => {
      return Promise.all([
        fhSay("Hello"),
        fhGetUser(),
        AttendToUser()]);
    }),
    fhL: fromPromise<any, null>(async () => {
    return Promise.all([
      fhListen(),
      AttendToUser()]);
  }),

  newGesture: fromPromise<any, null>(async () => {
    return Promise.all([
      newGesture(),
      AttendToUser]);
  }),

  

  disappointges : fromPromise<any, null>(async () => {
    return Promise.all([
      disappointment(),
      AttendToUser]);
  }),

  shakingheadgest : fromPromise<any, null>(async () => {
    return Promise.all([
      shakinghead(),
      AttendToUser()]);
  }),

  sayactor: fromPromise<any, {text: string}>(async ({input}) => {
    return Promise.all([
    AttendToUser(),
    fhSay(input.text)]);
  }),

  soundactor: fromPromise<any, {url: string}>(async ({input}) => {
    return fhSay(input.url);
  }),


  winkgesture: fromPromise<any, null>(async () => {
    return Promise.all([
      AttendToUser(),
      fhGesture("Wink"),
      //fhGesture("ExpressDisgust"),
      sound("https://raw.githubusercontent.com/Viktoriada26/xstate-furhat-starter/master/hmm.wav"),

    ])
  }),
/* 
  fhaskfood: fromPromise<any, null>(async () => {
    return fhSay("so tell me what's your favorite food?");
  }),

  disgustfood: fromPromise<any, null>(async () => {
    return fhSay("that's the most disgusting food. Bliax");
  }),
 */



// actor gesture

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
          target: "newGesture",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },

    newGesture: {
      invoke : {
        src : "newGesture",
        input : null,
        onDone : {
          target: "Hello",
        },
      },
    },




    Hello: {
      invoke: {
        src: "fhL",
        onDone: {
          target: "Askforplans",
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

    






/*   Recognised: {
    invoke: {
      src: "fhL",
      onDone: {
        target: "Askforplans",
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

  }, */


  Askforplans : {
    invoke: {
      src: "sayactor",
      input: {text: "What are your plans for tonight?"},
      onDone: {
        target: "Listenplans1",
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


  Listenplans1: {
    invoke: {
      src: "fhL",
      onDone: {
        target: "winkgesture",
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



  plansanswer: {
    invoke: {
      src: "sayactor",
      input: {text: "That's so nice. It'a a good chance to meet new people. In which place are you planning to go?"},
      onDone: {
        target: "Listenplans2",
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







  winkgesture : {
    invoke : {
      src : "winkgesture",
      input : null,
      onDone : {
        target: "plansanswer", //have to change it to another target.
      },
    },
  },

  Listenplans2: {
    invoke: {
      src: "fhL",
      onDone: {
        target: "disappointment",
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


    disappointment: {
      invoke : {
        src : "disappointges",
        input : null,
        onDone : {
          target: "plansreaction", //have to change it to another target.
        },
      },
    }, 

  plansreaction: {
    invoke: {
      src: "sayactor",
      input: {text: "Not one of my favorite places but its okay for a drink. "}, //not one of my favorites but its okay and an image like :|
      onDone: {
        target: "askfurhatsplans",
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

  askfurhatsplans: {
    invoke: {
      src: "fhL",
      onDone: {
        target: "shakinghead",
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


  shakinghead: {
    invoke : {
      src : "shakingheadgest",
      input : null,
      onDone : {
        target: "Furhatsanswer", //have to change it to another target.
      },
    },
  },

  Furhatsanswer: {
    invoke: {
      src: "sayactor",
      input: {text: "Nope, I have to stay home and study"}, //not one of my favorites but its okay and an image like :|
      onDone: {
        target: "Recognised",
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






    
    
    Recognised: {},
    Fail: {},
  },
});

const actor = createActor(dmMachine).start();
console.log(actor.getSnapshot().value);

actor.subscribe((snapshot) => {
  console.log(snapshot.value);
});
