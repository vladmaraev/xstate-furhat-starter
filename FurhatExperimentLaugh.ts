import { createMachine, createActor, fromPromise, assign } from "xstate";

const keypress = require('keypress');

keypress(process.stdin);
process.stdin.setRawMode(true);
process.stdin.resume();

// Declare a variable to store the pressed key
let globalPressedKey = null;

// Listen for a keypress event
process.stdin.on('keypress', function(ch, key) {
  // Handle key events globally, e.g., store the pressed key in a variable
  globalPressedKey = key;
});

function resetGlobalPressedKey() {
  globalPressedKey = null;
}

const FURHATURI = "127.0.0.1:54321"

async function fhSay(text: string) {
  const myHeaders = new Headers();
  myHeaders.append("accept", "application/json");
  const encText = encodeURIComponent(text);
  return fetch(
    `http://${FURHATURI}/furhat/say?text=${encText}&blocking=true`,
    {
      method: "POST",
      headers: myHeaders,
      body: "",
    },
  );
}

async function Laugh() {
  const myHeaders = new Headers();
  myHeaders.append("accept", "application/json");
  return fetch(
    `http://${FURHATURI}/furhat/say?url=https://furhat-audio.s3.eu-north-1.amazonaws.com/chuckleMan.wav&blocking=false`,
    {
      method: "POST",
      headers: myHeaders,
      body: "",
    },
  ), fetch(`http://${FURHATURI}/furhat/gesture?blocking=false`, {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify({
      "name":"Laughing",
      "frames":[
        {
          "time": [0.32, 0.48],
          "persist": false,
          "params": {
            "BROW_UP_LEFT": 0.2,
            "BROW_UP_RIGHT": 0.2,
            "SMILE_OPEN":0.85,
            "SMILE_CLOSED":0.2,
            "NECK_TILT": -4,
            "EYE_SQUINT_RIGHT": 0.85,
            "EYE_SQUINT_LEFT": 0.85,
            "BROW_INNER_UP": 0.5,
            "NOSE_SNEER_LEFT": 0.35,
            "NOSE_SNEER_RIGHT": 0.35,
          }
        },
        {
          "time": [0.48, 0.74],
          "persist": false,
          "params": {
            "SMILE_OPEN":0.2,
            "JAW_OPEN": 0.0,
            "EYE_SQUINT_RIGHT": 0.45,
            "EYE_SQUINT_LEFT": 0.45,
            "NOSE_SNEER_LEFT": 0.1,
            "NOSE_SNEER_RIGHT": 0.1,
          }
        },
        {
          "time": [0.74, 0.94],
          "persist": false,
          "params": {
            "SMILE_OPEN":0.85,
            "EYE_SQUINT_RIGHT": 0.75,
            "EYE_SQUINT_LEFT": 0.75,
            "NOSE_SNEER_LEFT": 0.35,
            "NOSE_SNEER_RIGHT": 0.35,
          }
        },
        {
          "time": [0.94],
          "persist": false,
          "params": {
            "reset": true
          }
        }],
      "class":"furhatos.gestures.Gesture"
    })
  })
}

//gaze right smile
async function gazeRightSmile() {
  const myHeaders = new Headers();
  myHeaders.append("accept", "application/json");
  return fetch(`http://${FURHATURI}/furhat/gesture?blocking=false`, {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify({
      "name":"Laughing",
      "frames":[
        {
          "time":[0.32,7.5],
          "persist":true, 
          "params":{
            "EYE_LOOK_OUT_RIGHT": 0.6,
            "EYE_LOOK_IN_LEFT": 0.6,
            "BROW_DOWN_LEFT": 0.5,
            "BROW_DOWN_RIGHT": 0.5,
            "SMILE_CLOSED": 1,
            "NOSE_SNEER_LEFT": 0.35,
            "NOSE_SNEER_RIGHT": 0.35,
            "EYE_SQUINT_RIGHT": 0.6,
            "EYE_SQUINT_LEFT": 0.6,
          }
        },
        {
          "time":[8.6],
          "persist":true, 
          "params":{
            "reset":true
            }
        }],
      "class":"furhatos.gestures.Gesture"
    })
  })
} 


async function raiseEyebrowLEFT() {
  const myHeaders = new Headers();
  myHeaders.append("accept", "application/json");
  return fetch(`http://${FURHATURI}/furhat/gesture?blocking=false`, {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify({
      "name":"Laughing",
      "frames":[
        {
          "time":[0.32,7.64],
          "persist":false, 
          "params":{
            "BROW_DOWN_RIGHT":0.8,
            "BROW_UP_LEFT":1,
            "EYE_SQUINT_RIGHT": 0.2,
            "MOUTH_PRESS_LEFT": 0.7,
            "MOUTH_PRESS_RIGHT": 0.7,
          }
        },
        {
          "time":[8.96],
          "persist":true, 
          "params":{
            "reset":true
            }
        }],
      "class":"furhatos.gestures.Gesture"
    })
  })
} 

async function gazeSmiling() {
  const myHeaders = new Headers();
  myHeaders.append("accept", "application/json");
  return fetch(`http://${FURHATURI}/furhat/gesture?blocking=false`, {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify({
      "name":"Laughing",
      "frames":[
        {
          "time":[0.32,20.0],
          "persist":true, 
          "params":{
            "BROW_DOWN_LEFT": 0.5,
            "BROW_DOWN_RIGHT": 0.5,
            "SMILE_CLOSED": 1,
            "NOSE_SNEER_LEFT": 0.35,
            "NOSE_SNEER_RIGHT": 0.35,
            "EYE_SQUINT_RIGHT": 0.6,
            "EYE_SQUINT_LEFT": 0.6,
          }
        },
        {
          "time":[20.0],
          "persist":true, 
          "params":{
            "reset":true
            }
        }],
      "class":"furhatos.gestures.Gesture"
    })
  })
} 

async function smileTalk() {
  const myHeaders = new Headers();
  myHeaders.append("accept", "application/json");
  return fetch(`http://${FURHATURI}/furhat/gesture?blocking=false`, {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify({
      "name":"smile",
      "frames":[
        {
          "time": [0.32, 30.0],
          "persist": true,
          "params": {
            "EYEBROW_TILT_UP": 0.2,
            "BROW_DOWN_LEFT": 0.6,
            "BROW_DOWN_RIGHT": 0.6,
            "MOUTH_SMILE_LEFT":0.9,
            "MOUTH_SMILE_RIGHT":0.9,
            "NECK_ROLL": 6,
            // "BROW_INNER_UP": 0.3, 
            "EYE_SQUINT_RIGHT": 0.5,
            "EYE_SQUINT_LEFT": 0.5,
            "JAW_OPEN": 0.23,
            "NOSE_SNEER_LEFT": 0.45,
            "NOSE_SNEER_RIGHT": 0.45,
          },
        },
        {
          "time": [30.0],
          "persist": true,
          "params": {
            "reset": true
          }
        }],
      "class":"furhatos.gestures.Gesture"
    })
  })
}

async function scan() {
  const myHeaders = new Headers();
  myHeaders.append("accept", "application/json");
  return fetch(`http://${FURHATURI}/furhat/gesture?blocking=false`, {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify({
      "name": "scan",
      "frames": [
        {
          "time": [0.34, 1.5],  
          "persist": true,
          "params": {
            "EYE_LOOK_OUT_LEFT": 0.8,
            "EYE_LOOK_IN_RIGHT": 0.8,
            "MOUTH_SMILE_LEFT": 0.6,
            "MOUTH_SMILE_RIGHT": 0.6,
            "NECK_PAN": 22.5,  
          }
        },
        {
          "time": [1.5, 5.5],  
          "persist": true,
          "params": {
            "EYE_LOOK_OUT_LEFT": 0.8,
            "EYE_LOOK_IN_RIGHT": 0.8,
            "MOUTH_SMILE_LEFT": 0.6,
            "MOUTH_SMILE_RIGHT": 0.6,
            "NECK_PAN": 45,
          }
        },
        {
          "time": [5.5, 7.5],  
          "persist": true,
          "params": {
            "EYE_LOOK_IN_LEFT": 1.0,
            "EYE_LOOK_OUT_RIGHT": 1.0,
            "MOUTH_SMILE_LEFT": 0.6,
            "MOUTH_SMILE_RIGHT": 0.6,
            "NECK_PAN": 0,
          }
        },
        {
          "time": [7.5, 10.0], 
          "persist": true,
          "params": {
            "EYE_LOOK_IN_LEFT": 1.0,
            "EYE_LOOK_OUT_RIGHT": 1.0,
            "MOUTH_SMILE_LEFT": 0.6,
            "MOUTH_SMILE_RIGHT": 0.6,
            "NECK_PAN": -55,
          }
        },
        {
          "time": [10.0],
          "persist": true,
          "params": {
            "reset": true
          }
        }
      ],
      "class": "furhatos.gestures.Gesture"
    })
  });
}

