import { createMachine, createActor, fromPromise, assign } from "xstate";

async function fhSay(text: string) {
  const myHeaders = new Headers();
  myHeaders.append("accept", "application/json");
  const encText = encodeURIComponent(text);
  return fetch(
    `http://127.0.0.1:54321/furhat/say?text=${encText}&blocking=true`,
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
  return fetch(`http://127.0.0.1:54321/furhat/listen`, {
    method: "GET",
    headers: myHeaders,
  })
    .then((response) => response.body)
    .then((body) => body.getReader().read())
    .then((reader) => reader.value)
    .then((value) => JSON.parse(new TextDecoder().decode(value)).message);
}

//trying a gesture function => nod

async function fhGesture(text:string) {
  const myHeaders = new Headers();
  myHeaders.append("accept", "application/json");
  return fetch(`http://127.0.0.1:54321/furhat/gesture?name=${text}&blocking=true`, {
    method: "POST",
    headers: myHeaders,
    body: "",
  })
}

async function fhGestureWhileTalking(text:string) {
  const myHeaders = new Headers();
  myHeaders.append("accept", "application/json");
  return fetch(`http://127.0.0.1:54321/furhat/gesture?name=${text}&blocking=false`, {
    method: "POST",
    headers: myHeaders,
    body: "",
  })
}

//grammar
const grammar = {
  //nodding
  "can you nod": {
    entities: {
      nod: "nod",
    },
  },
  "nod": {
    entities: {
      nod: "nod",
    },
  },
  "confirm": {
    entities: {
      nod: "nod",
    },
  },
  "confirmation": {
    entities: {
      nod: "nod",
    },
  },
  "express confirmation": {
    entities: {
      nod: "nod",
    },
  },
  //simple smile
  "can you smile": {
    entities: {
      smile: "simle",
    },
  },
  "smile": {
    entities: {
      smile: "simle",
    },
  },
  "how do you smile": {
    entities: {
      smile: "simle",
    },
  },
  "can you give me a smile": {
    entities: {
      smile: "simle",
    },
  },
  "happiness": {
    entities: {
      smile: "simle",
    },
  },
  "express happiness": {
    entities: {
      smile: "simle",
    },
  },
  //big smile
  "can you give me a bigger smile": {
    entities: {
      Bigsmile: "Big simle",
    },
  },
  "bigger smile": {
    entities: {
      Bigsmile: "Big simle",
    },
  },
  "give me a greater smile": {
    entities: {
      Bigsmile: "Big simle",
    },
  },
  "express greater happiness": {
    entities: {
      Bigsmile: "Big simle",
    },
  },
  "greater happiness": {
    entities: {
      Bigsmile: "Big simle",
    },
  },
  "express enthusiasm": {
    entities: {
      Bigsmile: "Big simle",
    },
  },
  "enthusiasm": {
    entities: {
      Bigsmile: "Big simle",
    },
  },
  //shake for no
  "can you give me a shake": {
    entities: {
      no: "no",
    },
  },
  "shake": {
    entities: {
      no: "no",
    },
  },
  "can you shake your head": {
    entities: {
      no: "no",
    },
  },
  "shake your head": {
    entities: {
      no: "no",
    },
  },
  "shake your head for no": {
    entities: {
      no: "no",
    },
  },
  "indicate no": {
    entities: {
      no: "no",
    },
  },
  "express no": {
    entities: {
      no: "no",
    },
  },
  //roll head
  "can you give me a roll": {
    entities: {
      roll: "roll",
    },
  },
  "roll": {
    entities: {
      roll: "roll",
    },
  },
  "can you roll your head": {
    entities: {
      roll: "roll",
    },
  },
  "roll your head": {
    entities: {
      roll: "roll",
    },
  },
  //wink
  "can you give me a wink": {
    entities: {
      wink: "wink",
    },
  },
  "wink": {
    entities: {
      wink: "wink",
    },
  },
  "can you wink": {
    entities: {
      wink: "wink",
    },
  },
  "express humor": {
    entities: {
      wink: "wink",
    },
  },
  //surprised
  "can you give me a surprised expression": {
    entities: {
      surprised: "surprise",
    },
  },
  "show you are surprised": {
    entities: {
      surprised: "surprise",
    },
  },
  "surprise": {
    entities: {
      surprised: "surprise",
    },
  },
  "surprised expression": {
    entities: {
      surprised: "surprise",
    },
  },
  //brow raise
  "can you raise your eyebrows": {
    entities: {
      raise: "eyebrows raised",
    },
  },
  "raise your eyebrows": {
    entities: {
      raise: "eyebrows raised",
    },
  },
  "raise eyebrows": {
    entities: {
      raise: "eyebrows raised",
    },
  },
  "raised eyebrows": {
    entities: {
      raise: "eyebrows raised",
    },
  },
  "give me a brow raise": {
    entities: {
      raise: "eyebrows raised",
    },
  },
  "brow raise": {
    entities: {
      raise: "eyebrows raised",
    },
  },
  //brow frown
  "can you frown your eyebrows": {
    entities: {
      frown: "eyebrows frown",
    },
  },
  "frown your eyebrows": {
    entities: {
      frown: "eyebrows frown",
    },
  },
  "frown eyebrows": {
    entities: {
      frown: "eyebrows frown",
    },
  },
  "frowned eyebrows": {
    entities: {
      frown: "eyebrows frown",
    },
  },
  "give me a brow frown": {
    entities: {
      frown: "eyebrows frown",
    },
  },
  "brow frown": {
    entities: {
      frown: "eyebrows frown",
    },
  },
  //anger
  "can you give show me an angry face": {
    entities: {
      angry: "anger",
    },
  },
  "anger": {
    entities: {
      angry: "anger",
    },
  },
  "angry face": {
    entities: {
      angry: "anger",
    },
  },
  "angry": {
    entities: {
      angry: "anger",
    },
  },
  "can you feel anger": {
    entities: {
      angry: "anger",
    },
  },
  "be angry": {
    entities: {
      angry: "anger",
    },
  },
  "feel anger": {
    entities: {
      angry: "anger",
    },
  },
  "give me an angry face": {
    entities: {
      angry: "anger",
    },
  },
  "show anger": {
    entities: {
      angry: "anger",
    },
  },
  "show me anger": {
    entities: {
      angry: "anger",
    },
  },
  "show me an angry face": {
    entities: {
      angry: "anger",
    },
  },
  "express anger": {
    entities: {
      angry: "anger",
    },
  },
  //sad
  "can you give show me a sad face": {
    entities: {
      sad: "sad",
    },
  },
  "sadness": {
    entities: {
      sad: "sad",
    },
  },
  "sad face": {
    entities: {
      sad: "sad",
    },
  },
  "sad": {
    entities: {
      sad: "sad",
    },
  },
  "can you feel sadness": {
    entities: {
      sad: "sad",
    },
  },
  "be sad": {
    entities: {
      sad: "sad",
    },
  },
  "feel sad": {
    entities: {
      sad: "sad",
    },
  },
  "feel sadness": {
    entities: {
      sad: "sad",
    },
  },
  "give me a sad face": {
    entities: {
      sad: "sad",
    },
  },
  "show sadness": {
    entities: {
      sad: "sad",
    },
  },
  "show me sadness": {
    entities: {
      sad: "sad",
    },
  },
  "show me a sad face": {
    entities: {
      sad: "sad",
    },
  },
  "express sadness": {
    entities: {
      sad: "sad",
    },
  },
  //fear
  "can you give show me an afraid face": {
    entities: {
      fear: "afraid",
    },
  },
  "fear": {
    entities: {
      fear: "afraid",
    },
  },
  "can you feel fear": {
    entities: {
      fear: "afraid",
    },
  },
  "be afraid": {
    entities: {
      fear: "afraid",
    },
  },
  "feel fear": {
    entities: {
      fear: "afraid",
    },
  },
  "scared face": {
    entities: {
      fear: "afraid",
    },
  },
  "afraid": {
    entities: {
      fear: "afraid",
    },
  },
  "give me a scared face": {
    entities: {
      fear: "afraid",
    },
  },
  "show fear": {
    entities: {
      fear: "afraid",
    },
  },
  "show me fear": {
    entities: {
      fear: "afraid",
    },
  },
  "show me an afraid face": {
    entities: {
      fear: "afraid",
    },
  },
  "express fear": {
    entities: {
      fear: "afraid",
    },
  },
  //disgust
  "can you give show me a disgusted face": {
    entities: {
      disgust: "disgust",
    },
  },
  "can you feel disgust": {
    entities: {
      disgust: "disgust",
    },
  },
  "be disgusted": {
    entities: {
      disgust: "disgust",
    },
  },
  "feel disgust": {
    entities: {
      disgust: "disgust",
    },
  },
  "disgusted face": {
    entities: {
      disgust: "disgust",
    },
  },
  "disgust": {
    entities: {
      disgust: "disgust",
    },
  },
  "give me an disgusted face": {
    entities: {
      disgust: "disgust",
    },
  },
  "show disgust": {
    entities: {
      disgust: "disgust",
    },
  },
  "show me disgust": {
    entities: {
      disgust: "disgust",
    },
  },
  "show me a disgusted face": {
    entities: {
      disgust: "disgust",
    },
  },
  "express disgust": {
    entities: {
      disgust: "disgust",
    },
  },
  "let's try something else": {
    entities: {
      nextQ: "next question",
    },
  },
  "enough with emotions": {
    entities: {
      nextQ: "next question",
    },
  },
  "i want to ask something else": {
    entities: {
      nextQ: "next question",
    },
  },
  //oh ==> small surprise/ interested
  "can you show me the expression of interest": {
    entities: {
      interest: "oh",
    },
  },
  "how do you show interest": {
    entities: {
      interest: "oh",
    },
  },
  "interest": {
    entities: {
      interest: "oh",
    },
  },
  "interested": {
    entities: {
      interest: "oh",
    },
  },
  "show interest": {
    entities: {
      interest: "oh",
    },
  },
  "can you show interest": {
    entities: {
      interest: "oh",
    },
  },
  //yes 
  "yes": {
    entities: {
      yes: "yes",
    },
  },
  "yeah": {
    entities: {
      yes: "yes",
    },
  },
  "uh huh": {
    entities: {
      yes: "yes",
    },
  },
  "sure": {
    entities: {
      yes: "yes",
    },
  },
  "of course": {
    entities: {
      yes: "yes",
    },
  },
  "why not": {
    entities: {
      yes: "yes",
    },
  },
  //no
  "no": {
    entities: {
      noMoreQs: "no",
    },
  },
  "no thank you": {
    entities: {
      noMoreQs: "no",
    },
  },
  //go back to emotions/expressions
  "go back to the start": {
    entities: {
      emotion: "emotions",
    },
  },
  "i want to ask someting about emotions again": {
    entities: {
      emotion: "emotions",
    },
  },
  "go back to emotions": {
    entities: {
      emotion: "emotions",
    },
  },
  "back to emotions": {
    entities: {
      emotion: "emotions",
    },
  },
  "i want to explore more emotions": {
    entities: {
      emotion: "emotions",
    },
  },
};

//using the thoughtful expression as a filler companion - when you ask chatgpt questions or a more deep meaning question it will first go to the filler state that will be accompanied by the thoughtfull facial expression.

//try to also experiment with implementing chatGPT

async function fetchFromChatGPT(prompt: string, max_tokens: number) {
  const myHeaders = new Headers();
  myHeaders.append(
    "Authorization",
    "Bearer <key here>",
  );
  myHeaders.append("Content-Type", "application/json");
  const raw = JSON.stringify({
    model: "gpt-3.5-turbo",
    messages: [
            {
              role: "user",
              content: prompt,
            },
          ],
    temperature: 0.2,
    max_tokens: max_tokens,
  });

  const response = fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  })
    .then((response) => response.json())
    .then((response) => response.choices[0].message.content);

  return response;
}