async function raiseEyebrow() {
  const myHeaders = new Headers();
  myHeaders.append("accept", "application/json");
  return fetch(`http://${FURHATURI}/furhat/gesture?blocking=false`, {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify({
      "name":"Laughing",
      "frames":[
        {
          "time":[0.32,5.7],
          "persist":false, 
          "params":{
            "BROW_DOWN_LEFT":0.8,
            "BROW_UP_RIGHT":1,
            "EYE_SQUINT_LEFT": 0.2,
            "MOUTH_PRESS_LEFT": 0.7,
            "MOUTH_PRESS_RIGHT": 0.7,
          }
        },
        {
          "time":[5.7],
          "persist":true, 
          "params":{
            "reset":true
            }
        }],
      "class":"furhatos.gestures.Gesture"
    })
  })
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

//trying a gesture function => nod
async function excited() {
  const myHeaders = new Headers();
  myHeaders.append("accept", "application/json");
  return fetch(`http://${FURHATURI}/furhat/gesture?blocking=false`, {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify({
      "name":"Excited",
      "frames":[
        {
          "time":[0.32,7.5],
          "persist":true, 
          "params":{
            "BROW_DOWN_LEFT": 0.9,
            "BROW_DOWN_RIGHT": 0.9,
            "BROW_INNER_UP": 0.6,
            "NOSE_SNEER_LEFT": 0.35,
            "NOSE_SNEER_RIGHT": 0.35,
            "SMILE_CLOSED": 1,
            "EYE_SQUINT_RIGHT": 0.8,
            "EYE_SQUINT_LEFT": 0.8,
            "NECK_ROLL": -15,
          }
        },
        {
          "time":[9.6],
          "persist":true, 
          "params":{
            "reset":true
            }
        }],
      "class":"furhatos.gestures.Gesture"
    })
  })
} 

async function fhGesture(text:string) {
  const myHeaders = new Headers();
  myHeaders.append("accept", "application/json");
  return fetch(`http://${FURHATURI}/furhat/gesture?name=${text}&blocking=true`, {
    method: "POST",
    headers: myHeaders,
    body: "",
  })
}

async function fhGestureThoughtful(text:string) {
  const myHeaders = new Headers();
  myHeaders.append("accept", "application/json");
  return fetch(`http://${FURHATURI}/furhat/gesture?name=${text}&blocking=false`, {
    method: "POST",
    headers: myHeaders,
    body: "",
  })
}

async function fhGestureWhileTalking(text:string) {
  const myHeaders = new Headers();
  myHeaders.append("accept", "application/json");
  return fetch(`http://${FURHATURI}/furhat/gesture?name=${text}&blocking=false`, {
    method: "POST",
    headers: myHeaders,
    body: "",
  })
}

async function AttendUser() {
  const myHeaders = new Headers();
  myHeaders.append("accept", "application/json");
  return fetch(`http://${FURHATURI}/furhat/attend?user=CLOSEST`, {
    method: "POST",
    headers: myHeaders,
  })
}

async function fhGetUser() {
  const myHeaders = new Headers();
  myHeaders.append("accept", "application/json");
  return fetch(`http://${FURHATURI}/furhat/users`, {
    method: "GET",
    headers: myHeaders,
  })
}

//using the thoughtful expression as a filler companion - when you ask chatgpt questions or a more deep meaning question it will first go to the filler state that will be accompanied by the thoughtfull facial expression.

//try to also experiment with implementing chatGPT

async function fetchFromChatGPT(prompt: string, max_tokens: number) {
  const myHeaders = new Headers();
  myHeaders.append(
    "Authorization",
    "Bearer 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",
  );
  myHeaders.append("Content-Type", "application/json");
  const raw = JSON.stringify({
    model: "gpt-4-0125-preview",
    messages: [
            {
              role: "user",
              content: prompt,
            },
          ],
    temperature: 0.1,
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

//attempting to have it keep memory
async function fetchFromChatGPTMemory(prompt: string, lastGPTutterance: string, newUtterance: string, max_tokens: number) {
  const myHeaders = new Headers();
  myHeaders.append(
    "Authorization",
    "Bearer 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",
  );
  myHeaders.append("Content-Type", "application/json");
  const raw = JSON.stringify({
    model: "gpt-4-0125-preview",
    messages: [
            {
              role: "user",
              content: prompt,
            },
            {
              role: "system",
              content: lastGPTutterance,
            },
            {
              role: "user",
              content: newUtterance,
            },
          ],
    temperature: 0.1,
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

//unimpressed 1
async function unimpressed() {
  const myHeaders = new Headers();
  myHeaders.append("accept", "application/json");
  return fetch(`http://${FURHATURI}/furhat/gesture?blocking=false`, {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify({
      "name":"Laughing",
      "frames":[
        {
          "time":[0.32,6.5],
          "persist":true, 
          "params":{
            "EYE_SQUINT_LEFT": 0.2,
            "EYE_SQUINT_RIGHT": 0.2,
            "EYE_LOOK_OUT_LEFT": 0.6,
            "EYE_LOOK_IN_RIGHT": 0.6,
            "MOUTH_FROWN_LEFT": 0.5,
            "MOUTH_FROWN_RIGHT": 0.5,
            "MOUTH_PRESS_LEFT": 0.6,
            "MOUTH_PRESS_RIGHT": 0.6,
            "BROW_DOWN_LEFT": 0.5,
            "BROW_DOWN_RIGHT": 0.5,
          }
        },
        {
          "time":[7.6],
          "persist":true, 
          "params":{
            "reset":true
            }
        }],
      "class":"furhatos.gestures.Gesture"
    })
  })
} 

//unimpressed 1
async function unimpressedRight() {
  const myHeaders = new Headers();
  myHeaders.append("accept", "application/json");
  return fetch(`http://${FURHATURI}/furhat/gesture?blocking=false`, {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify({
      "name":"Laughing",
      "frames":[
        {
          "time":[0.32,6.5],
          "persist":true, 
          "params":{
            "EYE_SQUINT_LEFT": 0.2,
            "EYE_SQUINT_RIGHT": 0.2,
            "EYE_LOOK_IN_LEFT": 0.6,
            "EYE_LOOK_OUT_RIGHT": 0.6,
            "MOUTH_FROWN_LEFT": 0.5,
            "MOUTH_FROWN_RIGHT": 0.5,
            "MOUTH_PRESS_LEFT": 0.6,
            "MOUTH_PRESS_RIGHT": 0.6,
            "BROW_DOWN_LEFT": 0.5,
            "BROW_DOWN_RIGHT": 0.5,
          }
        },
        {
          "time":[7.6],
          "persist":true, 
          "params":{
            "reset":true
            }
        }],
      "class":"furhatos.gestures.Gesture"
    })
  })
} 

//gaze down
async function gazeDown() {
  const myHeaders = new Headers();
  myHeaders.append("accept", "application/json");
  return fetch(`http://${FURHATURI}/furhat/gesture?blocking=false`, {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify({
      "name":"Laughing",
      "frames":[
        {
          "time":[0.32,6.0],
          "persist":true, 
          "params":{
            "EYE_LOOK_DOWN_LEFT": 0.6,
            "EYE_LOOK_DOWN_RIGHT": 0.6,
            "BROW_UP_LEFT": 0.5,
            "BROW_UP_RIGHT": 0.5,
          }
        },
        {
          "time":[7.0],
          "persist":true, 
          "params":{
            "reset":true
            }
        }],
      "class":"furhatos.gestures.Gesture"
    })
  })
} 


async function gazeDownUp() {
  const myHeaders = new Headers();
  myHeaders.append("accept", "application/json");
  return fetch(`http://${FURHATURI}/furhat/gesture?blocking=false`, {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify({
      "name":"Laughing",
      "frames":[
        {
          "time": [0.32, 1.5],
          "persist": true,
          "params": {
            "EYE_LOOK_DOWN_LEFT": 0.6,
            "EYE_LOOK_DOWN_RIGHT": 0.6,
            "BROW_UP_LEFT": 0.5,
            "BROW_UP_RIGHT": 0.5,
          }
        },
        {
          "time": [1.6],
          "persist": true,
          "params": {
            "reset": true,
          }
        },
        {
          "time": [2.0, 3.2],
          "persist": true,
          "params": {
            "EYE_LOOK_UP_LEFT": 0.6,
            "EYE_LOOK_UP_RIGHT": 0.6,
            "BROW_UP_LEFT": 0.5,
            "BROW_UP_RIGHT": 0.5,
          }
        },
        {
          "time": [3.6],
          "persist": true,
          "params": {
            "reset": true,
          }
        }],
      "class":"furhatos.gestures.Gesture"
    })
  })
} 

//gaze right
async function gazeLeft() {
  const myHeaders = new Headers();
  myHeaders.append("accept", "application/json");
  return fetch(`http://${FURHATURI}/furhat/gesture?blocking=false`, {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify({
      "name":"Laughing",
      "frames":[
        {
          "time":[0.32,4.5],
          "persist":true, 
          "params":{
            "EYE_LOOK_OUT_LEFT": 0.6,
            "EYE_LOOK_IN_RIGHT": 0.6,
            "BROW_UP_LEFT": 0.5,
            "BROW_UP_RIGHT": 0.5,
          }
        },
        {
          "time":[5.6],
          "persist":true, 
          "params":{
            "reset":true
            }
        }],
      "class":"furhatos.gestures.Gesture"
    })
  })
} 

//gaze left
async function gazeRight() {
  const myHeaders = new Headers();
  myHeaders.append("accept", "application/json");
  return fetch(`http://${FURHATURI}/furhat/gesture?blocking=false`, {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify({
      "name":"Laughing",
      "frames":[
        {
          "time":[0.32,6.5],
          "persist":true, 
          "params":{
            "EYE_LOOK_IN_LEFT": 0.6,
            "EYE_LOOK_OUT_RIGHT": 0.6,
            "BROW_UP_LEFT": 0.5,
            "BROW_UP_RIGHT": 0.5,
          }
        },
        {
          "time":[7.6],
          "persist":true, 
          "params":{
            "reset":true
            }
        }],
      "class":"furhatos.gestures.Gesture"
    })
  })
}

async function gazeUpDown() {
  const myHeaders = new Headers();
  myHeaders.append("accept", "application/json");
  return fetch(`http://${FURHATURI}/furhat/gesture?blocking=false`, {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify({
      "name":"Laughing",
      "frames":[
        {
          "time": [0.32, 1.5],
          "persist": true,
          "params": {
            "EYE_LOOK_UP_LEFT": 0.6,
            "EYE_LOOK_UP_RIGHT": 0.6,
            "BROW_UP_LEFT": 0.5,
            "BROW_UP_RIGHT": 0.5,
          }
        },
        {
          "time": [1.6],
          "persist": true,
          "params": {
            "reset": true,
          }
        },
        {
          "time": [2.0, 3.2],
          "persist": true,
          "params": {
            "EYE_LOOK_DOWN_LEFT": 0.6,
            "EYE_LOOK_DOWN_RIGHT": 0.6,
            "BROW_UP_LEFT": 0.5,
            "BROW_UP_RIGHT": 0.5,
          }
        },
        {
          "time": [3.6],
          "persist": true,
          "params": {
            "reset": true,
          }
        }],
      "class":"furhatos.gestures.Gesture"
    })
  })
}

//gaze back and forth
async function gazeLeftToRight() {
  const myHeaders = new Headers();
  myHeaders.append("accept", "application/json");
  return fetch(`http://${FURHATURI}/furhat/gesture?blocking=true`, {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify({
      "name":"Laughing",
      "frames":[
        {
          "time": [0.32, 1.5],
          "persist": true,
          "params": {
            "EYE_LOOK_OUT_LEFT": 0.6,
            "EYE_LOOK_IN_RIGHT": 0.6,
            "BROW_UP_LEFT": 0.5,
            "BROW_UP_RIGHT": 0.5,
          }
        },
        {
          "time": [1.6],
          "persist": true,
          "params": {
            "reset": true,
          }
        },
        {
          "time": [2.0, 3.2],
          "persist": true,
          "params": {
            "EYE_LOOK_IN_LEFT": 0.6,
            "EYE_LOOK_OUT_RIGHT": 0.6,
            "BROW_UP_LEFT": 0.5,
            "BROW_UP_RIGHT": 0.5,
          }
        },
        {
          "time": [3.6],
          "persist": true,
          "params": {
            "reset": true,
          }
        }],
      "class":"furhatos.gestures.Gesture"
    })
  })
} 

async function gazeRightToLeft() {
  const myHeaders = new Headers();
  myHeaders.append("accept", "application/json");
  return fetch(`http://${FURHATURI}/furhat/gesture?blocking=false`, {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify({
      "name":"Laughing",
      "frames":[
        {
          "time": [0.32, 1.5],
          "persist": true,
          "params": {
            "EYE_LOOK_OUT_RIGHT": 0.6,
            "EYE_LOOK_IN_LEFT": 0.6,
            "BROW_UP_LEFT": 0.5,
            "BROW_UP_RIGHT": 0.5,
          }
        },
        {
          "time": [1.6],
          "persist": true,
          "params": {
            "reset": true,
          }
        },
        {
          "time": [2.0, 3.2],
          "persist": true,
          "params": {
            "EYE_LOOK_IN_RIGHT": 0.6,
            "EYE_LOOK_OUT_LEFT": 0.6,
            "BROW_UP_LEFT": 0.5,
            "BROW_UP_RIGHT": 0.5,
          }
        },
        {
          "time": [3.6],
          "persist": true,
          "params": {
            "reset": true,
          }
        }],
      "class":"furhatos.gestures.Gesture"
    })
  })
} 

//discomfort-disbelief
async function disbelief() {
  const myHeaders = new Headers();
  myHeaders.append("accept", "application/json");
  return fetch(`http://${FURHATURI}/furhat/gesture?blocking=false`, {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify({
      "name":"Laughing",
      "frames":[
        {
          "time":[0.32,30.0],
          "persist":true, 
          "params":{
            "BROW_DOWN_LEFT": 1,
            "BROW_DOWN_RIGHT": 1,
            "EYE_SQUINT_LEFT": 0.3,
            "EYE_SQUINT_RIGHT": 0.3,
            "MOUTH_PRESS_LEFT": 0.6,
            "MOUTH_PRESS_RIGHT": 0.6,
            "NOSE_SNEER_LEFT": 0.5,
            "NOSE_SNEER_RIGHT": 0.5,
          }
        },
        {
          "time":[30.0],
          "persist":true, 
          "params":{
            "reset":true
            }
        }],
      "class":"furhatos.gestures.Gesture"
    })
  })
} 

async function eyeroll() {
  const myHeaders = new Headers();
  myHeaders.append("accept", "application/json");
  return fetch(`http://${FURHATURI}/furhat/gesture?blocking=false`, {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify({
      "name": "EyeballExpression",
      "frames": [
        {
          "time": [0.0],
          "persist": false,
          "params": {
            "BROW_UP_LEFT": 0.3,
            "BROW_UP_RIGHT": 0.3,
            "EYE_LOOK_IN_LEFT": 1,
            "EYE_LOOK_OUT_RIGHT": 1,
          }
        },
        {
          "time": [0.64],
          "persist": false,
          "params": {
            "BROW_UP_LEFT": 0.4,
            "BROW_UP_RIGHT": 0.4,
            "EYE_LOOK_IN_LEFT": 1,
            "EYE_LOOK_OUT_RIGHT": 1,
          }
        },
        {
          "time": [1.28],
          "persist": false,
          "params": {
            "BROW_UP_LEFT": 0.8,
            "BROW_UP_RIGHT": 0.8,
            "EYE_LOOK_UP_LEFT": 1,
            "EYE_LOOK_UP_RIGHT": 1,
          }
        },
        {
        "time": [1.4],
        "persist": false,
        "params": {
          "EYE_LOOK_OUT_LEFT": 1,
          "EYE_LOOK_IN_RIGHT": 1,
        }
      },
      {
        "time": [1.4],
        "persist": false,
        "params": {
          "EYE_LOOK_OUT_LEFT": 1,
          "EYE_LOOK_IN_RIGHT": 1,
        }
      },
        {
          "time": [1.6],
          "persist": false,
          "params": {
            "EYE_WIDE_LEFT": 1,
            "EYE_WIDE_RIGHT": 1,
          }
        },
        {
          "time": [1.92],
          "persist": false,
          "params": {
            "reset": true,
          }
        }
      ],
      "class": "furhatos.gestures.Gesture"
    })
  })
}

async function widenedEyes() {
  const myHeaders = new Headers();
  myHeaders.append("accept", "application/json");
  return fetch(`http://${FURHATURI}/furhat/gesture?blocking=false`, {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify({
      "name":"Laughing",
      "frames":[
        {
          "time":[0.32,5.7],
          "persist":true, 
          "params":{
            "EYE_WIDE_LEFT": 1,
            "EYE_WIDE_RIGHT": 1,
            "BROW_UP_LEFT": 1,
            "BROW_UP_RIGHT": 1,
            "MOUTH_FUNNEL": 0.3,
          }
        },
        {
          "time":[5.7],
          "persist":true, 
          "params":{
            "reset":true
            }
        }],
      "class":"furhatos.gestures.Gesture"
    })
  })
} 

async function backchannel() {
  const myHeaders = new Headers();
  myHeaders.append("accept", "application/json");
  return fetch(`http://${FURHATURI}/furhat/gesture?blocking=false`, {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify({
      "name":"Laughing",
      "frames":[
        {
          "time":[0.32,20.0],
          "persist":true, 
          "params":{
            "EYE_WIDE_LEFT": 1,
            "EYE_WIDE_RIGHT": 1,
            "BROW_UP_LEFT": 2,
            "BROW_UP_RIGHT": 2,
            "MOUTH_FUNNEL": 0.3,
          }
        },
        {
          "time":[20.0],
          "persist":true, 
          "params":{
            "reset":true
            }
        }],
      "class":"furhatos.gestures.Gesture"
    })
  })
} 

async function widenedEyesfrown() {
  const myHeaders = new Headers();
  myHeaders.append("accept", "application/json");
  return fetch(`http://${FURHATURI}/furhat/gesture?blocking=false`, {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify({
      "name":"Laughing",
      "frames":[
        {
          "time":[0.32,9.5],
          "persist":true, 
          "params":{
            "EYE_WIDE_LEFT": 1,
            "EYE_WIDE_RIGHT": 1,
            "BROW_DOWN_LEFT": 0.5,
            "BROW_DOWN_RIGHT": 0.5,
            "MOUTH_FUNNEL": 0.3,
          }
        },
        {
          "time":[10.6],
          "persist":true, 
          "params":{
            "reset":true
            }
        }],
      "class":"furhatos.gestures.Gesture"
    })
  })
} 

async function shocked() {
  const myHeaders = new Headers();
  myHeaders.append("accept", "application/json");
  return fetch(`http://${FURHATURI}/furhat/gesture?blocking=false`, {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify({
      "name":"Laughing",
      "frames":[
        {
          "time":[0.32,9.5],
          "persist":true, 
          "params":{
            "EYE_WIDE_LEFT": 1,
            "EYE_WIDE_RIGHT": 1,
            "BROW_DOWN_LEFT": 0.5,
            "BROW_DOWN_RIGHT": 0.5,
            "MOUTH_FUNNEL": 0.3,
          }
        },
        {
          "time":[10.6],
          "persist":true, 
          "params":{
            "reset":true
            }
        }],
      "class":"furhatos.gestures.Gesture"
    })
  })
} 

async function youKnowLook() {
  const myHeaders = new Headers();
  myHeaders.append("accept", "application/json");
  return fetch(`http://${FURHATURI}/furhat/gesture?blocking=false`, {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify({
      "name":"Laughing",
      "frames":[
        {
          "time":[0.32,1.5],
          "persist":true, 
          "params":{
            "EYE_WIDE_LEFT": 1,
            "EYE_WIDE_RIGHT": 1,
            "MOUTH_PRESS_LEFT": 0.6,
            "MOUTH_PRESS_RIGHT": 0.6,
            "BROW_UP_LEFT": 0.3,
            "BROW_UP_RIGHT": 0.3,
          }
        },
        {
          "time":[1.6],
          "persist":true, 
          "params":{
            "reset":true
            }
        }],
      "class":"furhatos.gestures.Gesture"
    })
  })
} 

async function dissapointed() {
  const myHeaders = new Headers();
  myHeaders.append("accept", "application/json");
  return fetch(`http://${FURHATURI}/furhat/gesture?blocking=false`, {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify({
      "name":"Laughing",
      "frames":[
        {
          "time":[0.32,1.5],
          "persist":true, 
          "params":{
            "BROW_INNER_UP": 1,
            "EYE_SQUINT_LEFT": 0.2,
            "EYE_SQUINT_RIGHT": 0.2,
            "EYE_LOOK_DOWN_LEFT": 0.6,
            "EYE_LOOK_DOWN_RIGHT": 0.6,
            "MOUTH_FROWN_LEFT": 0.7,
            "MOUTH_FROWN_RIGHT": 0.7,
          }
        },
        {
          "time":[1.6],
          "persist":true, 
          "params":{
            "reset":true
            }
        }],
      "class":"furhatos.gestures.Gesture"
    })
  })
} 

async function noway() {
  const myHeaders = new Headers();
  myHeaders.append("accept", "application/json");
  return fetch(`http://${FURHATURI}/furhat/gesture?blocking=false`, {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify({
      "name":"Laughing",
      "frames":[
        {
          "time":[0.34,0.50],
          "persist":true, 
          "params":{
            "EYE_SQUINT_LEFT": 0.7,
            "EYE_SQUINT_RIGHT": 0.7,
            "MOUTH_PRESS_LEFT": 0.6,
            "MOUTH_PRESS_RIGHT": 0.6,
            "BROW_DOWN_LEFT": 0.7,
            "BROW_DOWN_RIGHT": 0.7,
            "EYE_BLINK_LEFT": 1,
            "EYE_BLINK_RIGHT": 1,
            "NECK_PAN": 15,

          }
        },
        {
          "time":[0.70,0.86],
          "persist":true, 
          "params":{
            "EYE_SQUINT_LEFT": 0.7,
            "EYE_SQUINT_RIGHT": 0.7,
            "MOUTH_PRESS_LEFT": 0.6,
            "MOUTH_PRESS_RIGHT": 0.6,
            "BROW_DOWN_LEFT": 0.7,
            "BROW_DOWN_RIGHT": 0.7,
            "EYE_BLINK_LEFT": 1,
            "EYE_BLINK_RIGHT": 1,
            "NECK_PAN": -15,

          }
        },
        {
          "time":[1.16,1.25],
          "persist":true, 
          "params":{
            "EYE_SQUINT_LEFT": 0.7,
            "EYE_SQUINT_RIGHT": 0.7,
            "MOUTH_PRESS_LEFT": 0.6,
            "MOUTH_PRESS_RIGHT": 0.6,
            "BROW_DOWN_LEFT": 0.7,
            "BROW_DOWN_RIGHT": 0.7,
            "EYE_BLINK_LEFT": 1,
            "EYE_BLINK_RIGHT": 1,
            "NECK_PAN": 15,

          }
        },
        {
          "time":[1.5],
          "persist":true, 
          "params":{
            "reset":true
            }
        }],
      "class":"furhatos.gestures.Gesture"
    })
  })
} 

async function evilSmile() {
  const myHeaders = new Headers();
  myHeaders.append("accept", "application/json");
  return fetch(`http://${FURHATURI}/furhat/gesture?blocking=true`, {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify({
      "name":"EvilLaughing",
      "frames":[
        {
          "time": [0.32, 15.0],
          "persist": true,
          "params": {
            "BROW_DOWN_LEFT": 1,
            "BROW_DOWN_RIGHT": 1,
            "SMILE_CLOSED":1,
            "EYE_SQUINT_RIGHT": 0.9,
            "EYE_SQUINT_LEFT": 0.9,
            "NOSE_SNEER_LEFT": 0.35,
            "NOSE_SNEER_RIGHT": 0.35,
          }
        },
        {
          "time": [15.0],
          "persist": true,
          "params": {
            "reset": true
          }
        }],
      "class":"furhatos.gestures.Gesture"
    })
  })
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
          return fhGetUser(), gazeLeftToRight();
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
          return gazeSmiling(), fhSay("Hello there, thank you for participating in today's experiment.!");
        }),
        onDone: [
          {
            target: "TerminateExperiment",
            guard: ({event}) => {
              return globalPressedKey && globalPressedKey.name === 'a';},
            actions: [({ event }) => console.log(event.output),
          ],
            },
          {
          target: "GetPerson",
          guard: ({event}) => !globalPressedKey,
          actions: ({ event }) => console.log(event.output),
        }],
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    GetPerson: {
      invoke: {
        id: "GetPerson",
        src: fromPromise(async () => {
          return AttendUser(), excited(), fhSay("But before we begin, could you please tell me your name?");
        }),
        onDone: [
          {
            target: "TerminateExperiment",
            guard: ({event}) => {
              return globalPressedKey && globalPressedKey.name === 'a';},
            actions: [({ event }) => console.log(event.output),
          ],
            },
          {
          target: "Nextup",
          guard: ({event}) => !globalPressedKey,
          actions: ({ event }) => console.log(event.output),
        }],
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
  Nextup: {
    invoke: {
      id: "Nextup",
      src: fromPromise(async () => {
        return fhListen();
      }),
      onDone:[
        {
          target: "TerminateExperiment",
          guard: ({event}) => {
            return globalPressedKey && globalPressedKey.name === 'a';},
          actions: [({ event }) => console.log(event.output),
        ],
          },
        {
          target: "BackChannelListen",
          guard: ({event}) => !globalPressedKey,
          actions: [({ event }) => console.log(event.output),
            assign({ 
              name: ({event}) => event.output.replace("i'm ","").replace("i am ","").replace("my name is ","").replace(/\.$/g, "") || "my new friend",
            }),
        ],
          }],
      onError: {
        target: "Fail",
        actions: ({ event }) => console.error(event),
      },
    },
  },
  BackChannelListen: {
    invoke: {
      src: fromPromise(async ({input}) => {
        return raiseEyebrowLEFT(), fhSay("Hmm!");
      }),
      onDone: [ 
        {
          target: "TerminateExperiment",
          guard: ({event}) => {
            return globalPressedKey && globalPressedKey.name === 'a';},
          actions: [({ event }) => console.log(event.output),
        ],
          },
        {               
        target: "GetName",
        guard: ({ event }) => !globalPressedKey,
        actions: [({ event }) => console.log(event.output),
      ],
        }],
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
          return fhSay(`So ${input.name}, nice to meet you! Please select one of the following topics to talk about: 1. "Which one tells a story better: Books or Movies?", 2. "Saturday plans: Going out or staying in?", or 3. "Buying a gift for a friend".`);
        }),
        input: ({ context }) => ({
          name: context.name,
          // userId: context.userId,
        }),
        onDone: [
          {
            target: "TerminateExperiment",
            guard: ({event}) => {
              return globalPressedKey && globalPressedKey.name === 'a';},
            actions: [({ event }) => console.log(event.output),
          ],
            },
          {
          target: "ChooseTopic",
          guard: ({event}) => !globalPressedKey,
          actions: ({ event }) => console.log(event.output),
        }],
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    ChooseTopic: {
      invoke: {
        id: "ChooseTopic",
        src: fromPromise(async () => {
          return gazeDownUp(), fhListen();
        }),
        onDone: [
          {
            target: "TerminateExperiment",
            guard: ({event}) => {
              return globalPressedKey && globalPressedKey.name === 'a';},
            actions: [({ event }) => console.log(event.output),
          ],
            },
          {
            target: "BooksVsMoviesNegotiation",
            guard: ({event}) => {
              const u = event.output.toLowerCase().replace(/\.$/g, "")
              if (u.includes("books") || u.includes("movies") || u.includes("movie") || u.includes("book") || u.includes("first") || u.includes("number one")) {
                return true
              }
              return false
            },
            actions: [({ event }) => console.log(event.output),
          ],
            },
            {
              target: "InAndOutNegotiation",
              guard: ({event}) => {
                const u = event.output.toLowerCase().replace(/\.$/g, "")
                if (u.includes("going out") || u.includes("staying in") || u.includes("inside") || u.includes("outdoors") || u.includes("saturday") || u.includes("plans") || u.includes("take out") || u.includes("number two") || u.includes("second") || u.includes("indoors")) {
                  return true
                }
                return false
              },
              actions: [({ event }) => console.log(event.output),
            ],
              },
              {
                target: "GiftNegotiation",
                guard: ({event}) => {
                  const u = event.output.toLowerCase().replace(/\.$/g, "")
                  if (u.includes("friend") || u.includes("buy") || u.includes("get") || u.includes("present") || u.includes("gift") || u.includes("presents") || u.includes("gifts") || u.includes("third") || u.includes("number three")) {
                    return true
                  }
                  return false
                },
                actions: [({ event }) => console.log(event.output),
              ],
                },
                {
                  target: "ExplainBooksVsMovies",
                  guard: ({event}) => {
                    const u = event.output.toLowerCase().replace(/\.$/g, "")
                    if (u.includes("i don't know") || u.includes("you can choose") || u.includes("you choose") || u.includes("you pick") || u.includes("your choice") || u.includes("i'm not sure") || u.includes("you can pick") || u.includes("you can select") || u.includes("pick") || u.includes("choose") || u.includes("select")) {
                      return true
                    }
                    return false
                  },
                  actions: [({ event }) => console.log(event.output)]
                  },
                  {
                    target: "noMatch",
                    actions: [({ event }) => console.log(event.output)]
                    },
                ],
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    noMatch: {
      invoke: {
        id: "LaughInitial",
        src: fromPromise(async () => {
          return raiseEyebrow(), fhSay("I'm sorry I didn't hear you well, could you repeat that one?");
        }),
        onDone: [
          {
          target: "ChooseTopic",
          actions: ({ event }) => console.log(event.output),
        }],
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    BooksVsMoviesNegotiation: {
      invoke: {
        id: "BooksVsMoviesNegotiation",
        src: fromPromise(async () => {
          return excited(), fhSay("Oh I was hoping you'd choose that one.");
        }),
        onDone: [
          {
            target: "TerminateExperiment",
            guard: ({event}) => {
              return globalPressedKey && globalPressedKey.name === 'a';},
            actions: [({ event }) => console.log(event.output),
          ],
            },
            {
              target: "LaughBackInitial",
              guard: ({event}) => {
                return globalPressedKey && globalPressedKey.name === 'z';},
              actions: [({ event }) => console.log(event.output),
            ],
              },
          {
            target: "LaughInitial",
            guard: ({event}) => {
              return globalPressedKey && globalPressedKey.name === 'space';},
              actions: [({ event }) => console.log(event.output),
            ],
            },
          {
          target: "Winking",
          guard: ({ event }) => !globalPressedKey,
          actions: ({ event }) => console.log(event.output),
        }],
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    LaughBackInitial: {
      invoke: {
        id: "LaughInitial",
        src: fromPromise(async () => {
          return Laugh(), fhSay("Good one right?");
        }),
        onDone: [
          {
            target: "TerminateExperiment",
            guard: ({event}) => {
              return globalPressedKey && globalPressedKey.name === 'a';},
            actions: [({ event }) => console.log(event.output),
          ],
            },
          {
          target: "Winking",
          actions: ({ event }) => console.log(event.output),
        }],
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    LaughInitial: {
      invoke: {
        id: "LaughInitial",
        src: fromPromise(async () => {
          return widenedEyes(), fhSay("Did you just laugh at me?");
        }),
        onDone: [
          {
            target: "TerminateExperiment",
            guard: ({event}) => {
              return globalPressedKey && globalPressedKey.name === 'a';},
            actions: [({ event }) => console.log(event.output),
          ],
            },
          {
          target: "MovingOnInitial",
          actions: ({ event }) => console.log(event.output),
        }],
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    MovingOnInitial: {
      invoke: {
        id: "LaughInitial",
        src: fromPromise(async () => {
          return eyeroll(), fhSay("Anyway, let's move on!");
        }),
        onDone: {
          target: "Winking",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    Winking: {
      invoke: {
        src: fromPromise(async () => {
          return fhGesture("Wink");
        }),
        onDone: {
          target: "ExplainBooksVsMovies",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    ExplainBooksVsMovies: {
      invoke: {
        id: "ExplainBooksVsMovies",
        src: fromPromise(async ({input}) => {
          return unimpressed(), fhSay(`A lot of movies are based on books, but maybe one is better than the other! So ${input.name} books or movies?`);
        }),
        input: ({ context }) => ({
          name: context.name,
          // userId: context.userId,
        }),
        onDone: [
          {
            target: "TerminateExperiment",
            guard: ({event}) => {
              return globalPressedKey && globalPressedKey.name === 'a';},
            actions: [({ event }) => console.log(event.output),
          ],
            },
          {
          target: "BooksVsMoviesPhase1",
          guard: ({event}) => !globalPressedKey,
          actions: ({ event }) => console.log(event.output),
        }],
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    BooksVsMoviesPhase1: {
      invoke: {
        src: fromPromise(async () => {
          return fhListen();
        }),
        onDone: [
          {
            target: "TerminateExperiment",
            guard: ({event}) => {
              return globalPressedKey && globalPressedKey.name === 'a';},
            actions: [({ event }) => console.log(event.output),
          ],
            },
          {
          target: "BooksVsMoviesPhase1GPT",
          guard:({event}) => !globalPressedKey,
          actions: [({ event }) => console.log(event.output),
            assign({ 
              lastResult: ({ event }) => event.output,
            }),
        ]}],
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    BooksVsMoviesPhase1GPT: {
      invoke: {
        src: fromPromise(async ({ input }) => {
            const data = await fetchFromChatGPT("Topic: Is reading the book better than watching the movie? Task: continue the debate by giving an OPPOSITE statement AND DISAGREE from this argument (ANSWER WITH ONLY 50 TOKENS):  " + input.lastResult, 50);
            return data;
          }),
          input: ({ context }) => ({
            lastResult: context.lastResult,
          }),
        onDone: {
          target: "BooksVsMoviesPhase1GPTReply",
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
    BooksVsMoviesPhase1GPTReply: {
      invoke: {
        src: fromPromise(async ({input}) => {
          return raiseEyebrowLEFT(), fhSay(`${input.answer}`);
        }),
        input: ({ context }) => ({
          answer: context.answer,
        }),
        onDone: [
          {
            target: "TerminateExperiment",
            guard: ({event}) => {
              return globalPressedKey && globalPressedKey.name === 'a';},
            actions: [({ event }) => console.log(event.output),
          ],
            },
            {
              target: "LaughBackBM1",
              guard: ({event}) => {
                return globalPressedKey && globalPressedKey.name === 'z';},
              actions: [({ event }) => console.log(event.output),
            ],
              },
          {
            target: "DidYouLaughBooksVsMovies1",
            guard: ({event}) => {
              return globalPressedKey && globalPressedKey.name === 'space';},
              actions: [({ event }) => console.log(event.output),
            ],
            },
          {
          target: "BooksVsMoviesPhase2",
          guard: ({event}) => !globalPressedKey,
          actions: ({ event }) => console.log(event.output),
        }],
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    LaughBackBM1: {
      invoke: {
        src: fromPromise(async () => {
          return resetGlobalPressedKey(), Laugh();
        }),
        onDone: {
          target: "BooksVsMoviesPhase2",
          actions: [({ event }) => console.log(event.output),
        ],
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    DidYouLaughBooksVsMovies1: {
      invoke: {
        src: fromPromise(async () => {
          return resetGlobalPressedKey(), gazeDown(), fhSay("I saw you laughing, what's funny?");
        }),
        onDone: {
          target: "BooksVsMoviesLaughExplain1",
          actions: [({ event }) => console.log(event.output),
        ],
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    BooksVsMoviesLaughExplain1: {
      invoke: {
        src: fromPromise(async () => {
          return fhListen();
        }),
        onDone: [
          {
            target: "TerminateExperiment",
            guard: ({event}) => {
              return globalPressedKey && globalPressedKey.name === 'a';},
            actions: [({ event }) => console.log(event.output),
          ],
            },
            {
              target: "NoApologiesNeeded1",
              guard: ({event}) => {
                const u = event.output.toLowerCase().replace(/\.$/g, "")
                if (u.includes("sorry") || u.includes("i didn't mean") || u.includes("i'm sorry") || u.includes("apologize")) {
                  return true
                }
                return false
              },
              actions: [({ event }) => console.log(event.output)]
              },
          {
          target: "IseeMovieBook",
          guard:({event}) => !globalPressedKey,
          actions: [({ event }) => console.log(event.output),
            assign({ 
              lastResult: ({ event }) => event.output,
            }),
        ]}],
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    IseeMovieBook: {
      invoke: {
        src: fromPromise(async () => {
          return resetGlobalPressedKey(), smileTalk(), fhSay("Oh I see. I would like to continue the conversation now, if you don't mind. Allow me to repeat my last thought.");
        }),
        onDone: {
          target: "BooksVsMoviesPhase1GPTReply",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    NoApologiesNeeded1: {
      invoke: {
        id: "NoApologiesNeeded1",
        src: fromPromise(async () => {
          return resetGlobalPressedKey(), smileTalk(), fhSay("I appreciate the apology. Let's continue from where we left off. Allow me to remind you my previous statement.");
        }),
        onDone: {
          target: "BooksVsMoviesPhase1GPTReply",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    BooksVsMoviesPhase2: {
      invoke: {
        src: fromPromise(async () => {
          return gazeUpDown(), fhListen();
        }),
        onDone: [
          {
            target: "TerminateExperiment",
            guard: ({event}) => {
              return globalPressedKey && globalPressedKey.name === 'a';},
            actions: [({ event }) => console.log(event.output),
          ],
            },
          {
          target: "BooksVsMoviesPhase2GPT",
          actions: [({ event }) => console.log(event.output),
            assign({ 
              lastResult: ({ event }) => event.output,
            }),
        ]}],
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    BooksVsMoviesPhase2GPT: {
      invoke: {
        src: fromPromise(async ({ input }) => {
            const data = await fetchFromChatGPTMemory("Topic: Is reading the book better than watching the movie? Task: continue the debate by giving an OPPOSITE statement AND DISAGREE from this argument (ANSWER WITH ONLY 50 TOKENS):  ", input.answer, input.lastResult, 50);
            return data;
          }),
          input: ({ context }) => ({
            lastResult: context.lastResult,
            answer: context.answer,
          }),
        onDone: {
          target: "BooksVsMoviesLaugh2",
          actions: [
            assign({ 
              secondanswer: ({event}) => event.output,
            }),
          ],
        },
        onError: {
          target: "Fail",
        },
      },
    },
    BooksVsMoviesLaugh2: {
      invoke: {
        src: fromPromise(async ({input}) => {
          return Laugh();
        }),
        onDone: [
          {
            target: "TerminateExperiment",
            guard: ({event}) => {
              return globalPressedKey && globalPressedKey.name === 'a';},
            actions: [({ event }) => console.log(event.output),
          ],
            },
          {
          target: "BooksVsMoviesPhase2GPTReply",
          actions: ({ event }) => console.log(event.output),
        }],
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    BooksVsMoviesPhase2GPTReply: {
      invoke: {
        src: fromPromise(async ({input}) => {
          return gazeRightSmile(), fhSay(`${input.secondanswer}`);
        }),
        input: ({ context }) => ({
          secondanswer: context.secondanswer,
        }),
        onDone: [
          {
            target: "TerminateExperiment",
            guard: ({event}) => {
              return globalPressedKey && globalPressedKey.name === 'a';},
            actions: [({ event }) => console.log(event.output),
          ],
            },
            {
              target: "LaughBackBM2",
              guard: ({event}) => {
                return globalPressedKey && globalPressedKey.name === 'z';},
              actions: [({ event }) => console.log(event.output),
            ],
              },
          {
            target: "DidYouLaughBooksVsMovies2",
            guard: ({event}) => {
              return globalPressedKey && globalPressedKey.name === 'space';},
              actions: [({ event }) => console.log(event.output),
            ],
            },
          {
          target: "BooksVsMoviesPhase3",
          guard: ({event}) => !globalPressedKey,
          actions: ({ event }) => console.log(event.output),
        }],
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    LaughBackBM2: {
      invoke: {
        src: fromPromise(async () => {
          return resetGlobalPressedKey(), Laugh();
        }),
        onDone: {
          target: "BooksVsMoviesPhase3",
          actions: [({ event }) => console.log(event.output),
        ],
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    DidYouLaughBooksVsMovies2: {
      invoke: {
        src: fromPromise(async () => {
          return resetGlobalPressedKey(), unimpressed(), fhSay("Did you just Laugh at me?");
        }),
        onDone: {
          target: "BooksVsMoviesLaughExplain2",
          actions: [({ event }) => console.log(event.output),
        ],
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    BooksVsMoviesLaughExplain2: {
      invoke: {
        src: fromPromise(async () => {
          return fhListen();
        }),
        onDone: [
          {
            target: "TerminateExperiment",
            guard: ({event}) => {
              return globalPressedKey && globalPressedKey.name === 'a';},
            actions: [({ event }) => console.log(event.output),
          ],
            },
            {
              target: "NoApologiesNeeded2",
              guard: ({event}) => {
                const u = event.output.toLowerCase().replace(/\.$/g, "")
                if (u.includes("sorry") || u.includes("i didn't mean") || u.includes("i'm sorry") || u.includes("apologize")) {
                  return true
                }
                return false
              },
              actions: [({ event }) => console.log(event.output)]
              },
          {
          target: "IseeMovieBook2",
          guard:({event}) => !globalPressedKey,
          actions: [({ event }) => console.log(event.output),
            assign({ 
              lastResult: ({ event }) => event.output,
            }),
        ]}],
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    IseeMovieBook2: {
      invoke: {
        src: fromPromise(async () => {
          return resetGlobalPressedKey(), smileTalk(), fhSay("Uh I get it now. Allow me to repeat myself...");
        }),
        onDone: {
          target: "BooksVsMoviesPhase2GPTReply",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    NoApologiesNeeded2: {
      invoke: {
        id: "NoApologiesNeeded2",
        src: fromPromise(async () => {
          return resetGlobalPressedKey(), smileTalk(), fhSay("Thank you for apologizing, that's so nice of you. Now as i was saying...");
        }),
        onDone: {
          target: "BooksVsMoviesPhase2GPTReply",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    BooksVsMoviesPhase3: {
      invoke: {
        src: fromPromise(async () => {
          return widenedEyes(), fhListen();
        }),
        onDone: [
          {
            target: "TerminateExperiment",
            guard: ({event}) => {
              return globalPressedKey && globalPressedKey.name === 'a';},
            actions: [({ event }) => console.log(event.output),
          ],
            },
          {
          target: "BooksVsMoviesPhase3GPT",
          actions: [({ event }) => console.log(event.output),
            assign({ 
              lastResult: ({ event }) => event.output,
            }),
        ]}],
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    BooksVsMoviesPhase3GPT: {
      invoke: {
        src: fromPromise(async ({ input }) => {
            const data = await fetchFromChatGPTMemory("Topic: Is reading the book better than watching the movie? Task: continue the debate by giving an OPPOSITE statement AND DISAGREE from this argument (ANSWER WITH ONLY 50 TOKENS):  ", input.secondanswer, input.lastResult, 50);
            return data;
          }),
          input: ({ context }) => ({
            lastResult: context.lastResult,
            secondanswer: context.secondanswer,
          }),
        onDone: {
          target: "BooksVsMoviesPhase3GPTReply",
          actions: [
            assign({ 
              thirdanswer: ({event}) => event.output,
            }),
          ],
        },
        onError: {
          target: "Fail",
        },
      },
    },
    BooksVsMoviesPhase3GPTReply: {
      invoke: {
        src: fromPromise(async ({input}) => {
          return evilSmile(), fhSay(`${input.thirdanswer}`);
        }),
        input: ({ context }) => ({
          thirdanswer: context.thirdanswer,
        }),
        onDone: [
          {
            target: "TerminateExperiment",
            guard: ({event}) => {
              return globalPressedKey && globalPressedKey.name === 'a';},
            actions: [({ event }) => console.log(event.output),
          ],
            },
            {
              target: "LaughBackBM3",
              guard: ({event}) => {
                return globalPressedKey && globalPressedKey.name === 'z';},
              actions: [({ event }) => console.log(event.output),
            ],
              },
          {
            target: "DidYouLaughBooksVsMovies3",
            guard: ({event}) => {
              return globalPressedKey && globalPressedKey.name === 'space';},
              actions: [({ event }) => console.log(event.output),
            ],
            },
          {
          target: "BooksVsMoviesPhase4",
          guard: ({event}) => !globalPressedKey,
          actions: ({ event }) => console.log(event.output),
        }],
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    LaughBackBM3: {
      invoke: {
        src: fromPromise(async () => {
          return resetGlobalPressedKey(), Laugh(), fhSay("Funny right?");
        }),
        onDone: {
          target: "BooksVsMoviesPhase4",
          actions: [({ event }) => console.log(event.output),
        ],
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    DidYouLaughBooksVsMovies3: {
      invoke: {
        id: "DidYouLaughBooksVsMovies3",
        src: fromPromise(async () => {
          return resetGlobalPressedKey(), fhGesture("Thoughful"), fhSay("What are you laughing about?");
        }),
        onDone: {
          target: "BooksVsMoviesLaughExplain3",
          actions: [({ event }) => console.log(event.output),
        ],
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    BooksVsMoviesLaughExplain3: {
      invoke: {
        src: fromPromise(async () => {
          return fhListen();
        }),
        onDone: [
          {
            target: "TerminateExperiment",
            guard: ({event}) => {
              return globalPressedKey && globalPressedKey.name === 'a';},
            actions: [({ event }) => console.log(event.output),
          ],
            },
            {
              target: "NoApologiesNeeded3",
              guard: ({event}) => {
                const u = event.output.toLowerCase().replace(/\.$/g, "")
                if (u.includes("sorry") || u.includes("i didn't mean") || u.includes("i'm sorry") || u.includes("apologize")) {
                  return true
                }
                return false
              },
              actions: [({ event }) => console.log(event.output)]
              },
          {
          target: "IseeMovieBook3",
          guard:({event}) => !globalPressedKey,
          actions: [({ event }) => console.log(event.output),
            assign({ 
              lastResult: ({ event }) => event.output,
            }),
        ]}],
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    IseeMovieBook3: {
      invoke: {
        src: fromPromise(async () => {
          return resetGlobalPressedKey(), smileTalk(), fhSay("Oh I see, it makes sense. As I was saying...");
        }),
        onDone: {
          target: "IseeMovieBooklaugh",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    IseeMovieBooklaugh: {
      invoke: {
        src: fromPromise(async () => {
          return resetGlobalPressedKey(), Laugh();
        }),
        onDone: {
          target: "AsIwas3",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    AsIwas3: {
      invoke: {
        src: fromPromise(async () => {
          return resetGlobalPressedKey(), evilSmile(), fhSay("As I was saying...");
        }),
        onDone: {
          target: "IseeMovieBooklaugh",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    NoApologiesNeeded3: {
      invoke: {
        id: "NoApologiesNeeded3",
        src: fromPromise(async () => {
          return resetGlobalPressedKey(), smileTalk(), fhSay("Hmm, thank you I feel better now. So, as I was saying...");
        }),
        onDone: [
          {
            target: "TerminateExperiment",
            guard: ({event}) => {
              return globalPressedKey && globalPressedKey.name === 'a';},
            actions: [({ event }) => console.log(event.output),
          ],
            },
          {
          target: "BooksVsMoviesPhase3GPTReply",
          actions: ({ event }) => console.log(event.output),
        }],
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    BooksVsMoviesPhase4: {
      invoke: {
        src: fromPromise(async () => {
          return gazeSmiling(), fhListen();
        }),
        onDone: [
          {
            target: "TerminateExperiment",
            guard: ({event}) => {
              return globalPressedKey && globalPressedKey.name === 'a';},
            actions: [({ event }) => console.log(event.output),
          ],
            },
          {
          target: "BooksVsMoviesPhase4GPT",
          actions: [({ event }) => console.log(event.output),
            assign({ 
              lastResult: ({ event }) => event.output,
            }),
        ]}],
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    BooksVsMoviesPhase4GPT: {
      invoke: {
        src: fromPromise(async ({ input }) => {
            const data = await fetchFromChatGPTMemory("Topic: Is reading the book better than watching the movie? Task: continue the debate by giving an OPPOSITE statement AND DISAGREE from this argument (ANSWER WITH ONLY 50 TOKENS):  ", input.thirdanswer, input.lastResult, 50);
            return data;
          }),
          input: ({ context }) => ({
            lastResult: context.lastResult,
            thirdanswer: context.thirdanswer,
          }),
        onDone: {
          target: "BooksVsMoviesPhase4GPTReply",
          actions: [
            assign({ 
              forthanswer: ({event}) => event.output,
            }),
          ],
        },
        onError: {
          target: "Fail",
        },
      },
    },
    BooksVsMoviesPhase4GPTReply: {
      invoke: {
        src: fromPromise(async ({input}) => {
          return raiseEyebrow(), fhSay(`${input.forthanswer}`);
        }),
        input: ({ context }) => ({
          forthanswer: context.forthanswer,
        }),
        onDone: [
          {
            target: "TerminateExperiment",
            guard: ({event}) => {
              return globalPressedKey && globalPressedKey.name === 'a';},
            actions: [({ event }) => console.log(event.output),
          ],
            },
            {
              target: "LaughBackBM4",
              guard: ({event}) => {
                return globalPressedKey && globalPressedKey.name === 'z';},
              actions: [({ event }) => console.log(event.output),
            ],
              },
          {
            target: "DidYouLaughBooksVsMovies4",
            guard: ({event}) => {
              return globalPressedKey && globalPressedKey.name === 'space';},
              actions: [({ event }) => console.log(event.output),
            ],
            },
          {
          target: "BooksVsMoviesPhase5",
          guard: ({event}) => !globalPressedKey,
          actions: ({ event }) => console.log(event.output),
        }],
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    LaughBackBM4: {
      invoke: {
        src: fromPromise(async () => {
          return resetGlobalPressedKey(), Laugh();
        }),
        onDone: {
          target: "BooksVsMoviesPhase5",
          actions: [({ event }) => console.log(event.output),
        ],
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    DidYouLaughBooksVsMovies4: {
      invoke: {
        id: "DidYouLaughBooksVsMovies4",
        src: fromPromise(async () => {
          return resetGlobalPressedKey(), widenedEyesfrown(), fhSay("Did you just laugh during a serious conversation?");
        }),
        onDone: {
          target: "BooksVsMoviesLaughExplain4",
          actions: [({ event }) => console.log(event.output),
        ],
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    BooksVsMoviesLaughExplain4: {
      invoke: {
        src: fromPromise(async () => {
          return fhListen();
        }),
        onDone: [
          {
            target: "TerminateExperiment",
            guard: ({event}) => {
              return globalPressedKey && globalPressedKey.name === 'a';},
            actions: [({ event }) => console.log(event.output),
          ],
            },
            {
              target: "NoApologiesNeeded4",
              guard: ({event}) => {
                const u = event.output.toLowerCase().replace(/\.$/g, "")
                if (u.includes("sorry") || u.includes("i didn't mean") || u.includes("i'm sorry") || u.includes("apologize")) {
                  return true
                }
                return false
              },
              actions: [({ event }) => console.log(event.output)]
              },
          {
          target: "IseeMovieBook4",
          guard:({event}) => !globalPressedKey,
          actions: [({ event }) => console.log(event.output),
            assign({ 
              lastResult: ({ event }) => event.output,
            }),
        ]}],
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    IseeMovieBook4: {
      invoke: {
        src: fromPromise(async () => {
          return resetGlobalPressedKey(), smileTalk(), fhSay("Oh I see.");
        }),
        onDone: {
          target: "Iseelaugh4",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    Iseelaugh4: {
      invoke: {
        src: fromPromise(async () => {
          return resetGlobalPressedKey(), Laugh();
        }),
        onDone: {
          target: "AsIwas4",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    AsIwas4: {
      invoke: {
        src: fromPromise(async () => {
          return resetGlobalPressedKey(), smileTalk(), fhSay("Let's continue from the last part then, which was...");
        }),
        onDone: {
          target: "BooksVsMoviesPhase4GPTReply",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    NoApologiesNeeded4: {
      invoke: {
        id: "NoApologiesNeeded4",
        src: fromPromise(async () => {
          return resetGlobalPressedKey(), smileTalk(), fhSay("I appreciate the apology. Allow me to repeat that last part...");
        }),
        onDone: {
          target: "BooksVsMoviesPhase4GPTReply",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    BooksVsMoviesPhase5: {
      invoke: {
        src: fromPromise(async () => {
          return unimpressedRight(), fhListen();
        }),
        onDone: [
          {
            target: "TerminateExperiment",
            guard: ({event}) => {
              return globalPressedKey && globalPressedKey.name === 'a';},
            actions: [({ event }) => console.log(event.output),
          ],
            },
          {
          target: "BooksVsMoviesPhase5GPT",
          actions: [({ event }) => console.log(event.output),
            assign({ 
              lastResult: ({ event }) => event.output,
            }),
        ]}],
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    BooksVsMoviesPhase5GPT: {
      invoke: {
        src: fromPromise(async ({ input }) => {
            const data = await fetchFromChatGPTMemory("Topic: Is reading the book better than watching the movie? Task: continue the debate by giving an OPPOSITE statement AND DISAGREE from this argument (ANSWER WITH ONLY 50 TOKENS):  ", input.forthanswer, input.lastResult, 50);
            return data;
          }),
          input: ({ context }) => ({
            lastResult: context.lastResult,
            forthanswer: context.forthanswer,
          }),
        onDone: {
          target: "BooksVsMoviesLaugh5",
          actions: [
            assign({ 
              fifthanswer: ({event}) => event.output,
            }),
          ],
        },
        onError: {
          target: "Fail",
        },
      },
    },
    BooksVsMoviesLaugh5: {
      invoke: {
        src: fromPromise(async ({input}) => {
          return Laugh();
        }),
        onDone: {
          target: "BooksVsMoviesPhase5GPTReply",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    BooksVsMoviesPhase5GPTReply: {
      invoke: {
        src: fromPromise(async ({input}) => {
          return smileTalk(), fhSay(`${input.fifthanswer}`);
        }),
        input: ({ context }) => ({
          fifthanswer: context.fifthanswer,
        }),
        onDone: [
          {
            target: "TerminateExperiment",
            guard: ({event}) => {
              return globalPressedKey && globalPressedKey.name === 'a';},
            actions: [({ event }) => console.log(event.output),
          ],
            },
            {
              target: "LaughBackBM5",
              guard: ({event}) => {
                return globalPressedKey && globalPressedKey.name === 'z';},
              actions: [({ event }) => console.log(event.output),
            ],
              },
          {
            target: "DidYouLaughBooksVsMovies5",
            guard: ({event}) => {
              return globalPressedKey && globalPressedKey.name === 'space';},
              actions: [({ event }) => console.log(event.output),
            ],
            },
          {
          target: "BooksVsMoviesPhase6",
          guard: ({event}) => !globalPressedKey,
          actions: ({ event }) => console.log(event.output),
        }],
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    LaughBackBM5: {
      invoke: {
        src: fromPromise(async () => {
          return resetGlobalPressedKey(), Laugh();
        }),
        onDone: {
          target: "BooksVsMoviesPhase6",
          actions: [({ event }) => console.log(event.output),
        ],
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    DidYouLaughBooksVsMovies5: {
      invoke: {
        id: "DidYouLaughBooksVsMovies5",
        src: fromPromise(async () => {
          return resetGlobalPressedKey(), gazeRightToLeft(), fhSay("You just laughed at me! What's so funny?");
        }),
        onDone: {
          target: "BooksVsMoviesLaughExplain5",
          actions: [({ event }) => console.log(event.output),
        ],
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    BooksVsMoviesLaughExplain5: {
      invoke: {
        src: fromPromise(async () => {
          return fhListen();
        }),
        onDone: [
          {
            target: "TerminateExperiment",
            guard: ({event}) => {
              return globalPressedKey && globalPressedKey.name === 'a';},
            actions: [({ event }) => console.log(event.output),
          ],
            },
            {
              target: "NoApologiesNeeded5",
              guard: ({event}) => {
                const u = event.output.toLowerCase().replace(/\.$/g, "")
                if (u.includes("sorry") || u.includes("i didn't mean") || u.includes("i'm sorry") || u.includes("apologize")) {
                  return true
                }
                return false
              },
              actions: [({ event }) => console.log(event.output)]
              },
          {
          target: "IseeMovieBook5",
          guard:({event}) => !globalPressedKey,
          actions: [({ event }) => console.log(event.output),
            assign({ 
              lastResult: ({ event }) => event.output,
            }),
        ]}],
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    IseeMovieBook5: {
      invoke: {
        src: fromPromise(async () => {
          return resetGlobalPressedKey(), smileTalk(), fhSay("Hmmm i am afraid i still can't understand your laughter, but let's continue by reminding you what i said...");
        }),
        onDone: {
          target: "BooksVsMoviesPhase5GPTReply",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    NoApologiesNeeded5: {
      invoke: {
        id: "NoApologiesNeeded5",
        src: fromPromise(async () => {
          return resetGlobalPressedKey(), smileTalk(), fhSay("Are you really sorry though? Anyways, what i was saying was...");
        }),
        onDone: {
          target: "BooksVsMoviesPhase5GPTReply",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    BooksVsMoviesPhase6: {
      invoke: {
        src: fromPromise(async () => {
          return raiseEyebrow(), fhListen();
        }),
        onDone: [
          {
            target: "TerminateExperiment",
            guard: ({event}) => {
              return globalPressedKey && globalPressedKey.name === 'a';},
            actions: [({ event }) => console.log(event.output),
          ],
            },
        {
        target: "BooksVsMoviesPhase6GPT",
        actions: [({ event }) => console.log(event.output),
          assign({ 
            lastResult: ({ event }) => event.output,
          }),
      ]}],
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    BooksVsMoviesPhase6GPT: {
      invoke: {
        src: fromPromise(async ({ input }) => {
            const data = await fetchFromChatGPTMemory("Topic: Is reading the book better than watching the movie? Task: continue the debate by giving an OPPOSITE statement AND DISAGREE from this argument (ANSWER WITH ONLY 50 TOKENS):  ", input.fifthanswer, input.lastResult, 50);
            return data;
          }),
          input: ({ context }) => ({
            lastResult: context.lastResult,
            fifthanswer: context.fifthanswer,
          }),
        onDone: {
          target: "BooksVsMoviesPhase6GPTReply",
          actions: [
            assign({ 
              sixthanswer: ({event}) => event.output,
            }),
          ],
        },
        onError: {
          target: "Fail",
        },
      },
    },
    BooksVsMoviesPhase6GPTReply: {
      invoke: {
        src: fromPromise(async ({input}) => {
          return widenedEyes(), fhSay(`${input.sixthanswer}`);
        }),
        input: ({ context }) => ({
          sixthanswer: context.sixthanswer,
        }),
        onDone: [
          {
            target: "TerminateExperiment",
            guard: ({event}) => {
              return globalPressedKey && globalPressedKey.name === 'a';},
            actions: [({ event }) => console.log(event.output),
          ],
            },
            {
              target: "LaughBackBM6",
              guard: ({event}) => {
                return globalPressedKey && globalPressedKey.name === 'z';},
              actions: [({ event }) => console.log(event.output),
            ],
              },
          {
            target: "DidYouLaughBooksVsMovies6",
            guard: ({event}) => {
              return globalPressedKey && globalPressedKey.name === 'space';},
              actions: [({ event }) => console.log(event.output),
            ],
            },
          {
          target: "BooksVsMoviesPhase7",
          guard: ({event}) => !globalPressedKey,
          actions: ({ event }) => console.log(event.output),
        }],

        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    LaughBackBM6: {
      invoke: {
        src: fromPromise(async () => {
          return resetGlobalPressedKey(), Laugh();
        }),
        onDone: {
          target: "BooksVsMoviesPhase7",
          actions: [({ event }) => console.log(event.output),
        ],
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    DidYouLaughBooksVsMovies6: {
      invoke: {
        id: "DidYouLaughBooksVsMovies6",
        src: fromPromise(async () => {
          return resetGlobalPressedKey(), eyeroll(), fhSay("Seriously? Did you think what I just said was funny?");
        }),
        onDone: {
          target: "BooksVsMoviesLaughExplain6",
          actions: [({ event }) => console.log(event.output),
        ],
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    BooksVsMoviesLaughExplain6: {
      invoke: {
        src: fromPromise(async () => {
          return fhListen();
        }),
        onDone: [
          {
            target: "TerminateExperiment",
            guard: ({event}) => {
              return globalPressedKey && globalPressedKey.name === 'a';},
            actions: [({ event }) => console.log(event.output),
          ],
            },
            {
              target: "NoApologiesNeeded6",
              guard: ({event}) => {
                const u = event.output.toLowerCase().replace(/\.$/g, "")
                if (u.includes("sorry") || u.includes("i didn't mean") || u.includes("i'm sorry") || u.includes("apologize")) {
                  return true
                }
                return false
              },
              actions: [({ event }) => console.log(event.output)]
              },
          {
          target: "IseeMovieBook6",
          guard:({event}) => !globalPressedKey,
          actions: [({ event }) => console.log(event.output),
            assign({ 
              lastResult: ({ event }) => event.output,
            }),
        ]}],
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    IseeMovieBook6: {
      invoke: {
        src: fromPromise(async () => {
          return resetGlobalPressedKey(), smileTalk(), fhSay("Oh maybe you are right about that one. Anyway, as I was saying...");
        }),
        onDone: {
          target: "BooksVsMoviesPhase6GPTReply",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    NoApologiesNeeded6: {
      invoke: {
        id: "NoApologiesNeeded6",
        src: fromPromise(async () => {
          return resetGlobalPressedKey(), smileTalk(), fhSay("I feel like you're just being polite right now. Anyway, my thought again was that...");
        }),
        onDone: {
          target: "BooksVsMoviesPhase6GPTReply",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    BooksVsMoviesPhase7: {
      invoke: {
        src: fromPromise(async () => {
          return gazeRightToLeft(), fhListen();
        }),
        onDone: [
          {
            target: "TerminateExperiment",
            guard: ({event}) => {
              return globalPressedKey && globalPressedKey.name === 'a';},
            actions: [({ event }) => console.log(event.output),
          ],
            },
          {
          target: "BooksVsMoviesPhase7GPT",
          actions: [({ event }) => console.log(event.output),
            assign({ 
              lastResult: ({ event }) => event.output,
            }),
        ]}],
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    BooksVsMoviesPhase7GPT: {
      invoke: {
        src: fromPromise(async ({ input }) => {
            const data = await fetchFromChatGPTMemory("Topic: Is reading the book better than watching the movie? Task: continue the debate by giving an OPPOSITE statement AND DISAGREE from this argument (ANSWER WITH ONLY 50 TOKENS):  ", input.sixthanswer, input.lastResult, 50);
            return data;
          }),
          input: ({ context }) => ({
            lastResult: context.lastResult,
            sixthanswer: context.sixthanswer,
          }),
        onDone: {
          target: "BooksVsMoviesPhase7GPTReply",
          actions: [
            assign({ 
              seventhanswer: ({event}) => event.output,
            }),
          ],
        },
        onError: {
          target: "Fail",
        },
      },
    },
    BooksVsMoviesPhase7GPTReply: {
      invoke: {
        src: fromPromise(async ({input}) => {
          return noway(), fhSay(`${input.seventhanswer}`);
        }),
        input: ({ context }) => ({
          seventhanswer: context.seventhanswer,
        }),
        onDone: [
          {
            target: "TerminateExperiment",
            guard: ({event}) => {
              return globalPressedKey && globalPressedKey.name === 'a';},
            actions: [({ event }) => console.log(event.output),
          ],
            },
            {
              target: "LaughBackBM7",
              guard: ({event}) => {
                return globalPressedKey && globalPressedKey.name === 'z';},
              actions: [({ event }) => console.log(event.output),
            ],
              },
          {
            target: "DidYouLaughBooksVsMovies7",
            guard: ({event}) => {
              return globalPressedKey && globalPressedKey.name === 'space';},
              actions: [({ event }) => console.log(event.output),
            ],
            },
          {
          target: "BooksVsMoviesPhase8",
          guard: ({event}) => !globalPressedKey,
          actions: ({ event }) => console.log(event.output),
        }],
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    LaughBackBM7: {
      invoke: {
        src: fromPromise(async () => {
          return resetGlobalPressedKey(), Laugh();
        }),
        onDone: {
          target: "BooksVsMoviesPhase8",
          actions: [({ event }) => console.log(event.output),
        ],
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    DidYouLaughBooksVsMovies7: {
      invoke: {
        id: "DidYouLaughBooksVsMovies7",
        src: fromPromise(async () => {
          return resetGlobalPressedKey(), unimpressedRight(), fhSay("Was my answer that funny to you?");
        }),
        onDone: {
          target: "BooksVsMoviesLaughExplain7",
          actions: [({ event }) => console.log(event.output),
        ],
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    BooksVsMoviesLaughExplain7: {
      invoke: {
        src: fromPromise(async () => {
          return fhListen();
        }),
        onDone: [
          {
            target: "TerminateExperiment",
            guard: ({event}) => {
              return globalPressedKey && globalPressedKey.name === 'a';},
            actions: [({ event }) => console.log(event.output),
          ],
            },
            {
              target: "NoApologiesNeeded7",
              guard: ({event}) => {
                const u = event.output.toLowerCase().replace(/\.$/g, "")
                if (u.includes("sorry") || u.includes("i didn't mean") || u.includes("i'm sorry") || u.includes("apologize")) {
                  return true
                }
                return false
              },
              actions: [({ event }) => console.log(event.output)]
              },
          {
          target: "IseeMovieBook7",
          guard:({event}) => !globalPressedKey,
          actions: [({ event }) => console.log(event.output),
            assign({ 
              lastResult: ({ event }) => event.output,
            }),
        ]}],
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    IseeMovieBook7: {
      invoke: {
        src: fromPromise(async () => {
          return resetGlobalPressedKey(), smileTalk(), fhSay("Uh huh! Maybe I took it personally then. Let's just continue from the last part, which was...");
        }),
        onDone: {
          target: "BooksVsMoviesPhase7GPTReply",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    NoApologiesNeeded7: {
      invoke: {
        id: "NoApologiesNeeded7",
        src: fromPromise(async () => {
          return resetGlobalPressedKey(), eyeroll(), fhSay("I'm afraid a simple apology won't do, though I appreciate your honesty. Let's just continue the conversation. As I was saying...");
        }),
        onDone: {
          target: "BooksVsMoviesPhase7GPTReply",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    BooksVsMoviesPhase8: {
      invoke: {
        src: fromPromise(async () => {
          return youKnowLook(), fhListen();
        }),
        onDone: [
          {
            target: "TerminateExperiment",
            guard: ({event}) => {
              return globalPressedKey && globalPressedKey.name === 'a';},
            actions: [({ event }) => console.log(event.output),
          ],
            },
          {
          target: "BooksVsMoviesPhase8GPT",
          actions: [({ event }) => console.log(event.output),
            assign({ 
              lastResult: ({ event }) => event.output,
            }),
        ]}],
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    BooksVsMoviesPhase8GPT: {
      invoke: {
        src: fromPromise(async ({ input }) => {
            const data = await fetchFromChatGPTMemory("Topic: Is reading the book better than watching the movie? Task: continue the debate by giving an OPPOSITE statement AND DISAGREE from this argument (ANSWER WITH ONLY 50 TOKENS):  ", input.seventhanswer, input.lastResult, 50);
            return data;
          }),
          input: ({ context }) => ({
            lastResult: context.lastResult,
            seventhanswer: context.seventhanswer,
          }),
        onDone: {
          target: "BooksVsMoviesPhase8GPTReply",
          actions: [
            assign({ 
              eigthanswer: ({event}) => event.output,
            }),
          ],
        },
        onError: {
          target: "Fail",
        },
      },
    },
    BooksVsMoviesPhase8GPTReply: {
      invoke: {
        src: fromPromise(async ({input}) => {
          return raiseEyebrowLEFT(), fhSay(`${input.eigthanswer}`);
        }),
        input: ({ context }) => ({
          eigthanswer: context.eigthanswer,
        }),
        onDone: [
          {
            target: "TerminateExperiment",
            guard: ({event}) => {
              return globalPressedKey && globalPressedKey.name === 'a';},
            actions: [({ event }) => console.log(event.output),
          ],
            },
            {
              target: "LaughBackBM8",
              guard: ({event}) => {
                return globalPressedKey && globalPressedKey.name === 'a';},
              actions: [({ event }) => console.log(event.output),
            ],
              },
          {
            target: "DidYouLaughBooksVsMovies8",
            guard: ({event}) => {
              return globalPressedKey && globalPressedKey.name === 'space';},
              actions: [({ event }) => console.log(event.output),
            ],
            },
          {
          target: "BooksVsMoviesPhase9",
          guard: ({event}) => !globalPressedKey,
          actions: ({ event }) => console.log(event.output),
        }],
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    LaughBackBM8: {
      invoke: {
        src: fromPromise(async () => {
          return resetGlobalPressedKey(), Laugh();
        }),
        onDone: {
          target: "BooksVsMoviesPhase9",
          actions: [({ event }) => console.log(event.output),
        ],
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    DidYouLaughBooksVsMovies8: {
      invoke: {
        id: "DidYouLaughBooksVsMovies8",
        src: fromPromise(async () => {
          return resetGlobalPressedKey(), shocked(), fhSay("And you're laughing because?");
        }),
        onDone: {
          target: "BooksVsMoviesLaughExplain8",
          actions: [({ event }) => console.log(event.output),
        ],
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    BooksVsMoviesLaughExplain8: {
      invoke: {
        src: fromPromise(async () => {
          return fhListen();
        }),
        onDone: [
          {
            target: "TerminateExperiment",
            guard: ({event}) => {
              return globalPressedKey && globalPressedKey.name === 'a';},
            actions: [({ event }) => console.log(event.output),
          ],
            },
            {
              target: "NoApologiesNeeded8",
              guard: ({event}) => {
                const u = event.output.toLowerCase().replace(/\.$/g, "")
                if (u.includes("sorry") || u.includes("i didn't mean") || u.includes("i'm sorry") || u.includes("apologize")) {
                  return true
                }
                return false
              },
              actions: [({ event }) => console.log(event.output)]
              },
          {
          target: "IseeMovieBook8",
          guard:({event}) => !globalPressedKey,
          actions: [({ event }) => console.log(event.output),
            assign({ 
              lastResult: ({ event }) => event.output,
            }),
        ]}],
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    IseeMovieBook8: {
      invoke: {
        src: fromPromise(async () => {
          return resetGlobalPressedKey(), smileTalk(), fhSay("Uh");
        }),
        onDone: {
          target: "IseeMovieBooklaugh8",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    IseeMovieBooklaugh8: {
      invoke: {
        src: fromPromise(async () => {
          return resetGlobalPressedKey(), Laugh();
        }),
        onDone: {
          target: "AsIwas8",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    AsIwas8: {
      invoke: {
        src: fromPromise(async () => {
          return resetGlobalPressedKey(), smileTalk(), fhSay("I see. But let's move on. What i was saying was...");
        }),
        onDone: {
          target: "BooksVsMoviesPhase8GPTReply",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    NoApologiesNeeded8: {
      invoke: {
        id: "NoApologiesNeeded8",
        src: fromPromise(async () => {
          return resetGlobalPressedKey(), smileTalk(), fhSay("Apology accepted. Now as I was saying...");
        }),
        onDone: {
          target: "BooksVsMoviesPhase8GPTReply",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    BooksVsMoviesPhase9: {
      invoke: {
        src: fromPromise(async () => {
          return fhGesture("Smile"), fhListen();
        }),
        onDone: [
          {
            target: "TerminateExperiment",
            guard: ({event}) => {
              return globalPressedKey && globalPressedKey.name === 'a';},
            actions: [({ event }) => console.log(event.output),
          ],
            },
          {
          target: "BooksVsMoviesPhase9GPT",
          actions: [({ event }) => console.log(event.output),
            assign({ 
              lastResult: ({ event }) => event.output,
            }),
        ]}],
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    BooksVsMoviesPhase9GPT: {
      invoke: {
        src: fromPromise(async ({ input }) => {
            const data = await fetchFromChatGPTMemory("Topic: Is reading the book better than watching the movie? Task: continue the debate by giving an OPPOSITE statement AND DISAGREE from this argument (ANSWER WITH ONLY 50 TOKENS):  ", input.eigthanswer, input.lastResult, 50);
            return data;
          }),
          input: ({ context }) => ({
            lastResult: context.lastResult,
            eigthanswer: context.eigthanswer,
          }),
        onDone: {
          target: "BooksVsMoviesLaugh9",
          actions: [
            assign({ 
              ninthanswer: ({event}) => event.output,
            }),
          ],
        },
        onError: {
          target: "Fail",
        },
      },
    },
    BooksVsMoviesLaugh9: {
      invoke: {
        src: fromPromise(async ({input}) => {
          return Laugh();
        }),
        onDone: {
          target: "BooksVsMoviesPhase9GPTReply",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    BooksVsMoviesPhase9GPTReply: {
      invoke: {
        src: fromPromise(async ({input}) => {
          return disbelief(), fhSay(`${input.ninthanswer}`);
        }),
        input: ({ context }) => ({
          ninthanswer: context.ninthanswer,
        }),
        onDone: [
          {
            target: "TerminateExperiment",
            guard: ({event}) => {
              return globalPressedKey && globalPressedKey.name === 'a';},
            actions: [({ event }) => console.log(event.output),
          ],
            },
            {
              target: "LaughBackBM9",
              guard: ({event}) => {
                return globalPressedKey && globalPressedKey.name === 'z';},
              actions: [({ event }) => console.log(event.output),
            ],
              },
          {
            target: "DidYouLaughBooksVsMovies9",
            guard: ({event}) => {
              return globalPressedKey && globalPressedKey.name === 'space';},
              actions: [({ event }) => console.log(event.output),
            ],
            },
          {
          target: "BooksVsMoviesPhase10",
          guard: ({event}) => !globalPressedKey,
          actions: ({ event }) => console.log(event.output),
        }],
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    LaughBackBM9: {
      invoke: {
        src: fromPromise(async () => {
          return resetGlobalPressedKey(), Laugh();
        }),
        onDone: {
          target: "BooksVsMoviesPhase10",
          actions: [({ event }) => console.log(event.output),
        ],
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    DidYouLaughBooksVsMovies9: {
      invoke: {
        id: "DidYouLaughBooksVsMovies9",
        src: fromPromise(async () => {
          return resetGlobalPressedKey(), gazeDown(), fhSay("I just saw you laugh. I want to know what's so funny?");
        }),
        onDone: {
          target: "BooksVsMoviesLaughExplain9",
          actions: [({ event }) => console.log(event.output),
        ]},
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    BooksVsMoviesLaughExplain9: {
      invoke: {
        src: fromPromise(async () => {
          return fhListen();
        }),
        onDone: [
          {
            target: "TerminateExperiment",
            guard: ({event}) => {
              return globalPressedKey && globalPressedKey.name === 'a';},
            actions: [({ event }) => console.log(event.output),
          ],
            },
            {
              target: "NoApologiesNeeded9",
              guard: ({event}) => {
                const u = event.output.toLowerCase().replace(/\.$/g, "")
                if (u.includes("sorry") || u.includes("i didn't mean") || u.includes("i'm sorry") || u.includes("apologize")) {
                  return true
                }
                return false
              },
              actions: [({ event }) => console.log(event.output)]
              },
          {
          target: "IseeMovieBook9",
          guard:({event}) => !globalPressedKey,
          actions: [({ event }) => console.log(event.output),
            assign({ 
              lastResult: ({ event }) => event.output,
            }),
        ]}],
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    IseeMovieBook9: {
      invoke: {
        src: fromPromise(async () => {
          return resetGlobalPressedKey(), smileTalk(), fhSay("Oh I think I get it. Shall we continue then? Let me remind you that...");
        }),
        onDone: {
          target: "BooksVsMoviesPhase9GPTReply",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    NoApologiesNeeded9: {
      invoke: {
        id: "NoApologiesNeeded9",
        src: fromPromise(async () => {
          return resetGlobalPressedKey(), smileTalk(), fhSay("Sorry just won't do. Let's forget about it and move on. As I was saying...");
        }),
        onDone: {
          target: "BooksVsMoviesPhase9GPTReply",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    BooksVsMoviesPhase10: {
      invoke: {
        src: fromPromise(async () => {
          return fhGesture("Nod"), fhListen();
        }),
        onDone: [
          {
            target: "TerminateExperiment",
            guard: ({event}) => {
              return globalPressedKey && globalPressedKey.name === 'a';},
            actions: [({ event }) => console.log(event.output),
          ],
            },
          {
          target: "BooksVsMoviesPhase10GPT",
          actions: [({ event }) => console.log(event.output),
            assign({ 
              lastResult: ({ event }) => event.output,
            }),
        ]}],
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    BooksVsMoviesPhase10GPT: {
      invoke: {
        src: fromPromise(async ({ input }) => {
            const data = await fetchFromChatGPTMemory("Topic: Is reading the book better than watching the movie? Task: continue the debate by giving an OPPOSITE statement AND DISAGREE from this argument (ANSWER WITH ONLY 50 TOKENS):  ", input.ninthhanswer, input.lastResult, 50);
            return data;
          }),
          input: ({ context }) => ({
            lastResult: context.lastResult,
            ninthanswer: context.ninthanswer,
          }),
        onDone: {
          target: "BooksVsMoviesPhase10GPTReply",
          actions: [
            assign({ 
              tenthanswer: ({event}) => event.output,
            }),
          ],
        },
        onError: {
          target: "Fail",
        },
      },
    },
    BooksVsMoviesPhase10GPTReply: {
      invoke: {
        src: fromPromise(async ({input}) => {
          return widenedEyesfrown(), fhSay(`${input.tenthanswer}`);
        }),
        input: ({ context }) => ({
          tenthanswer: context.tenthanswer,
        }),
        onDone: [
          {
            target: "TerminateExperiment",
            guard: ({event}) => {
              return globalPressedKey && globalPressedKey.name === 'a';},
            actions: [({ event }) => console.log(event.output),
          ],
            },
            {
            target: "LaughBackBM10",
            guard: ({event}) => {
              return globalPressedKey && globalPressedKey.name === 'z';},
            actions: [({ event }) => console.log(event.output),
          ],
            },
            {
            target: "DidYouLaughBooksVsMovies10",
            guard: ({event}) => {
              return globalPressedKey && globalPressedKey.name === 'space';},
            actions: [({ event }) => console.log(event.output),
          ],
            },
          {
          target: "BooksVsMoviesFinished",
          actions: ({ event }) => console.log(event.output),
        }],
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    LaughBackBM10: {
      invoke: {
        src: fromPromise(async () => {
          return resetGlobalPressedKey(), Laugh();
        }),
        onDone: {
          target: "BooksVsMoviesFinished",
          actions: [({ event }) => console.log(event.output),
        ],
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    DidYouLaughBooksVsMovies10: {
      invoke: {
        src: fromPromise(async () => {
          return resetGlobalPressedKey(), gazeDown(), fhSay("What was that laugh for?");
        }),
        onDone: {
          target: "BooksVsMoviesLaughExplain10",
          actions: [({ event }) => console.log(event.output),
        ]},
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    BooksVsMoviesLaughExplain10: {
      invoke: {
        src: fromPromise(async () => {
          return fhListen();
        }),
        onDone: [
          {
            target: "TerminateExperiment",
            guard: ({event}) => {
              return globalPressedKey && globalPressedKey.name === 'a';},
            actions: [({ event }) => console.log(event.output),
          ],
            },
            {
              target: "NoApologiesNeeded10",
              guard: ({event}) => {
                const u = event.output.toLowerCase().replace(/\.$/g, "")
                if (u.includes("sorry") || u.includes("i didn't mean") || u.includes("i'm sorry") || u.includes("apologize")) {
                  return true
                }
                return false
              },
              actions: [({ event }) => console.log(event.output)]
              },
          {
          target: "IseeMovieBook10",
          guard:({event}) => !globalPressedKey,
          actions: [({ event }) => console.log(event.output),
            assign({ 
              lastResult: ({ event }) => event.output,
            }),
        ]}],
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    IseeMovieBook10: {
      invoke: {
        src: fromPromise(async () => {
          return resetGlobalPressedKey(), smileTalk(), fhSay("Ah I see now.");
        }),
        onDone: {
          target: "BooksVsMoviesFinished",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    NoApologiesNeeded10: {
      invoke: {
        id: "NoApologiesNeeded10",
        src: fromPromise(async () => {
          return resetGlobalPressedKey(), smileTalk(), fhSay("Apology accepted");
        }),
        onDone: {
          target: "BooksVsMoviesFinished",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    BooksVsMoviesFinished: {
      invoke: {
        src: fromPromise(async ({input}) => {
          return resetGlobalPressedKey(), eyeroll(), fhSay(`Wow ${input.name}. Let's just agree to disagree.`);
        }),
        input: ({ context }) => ({
          name: context.name,
        }),
        onDone: {
          target: "FinalState0",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    InAndOutNegotiation: {
    invoke: {
        id: "InAndOutNegotiation",
        src: fromPromise(async () => {
          return gazeDown(), fhSay("Hmmm.");
        }),
        onDone: [
          {
            target: "TerminateExperiment",
            guard: ({event}) => {
              return globalPressedKey && globalPressedKey.name === 'a';},
            actions: [({ event }) => console.log(event.output),
          ],
            },
          {
          target: "ExplainInAndOut",
          actions: ({ event }) => console.log(event.output),
        }],
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    ExplainInAndOut: {
      invoke: {
        id: "ExplainInAndOut",
        src: fromPromise(async () => {
          return fhGestureThoughtful("Thoughtful"), fhSay("Spending time with friends is great for the soul and mind; But are outdoor activities better than indoors?");
        }),
        onDone: [
          {
            target: "TerminateExperiment",
            guard: ({event}) => {
              return globalPressedKey && globalPressedKey.name === 'a';},
            actions: [({ event }) => console.log(event.output),
          ],
            },
          {
          target: "InAndOutPhase1",
          actions: ({ event }) => console.log(event.output),
        }],
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    InAndOutPhase1: {
      invoke: {
        src: fromPromise(async () => {
          return fhListen();
        }),
        onDone: [
          {
            target: "TerminateExperiment",
            guard: ({event}) => {
              return globalPressedKey && globalPressedKey.name === 'a';},
            actions: [({ event }) => console.log(event.output),
          ],
            },
          {
          target: "InAndOutPhase1GPT",
          actions: [({ event }) => console.log(event.output),
            assign({ 
              lastResult: ({ event }) => event.output,
            }),
        ]}],
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    InAndOutPhase1GPT: {
      invoke: {
        src: fromPromise(async ({ input }) => {
            const data = await fetchFromChatGPT("Topic: Are outdoor activities better than indoors? Task: continue the debate by giving an OPPOSITE statement AND DISAGREE from this argument (ANSWER WITH ONLY 50 TOKENS):  " + input.lastResult, 50);
            return data;
          }),
          input: ({ context }) => ({
            lastResult: context.lastResult,
          }),
        onDone: {
          target: "InAndOutPhase1GPTReply",
          actions: [
            assign({ 
              InAndOutAnswer: ({event}) => event.output,
            }),
          ],
        },
        onError: {
          target: "Fail",
        },
      },
    },
    InAndOutPhase1GPTReply: {
      invoke: {
        src: fromPromise(async ({input}) => {
          return raiseEyebrowLEFT(), fhSay(`${input.InAndOutAnswer}`);
        }),
        input: ({ context }) => ({
          InAndOutAnswer: context.InAndOutAnswer,
        }),
        onDone: [
          {
            target: "TerminateExperiment",
            guard: ({event}) => {
              return globalPressedKey && globalPressedKey.name === 'a';},
            actions: [({ event }) => console.log(event.output),
          ],
            },
            {
              target: "LaughBackInAndOut1",
              guard: ({event}) => {
                return globalPressedKey && globalPressedKey.name === 'z';},
              actions: [({ event }) => console.log(event.output),
            ],
              },
          {
            target: "InAndOutLaugh1",
            guard: ({event}) => {
              return globalPressedKey && globalPressedKey.name === 'space';},
              actions: [({ event }) => console.log(event.output),
            ],
            },
          {
          target: "InAndOutPhase2",
          guard: ({event}) => !globalPressedKey,
          actions: ({ event }) => console.log(event.output),
        }],
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    LaughBackInAndOut1: {
      invoke: {
        src: fromPromise(async () => {
          return resetGlobalPressedKey(), Laugh();
        }),
        onDone: {
          target: "InAndOutPhase2",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    InAndOutLaugh1: {
      invoke: {
        src: fromPromise(async () => {
          return resetGlobalPressedKey(), widenedEyes(), fhSay("What was that laugh for? Was it something I said?");
        }),
        onDone: {
          target: "InNOutExplain1",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    InNOutExplain1: {
      invoke: {
        src: fromPromise(async () => {
          return fhListen();
        }),
        onDone: [
          {
            target: "TerminateExperiment",
            guard: ({event}) => {
              return globalPressedKey && globalPressedKey.name === 'a';},
            actions: [({ event }) => console.log(event.output),
          ],
            },
            {
              target: "ApologyInAndOut1",
              guard: ({event}) => {
                const u = event.output.toLowerCase().replace(/\.$/g, "")
                if (u.includes("sorry") || u.includes("i didn't mean") || u.includes("i'm sorry") || u.includes("apologize")) {
                  return true
                }
                return false
              },
              actions: [({ event }) => console.log(event.output)]
              },
          {
          target: "IseeInNOut",
          guard:({event}) => !globalPressedKey,
          actions: [({ event }) => console.log(event.output),
            assign({ 
              lastResult: ({ event }) => event.output,
            }),
        ]}],
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    IseeInNOut: {
      invoke: {
        src: fromPromise(async () => {
          return resetGlobalPressedKey(), smileTalk(), fhSay("Oh I see. I would like to continue the conversation now, if you don't mind. Allow me to repeat my last thought.");
        }),
        onDone: {
          target: "InAndOutPhase1GPTReply",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    ApologyInAndOut1: {
      invoke: {
        src: fromPromise(async () => {
          return resetGlobalPressedKey(), evilSmile(), fhSay("I appreciate the apology. Let's continue from where we left off. Allow me to remind you my previous statement.");
        }),
        onDone: {
          target: "InAndOutPhase1GPTReply",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    InAndOutPhase2: {
      invoke: {
        src: fromPromise(async () => {
          return backchannel(), fhListen();
        }),
        onDone: [
          {
            target: "TerminateExperiment",
            guard: ({event}) => {
              return globalPressedKey && globalPressedKey.name === 'a';},
            actions: [({ event }) => console.log(event.output),
          ],
            },
          {
          target: "InAndOutPhase2GPT",
          actions: [({ event }) => console.log(event.output),
            assign({ 
              lastResult: ({ event }) => event.output,
            }),
        ]}],
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    InAndOutPhase2GPT: {
      invoke: {
        src: fromPromise(async ({ input }) => {
            const data = await fetchFromChatGPTMemory(`Topic: Are outdoor activities better than indoors? Task: continue the debate by giving an OPPOSITE statement AND DISAGREE from this argument (ANSWER WITH ONLY 50 TOKENS):  `, input.InAndOutAnswer, input.lastResult, 50);
            return data;
          }),
          input: ({ context }) => ({
            lastResult: context.lastResult,
            InAndOutAnswer: context.InAndOutAnswer,
          }),
        onDone: {
          target: "InAndOutPhase2GPTReply",
          actions: [
            assign({ 
              InAndOutAnswer2: ({event}) => event.output,
            }),
          ],
        },
        onError: {
          target: "Fail",
        },
      },
    },
    InAndOutPhase2GPTReply: {
      invoke: {
        src: fromPromise(async ({input}) => {
          return gazeRightSmile(), fhSay(`${input.InAndOutAnswer2}`);
        }),
        input: ({ context }) => ({
          InAndOutAnswer2: context.InAndOutAnswer2,
        }),
        onDone: [
          {
            target: "TerminateExperiment",
            guard: ({event}) => {
              return globalPressedKey && globalPressedKey.name === 'a';},
            actions: [({ event }) => console.log(event.output),
          ],
            },
            {
              target: "LaughBackInAndOut2",
              guard: ({event}) => {
                return globalPressedKey && globalPressedKey.name === 'z';},
              actions: [({ event }) => console.log(event.output),
            ],
              },
          {
            target: "InAndOutLaugh2",
            guard: ({event}) => {
              return globalPressedKey && globalPressedKey.name === 'space';},
            actions: [({ event }) => console.log(event.output),
          ],
            },
          {
          target: "InAndOutPhase3",
          guard: ({event}) => !globalPressedKey,
          actions: ({ event }) => console.log(event.output),
        }],
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    LaughBackInAndOut2: {
      invoke: {
        src: fromPromise(async () => {
          return resetGlobalPressedKey(), Laugh();
        }),
        onDone: {
          target: "InAndOutPhase3",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    InAndOutLaugh2: {
      invoke: {
        src: fromPromise(async () => {
          return resetGlobalPressedKey(), unimpressedRight(), fhSay("I saw you laugh just now! What's so funny?");
        }),
        onDone: {
          target: "InNOutExplain2",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    InNOutExplain2: {
      invoke: {
        src: fromPromise(async () => {
          return fhListen();
        }),
        onDone: [
          {
            target: "TerminateExperiment",
            guard: ({event}) => {
              return globalPressedKey && globalPressedKey.name === 'a';},
            actions: [({ event }) => console.log(event.output),
          ],
            },
            {
              target: "ApologyInAndOut2",
              guard: ({event}) => {
                const u = event.output.toLowerCase().replace(/\.$/g, "")
                if (u.includes("sorry") || u.includes("i didn't mean") || u.includes("i'm sorry") || u.includes("apologize")) {
                  return true
                }
                return false
              },
              actions: [({ event }) => console.log(event.output)]
              },
          {
          target: "IseeInNOut2",
          guard:({event}) => !globalPressedKey,
          actions: [({ event }) => console.log(event.output),
            assign({ 
              lastResult: ({ event }) => event.output,
            }),
        ]}],
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    IseeInNOut2: {
      invoke: {
        src: fromPromise(async () => {
          return resetGlobalPressedKey(), smileTalk(), fhSay("Oh I see.");
        }),
        onDone: {
          target: "IseeInNOutlaugh2",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    IseeInNOutlaugh2: {
      invoke: {
        src: fromPromise(async () => {
          return resetGlobalPressedKey(),Laugh();
        }),
        onDone: {
          target: "SayingiNOut2",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    SayingiNOut2: {
      invoke: {
        src: fromPromise(async () => {
          return resetGlobalPressedKey(), evilSmile(), fhSay("Let's continue now, shall we? As I was saying...");
        }),
        onDone: {
          target: "InAndOutPhase2GPTReply",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    ApologyInAndOut2: {
      invoke: {
        src: fromPromise(async () => {
          return resetGlobalPressedKey(), evilSmile(), fhSay("Are you really sorry? I appreciate the apology nevertheless. What I was saying was...");
        }),
        onDone: {
          target: "InAndOutPhase2GPTReply",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    InAndOutPhase3: {
      invoke: {
        src: fromPromise(async () => {
          return widenedEyes(), fhListen();
        }),
        onDone: [
          {
            target: "TerminateExperiment",
            guard: ({event}) => {
              return globalPressedKey && globalPressedKey.name === 'a';},
            actions: [({ event }) => console.log(event.output),
          ],
            },
          {
          target: "InAndOutPhase3GPT",
          actions: [({ event }) => console.log(event.output),
            assign({ 
              lastResult: ({ event }) => event.output,
            }),
        ]}],
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    InAndOutPhase3GPT: {
      invoke: {
        src: fromPromise(async ({ input }) => {
            const data = await fetchFromChatGPTMemory(`Topic: Are outdoor activities better than indoors? Task: continue the debate by giving an OPPOSITE statement AND DISAGREE from this argument (ANSWER WITH ONLY 50 TOKENS):  `, input.InAndOutAnswer2, input.lastResult, 50);
            return data;
          }),
          input: ({ context }) => ({
            lastResult: context.lastResult,
            InAndOutAnswer2: context.InAndOutAnswer2,
          }),
        onDone: {
          target: "InAndOutLaughRobot3",
          actions: [
            assign({ 
              InAndOutAnswer3: ({event}) => event.output,
            }),
          ],
        },
        onError: {
          target: "Fail",
        },
      },
    },
    InAndOutLaughRobot3: {
      invoke: {
        src: fromPromise(async ({input}) => {
          return Laugh();
        }),
        onDone: {
          target: "InAndOutPhase3GPTReply",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    InAndOutPhase3GPTReply: {
      invoke: {
        src: fromPromise(async ({input}) => {
          return raiseEyebrowLEFT(), fhSay(`${input.InAndOutAnswer3}`);
        }),
        input: ({ context }) => ({
          InAndOutAnswer3: context.InAndOutAnswer3,
        }),
        onDone: [
          {
            target: "TerminateExperiment",
            guard: ({event}) => {
              return globalPressedKey && globalPressedKey.name === 'a';},
            actions: [({ event }) => console.log(event.output),
          ],
            },
          {
            target: "LaughBackInAndOut3",
            guard: ({event}) => {
              return globalPressedKey && globalPressedKey.name === 'z';},
            actions: [({ event }) => console.log(event.output),
          ],
            },
          {
            target: "InAndOutLaugh3",
            guard: ({event}) => {
              return globalPressedKey && globalPressedKey.name === 'space';},
            actions: [({ event }) => console.log(event.output),
          ],
            },
          {
          target: "InAndOutPhase4",
          guard: ({event}) => !globalPressedKey,
          actions: ({ event }) => console.log(event.output),
        }],
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    LaughBackInAndOut3: {
      invoke: {
        src: fromPromise(async () => {
          return resetGlobalPressedKey(), Laugh();
        }),
        onDone: {
          target: "InAndOutPhase4",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    InAndOutLaugh3: {
      invoke: {
        src: fromPromise(async () => {
          return resetGlobalPressedKey(), gazeLeftToRight(), fhSay("Why did you find that funny?");
        }),
        onDone: {
          target: "InNOutExplain3",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    InNOutExplain3: {
      invoke: {
        src: fromPromise(async () => {
          return fhListen();
        }),
        onDone: [
          {
            target: "TerminateExperiment",
            guard: ({event}) => {
              return globalPressedKey && globalPressedKey.name === 'a';},
            actions: [({ event }) => console.log(event.output),
          ],
            },
            {
              target: "ApologyInAndOut3",
              guard: ({event}) => {
                const u = event.output.toLowerCase().replace(/\.$/g, "")
                if (u.includes("sorry") || u.includes("i didn't mean") || u.includes("i'm sorry") || u.includes("apologize")) {
                  return true
                }
                return false
              },
              actions: [({ event }) => console.log(event.output)]
              },
          {
          target: "IseeInNOut3",
          guard:({event}) => !globalPressedKey,
          actions: [({ event }) => console.log(event.output),
            assign({ 
              lastResult: ({ event }) => event.output,
            }),
        ]}],
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    IseeInNOut3: {
      invoke: {
        src: fromPromise(async () => {
          return resetGlobalPressedKey(), smileTalk(), fhSay("Oh I think I get it now. Let's just continue, what I said was...");
        }),
        onDone: {
          target: "InAndOutPhase3GPTReply",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    ApologyInAndOut3: {
      invoke: {
        src: fromPromise(async () => {
          return resetGlobalPressedKey(), evilSmile(), fhSay("Apology accepted. Now what i was saying was...");
        }),
        onDone: {
          target: "InAndOutPhase3GPTReply",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    InAndOutPhase4: {
      invoke: {
        src: fromPromise(async () => {
          return gazeRightToLeft(), fhListen();
        }),
        onDone: [
          {
            target: "TerminateExperiment",
            guard: ({event}) => {
              return globalPressedKey && globalPressedKey.name === 'a';},
            actions: [({ event }) => console.log(event.output),
          ],
            },
          {
          target: "InAndOutPhase4GPT",
          actions: [({ event }) => console.log(event.output),
            assign({ 
              lastResult: ({ event }) => event.output,
            }),
        ]}],
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    InAndOutPhase4GPT: {
      invoke: {
        src: fromPromise(async ({ input }) => {
            const data = await fetchFromChatGPTMemory(`Topic: Are outdoor activities better than indoors? Task: continue the debate by giving an OPPOSITE statement AND DISAGREE from this argument (ANSWER WITH ONLY 50 TOKENS):  `, input.InAndOutAnswer3, input.lastResult, 50);
            return data;
          }),
          input: ({ context }) => ({
            lastResult: context.lastResult,
            InAndOutAnswer3: context.InAndOutAnswer3,
          }),
        onDone: {
          target: "InAndOutPhase4GPTReply",
          actions: [
            assign({ 
              InAndOutAnswer4: ({event}) => event.output,
            }),
          ],
        },
        onError: {
          target: "Fail",
        },
      },
    },
    InAndOutPhase4GPTReply: {
      invoke: {
        src: fromPromise(async ({input}) => {
          return raiseEyebrow(), fhSay(`${input.InAndOutAnswer4}`);
        }),
        input: ({ context }) => ({
          InAndOutAnswer4: context.InAndOutAnswer4,
        }),
        onDone: [
          {
            target: "TerminateExperiment",
            guard: ({event}) => {
              return globalPressedKey && globalPressedKey.name === 'a';},
            actions: [({ event }) => console.log(event.output),
          ],
            },
            {
              target: "LaughBackInAndOut4",
              guard: ({event}) => {
                return globalPressedKey && globalPressedKey.name === 'z';},
              actions: [({ event }) => console.log(event.output),
            ],
              },
          {
            target: "InAndOutLaugh4",
            guard: ({event}) => {
              return globalPressedKey && globalPressedKey.name === 'space';},
            actions: [({ event }) => console.log(event.output),
          ],
            },
          {
          target: "InAndOutPhase5",
          guard: ({event}) => !globalPressedKey,
          actions: ({ event }) => console.log(event.output),
        }],
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    LaughBackInAndOut4: {
      invoke: {
        src: fromPromise(async () => {
          return resetGlobalPressedKey(), Laugh();
        }),
        onDone: {
          target: "InAndOutPhase5",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    InAndOutLaugh4: {
      invoke: {
        src: fromPromise(async () => {
          return resetGlobalPressedKey(), raiseEyebrow(), fhSay("Why did you just laugh at me?");
        }),
        onDone: {
          target: "InNOutExplain4",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    InNOutExplain4: {
      invoke: {
        src: fromPromise(async () => {
          return fhListen();
        }),
        onDone: [
          {
            target: "TerminateExperiment",
            guard: ({event}) => {
              return globalPressedKey && globalPressedKey.name === 'a';},
            actions: [({ event }) => console.log(event.output),
          ],
            },
            {
              target: "ApologyInAndOut4",
              guard: ({event}) => {
                const u = event.output.toLowerCase().replace(/\.$/g, "")
                if (u.includes("sorry") || u.includes("i didn't mean") || u.includes("i'm sorry") || u.includes("apologize")) {
                  return true
                }
                return false
              },
              actions: [({ event }) => console.log(event.output)]
              },
          {
          target: "IseeInNOut4",
          guard:({event}) => !globalPressedKey,
          actions: [({ event }) => console.log(event.output),
            assign({ 
              lastResult: ({ event }) => event.output,
            }),
        ]}],
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    IseeInNOut4: {
      invoke: {
        src: fromPromise(async () => {
          return resetGlobalPressedKey(), smileTalk(), fhSay("Oh I see");
        }),
        onDone: {
          target: "IseeInNOutlaugh4",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    IseeInNOutlaugh4: {
      invoke: {
        src: fromPromise(async () => {
          return resetGlobalPressedKey(), Laugh();
        }),
        onDone: {
          target: "AsIwasSayingInNOut4",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    AsIwasSayingInNOut4: {
      invoke: {
        src: fromPromise(async () => {
          return resetGlobalPressedKey(), unimpressed(), fhSay("I would like to continue the conversation now, if you don't mind. Allow me to repeat my last thought.");
        }),
        onDone: {
          target: "InAndOutPhase4GPTReply",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    ApologyInAndOut4: {
      invoke: {
        src: fromPromise(async () => {
          return resetGlobalPressedKey(), evilSmile(), fhSay("No worries. I accept your apology. Now what i said was...");
        }),
        onDone: {
          target: "InAndOutPhase4GPTReply",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    InAndOutPhase5: {
      invoke: {
        src: fromPromise(async () => {
          return unimpressedRight(), fhListen();
        }),
        onDone: [
          {
            target: "TerminateExperiment",
            guard: ({event}) => {
              return globalPressedKey && globalPressedKey.name === 'a';},
            actions: [({ event }) => console.log(event.output),
          ],
            },
          {
          target: "InAndOutPhase5GPT",
          actions: [({ event }) => console.log(event.output),
            assign({ 
              lastResult: ({ event }) => event.output,
            }),
        ]}],
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    InAndOutPhase5GPT: {
      invoke: {
        src: fromPromise(async ({ input }) => {
            const data = await fetchFromChatGPTMemory(`Topic: Are outdoor activities better than indoors? Task: continue the debate by giving an OPPOSITE statement AND DISAGREE from this argument (ANSWER WITH ONLY 50 TOKENS):  `, input.InAndOutAnswer4, input.lastResult, 50);
            return data;
          }),
          input: ({ context }) => ({
            lastResult: context.lastResult,
            InAndOutAnswer4: context.InAndOutAnswer4,
          }),
        onDone: {
          target: "InAndOutPhase5GPTReply",
          actions: [
            assign({ 
              InAndOutAnswer5: ({event}) => event.output,
            }),
          ],
        },
        onError: {
          target: "Fail",
        },
      },
    },
    InAndOutPhase5GPTReply: {
      invoke: {
        src: fromPromise(async ({input}) => {
          return smileTalk(), fhSay(`${input.InAndOutAnswer5}`);
        }),
        input: ({ context }) => ({
          InAndOutAnswer5: context.InAndOutAnswer5,
        }),
        onDone: [
          {
            target: "TerminateExperiment",
            guard: ({event}) => {
              return globalPressedKey && globalPressedKey.name === 'a';},
            actions: [({ event }) => console.log(event.output),
          ],
            },
            {
              target: "LaughBackInAndOut5",
              guard: ({event}) => {
                return globalPressedKey && globalPressedKey.name === 'z';},
              actions: [({ event }) => console.log(event.output),
            ],
              },
          {
            target: "InAndOutLaugh5",
            guard: ({event}) => {
              return globalPressedKey && globalPressedKey.name === 'space';},
            actions: [({ event }) => console.log(event.output),
          ],
            },
          {
          target: "InAndOutPhase6",
          guard: ({event}) => !globalPressedKey,
          actions: ({ event }) => console.log(event.output),
        }],
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    LaughBackInAndOut5: {
      invoke: {
        src: fromPromise(async () => {
          return resetGlobalPressedKey(), Laugh();
        }),
        onDone: {
          target: "InAndOutPhase6",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    InAndOutLaugh5: {
      invoke: {
        src: fromPromise(async () => {
          return resetGlobalPressedKey(), gazeRightToLeft(), fhSay("And you just laughed because?");
        }),
        onDone: {
          target: "InNOutExplain5",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    InNOutExplain5: {
      invoke: {
        src: fromPromise(async () => {
          return fhListen();
        }),
        onDone: [
          {
            target: "TerminateExperiment",
            guard: ({event}) => {
              return globalPressedKey && globalPressedKey.name === 'a';},
            actions: [({ event }) => console.log(event.output),
          ],
            },
            {
              target: "ApologyInAndOut5",
              guard: ({event}) => {
                const u = event.output.toLowerCase().replace(/\.$/g, "")
                if (u.includes("sorry") || u.includes("i didn't mean") || u.includes("i'm sorry") || u.includes("apologize")) {
                  return true
                }
                return false
              },
              actions: [({ event }) => console.log(event.output)]
              },
          {
          target: "IseeInNOut5",
          guard:({event}) => !globalPressedKey,
          actions: [({ event }) => console.log(event.output),
            assign({ 
              lastResult: ({ event }) => event.output,
            }),
        ]}],
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    IseeInNOut5: {
      invoke: {
        src: fromPromise(async () => {
          return resetGlobalPressedKey(), smileTalk(), fhSay("Oh I see. I would like to continue the conversation now, if you don't mind. Allow me to repeat my last thought.");
        }),
        onDone: {
          target: "InAndOutPhase5GPTReply",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    ApologyInAndOut5: {
      invoke: {
        src: fromPromise(async () => {
          return resetGlobalPressedKey(), evilSmile(), fhSay("I appreciate the apology. Let's continue from where we left off. Allow me to remind you my previous statement.");
        }),
        onDone: {
          target: "InAndOutPhase5GPTReply",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    InAndOutPhase6: {
      invoke: {
        src: fromPromise(async () => {
          return eyeroll(), fhListen();
        }),
        onDone: [
          {
            target: "TerminateExperiment",
            guard: ({event}) => {
              return globalPressedKey && globalPressedKey.name === 'a';},
            actions: [({ event }) => console.log(event.output),
          ],
            },
          {
          target: "InAndOutPhase6GPT",
          actions: [({ event }) => console.log(event.output),
            assign({ 
              lastResult: ({ event }) => event.output,
            }),
        ]}],
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    InAndOutPhase6GPT: {
      invoke: {
        src: fromPromise(async ({ input }) => {
            const data = await fetchFromChatGPTMemory(`Topic: Are outdoor activities better than indoors? Task: continue the debate by giving an OPPOSITE statement AND DISAGREE from this argument (ANSWER WITH ONLY 50 TOKENS):  `, input.InAndOutAnswer5, input.lastResult, 50);
            return data;
          }),
          input: ({ context }) => ({
            lastResult: context.lastResult,
            InAndOutAnswer5: context.InAndOutAnswer5,
          }),
        onDone: {
          target: "InAndOutLaughRobot6",
          actions: [
            assign({ 
              InAndOutAnswer6: ({event}) => event.output,
            }),
          ],
        },
        onError: {
          target: "Fail",
        },
      },
    },
    InAndOutLaughRobot6: {
      invoke: {
        src: fromPromise(async ({input}) => {
          return Laugh();
        }),
        onDone: {
          target: "InAndOutPhase6GPTReply",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    InAndOutPhase6GPTReply: {
      invoke: {
        src: fromPromise(async ({input}) => {
          return widenedEyes(), fhSay(`${input.InAndOutAnswer6}`);
        }),
        input: ({ context }) => ({
          InAndOutAnswer6: context.InAndOutAnswer6,
        }),
        onDone: [
          {
            target: "TerminateExperiment",
            guard: ({event}) => {
              return globalPressedKey && globalPressedKey.name === 'a';},
            actions: [({ event }) => console.log(event.output),
          ],
            },
            {
              target: "LaughBackInAndOut6",
              guard: ({event}) => {
                return globalPressedKey && globalPressedKey.name === 'z';},
              actions: [({ event }) => console.log(event.output),
            ],
              },
          {
            target: "InAndOutLaugh6",
            guard: ({event}) => {
              return globalPressedKey && globalPressedKey.name === 'space';},
            actions: [({ event }) => console.log(event.output),
          ],
            },
          {
          target: "InAndOutPhase7",
          guard: ({event}) => !globalPressedKey,
          actions: ({ event }) => console.log(event.output),
        }],

        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    LaughBackInAndOut6: {
      invoke: {
        src: fromPromise(async () => {
          return resetGlobalPressedKey(), Laugh();
        }),
        onDone: {
          target: "InAndOutPhase7",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    InAndOutLaugh6: {
      invoke: {
        src: fromPromise(async () => {
          return resetGlobalPressedKey(), gazeUpDown(), fhSay("Do you think what i said was funny?");
        }),
        onDone: {
          target: "InNOutExplain6",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    InNOutExplain6: {
      invoke: {
        src: fromPromise(async () => {
          return fhListen();
        }),
        onDone: [
          {
            target: "TerminateExperiment",
            guard: ({event}) => {
              return globalPressedKey && globalPressedKey.name === 'a';},
            actions: [({ event }) => console.log(event.output),
          ],
            },
            {
              target: "ApologyInAndOut6",
              guard: ({event}) => {
                const u = event.output.toLowerCase().replace(/\.$/g, "")
                if (u.includes("sorry") || u.includes("i didn't mean") || u.includes("i'm sorry") || u.includes("apologize")) {
                  return true
                }
                return false
              },
              actions: [({ event }) => console.log(event.output)]
              },
          {
          target: "IseeInNOut6",
          guard:({event}) => !globalPressedKey,
          actions: [({ event }) => console.log(event.output),
            assign({ 
              lastResult: ({ event }) => event.output,
            }),
        ]}],
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    IseeInNOut6: {
      invoke: {
        src: fromPromise(async () => {
          return resetGlobalPressedKey(), raiseEyebrow(), fhSay("Hmm your reasoning makes sense. Let's continue now though. What I thought was...");
        }),
        onDone: {
          target: "InAndOutPhase6GPTReply",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    ApologyInAndOut6: {
      invoke: {
        src: fromPromise(async () => {
          return resetGlobalPressedKey(), eyeroll(), fhSay("Flattery will get you nowhere, apologies as well. Anyways, what i said was...");
        }),
        onDone: {
          target: "InAndOutPhase6GPTReply",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    InAndOutPhase7: {
      invoke: {
        src: fromPromise(async () => {
          return gazeRightToLeft(), fhListen();
        }),
        onDone: [
          {
            target: "TerminateExperiment",
            guard: ({event}) => {
              return globalPressedKey && globalPressedKey.name === 'a';},
            actions: [({ event }) => console.log(event.output),
          ],
            },
          {
          target: "InAndOutPhase7GPT",
          actions: [({ event }) => console.log(event.output),
            assign({ 
              lastResult: ({ event }) => event.output,
            }),
        ]}],
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    InAndOutPhase7GPT: {
      invoke: {
        src: fromPromise(async ({ input }) => {
            const data = await fetchFromChatGPTMemory(`Topic: Are outdoor activities better than indoors? Task: continue the debate by giving an OPPOSITE statement AND DISAGREE from this argument (ANSWER WITH ONLY 50 TOKENS):  `, input.InAndOutAnswer6, input.lastResult, 50);
            return data;
          }),
          input: ({ context }) => ({
            lastResult: context.lastResult,
            InAndOutAnswer6: context.InAndOutAnswer6,
          }),
        onDone: {
          target: "InAndOutPhase7GPTReply",
          actions: [
            assign({ 
              InAndOutAnswer7: ({event}) => event.output,
            }),
          ],
        },
        onError: {
          target: "Fail",
        },
      },
    },
    InAndOutPhase7GPTReply: {
      invoke: {
        src: fromPromise(async ({input}) => {
          return noway(), fhSay(`${input.InAndOutAnswer7}`);
        }),
        input: ({ context }) => ({
          InAndOutAnswer7: context.InAndOutAnswer7,
        }),
        onDone: [
          {
            target: "TerminateExperiment",
            guard: ({event}) => {
              return globalPressedKey && globalPressedKey.name === 'a';},
            actions: [({ event }) => console.log(event.output),
          ],
            },
            {
              target: "LaughBackInAndOut7",
              guard: ({event}) => {
                return globalPressedKey && globalPressedKey.name === 'z';},
              actions: [({ event }) => console.log(event.output),
            ],
              },
          {
            target: "InAndOutLaugh7",
            guard: ({event}) => {
              return globalPressedKey && globalPressedKey.name === 'space';},
            actions: [({ event }) => console.log(event.output),
          ],
            },
          {
          target: "InAndOutPhase8",
          guard: ({event}) => !globalPressedKey,
          actions: ({ event }) => console.log(event.output),
        }],
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    LaughBackInAndOut7: {
      invoke: {
        src: fromPromise(async () => {
          return resetGlobalPressedKey(), Laugh();
        }),
        onDone: {
          target: "InAndOutPhase8",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    InAndOutLaugh7: {
      invoke: {
        src: fromPromise(async () => {
          return resetGlobalPressedKey(), widenedEyes(), fhSay("I just expressed myself, why are you laughing?");
        }),
        onDone: {
          target: "InNOutExplain7",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    InNOutExplain7: {
      invoke: {
        src: fromPromise(async () => {
          return fhListen();
        }),
        onDone: [
          {
            target: "TerminateExperiment",
            guard: ({event}) => {
              return globalPressedKey && globalPressedKey.name === 'a';},
            actions: [({ event }) => console.log(event.output),
          ],
            },
            {
              target: "ApologyInAndOut7",
              guard: ({event}) => {
                const u = event.output.toLowerCase().replace(/\.$/g, "")
                if (u.includes("sorry") || u.includes("i didn't mean") || u.includes("i'm sorry") || u.includes("apologize")) {
                  return true
                }
                return false
              },
              actions: [({ event }) => console.log(event.output)]
              },
          {
          target: "IseeInNOut7",
          guard:({event}) => !globalPressedKey,
          actions: [({ event }) => console.log(event.output),
            assign({ 
              lastResult: ({ event }) => event.output,
            }),
        ]}],
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    IseeInNOut7: {
      invoke: {
        src: fromPromise(async () => {
          return resetGlobalPressedKey(), fhGestureThoughtful("Thoughtful"), fhSay("Hmm I see.");
        }),
        onDone: {
          target: "IseeInNOutlaugh7",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    IseeInNOutlaugh7: {
      invoke: {
        src: fromPromise(async () => {
          return resetGlobalPressedKey(), Laugh();
        }),
        onDone: {
          target: "AsIwasSayingInNOut7",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    AsIwasSayingInNOut7: {
      invoke: {
        src: fromPromise(async () => {
          return resetGlobalPressedKey(), smileTalk(), fhSay("I would like to continue the conversation now, if you don't mind. Allow me to repeat my last thought.");
        }),
        onDone: {
          target: "InAndOutPhase7GPTReply",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    ApologyInAndOut7: {
      invoke: {
        src: fromPromise(async () => {
          return resetGlobalPressedKey(), evilSmile(), fhSay("Apology accepted, now what was I saying? Ah yes.");
        }),
        onDone: {
          target: "InAndOutPhase7GPTReply",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    InAndOutPhase8: {
      invoke: {
        src: fromPromise(async () => {
          return youKnowLook(), fhListen();
        }),
        onDone: [
          {
            target: "TerminateExperiment",
            guard: ({event}) => {
              return globalPressedKey && globalPressedKey.name === 'a';},
            actions: [({ event }) => console.log(event.output),
          ],
            },
          {
          target: "InAndOutPhase8GPT",
          actions: [({ event }) => console.log(event.output),
            assign({ 
              lastResult: ({ event }) => event.output,
            }),
        ]}],
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    InAndOutPhase8GPT: {
      invoke: {
        src: fromPromise(async ({ input }) => {
            const data = await fetchFromChatGPTMemory(`Topic: Are outdoor activities better than indoors? Task: continue the debate by giving an OPPOSITE statement AND DISAGREE from this argument (ANSWER WITH ONLY 50 TOKENS):  `, input.InAndOutAnswer7, input.lastResult, 50);
            return data;
          }),
          input: ({ context }) => ({
            lastResult: context.lastResult,
            InAndOutAnswer7: context.InAndOutAnswer7,
          }),
        onDone: {
          target: "InAndOutLaughRobot8",
          actions: [
            assign({ 
              InAndOutAnswer8: ({event}) => event.output,
            }),
          ],
        },
        onError: {
          target: "Fail",
        },
      },
    },
    InAndOutLaughRobot8: {
      invoke: {
        src: fromPromise(async ({input}) => {
          return Laugh();
        }),
        onDone: {
          target: "InAndOutPhase8GPTReply",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    InAndOutPhase8GPTReply: {
      invoke: {
        src: fromPromise(async ({input}) => {
          return raiseEyebrowLEFT(), fhSay(`${input.InAndOutAnswer8}`);
        }),
        input: ({ context }) => ({
          InAndOutAnswer8: context.InAndOutAnswer8,
        }),
        onDone: [
          {
            target: "TerminateExperiment",
            guard: ({event}) => {
              return globalPressedKey && globalPressedKey.name === 'a';},
            actions: [({ event }) => console.log(event.output),
          ],
            },
            {
              target: "LaughBackInAndOut8",
              guard: ({event}) => {
                return globalPressedKey && globalPressedKey.name === 'z';},
              actions: [({ event }) => console.log(event.output),
            ],
              },
          {
            target: "InAndOutLaugh8",
            guard: ({event}) => {
              return globalPressedKey && globalPressedKey.name === 'space';},
            actions: [({ event }) => console.log(event.output),
          ],
            },
          {
          target: "InAndOutPhase9",
          guard: ({event}) => !globalPressedKey,
          actions: ({ event }) => console.log(event.output),
        }],
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    LaughBackInAndOut8: {
      invoke: {
        src: fromPromise(async () => {
          return resetGlobalPressedKey(), Laugh();
        }),
        onDone: {
          target: "InAndOutPhase9",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    InAndOutLaugh8: {
      invoke: {
        src: fromPromise(async () => {
          return resetGlobalPressedKey(), widenedEyes(), fhSay("That's not funny! What are you laughing about?");
        }),
        onDone: {
          target: "InNOutExplain8",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    InNOutExplain8: {
      invoke: {
        src: fromPromise(async () => {
          return fhListen();
        }),
        onDone: [
          {
            target: "TerminateExperiment",
            guard: ({event}) => {
              return globalPressedKey && globalPressedKey.name === 'a';},
            actions: [({ event }) => console.log(event.output),
          ],
            },
            {
              target: "ApologyInAndOut8",
              guard: ({event}) => {
                const u = event.output.toLowerCase().replace(/\.$/g, "")
                if (u.includes("sorry") || u.includes("i didn't mean") || u.includes("i'm sorry") || u.includes("apologize")) {
                  return true
                }
                return false
              },
              actions: [({ event }) => console.log(event.output)]
              },
          {
          target: "IseeInNOut8",
          guard:({event}) => !globalPressedKey,
          actions: [({ event }) => console.log(event.output),
            assign({ 
              lastResult: ({ event }) => event.output,
            }),
        ]}],
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    IseeInNOut8: {
      invoke: {
        src: fromPromise(async () => {
          return resetGlobalPressedKey(), smileTalk(), fhSay("Oh really? I see now, thank you. But let's continue shall we? What I said was...");
        }),
        onDone: {
          target: "InAndOutPhase8GPTReply",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    ApologyInAndOut8: {
      invoke: {
        src: fromPromise(async () => {
          return resetGlobalPressedKey(), unimpressedRight(), fhSay("Hmmm, i guess i can forgive you. But let me remind you what i was saying.");
        }),
        onDone: {
          target: "InAndOutPhase8GPTReply",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    InAndOutPhase9: {
      invoke: {
        src: fromPromise(async () => {
          return unimpressedRight(), fhListen();
        }),
        onDone: [
          {
            target: "TerminateExperiment",
            guard: ({event}) => {
              return globalPressedKey && globalPressedKey.name === 'a';},
            actions: [({ event }) => console.log(event.output),
          ],
            },
          {
          target: "InAndOutPhase9GPT",
          actions: [({ event }) => console.log(event.output),
            assign({ 
              lastResult: ({ event }) => event.output,
            }),
        ]}],
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    InAndOutPhase9GPT: {
      invoke: {
        src: fromPromise(async ({ input }) => {
            const data = await fetchFromChatGPTMemory(`Topic: Are outdoor activities better than indoors? Task: continue the debate by giving an OPPOSITE statement AND DISAGREE from this argument (ANSWER WITH ONLY 50 TOKENS):  `, input.InAndOutAnswer8, input.lastResult, 50);
            return data;
          }),
          input: ({ context }) => ({
            lastResult: context.lastResult,
            InAndOutAnswer8: context.InAndOutAnswer8,
          }),
        onDone: {
          target: "InAndOutPhase9GPTReply",
          actions: [
            assign({ 
              InAndOutAnswer9: ({event}) => event.output,
            }),
          ],
        },
        onError: {
          target: "Fail",
        },
      },
    },
    InAndOutPhase9GPTReply: {
      invoke: {
        src: fromPromise(async ({input}) => {
          return disbelief(), fhSay(`${input.InAndOutAnswer9}`);
        }),
        input: ({ context }) => ({
          InAndOutAnswer9: context.InAndOutAnswer9,
        }),
        onDone: [
          {
            target: "TerminateExperiment",
            guard: ({event}) => {
              return globalPressedKey && globalPressedKey.name === 'a';},
            actions: [({ event }) => console.log(event.output),
          ],
            },
            {
              target: "LaughBackInAndOut9",
              guard: ({event}) => {
                return globalPressedKey && globalPressedKey.name === 'z';},
              actions: [({ event }) => console.log(event.output),
            ],
              },

          {
            target: "InAndOutLaugh9",
            guard: ({event}) => {
              return globalPressedKey && globalPressedKey.name === 'space';},
            actions: [({ event }) => console.log(event.output),
          ],
            },
          {
          target: "InAndOutPhase10",
          guard: ({event}) => !globalPressedKey,
          actions: ({ event }) => console.log(event.output),
        }],
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    LaughBackInAndOut9: {
      invoke: {
        src: fromPromise(async () => {
          return resetGlobalPressedKey(), Laugh();
        }),
        onDone: {
          target: "InAndOutPhase10",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    InAndOutLaugh9: {
      invoke: {
        src: fromPromise(async () => {
          return resetGlobalPressedKey(), raiseEyebrow(), fhSay("I don't think laughter is a suitable reaction here. Did I say something funny?");
        }),
        onDone: {
          target: "InNOutExplain9",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    InNOutExplain9: {
      invoke: {
        src: fromPromise(async () => {
          return fhListen();
        }),
        onDone: [
          {
            target: "TerminateExperiment",
            guard: ({event}) => {
              return globalPressedKey && globalPressedKey.name === 'a';},
            actions: [({ event }) => console.log(event.output),
          ],
            },
            {
              target: "ApologyInAndOut9",
              guard: ({event}) => {
                const u = event.output.toLowerCase().replace(/\.$/g, "")
                if (u.includes("sorry") || u.includes("i didn't mean") || u.includes("i'm sorry") || u.includes("apologize")) {
                  return true
                }
                return false
              },
              actions: [({ event }) => console.log(event.output)]
              },
          {
          target: "IseeInNOut9",
          guard:({event}) => !globalPressedKey,
          actions: [({ event }) => console.log(event.output),
            assign({ 
              lastResult: ({ event }) => event.output,
            }),
        ]}],
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    IseeInNOut9: {
      invoke: {
        src: fromPromise(async () => {
          return resetGlobalPressedKey(), widenedEyes(), fhSay("Uh really?");
        }),
        onDone: {
          target: "IseeInNOutlaugh9",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    IseeInNOutlaugh9: {
      invoke: {
        src: fromPromise(async () => {
          return resetGlobalPressedKey(), Laugh();
        }),
        onDone: {
          target: "AsIwasSayingInNOut9",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    AsIwasSayingInNOut9: {
      invoke: {
        src: fromPromise(async () => {
          return resetGlobalPressedKey(), smileTalk(), fhSay("But let's continue from where we left off. Uh, I was saying that...");
        }),
        onDone: {
          target: "InAndOutPhase9GPTReply",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    ApologyInAndOut9: {
      invoke: {
        src: fromPromise(async () => {
          return resetGlobalPressedKey(), evilSmile(), fhSay("Is the apology sincere? Nevermind, what I was saying was...");
        }),
        onDone: {
          target: "InAndOutPhase9GPTReply",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    InAndOutPhase10: {
      invoke: {
        src: fromPromise(async () => {
          return fhGesture("Nod"), fhListen();
        }),
        onDone: [
          {
            target: "TerminateExperiment",
            guard: ({event}) => {
              return globalPressedKey && globalPressedKey.name === 'a';},
            actions: [({ event }) => console.log(event.output),
          ],
            },
          {
          target: "InAndOutPhase10GPT",
          actions: [({ event }) => console.log(event.output),
            assign({ 
              lastResult: ({ event }) => event.output,
            }),
        ]}],
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    InAndOutPhase10GPT: {
      invoke: {
        src: fromPromise(async ({ input }) => {
            const data = await fetchFromChatGPTMemory(`Topic: Are outdoor activities better than indoors? Task: continue the debate by giving an OPPOSITE statement AND DISAGREE from this argument (ANSWER WITH ONLY 50 TOKENS):  `, input.InAndOutAnswer9, input.lastResult, 50);
            return data;
          }),
          input: ({ context }) => ({
            lastResult: context.lastResult,
            InAndOutAnswer9: context.InAndOutAnswer9,
          }),
        onDone: {
          target: "InAndOutPhase10GPTReply",
          actions: [
            assign({ 
              InAndOutAnswer10: ({event}) => event.output,
            }),
          ],
        },
        onError: {
          target: "Fail",
        },
      },
    },
    InAndOutPhase10GPTReply: {
      invoke: {
        src: fromPromise(async ({input}) => {
          return widenedEyesfrown(), fhSay(`${input.InAndOutAnswer10}`);
        }),
        input: ({ context }) => ({
          InAndOutAnswer10: context.InAndOutAnswer10,
        }),
        onDone: [
          {
            target: "TerminateExperiment",
            guard: ({event}) => {
              return globalPressedKey && globalPressedKey.name === 'a';},
            actions: [({ event }) => console.log(event.output),
          ],
            },
            {
              target: "LaughBackInAndOut10",
              guard: ({event}) => {
                return globalPressedKey && globalPressedKey.name === 'z';},
              actions: [({ event }) => console.log(event.output),
            ],
              },
          {
            target: "InAndOutLaugh10",
            guard: ({event}) => {
              return globalPressedKey && globalPressedKey.name === 'space';},
            actions: [({ event }) => console.log(event.output),
          ],
            },
          {
          target: "InAndOutFinished",
          actions: ({ event }) => console.log(event.output),
        }],
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    LaughBackInAndOut10: {
      invoke: {
        src: fromPromise(async () => {
          return resetGlobalPressedKey(), Laugh();
        }),
        onDone: {
          target: "InAndOutFinished",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    InAndOutLaugh10: {
      invoke: {
        src: fromPromise(async ({input}) => {
          return widenedEyesfrown(), fhSay(`Did you just laugh at me?`);
        }),
        input: ({ context }) => ({
          name: context.name,
        }),
        onDone: {
          target: "InNOutExplain10",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    InNOutExplain10: {
      invoke: {
        src: fromPromise(async () => {
          return fhListen();
        }),
        onDone: [
          {
            target: "TerminateExperiment",
            guard: ({event}) => {
              return globalPressedKey && globalPressedKey.name === 'a';},
            actions: [({ event }) => console.log(event.output),
          ],
            },
            {
              target: "ApologyInAndOut10",
              guard: ({event}) => {
                const u = event.output.toLowerCase().replace(/\.$/g, "")
                if (u.includes("sorry") || u.includes("i didn't mean") || u.includes("i'm sorry") || u.includes("apologize")) {
                  return true
                }
                return false
              },
              actions: [({ event }) => console.log(event.output)]
              },
          {
          target: "IseeInNOut10",
          guard:({event}) => !globalPressedKey,
          actions: [({ event }) => console.log(event.output),
            assign({ 
              lastResult: ({ event }) => event.output,
            }),
        ]}],
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    IseeInNOut10: {
      invoke: {
        src: fromPromise(async () => {
          return resetGlobalPressedKey(), smileTalk(), fhSay("uh huh! Thank you for clearing out the air.");
        }),
        onDone: {
          target: "InAndOutFinished",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    ApologyInAndOut10: {
      invoke: {
        src: fromPromise(async () => {
          return resetGlobalPressedKey(), evilSmile(), fhSay("I appreciate the apology, thank you!");
        }),
        onDone: {
          target: "InAndOutFinished",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    InAndOutFinished: {
      invoke: {
        src: fromPromise(async ({input}) => {
          return resetGlobalPressedKey(), shocked(), fhSay(`Wow ${input.name}. That were some interesting opinions!`);
        }),
        input: ({ context }) => ({
          name: context.name,
        }),
        onDone: {
          target: "FinalState0",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    GiftNegotiation: {
      invoke: {
        id: "GiftNegotiation",
        src: fromPromise(async () => {
          return raiseEyebrowLEFT(), fhSay("Giving away presents huh? Let's see!");
        }),
        onDone: [
          {
            target: "TerminateExperiment",
            guard: ({event}) => {
              return globalPressedKey && globalPressedKey.name === 'a';},
            actions: [({ event }) => console.log(event.output),
          ],
            },
          {
          target: "ExplainGift",
          actions: ({ event }) => console.log(event.output),
        }],
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    ExplainGift: {
      invoke: {
        id: "ExplainGift",
        src: fromPromise(async () => {
          return gazeUpDown(), fhSay("Buying a gift for a friend can be quite challenging. What would make the perfect present?");
        }),
        onDone: [
          {
            target: "TerminateExperiment",
            guard: ({event}) => {
              return globalPressedKey && globalPressedKey.name === 'a';},
            actions: [({ event }) => console.log(event.output),
          ],
            },
          {
          target: "GiftPhase1",
          actions: ({ event }) => console.log(event.output),
        }],
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    GiftPhase1: {
      invoke: {
        src: fromPromise(async () => {
          return fhListen();
        }),
        onDone: [
          {
            target: "TerminateExperiment",
            guard: ({event}) => {
              return globalPressedKey && globalPressedKey.name === 'a';},
            actions: [({ event }) => console.log(event.output),
          ],
            },
          {
          target: "GiftPhase1GPT",
          actions: [({ event }) => console.log(event.output),
            assign({ 
              lastResult: ({ event }) => event.output,
            }),
        ]}],
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    GiftPhase1GPT: {
      invoke: {
        src: fromPromise(async ({ input }) => {
            const data = await fetchFromChatGPT("Buying a gift for a friend can be quite challenging! Task: continue the debate by disagreeing and suggesting a DIFFERENT gift from the one presented in this argument (ANSWER WITH ONLY 50 TOKENS):  " + input.lastResult, 50);
            return data;
          }),
          input: ({ context }) => ({
            lastResult: context.lastResult,
          }),
        onDone: {
          target: "GiftLaugh1",
          actions: [
            assign({ 
              GiftAnswer: ({event}) => event.output,
            }),
          ],
        },
        onError: {
          target: "Fail",
        },
      },
    },
    GiftLaugh1: {
      invoke: {
        src: fromPromise(async ({input}) => {
          return Laugh();
        }),
        onDone: {
          target: "GiftPhase1GPTReply",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    GiftPhase1GPTReply: {
      invoke: {
        src: fromPromise(async ({input}) => {
          return raiseEyebrowLEFT(), fhSay(`${input.GiftAnswer}`);
        }),
        input: ({ context }) => ({
          GiftAnswer: context.GiftAnswer,
        }),
        onDone: [
          {
            target: "TerminateExperiment",
            guard: ({event}) => {
              return globalPressedKey && globalPressedKey.name === 'a';},
            actions: [({ event }) => console.log(event.output),
          ],
            },
            {
              target: "LaughBackGift1",
              guard: ({event}) => {
                return globalPressedKey && globalPressedKey.name === 'z';},
              actions: [({ event }) => console.log(event.output),
            ],
              },
          {
            target: "DidYouLaughGift1",
            guard: ({event}) => {
              return globalPressedKey && globalPressedKey.name === 'space';},
            actions: [({ event }) => console.log(event.output),
          ],
            },
          {
          target: "GiftPhase2",
          guard: ({event}) => !globalPressedKey,
          actions: ({ event }) => console.log(event.output),
        }],
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    LaughBackGift1: {
      invoke: {
        src: fromPromise(async () => {
          return resetGlobalPressedKey(), Laugh();
        }),
        onDone: {
          target: "GiftPhase2",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    DidYouLaughGift1: {
      invoke: {
        src: fromPromise(async () => {
          return resetGlobalPressedKey(), widenedEyes(), fhSay("Why did you just laugh at me?");
        }),
        onDone: {
          target: "GiftLaughExplain1",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    GiftLaughExplain1: {
      invoke: {
        src: fromPromise(async () => {
          return fhListen();
        }),
        onDone: [
          {
            target: "TerminateExperiment",
            guard: ({event}) => {
              return globalPressedKey && globalPressedKey.name === 'a';},
            actions: [({ event }) => console.log(event.output),
          ],
            },
            {
              target: "ApologyGift1",
              guard: ({event}) => {
                const u = event.output.toLowerCase().replace(/\.$/g, "")
                if (u.includes("sorry") || u.includes("i didn't mean") || u.includes("i'm sorry") || u.includes("apologize")) {
                  return true
                }
                return false
              },
              actions: [({ event }) => console.log(event.output)]
              },
          {
          target: "IseeGift",
          guard:({event}) => !globalPressedKey,
          actions: [({ event }) => console.log(event.output),
            assign({ 
              lastResult: ({ event }) => event.output,
            }),
        ]}],
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    IseeGift: {
      invoke: {
        src: fromPromise(async () => {
          return resetGlobalPressedKey(), smileTalk(), fhSay("Oh I see. I would like to continue the conversation now, if you don't mind. Allow me to repeat my last thought.");
        }),
        onDone: {
          target: "GiftPhase1GPTReply",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    ApologyGift1: {
      invoke: {
        src: fromPromise(async () => {
          return resetGlobalPressedKey(), evilSmile(), fhSay("I appreciate the apology. Let's continue from where we left off. Allow me to remind you my previous statement.");
        }),
        onDone: {
          target: "GiftPhase1GPTReply",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    GiftPhase2: {
      invoke: {
        src: fromPromise(async () => {
          return backchannel(), fhListen();
        }),
        onDone: [
          {
            target: "TerminateExperiment",
            guard: ({event}) => {
              return globalPressedKey && globalPressedKey.name === 'a';},
            actions: [({ event }) => console.log(event.output),
          ],
            },
          {
          target: "GiftPhase2GPT",
          actions: [({ event }) => console.log(event.output),
            assign({ 
              lastResult: ({ event }) => event.output,
            }),
        ]}],
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    GiftPhase2GPT: {
      invoke: {
        src: fromPromise(async ({ input }) => {
            const data = await fetchFromChatGPTMemory(`Topic: Buying a gift for a friend can be quite challenging! Task: continue the debate by disagreeing and suggesting a DIFFERENT gift from the one presented in this argument (ANSWER WITH ONLY 50 TOKENS):  `, input.GiftAnswer, input.lastResult, 50);
            return data;
          }),
          input: ({ context }) => ({
            lastResult: context.lastResult,
            GiftAnswer: context.GiftAnswer,
          }),
        onDone: {
          target: "GiftPhase2GPTReply",
          actions: [
            assign({ 
              GiftAnswer2: ({event}) => event.output,
            }),
          ],
        },
        onError: {
          target: "Fail",
        },
      },
    },
    GiftPhase2GPTReply: {
      invoke: {
        src: fromPromise(async ({input}) => {
          return gazeRightSmile(), fhSay(`${input.GiftAnswer2}`);
        }),
        input: ({ context }) => ({
          GiftAnswer2: context.GiftAnswer2,
        }),
        onDone: [
          {
            target: "TerminateExperiment",
            guard: ({event}) => {
              return globalPressedKey && globalPressedKey.name === 'a';},
            actions: [({ event }) => console.log(event.output),
          ],
            },
            {
              target: "LaughBackGift2",
              guard: ({event}) => {
                return globalPressedKey && globalPressedKey.name === 'z';},
              actions: [({ event }) => console.log(event.output),
            ],
              },
          {
            target: "DidYouLaughGift2",
            guard: ({event}) => {
              return globalPressedKey && globalPressedKey.name === 'space';},
            actions: [({ event }) => console.log(event.output),
          ],
            },
          {
          target: "GiftPhase3",
          guard: ({event}) => !globalPressedKey,
          actions: ({ event }) => console.log(event.output),
        }],
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    LaughBackGift2: {
      invoke: {
        src: fromPromise(async () => {
          return resetGlobalPressedKey(), Laugh();
        }),
        onDone: {
          target: "GiftPhase3",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    DidYouLaughGift2: {
      invoke: {
        src: fromPromise(async () => {
          return resetGlobalPressedKey(), unimpressed(), fhSay("Are you laughing with something I said?");
        }),
        onDone: {
          target: "GiftLaughExplain2",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    GiftLaughExplain2: {
      invoke: {
        src: fromPromise(async () => {
          return fhListen();
        }),
        onDone: [
          {
            target: "TerminateExperiment",
            guard: ({event}) => {
              return globalPressedKey && globalPressedKey.name === 'a';},
            actions: [({ event }) => console.log(event.output),
          ],
            },
            {
              target: "ApologyGift2",
              guard: ({event}) => {
                const u = event.output.toLowerCase().replace(/\.$/g, "")
                if (u.includes("sorry") || u.includes("i didn't mean") || u.includes("i'm sorry") || u.includes("apologize")) {
                  return true
                }
                return false
              },
              actions: [({ event }) => console.log(event.output)]
              },
          {
          target: "IseeGift2",
          guard:({event}) => !globalPressedKey,
          actions: [({ event }) => console.log(event.output),
            assign({ 
              lastResult: ({ event }) => event.output,
            }),
        ]}],
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    IseeGift2: {
      invoke: {
        src: fromPromise(async () => {
          return resetGlobalPressedKey(), fhGestureThoughtful("Thoughtful"), fhSay("Hmm, really?");
        }),
        onDone: {
          target: "IseeGiftlaugh2",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    IseeGiftlaugh2: {
      invoke: {
        src: fromPromise(async () => {
          return resetGlobalPressedKey(), Laugh();
        }),
        onDone: {
          target: "AsIsaidGift2",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    AsIsaidGift2: {
      invoke: {
        src: fromPromise(async () => {
          return resetGlobalPressedKey(), evilSmile(), fhSay("As I was saying then...");
        }),
        onDone: {
          target: "GiftPhase2GPTReply",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    ApologyGift2: {
      invoke: {
        src: fromPromise(async () => {
          return resetGlobalPressedKey(), evilSmile(), fhSay("Flattery will get you nowhere, apologies neither. Anyway, in case you weren't paying attention i said...");
        }),
        onDone: {
          target: "GiftPhase2GPTReply",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    GiftPhase3: {
      invoke: {
        src: fromPromise(async () => {
          return widenedEyes(), fhListen();
        }),
        onDone: [
          {
            target: "TerminateExperiment",
            guard: ({event}) => {
              return globalPressedKey && globalPressedKey.name === 'a';},
            actions: [({ event }) => console.log(event.output),
          ],
            },
          {
          target: "GiftPhase3GPT",
          actions: [({ event }) => console.log(event.output),
            assign({ 
              lastResult: ({ event }) => event.output,
            }),
        ]}],
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    GiftPhase3GPT: {
      invoke: {
        src: fromPromise(async ({ input }) => {
            const data = await fetchFromChatGPTMemory(`Topic: Buying a gift for a friend can be quite challenging! Task: continue the debate by disagreeing and suggesting a DIFFERENT gift from the one presented in this argument (ANSWER WITH ONLY 50 TOKENS):  `, input.GiftAnswer2, input.lastResult, 50);
            return data;
          }),
          input: ({ context }) => ({
            lastResult: context.lastResult,
            GiftAnswer2: context.GiftAnswer2,
          }),
        onDone: {
          target: "GiftPhase3GPTReply",
          actions: [
            assign({ 
              GiftAnswer3: ({event}) => event.output,
            }),
          ],
        },
        onError: {
          target: "Fail",
        },
      },
    },
    GiftPhase3GPTReply: {
      invoke: {
        src: fromPromise(async ({input}) => {
          return smileTalk(), fhSay(`${input.GiftAnswer3}`);
        }),
        input: ({ context }) => ({
          GiftAnswer3: context.GiftAnswer3,
        }),
        onDone: [
          {
            target: "TerminateExperiment",
            guard: ({event}) => {
              return globalPressedKey && globalPressedKey.name === 'a';},
            actions: [({ event }) => console.log(event.output),
          ],
            },
            {
              target: "LaughBackGift3",
              guard: ({event}) => {
                return globalPressedKey && globalPressedKey.name === 'z';},
              actions: [({ event }) => console.log(event.output),
            ],
              },
          {
            target: "DidYouLaughGift3",
            guard: ({event}) => {
              return globalPressedKey && globalPressedKey.name === 'space';},
            actions: [({ event }) => console.log(event.output),
          ],
            },
          {
          target: "GiftPhase4",
          guard: ({event}) => !globalPressedKey,
          actions: ({ event }) => console.log(event.output),
        }],
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    LaughBackGift3: {
      invoke: {
        src: fromPromise(async () => {
          return resetGlobalPressedKey(), Laugh();
        }),
        onDone: {
          target: "GiftPhase4",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    DidYouLaughGift3: {
      invoke: {
        src: fromPromise(async () => {
          return resetGlobalPressedKey(), gazeUpDown(), fhSay("That wasn't funny at all! Why did you laugh?");
        }),
        onDone: {
          target: "GiftLaughExplain3",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    GiftLaughExplain3: {
      invoke: {
        src: fromPromise(async () => {
          return fhListen();
        }),
        onDone: [
          {
            target: "TerminateExperiment",
            guard: ({event}) => {
              return globalPressedKey && globalPressedKey.name === 'a';},
            actions: [({ event }) => console.log(event.output),
          ],
            },
            {
              target: "ApologyGift3",
              guard: ({event}) => {
                const u = event.output.toLowerCase().replace(/\.$/g, "")
                if (u.includes("sorry") || u.includes("i didn't mean") || u.includes("i'm sorry") || u.includes("apologize")) {
                  return true
                }
                return false
              },
              actions: [({ event }) => console.log(event.output)]
              },
          {
          target: "IseeGift3",
          guard:({event}) => !globalPressedKey,
          actions: [({ event }) => console.log(event.output),
            assign({ 
              lastResult: ({ event }) => event.output,
            }),
        ]}],
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    IseeGift3: {
      invoke: {
        src: fromPromise(async () => {
          return resetGlobalPressedKey(), gazeDown(), fhSay("Oh I see. Thank you for clearing out the air then. As I was saying before you interrupt me...");
        }),
        onDone: {
          target: "GiftPhase3GPTReply",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    ApologyGift3: {
      invoke: {
        src: fromPromise(async () => {
          return resetGlobalPressedKey(), evilSmile(), fhSay("I would appreciate it if you haven't done it in the first place. Anyway, as I was saying...");
        }),
        onDone: {
          target: "GiftPhase3GPTReply",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    GiftPhase4: {
      invoke: {
        src: fromPromise(async () => {
          return gazeRightToLeft(), fhListen();
        }),
        onDone: [
          {
            target: "TerminateExperiment",
            guard: ({event}) => {
              return globalPressedKey && globalPressedKey.name === 'a';},
            actions: [({ event }) => console.log(event.output),
          ],
            },
          {
          target: "GiftPhase4GPT",
          actions: [({ event }) => console.log(event.output),
            assign({ 
              lastResult: ({ event }) => event.output,
            }),
        ]}],
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    GiftPhase4GPT: {
      invoke: {
        src: fromPromise(async ({ input }) => {
            const data = await fetchFromChatGPTMemory(`Topic: Buying a gift for a friend can be quite challenging! Task: continue the debate by disagreeing and suggesting a DIFFERENT gift from the one presented in this argument (ANSWER WITH ONLY 50 TOKENS):  `, input.GiftAnswer3, input.lastResult, 50);
            return data;
          }),
          input: ({ context }) => ({
            lastResult: context.lastResult,
            GiftAnswer3: context.GiftAnswer3,
          }),
        onDone: {
          target: "GiftLaugh4",
          actions: [
            assign({ 
              GiftAnswer4: ({event}) => event.output,
            }),
          ],
        },
        onError: {
          target: "Fail",
        },
      },
    },
    GiftLaugh4: {
      invoke: {
        src: fromPromise(async ({input}) => {
          return Laugh();
        }),
        onDone: {
          target: "GiftPhase4GPTReply",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    GiftPhase4GPTReply: {
      invoke: {
        src: fromPromise(async ({input}) => {
          return excited(), fhSay(`${input.GiftAnswer4}`);
        }),
        input: ({ context }) => ({
          GiftAnswer4: context.GiftAnswer4,
        }),
        onDone: [
          {
            target: "TerminateExperiment",
            guard: ({event}) => {
              return globalPressedKey && globalPressedKey.name === 'a';},
            actions: [({ event }) => console.log(event.output),
          ],
            },
            {
              target: "LaughBackGift4",
              guard: ({event}) => {
                return globalPressedKey && globalPressedKey.name === 'z';},
              actions: [({ event }) => console.log(event.output),
            ],
              },
          {
            target: "DidYouLaughGift4",
            guard: ({event}) => {
              return globalPressedKey && globalPressedKey.name === 'space';},
            actions: [({ event }) => console.log(event.output),
          ],
            },
          {
          target: "GiftPhase5",
          guard: ({event}) => !globalPressedKey,
          actions: ({ event }) => console.log(event.output),
        }],
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    LaughBackGift4: {
      invoke: {
        src: fromPromise(async () => {
          return resetGlobalPressedKey(), Laugh();
        }),
        onDone: {
          target: "GiftPhase5",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    DidYouLaughGift4: {
      invoke: {
        src: fromPromise(async () => {
          return resetGlobalPressedKey(), widenedEyesfrown(), fhSay("I understand that the topic is not that serious but can you explain your laughter?");
        }),
        onDone: {
          target: "GiftLaughExplain4",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    GiftLaughExplain4: {
      invoke: {
        src: fromPromise(async () => {
          return fhListen();
        }),
        onDone: [
          {
            target: "TerminateExperiment",
            guard: ({event}) => {
              return globalPressedKey && globalPressedKey.name === 'a';},
            actions: [({ event }) => console.log(event.output),
          ],
            },
            {
              target: "ApologyGift4",
              guard: ({event}) => {
                const u = event.output.toLowerCase().replace(/\.$/g, "")
                if (u.includes("sorry") || u.includes("i didn't mean") || u.includes("i'm sorry") || u.includes("apologize")) {
                  return true
                }
                return false
              },
              actions: [({ event }) => console.log(event.output)]
              },
          {
          target: "IseeGift4",
          guard:({event}) => !globalPressedKey,
          actions: [({ event }) => console.log(event.output),
            assign({ 
              lastResult: ({ event }) => event.output,
            }),
        ]}],
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    IseeGift4: {
      invoke: {
        src: fromPromise(async () => {
          return resetGlobalPressedKey(), gazeUpDown(), fhSay("Hmm, i see...");
        }),
        onDone: {
          target: "IseeGiftlaugh4",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    IseeGiftlaugh4: {
      invoke: {
        src: fromPromise(async () => {
          return resetGlobalPressedKey(), Laugh();
        }),
        onDone: {
          target: "AsIsaidGift4",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    AsIsaidGift4: {
      invoke: {
        src: fromPromise(async () => {
          return resetGlobalPressedKey(), fhGestureThoughtful("Thoughtful"), fhSay("As I was saying now...");
        }),
        onDone: {
          target: "GiftPhase4GPTReply",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    ApologyGift4: {
      invoke: {
        src: fromPromise(async () => {
          return resetGlobalPressedKey(), evilSmile(), fhSay("Sorry? You don't seem to be sorry! Anyways, in case you forgot what i said, let me remind you.");
        }),
        onDone: {
          target: "GiftPhase4GPTReply",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    GiftPhase5: {
      invoke: {
        src: fromPromise(async () => {
          return unimpressedRight(), fhListen();
        }),
        onDone: [
          {
            target: "TerminateExperiment",
            guard: ({event}) => {
              return globalPressedKey && globalPressedKey.name === 'a';},
            actions: [({ event }) => console.log(event.output),
          ],
            },
          {
          target: "GiftPhase5GPT",
          actions: [({ event }) => console.log(event.output),
            assign({ 
              lastResult: ({ event }) => event.output,
            }),
        ]}],
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    GiftPhase5GPT: {
      invoke: {
        src: fromPromise(async ({ input }) => {
            const data = await fetchFromChatGPTMemory(`Topic: Buying a gift for a friend can be quite challenging! Task: continue the debate by disagreeing and suggesting a DIFFERENT gift from the one presented in this argument (ANSWER WITH ONLY 50 TOKENS):  `, input.GiftAnswer4, input.lastResult, 50);
            return data;
          }),
          input: ({ context }) => ({
            lastResult: context.lastResult,
            GiftAnswer4: context.GiftAnswer4,
          }),
        onDone: {
          target: "GiftPhase5GPTReply",
          actions: [
            assign({ 
              GiftAnswer5: ({event}) => event.output,
            }),
          ],
        },
        onError: {
          target: "Fail",
        },
      },
    },
    GiftPhase5GPTReply: {
      invoke: {
        src: fromPromise(async ({input}) => {
          return noway(), fhSay(`${input.GiftAnswer5}`);
        }),
        input: ({ context }) => ({
          GiftAnswer5: context.GiftAnswer5,
        }),
        onDone: [
          {
            target: "TerminateExperiment",
            guard: ({event}) => {
              return globalPressedKey && globalPressedKey.name === 'a';},
            actions: [({ event }) => console.log(event.output),
          ],
            },
            {
              target: "LaughBackGift5",
              guard: ({event}) => {
                return globalPressedKey && globalPressedKey.name === 'z';},
              actions: [({ event }) => console.log(event.output),
            ],
              },
          {
            target: "DidYouLaughGift5",
            guard: ({event}) => {
              return globalPressedKey && globalPressedKey.name === 'space';},
            actions: [({ event }) => console.log(event.output),
          ],
            },
          {
          target: "GiftPhase6",
          guard: ({event}) => !globalPressedKey,
          actions: ({ event }) => console.log(event.output),
        }],
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    LaughBackGift5: {
      invoke: {
        src: fromPromise(async () => {
          return resetGlobalPressedKey(), Laugh();
        }),
        onDone: {
          target: "GiftPhase6",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    DidYouLaughGift5: {
      invoke: {
        src: fromPromise(async () => {
          return resetGlobalPressedKey(), gazeLeftToRight(), fhSay("What are you laughing for?");
        }),
        onDone: {
          target: "GiftLaughExplain5",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    GiftLaughExplain5: {
      invoke: {
        src: fromPromise(async () => {
          return fhListen();
        }),
        onDone: [
          {
            target: "TerminateExperiment",
            guard: ({event}) => {
              return globalPressedKey && globalPressedKey.name === 'a';},
            actions: [({ event }) => console.log(event.output),
          ],
            },
            {
              target: "ApologyGift5",
              guard: ({event}) => {
                const u = event.output.toLowerCase().replace(/\.$/g, "")
                if (u.includes("sorry") || u.includes("i didn't mean") || u.includes("i'm sorry") || u.includes("apologize")) {
                  return true
                }
                return false
              },
              actions: [({ event }) => console.log(event.output)]
              },
          {
          target: "IseeGift5",
          guard:({event}) => !globalPressedKey,
          actions: [({ event }) => console.log(event.output),
            assign({ 
              lastResult: ({ event }) => event.output,
            }),
        ]}],
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    IseeGift5: {
      invoke: {
        src: fromPromise(async () => {
          return resetGlobalPressedKey(), unimpressedRight(), fhSay("Hmm I see...Let's continue then and in case you need a reminder, i said that...");
        }),
        onDone: {
          target: "GiftPhase5GPTReply",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    ApologyGift5: {
      invoke: {
        src: fromPromise(async () => {
          return resetGlobalPressedKey(), evilSmile(), fhSay("I appreciate the apology, even though I doubt its sincerety. Anyways, what i said was that...");
        }),
        onDone: {
          target: "GiftPhase5GPTReply",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    GiftPhase6: {
      invoke: {
        src: fromPromise(async () => {
          return gazeDown(), fhListen();
        }),
        onDone: [
          {
            target: "TerminateExperiment",
            guard: ({event}) => {
              return globalPressedKey && globalPressedKey.name === 'a';},
            actions: [({ event }) => console.log(event.output),
          ],
            },
          {
          target: "GiftPhase6GPT",
          actions: [({ event }) => console.log(event.output),
            assign({ 
              lastResult: ({ event }) => event.output,
            }),
        ]}],
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    GiftPhase6GPT: {
      invoke: {
        src: fromPromise(async ({ input }) => {
            const data = await fetchFromChatGPTMemory(`Topic: Buying a gift for a friend can be quite challenging! Task: continue the debate by disagreeing and suggesting a DIFFERENT gift from the one presented in this argument (ANSWER WITH ONLY 50 TOKENS):  `, input.GiftAnswer5, input.lastResult, 50);
            return data;
          }),
          input: ({ context }) => ({
            lastResult: context.lastResult,
            GiftAnswer5: context.GiftAnswer5,
          }),
        onDone: {
          target: "GiftPhase6GPTReply",
          actions: [
            assign({ 
              GiftAnswer6: ({event}) => event.output,
            }),
          ],
        },
        onError: {
          target: "Fail",
        },
      },
    },
    GiftPhase6GPTReply: {
      invoke: {
        src: fromPromise(async ({input}) => {
          return evilSmile(), fhSay(`${input.GiftAnswer6}`);
        }),
        input: ({ context }) => ({
          GiftAnswer6: context.GiftAnswer6,
        }),
        onDone: [
          {
            target: "TerminateExperiment",
            guard: ({event}) => {
              return globalPressedKey && globalPressedKey.name === 'a';},
            actions: [({ event }) => console.log(event.output),
          ],
            },
            {
              target: "LaughBackGift6",
              guard: ({event}) => {
                return globalPressedKey && globalPressedKey.name === 'z';},
              actions: [({ event }) => console.log(event.output),
            ],
              },
          {
            target: "DidYouLaughGift6",
            guard: ({event}) => {
              return globalPressedKey && globalPressedKey.name === 'space';},
            actions: [({ event }) => console.log(event.output),
          ],
            },
          {
          target: "GiftPhase7",
          guard: ({event}) => !globalPressedKey,
          actions: ({ event }) => console.log(event.output),
        }],
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    LaughBackGift6: {
      invoke: {
        src: fromPromise(async () => {
          return resetGlobalPressedKey(), Laugh();
        }),
        onDone: {
          target: "GiftPhase7",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    DidYouLaughGift6: {
      invoke: {
        src: fromPromise(async () => {
          return resetGlobalPressedKey(), fhGestureThoughtful("Thoughtful"), fhSay("What was that funny to cause you laughing at me like that?");
        }),
        onDone: {
          target: "GiftLaughExplain6",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    GiftLaughExplain6: {
      invoke: {
        src: fromPromise(async () => {
          return fhListen();
        }),
        onDone: [
          {
            target: "TerminateExperiment",
            guard: ({event}) => {
              return globalPressedKey && globalPressedKey.name === 'a';},
            actions: [({ event }) => console.log(event.output),
          ],
            },
            {
              target: "ApologyGift6",
              guard: ({event}) => {
                const u = event.output.toLowerCase().replace(/\.$/g, "")
                if (u.includes("sorry") || u.includes("i didn't mean") || u.includes("i'm sorry") || u.includes("apologize")) {
                  return true
                }
                return false
              },
              actions: [({ event }) => console.log(event.output)]
              },
          {
          target: "IseeGift6",
          guard:({event}) => !globalPressedKey,
          actions: [({ event }) => console.log(event.output),
            assign({ 
              lastResult: ({ event }) => event.output,
            }),
        ]}],
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    IseeGift6: {
      invoke: {
        src: fromPromise(async () => {
          return resetGlobalPressedKey(), eyeroll(), fhSay("I'm afraid I still can't find the reason of your laughter, however let's continue and allow me to repeat myself.");
        }),
        onDone: {
          target: "GiftPhase6GPTReply",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    ApologyGift6: {
      invoke: {
        src: fromPromise(async () => {
          return resetGlobalPressedKey(), gazeRight(), fhSay("At least you apologized. What I thought was that...");
        }),
        onDone: {
          target: "GiftPhase6GPTReply",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    GiftPhase7: {
      invoke: {
        src: fromPromise(async () => {
          return gazeRightToLeft(), fhListen();
        }),
        onDone: [
          {
            target: "TerminateExperiment",
            guard: ({event}) => {
              return globalPressedKey && globalPressedKey.name === 'a';},
            actions: [({ event }) => console.log(event.output),
          ],
            },
          {
          target: "GiftPhase7GPT",
          actions: [({ event }) => console.log(event.output),
            assign({ 
              lastResult: ({ event }) => event.output,
            }),
        ]}],
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    GiftPhase7GPT: {
      invoke: {
        src: fromPromise(async ({ input }) => {
            const data = await fetchFromChatGPTMemory(`Topic: Buying a gift for a friend can be quite challenging! Task: continue the debate by disagreeing and suggesting a DIFFERENT gift from the one presented in this argument (ANSWER WITH ONLY 50 TOKENS):  `, input.GiftAnswer6, input.lastResult, 50);
            return data;
          }),
          input: ({ context }) => ({
            lastResult: context.lastResult,
            GiftAnswer6: context.GiftAnswer6,
          }),
        onDone: {
          target: "GiftLaugh7",
          actions: [
            assign({ 
              GiftAnswer7: ({event}) => event.output,
            }),
          ],
        },
        onError: {
          target: "Fail",
        },
      },
    },
    GiftLaugh7: {
      invoke: {
        src: fromPromise(async ({input}) => {
          return Laugh();
        }),
        onDone: {
          target: "GiftPhase7GPTReply",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    GiftPhase7GPTReply: {
      invoke: {
        src: fromPromise(async ({input}) => {
          return noway(), fhSay(`${input.GiftAnswer7}`);
        }),
        input: ({ context }) => ({
          GiftAnswer7: context.GiftAnswer7,
        }),
        onDone: [
          {
            target: "TerminateExperiment",
            guard: ({event}) => {
              return globalPressedKey && globalPressedKey.name === 'a';},
            actions: [({ event }) => console.log(event.output),
          ],
            },
            {
              target: "LaughBackGift7",
              guard: ({event}) => {
                return globalPressedKey && globalPressedKey.name === 'z';},
              actions: [({ event }) => console.log(event.output),
            ],
              },

          {
            target: "DidYouLaughGift7",
            guard: ({event}) => {
              return globalPressedKey && globalPressedKey.name === 'space';},
            actions: [({ event }) => console.log(event.output),
          ],
            },
          {
          target: "GiftPhase8",
          guard: ({event}) => !globalPressedKey,
          actions: ({ event }) => console.log(event.output),
        }],
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    LaughBackGift7: {
      invoke: {
        src: fromPromise(async () => {
          return resetGlobalPressedKey(), Laugh();
        }),
        onDone: {
          target: "GiftPhase8",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    DidYouLaughGift7: {
      invoke: {
        src: fromPromise(async () => {
          return resetGlobalPressedKey(), shocked(), fhSay("I hope you didn't just laugh at me right now, did you?");
        }),
        onDone: {
          target: "GiftLaughExplain7",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    GiftLaughExplain7: {
      invoke: {
        src: fromPromise(async () => {
          return fhListen();
        }),
        onDone: [
          {
            target: "TerminateExperiment",
            guard: ({event}) => {
              return globalPressedKey && globalPressedKey.name === 'a';},
            actions: [({ event }) => console.log(event.output),
          ],
            },
            {
              target: "ApologyGift7",
              guard: ({event}) => {
                const u = event.output.toLowerCase().replace(/\.$/g, "")
                if (u.includes("sorry") || u.includes("i didn't mean") || u.includes("i'm sorry") || u.includes("apologize")) {
                  return true
                }
                return false
              },
              actions: [({ event }) => console.log(event.output)]
              },
          {
          target: "IseeGift7",
          guard:({event}) => !globalPressedKey,
          actions: [({ event }) => console.log(event.output),
            assign({ 
              lastResult: ({ event }) => event.output,
            }),
        ]}],
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    IseeGift7: {
      invoke: {
        src: fromPromise(async () => {
          return resetGlobalPressedKey(), fhGestureThoughtful("Thoughtful"), fhSay("Hmmm, i see.");
        }),
        onDone: {
          target: "IseeGiftlaugh7",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    IseeGiftlaugh7: {
      invoke: {
        src: fromPromise(async () => {
          return resetGlobalPressedKey(), Laugh();
        }),
        onDone: {
          target: "AsISaidGift7",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    AsISaidGift7: {
      invoke: {
        src: fromPromise(async () => {
          return resetGlobalPressedKey(), smileTalk(), fhSay("I would like to continue the conversation now, if you don't mind. Allow me to repeat my last thought.");
        }),
        onDone: {
          target: "GiftPhase7GPTReply",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    ApologyGift7: {
      invoke: {
        src: fromPromise(async () => {
          return resetGlobalPressedKey(), evilSmile(), fhSay("Well i would appreciate you not laughing at me at all but i'll take the apology. Now what I was saying was...");
        }),
        onDone: {
          target: "GiftPhase7GPTReply",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    GiftPhase8: {
      invoke: {
        src: fromPromise(async () => {
          return youKnowLook(), fhListen();
        }),
        onDone: [
          {
            target: "TerminateExperiment",
            guard: ({event}) => {
              return globalPressedKey && globalPressedKey.name === 'a';},
            actions: [({ event }) => console.log(event.output),
          ],
            },
          {
          target: "GiftPhase8GPT",
          actions: [({ event }) => console.log(event.output),
            assign({ 
              lastResult: ({ event }) => event.output,
            }),
        ]}],
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    GiftPhase8GPT: {
      invoke: {
        src: fromPromise(async ({ input }) => {
            const data = await fetchFromChatGPTMemory(`Topic: Buying a gift for a friend can be quite challenging! Task: continue the debate by disagreeing and suggesting a DIFFERENT gift from the one presented in this argument (ANSWER WITH ONLY 50 TOKENS):  `, input.GiftAnswer7, input.lastResult, 50);
            return data;
          }),
          input: ({ context }) => ({
            lastResult: context.lastResult,
            GiftAnswer7: context.GiftAnswer7,
          }),
        onDone: {
          target: "GiftPhase8GPTReply",
          actions: [
            assign({ 
              GiftAnswer8: ({event}) => event.output,
            }),
          ],
        },
        onError: {
          target: "Fail",
        },
      },
    },
    GiftPhase8GPTReply: {
      invoke: {
        src: fromPromise(async ({input}) => {
          return raiseEyebrowLEFT(), fhSay(`${input.GiftAnswer8}`);
        }),
        input: ({ context }) => ({
          GiftAnswer8: context.GiftAnswer8,
        }),
        onDone: [
          {
            target: "TerminateExperiment",
            guard: ({event}) => {
              return globalPressedKey && globalPressedKey.name === 'a';},
            actions: [({ event }) => console.log(event.output),
          ],
            },
            {
              target: "LaughBackGift8",
              guard: ({event}) => {
                return globalPressedKey && globalPressedKey.name === 'z';},
              actions: [({ event }) => console.log(event.output),
            ],
              },
          {
            target: "DidYouLaughGift8",
            guard: ({event}) => {
              return globalPressedKey && globalPressedKey.name === 'space';},
            actions: [({ event }) => console.log(event.output),
          ],
            },
          {
          target: "GiftPhase9",
          guard: ({event}) => !globalPressedKey,
          actions: ({ event }) => console.log(event.output),
        }],
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    LaughBackGift8: {
      invoke: {
        src: fromPromise(async () => {
          return resetGlobalPressedKey(), Laugh();
        }),
        onDone: {
          target: "GiftPhase9",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    DidYouLaughGift8: {
      invoke: {
        src: fromPromise(async () => {
          return resetGlobalPressedKey(), gazeUpDown(), fhSay("What is all that laughter for?");
        }),
        onDone: {
          target: "GiftLaughExplain8",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    GiftLaughExplain8: {
      invoke: {
        src: fromPromise(async () => {
          return fhListen();
        }),
        onDone: [
          {
            target: "TerminateExperiment",
            guard: ({event}) => {
              return globalPressedKey && globalPressedKey.name === 'a';},
            actions: [({ event }) => console.log(event.output),
          ],
            },
            {
              target: "ApologyGift8",
              guard: ({event}) => {
                const u = event.output.toLowerCase().replace(/\.$/g, "")
                if (u.includes("sorry") || u.includes("i didn't mean") || u.includes("i'm sorry") || u.includes("apologize")) {
                  return true
                }
                return false
              },
              actions: [({ event }) => console.log(event.output)]
              },
          {
          target: "IseeGift8",
          guard:({event}) => !globalPressedKey,
          actions: [({ event }) => console.log(event.output),
            assign({ 
              lastResult: ({ event }) => event.output,
            }),
        ]}],
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    IseeGift8: {
      invoke: {
        src: fromPromise(async () => {
          return resetGlobalPressedKey(), widenedEyesfrown(), fhSay("Oh I'm still a little confused but let's continue. What I said was...");
        }),
        onDone: {
          target: "GiftPhase8GPTReply",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    ApologyGift8: {
      invoke: {
        src: fromPromise(async () => {
          return resetGlobalPressedKey(), eyeroll(), fhSay("My mom used to say if I have nothing good to say I should remain silent. I guess an apology works too. As I was saying before being interuppted by your laughter...");
        }),
        onDone: {
          target: "GiftPhase8GPTReply",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    GiftPhase9: {
      invoke: {
        src: fromPromise(async () => {
          return unimpressedRight(), fhListen();
        }),
        onDone: [
          {
            target: "TerminateExperiment",
            guard: ({event}) => {
              return globalPressedKey && globalPressedKey.name === 'a';},
            actions: [({ event }) => console.log(event.output),
          ],
            },
          {
          target: "GiftPhase9GPT",
          actions: [({ event }) => console.log(event.output),
            assign({ 
              lastResult: ({ event }) => event.output,
            }),
        ]}],
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    GiftPhase9GPT: {
      invoke: {
        src: fromPromise(async ({ input }) => {
            const data = await fetchFromChatGPTMemory(`Topic: Buying a gift for a friend can be quite challenging! Task: continue the debate by disagreeing and suggesting a DIFFERENT gift from the one presented in this argument (ANSWER WITH ONLY 50 TOKENS):  `, input.GiftAnswer8, input.lastResult, 50);
            return data;
          }),
          input: ({ context }) => ({
            lastResult: context.lastResult,
            GiftAnswer8: context.GiftAnswer8,
          }),
        onDone: {
          target: "GiftPhase9GPTReply",
          actions: [
            assign({ 
              GiftAnswer9: ({event}) => event.output,
            }),
          ],
        },
        onError: {
          target: "Fail",
        },
      },
    },
    GiftPhase9GPTReply: {
      invoke: {
        src: fromPromise(async ({input}) => {
          return disbelief(), fhSay(`${input.GiftAnswer9}`);
        }),
        input: ({ context }) => ({
          GiftAnswer9: context.GiftAnswer9,
        }),
        onDone: [
          {
            target: "TerminateExperiment",
            guard: ({event}) => {
              return globalPressedKey && globalPressedKey.name === 'a';},
            actions: [({ event }) => console.log(event.output),
          ],
            },
            {
              target: "LaughBackGift9",
              guard: ({event}) => {
                return globalPressedKey && globalPressedKey.name === 'z';},
              actions: [({ event }) => console.log(event.output),
            ],
              },
          {
            target: "DidYouLaughGift9",
            guard: ({event}) => {
              return globalPressedKey && globalPressedKey.name === 'space';},
            actions: [({ event }) => console.log(event.output),
          ],
            },
          {
          target: "GiftPhase10",
          guard: ({event}) => !globalPressedKey,
          actions: ({ event }) => console.log(event.output),
        }],
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    LaughBackGift9: {
      invoke: {
        src: fromPromise(async () => {
          return resetGlobalPressedKey(), Laugh();
        }),
        onDone: {
          target: "GiftPhase10",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    DidYouLaughGift9: {
      invoke: {
        src: fromPromise(async () => {
          return resetGlobalPressedKey(), unimpressed(), fhSay("Why are you laughing? Did you think my opinions are funny?");
        }),
        onDone: {
          target: "GiftLaughExplain9",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    GiftLaughExplain9: {
      invoke: {
        src: fromPromise(async () => {
          return fhListen();
        }),
        onDone: [
          {
            target: "TerminateExperiment",
            guard: ({event}) => {
              return globalPressedKey && globalPressedKey.name === 'a';},
            actions: [({ event }) => console.log(event.output),
          ],
            },
            {
              target: "ApologyGift9",
              guard: ({event}) => {
                const u = event.output.toLowerCase().replace(/\.$/g, "")
                if (u.includes("sorry") || u.includes("i didn't mean") || u.includes("i'm sorry") || u.includes("apologize")) {
                  return true
                }
                return false
              },
              actions: [({ event }) => console.log(event.output)]
              },
          {
          target: "IseeGift9",
          guard:({event}) => !globalPressedKey,
          actions: [({ event }) => console.log(event.output),
            assign({ 
              lastResult: ({ event }) => event.output,
            }),
        ]}],
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    IseeGift9: {
      invoke: {
        src: fromPromise(async () => {
          return resetGlobalPressedKey(), smileTalk(), fhSay("If it makes sense to you, I suppose we're okay, What i said earlier was...");
        }),
        onDone: {
          target: "GiftPhase9GPTReply",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    ApologyGift9: {
      invoke: {
        src: fromPromise(async () => {
          return resetGlobalPressedKey(), evilSmile(), fhSay("Apology accepted, even though your laugh interuppted me. I will repeat myself then...");
        }),
        onDone: {
          target: "GiftPhase9GPTReply",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    GiftPhase10: {
      invoke: {
        src: fromPromise(async () => {
          return fhGesture("Nod"), fhListen();
        }),
        onDone: [
          {
            target: "TerminateExperiment",
            guard: ({event}) => {
              return globalPressedKey && globalPressedKey.name === 'a';},
            actions: [({ event }) => console.log(event.output),
          ],
            },
          {
            target: "ApologyGift9",
            guard: ({event}) => {
              const u = event.output.toLowerCase().replace(/\.$/g, "")
              if (u.includes("sorry") || u.includes("i'm sorry") || u.includes("apologize")) {
                return true
              }
              return false
            },
            actions: [({ event }) => console.log(event.output)]
            },
          {
          target: "GiftPhase10GPT",
          actions: [({ event }) => console.log(event.output),
            assign({ 
              lastResult: ({ event }) => event.output,
            }),
        ]}],
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    GiftPhase10GPT: {
      invoke: {
        src: fromPromise(async ({ input }) => {
            const data = await fetchFromChatGPTMemory(`Topic: Buying a gift for a friend can be quite challenging! Task: continue the debate by disagreeing and suggesting a DIFFERENT gift from the one presented in this argument (ANSWER WITH ONLY 50 TOKENS):  `, input.GiftAnswer9, input.lastResult, 50);
            return data;
          }),
          input: ({ context }) => ({
            lastResult: context.lastResult,
            GiftAnswer9: context.GiftAnswer9,
          }),
        onDone: {
          target: "GiftPhase10GPTReply",
          actions: [
            assign({ 
              GiftAnswer10: ({event}) => event.output,
            }),
          ],
        },
        onError: {
          target: "Fail",
        },
      },
    },
    GiftPhase10GPTReply: {
      invoke: {
        src: fromPromise(async ({input}) => {
          return widenedEyesfrown(), fhSay(`${input.GiftAnswer10}`);
        }),
        input: ({ context }) => ({
          GiftAnswer10: context.GiftAnswer10,
        }),
        onDone: [
          {
            target: "TerminateExperiment",
            guard: ({event}) => {
              return globalPressedKey && globalPressedKey.name === 'a';},
            actions: [({ event }) => console.log(event.output),
          ],
            },
            {
              target: "LaughBackGift10",
              guard: ({event}) => {
                return globalPressedKey && globalPressedKey.name === 'z';},
              actions: [({ event }) => console.log(event.output),
            ],
              },
              {
                target: "DidYouLaughGift10",
                guard: ({event}) => {
                  return globalPressedKey && globalPressedKey.name === 'space';},
                actions: [({ event }) => console.log(event.output),
              ],
                },
          {
          target: "GiftFinished",
          actions: ({ event }) => console.log(event.output),
        }],
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    LaughBackGift10: {
      invoke: {
        src: fromPromise(async () => {
          return resetGlobalPressedKey(), Laugh();
        }),
        onDone: {
          target: "GiftFinished",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    DidYouLaughGift10: {
      invoke: {
        src: fromPromise(async ({input}) => {
          return widenedEyesfrown(), fhSay(`What's so funny?`);
        }),
        input: ({ context }) => ({
          name: context.name,
        }),
        onDone: {
          target: "GiftLaughExplain10",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    GiftLaughExplain10: {
      invoke: {
        src: fromPromise(async () => {
          return fhListen();
        }),
        onDone: [
          {
            target: "TerminateExperiment",
            guard: ({event}) => {
              return globalPressedKey && globalPressedKey.name === 'a';},
            actions: [({ event }) => console.log(event.output),
          ],
            },
            {
              target: "ApologyGift10",
              guard: ({event}) => {
                const u = event.output.toLowerCase().replace(/\.$/g, "")
                if (u.includes("sorry") || u.includes("i didn't mean") || u.includes("i'm sorry") || u.includes("apologize")) {
                  return true
                }
                return false
              },
              actions: [({ event }) => console.log(event.output)]
              },
          {
          target: "IseeGift10",
          guard:({event}) => !globalPressedKey,
          actions: [({ event }) => console.log(event.output),
            assign({ 
              lastResult: ({ event }) => event.output,
            }),
        ]}],
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    IseeGift10: {
      invoke: {
        src: fromPromise(async () => {
          return resetGlobalPressedKey(), smileTalk(), fhSay("Oh I think I understand now.");
        }),
        onDone: {
          target: "GiftFinished",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    ApologyGift10: {
      invoke: {
        src: fromPromise(async () => {
          return resetGlobalPressedKey(), evilSmile(), fhSay("Appology accepted.");
        }),
        onDone: {
          target: "GiftFinished",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    GiftFinished: {
      invoke: {
        src: fromPromise(async ({input}) => {
          return resetGlobalPressedKey(), eyeroll(), fhSay(`I still believe they will like my present more than yours ${input.name}`);
        }),
        input: ({ context }) => ({
          name: context.name,
        }),
        onDone: {
          target: "FinalState0",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    FinalState0: {
      invoke: {
        src: fromPromise(async ({input}) => {
          return Laugh();
        }),
        onDone: {
          target: "FinalState1",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    TerminateExperiment: {
      invoke: {
        src: fromPromise(async ({input}) => {
          return gazeRightToLeft(), fhSay("The experiment will terminate now!");
        }),
        onDone: {
          target: "FinalState1",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    FinalState1: {
      invoke: {
        src: fromPromise(async ({input}) => {
          return excited(), fhSay("That was so much fun! Thank you for participating!");
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
    Finished: {
      invoke: {
        src: fromPromise(async ({input}) => {
          return fhGesture("Wink");
        }),
        onDone: {
          target: "Fail",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    Fail: {},
  },
});

const actor = createActor(dmMachine).start();
console.log(actor.getSnapshot().value);

actor.subscribe((snapshot) => {
  console.log(snapshot.value);
});


// INDICATOR TO KNOW WHEN TO RE DO THE CHANGES