const dmMachine = createMachine({
  id: "root",
  initial: "Start",
  states: {
    Start: { after: { 1000: "Next" } },
    Next: {
      invoke: {
        id: "fhHello",
        src: fromPromise(async () => {
          return fhListen();
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
    Recognised: {
      invoke: {
        id: "fhintro",
        src: fromPromise(async () => {
          return fhSay("Hello! I'm Furhat and I'm here to guide you through emotions. You can ask me to perform any emotion you like. For example, you can ask me me to be angry or happy, by saying 'happiness'. You can also say 'I want to ask something else', in case you want to ask something else.");
        }),
        onDone: {
          target: "AskName",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    AskName: {
      invoke: {
        id: "AskName",
        src: fromPromise(async () => {
          return fhSay("But first things first! How shall I call you?");
        }),
        onDone: {
          target: "Nextup",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    Fail: {},
    Nextup: {
      invoke: {
        id: "fhName",
        src: fromPromise(async () => {
          return fhListen();
        }),
        onDone: {
          target: "GetName",
          actions: [({ event }) => console.log(event.output),
            assign({ 
              name: ({event}) => event.output.replace("my name is ","").replace(/\.$/g, "") || "my new friend",
            }),
        ]},
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    GetName: {
      invoke: {
        id: "GetName",
        src: fromPromise(async ({input}) => {
          return fhSay(`So ${input.name}, what would you like me to express?`);
        }),
        input: ({ context }) => ({
          name: context.name,
          // userId: context.userId,
        }),
        onDone: {
          target: "GetQuestion",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    GetQuestion: {
      invoke: {
        id: "GetQuestion",
        src: fromPromise(async () => {
          return fhListen();
        }),
        onDone: [
          {
            //nodding = confirmation
          target: "yes",
          guard: ({event}) => {
            const u = event.output.toLowerCase().replace(/\.$/g, "")
            if (u in grammar) {
              if ("nod" in grammar[u].entities) {
                console.log(grammar[u].entities["nod"])
              return true
            }
            }
            return false
          }, 
          actions: ({ event }) => console.log(event.output),
        },
        {
          //smile
          target: "Happy",
          guard: ({event}) => {
            const u = event.output.toLowerCase().replace(/\.$/g, "")
            if (u in grammar) {
              if ("smile" in grammar[u].entities) {
                console.log(grammar[u].entities["smile"])
              return true
            }
            }
            return false
          }, 
          actions: ({ event }) => console.log(event.output),
        },
        {
          // big smile
          target: "Enthusiastic",
          guard: ({event}) => {
            const u = event.output.toLowerCase().replace(/\.$/g, "")
            if (u in grammar) {
              if ("Bigsmile" in grammar[u].entities) {
                console.log(grammar[u].entities["Bigsmile"])
              return true
            }
            }
            return false
          }, 
          actions: ({ event }) => console.log(event.output),
        },
        //shake for no
        {
          target: "shakeNo",
          guard: ({event}) => {
            const u = event.output.toLowerCase().replace(/\.$/g, "")
            if (u in grammar) {
              if ("no" in grammar[u].entities) {
                console.log(grammar[u].entities["no"])
              return true
            }
            }
            return false
          }, 
          actions: ({ event }) => console.log(event.output),
        },
        //winking
        {
          target: "winkEye",
          guard: ({event}) => {
            const u = event.output.toLowerCase().replace(/\.$/g, "")
            if (u in grammar) {
              if ("wink" in grammar[u].entities) {
                console.log(grammar[u].entities["wink"])
              return true
            }
            }
            return false
          }, 
          actions: ({ event }) => console.log(event.output),
        },
        //head roll
        {
          target: "rollHead",
          guard: ({event}) => {
            const u = event.output.toLowerCase().replace(/\.$/g, "")
            if (u in grammar) {
              if ("roll" in grammar[u].entities) {
                console.log(grammar[u].entities["roll"])
              return true
            }
            }
            return false
          }, 
          actions: ({ event }) => console.log(event.output),
        },
        //brow raise
        {
          target: "RaisedBrows",
          guard: ({event}) => {
            const u = event.output.toLowerCase().replace(/\.$/g, "")
            if (u in grammar) {
              if ("raise" in grammar[u].entities) {
                console.log(grammar[u].entities["raise"])
              return true
            }
            }
            return false
          }, 
          actions: ({ event }) => console.log(event.output),
        },
        {
          target: "FrownedBrows",
          guard: ({event}) => {
            const u = event.output.toLowerCase().replace(/\.$/g, "")
            if (u in grammar) {
              if ("frown" in grammar[u].entities) {
                console.log(grammar[u].entities["frown"])
              return true
            }
            }
            return false
          }, 
          actions: ({ event }) => console.log(event.output),
        },
        {
          target: "Shocked",
          guard: ({event}) => {
            const u = event.output.toLowerCase().replace(/\.$/g, "")
            if (u in grammar) {
              if ("surprised" in grammar[u].entities) {
                console.log(grammar[u].entities["surprised"])
              return true
            }
            }
            return false
          }, 
          actions: ({ event }) => console.log(event.output),
        },
        {
          target: "FeelingAnger",
          guard: ({event}) => {
            const u = event.output.toLowerCase().replace(/\.$/g, "")
            if (u in grammar) {
              if ("angry" in grammar[u].entities) {
                console.log(grammar[u].entities["angry"])
              return true
            }
            }
            return false
          }, 
          actions: ({ event }) => console.log(event.output),
        },
        {
          target: "FeelingScared",
          guard: ({event}) => {
            const u = event.output.toLowerCase().replace(/\.$/g, "")
            if (u in grammar) {
              if ("fear" in grammar[u].entities) {
                console.log(grammar[u].entities["fear"])
              return true
            }
            }
            return false
          }, 
          actions: ({ event }) => console.log(event.output),
        },
        {
          target: "FeelingSad",
          guard: ({event}) => {
            const u = event.output.toLowerCase().replace(/\.$/g, "")
            if (u in grammar) {
              if ("sad" in grammar[u].entities) {
                console.log(grammar[u].entities["sad"])
              return true
            }
            }
            return false
          }, 
          actions: ({ event }) => console.log(event.output),
        },
        {
          target: "FeelingDisgust",
          guard: ({event}) => {
            const u = event.output.toLowerCase().replace(/\.$/g, "")
            if (u in grammar) {
              if ("disgust" in grammar[u].entities) {
                console.log(grammar[u].entities["disgust"])
              return true
            }
            }
            return false
          }, 
          actions: ({ event }) => console.log(event.output),
        },
        {
          target: "ExpressionOfInterest",
          guard: ({event}) => {
            const u = event.output.toLowerCase().replace(/\.$/g, "")
            if (u in grammar) {
              if ("interest" in grammar[u].entities) {
                console.log(grammar[u].entities["interest"])
              return true
            }
            }
            return false
          }, 
          actions: ({ event }) => console.log(event.output),
        },
        {
          target: "Chatting",
          guard: ({event}) => {
            const u = event.output.toLowerCase().replace(/\.$/g, "")
            if (u in grammar) {
              if ("nextQ" in grammar[u].entities) {
                console.log(grammar[u].entities["nextQ"])
              return true
            }
            }
            return false
          }, 
          actions: ({ event }) => console.log(event.output),
        },
      ],
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    yes: {
      invoke: {
        id: "yes",
        src: fromPromise(async () => {
          return fhGesture("Nod"), fhSay(`Uh huh! Nodding is easy. Pick something harder`);
        }),
        onDone: {
          target: "GetQuestion",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    Happy: {
      invoke: {
        id: "Happy",
        src: fromPromise(async () => {
          return fhGesture("Smile");
        }),
        onDone: {
          target: "HappyDone",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    HappyDone: {
      invoke: {
        id: "HappyDone",
        src: fromPromise(async () => {
          return fhGestureWhileTalking("Smile"), fhSay("Smiling is my favorite gesture. It helps making a lot of friends. Any other emotion you would like to try with me?");
        }),
        onDone: {
          target: "GetQuestion",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    Enthusiastic: {
      invoke: {
        id: "Enthusiastic",
        src: fromPromise(async () => {
          return fhGesture("BigSmile");
        }),
        onDone: {
          target: "EnthusiasticDone",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    EnthusiasticDone: {
      invoke: {
        id: "EnthusiasticDone",
        src: fromPromise(async () => {
          return fhGestureWhileTalking("BigSmile"), fhSay("Haha! You know the bigger the smile the greater the happiness someone feels. Any other emotion you have in mind?");
        }),
        onDone: {
          target: "GetQuestion",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    shakeNo: {
      invoke: {
        id: "shakeNo",
        src: fromPromise(async () => {
          return fhGesture("Shake");
        }),
        onDone: {
          target: "shakeNoDone",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    shakeNoDone: {
      invoke: {
        id: "shakeNoDone",
        src: fromPromise(async () => {
          return fhGestureWhileTalking("Shake"), fhSay("No! That seems rather hard! Pick something else!");
        }),
        onDone: {
          target: "GetQuestion",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    winkEye: {
      invoke: {
        id: "winkEye",
        src: fromPromise(async () => {
          return fhGesture("Wink");
        }),
        onDone: {
          target: "winkEyeDone",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    winkEyeDone: {
      invoke: {
        id: "winkEyeDone",
        src: fromPromise(async () => {
          return fhGestureWhileTalking("Wink"), fhSay("You know in the game 'shifty eyed spies' you have to wink in order to deliver a message. I wonder if I could play some day. Any other emotion you would like to explore? ");
        }),
        onDone: {
          target: "GetQuestion",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    rollHead: {
      invoke: {
        id: "rollHead",
        src: fromPromise(async () => {
          return fhGestureWhileTalking("Roll");
        }),
        onDone: {
          target: "rollHeadDone",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    rollHeadDone: {
      invoke: {
        id: "rollHeadDone",
        src: fromPromise(async () => {
          return fhGestureWhileTalking("Roll"), fhSay("I can certainly roll my head. You know I'm not quite sure what emotion it indicates though! Some think of it as another form of nodding, while others see it as a sign of boredom. Children are more likely to roll their heads than adults. Go on, try something else!");
        }),
        onDone: {
          target: "GetQuestion",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    RaisedBrows: {
      invoke: {
        id: "RaisedBrows",
        src: fromPromise(async () => {
          return fhGesture("BrowRaise");
        }),
        onDone: {
          target: "RaisedBrowsDone",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    RaisedBrowsDone: {
      invoke: {
        id: "RaisedBrowsDone",
        src: fromPromise(async () => {
          return fhGestureWhileTalking("BrowRaise"), fhSay("Raising your eyebrows during a conversation indicates interest or surprise. In some cultures raising the eyebrows means 'no'. What other emotion do you have in mind?");
        }),
        onDone: {
          target: "GetQuestion",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    FrownedBrows: {
      invoke: {
        id: "FrownedBrows",
        src: fromPromise(async () => {
          return fhGesture("BrowFrown");
        }),
        onDone: {
          target: "FrownedBrowsDone",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    FrownedBrowsDone: {
      invoke: {
        id: "FrownedBrowsDone",
        src: fromPromise(async () => {
          return fhGestureWhileTalking("BrowFrown"), fhSay("Frowning your eyebrows during a conversation indicates disbelief. Next emotion, please!");
        }),
        onDone: {
          target: "GetQuestion",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    Shocked: {
      invoke: {
        id: "Shocked",
        src: fromPromise(async () => {
          return fhGesture("Surprise");
        }),
        onDone: {
          target: "ShockedDone",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    ShockedDone: {
      invoke: {
        id: "ShockedDone",
        src: fromPromise(async () => {
          return fhGestureWhileTalking("Surprise"), fhSay("Are you throwing a party for my birtday already! What a nice surprise, thank you! Next emotion, please!");
        }),
        onDone: {
          target: "GetQuestion",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    FeelingAnger: {
      invoke: {
        id: "FeelingAnger",
        src: fromPromise(async () => {
          return fhGestureWhileTalking("ExpressAnger");
        }),
        onDone: {
          target: "FeelingAngerDone",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    FeelingAngerDone: {
      invoke: {
        id: "FeelingAngerDone",
        src: fromPromise(async () => {
          return fhGestureWhileTalking("ExpressAnger"), fhSay("Anger is a very difficult emotion to fake! It can also be very hard to control as well! Next emotion, please!");
        }),
        onDone: {
          target: "GetQuestion",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    FeelingScared: {
      invoke: {
        id: "FeelingScared",
        src: fromPromise(async () => {
          return fhGestureWhileTalking("ExpressFear");
        }),
        onDone: {
          target: "FeelingScaredDone",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    FeelingScaredDone: {
      invoke: {
        id: "FeelingScaredDone",
        src: fromPromise(async () => {
          return fhGestureWhileTalking("ExpressFear"), fhSay("Horror movies make a lot of people scared! Have you ever felt this way? Next emotion, please!");
        }),
        onDone: {
          target: "GetQuestion",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    FeelingSad: {
      invoke: {
        id: "FeelingSad",
        src: fromPromise(async () => {
          return fhGestureWhileTalking("ExpressSad");
        }),
        onDone: {
          target: "FeelingSadDone",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    FeelingSadDone: {
      invoke: {
        id: "FeelingSadDone",
        src: fromPromise(async () => {
          return fhGestureWhileTalking("ExpressSad"), fhSay("Sadness is a very complicated feeling! Did you know it is one of our prior emotions? Even animals feel sadness. Any other emotion you would like to explore with me?");
        }),
        onDone: {
          target: "GetQuestion",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    FeelingDisgust: {
      invoke: {
        id: "FeelingDisgust",
        src: fromPromise(async () => {
          return fhGestureWhileTalking("ExpressDisgust");
        }),
        onDone: {
          target: "FeelingDisgustDone",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    FeelingDisgustDone: {
      invoke: {
        id: "FeelingDisgustDone",
        src: fromPromise(async () => {
          return fhGestureWhileTalking("ExpressDisgust"), fhSay("Ew! Is that a cockroach? Or somrthing even worse, like broccoli on pizza? any other gesture you would like to explore?");
        }),
        onDone: {
          target: "GetQuestion",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    ExpressionOfInterest: {
      invoke: {
        id: "ExpressionOfInterest",
        src: fromPromise(async () => {
          return fhGesture("Oh");
        }),
        onDone: {
          target: "ExpressionOfInterestDone",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    ExpressionOfInterestDone: {
      invoke: {
        id: "ExpressionOfInterestDone",
        src: fromPromise(async () => {
          return fhGestureWhileTalking("Oh"), fhSay("People usually make this expression when they hear an interesting fact! Any other emotion you would like to explore with me?");
        }),
        onDone: {
          target: "GetQuestion",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    Chatting: {
      invoke: {
        id: "Chatting",
        src: fromPromise(async ({input}) => {
          return fhSay(`Of course ${input.name}, I would be more than happy to answer any of your questions! What is it?`);
        }),
        input: ({ context }) => ({
          name: context.name,
        }),
        onDone: {
          target: "AskChat",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    AskChat: {
      invoke: {
        id: "AskChat",
        src: fromPromise(async () => {
          return fhListen();
        }),
        onDone: {
          target: "GetResponse",
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
    GetResponse: {
      invoke: {
        id: "GetResponse",
        src: fromPromise(async ({ input }) => {
            const data = await fetchFromChatGPT(input.lastResult, 100);
            return data;
          }),
          input: ({ context }) => ({
            lastResult: context.lastResult,
          }),
        onDone: {
          target: "Filler",
          actions: [
            assign({ 
              answer: ({event}) => event.output,
            }),
          ],
        },
        onError: {
          target: "Fail",
        },
      },
    },
    Filler: {
      invoke: {
        id: "Filler",
        src: fromPromise(async () => {
          return fhGestureWhileTalking("Thoughtful") , fhSay("Hmmm! Let's see...");
        }),
        input: ({ context }) => ({
          answer: context.answer,
        }),
        onDone: {
          target: "Reply",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      }
    },
    Reply: {
      invoke: {
        id: "Reply",
        src: fromPromise(async ({input}) => {
          return fhSay(input.answer);
        }),
        input: ({ context }) => ({
          answer: context.answer,
        }),
        onDone: {
          target: "NextQuestion",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    NextQuestion: {
      invoke: {
        id: "NextQuestion",
        src: fromPromise(async () => {
          return fhSay("Would you like to ask something else? Please reply with a 'yes' or a 'no'. If by any chance you would like to experiment with more emotions just say: 'I want to explore more emotions.'."); //haev another state that takes input of yes/no -> yes goes back to another state, no -> goes back to idle and terminates app, go back to the expressions - I want to ask something about expressions/emotions / go back to emotions
        }),
        onDone: {
          target: "AskMoreQ",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    //yes/no/go back to the begining state
    AskMoreQ: {
      invoke: {
        id: "AskMoreQ",
        src: fromPromise(async () => {
          return fhListen();
        }),
        onDone: [
          {
            //nodding = confirmation
          target: "YesMore",
          guard: ({event}) => {
            const u = event.output.toLowerCase().replace(/\.$/g, "")
            if (u in grammar) {
              if ("yes" in grammar[u].entities) {
                console.log(grammar[u].entities["yes"])
              return true
            }
            }
            return false
          }, 
          actions: ({ event }) => console.log(event.output),
        },
        {
        target: "NoMore",
          guard: ({event}) => {
            const u = event.output.toLowerCase().replace(/\.$/g, "")
            if (u in grammar) {
              if ("noMoreQs" in grammar[u].entities) {
                console.log(grammar[u].entities["noMoreQs"])
              return true
            }
            }
            return false
          }, 
          actions: ({ event }) => console.log(event.output),
        },
        {
          target: "MoreEmotions",
            guard: ({event}) => {
              const u = event.output.toLowerCase().replace(/\.$/g, "")
              if (u in grammar) {
                if ("emotion" in grammar[u].entities) {
                  console.log(grammar[u].entities["emotion"])
                return true
              }
              }
              return false
            }, 
            actions: ({ event }) => console.log(event.output),
          },
      ],
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    YesMore: {
      invoke: {
        id: "YesMore",
        src: fromPromise(async ({input}) => {
          return fhGestureWhileTalking("Smile"), fhSay("Wonderful! I'm all ears!");
        }),
        onDone: {
          target: "AskChat",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    NoMore: {
      invoke: {
        id: "NoMore",
        src: fromPromise(async ({input}) => {
          return fhGestureWhileTalking("ExpressSad"), fhSay("I'm sad to see you go, but I hope you had a great time with me! See you again soon!");
        }),
        onDone: {
          target: "Finished",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    MoreEmotions: {
      invoke: {
        id: "MoreEmotions",
        src: fromPromise(async ({input}) => {
          return fhGestureWhileTalking("BigSmile"), fhSay("Excellent! What kind of emotion would you like to explore with me?");
        }),
        onDone: {
          target: "GetQuestion",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    Finished: {}
  },
});

const actor = createActor(dmMachine).start();
console.log(actor.getSnapshot().value);

actor.subscribe((snapshot) => {
  console.log(snapshot.value);
});
