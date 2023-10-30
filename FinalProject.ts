import { createMachine, createActor, fromPromise, assign } from "xstate";

const FURHATURI = "192.168.1.236:54321"
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

async function fhLaugh(text: string) {
  const myHeaders = new Headers();
  const encText = encodeURIComponent(text);
  myHeaders.append("accept", "application/json");
  return fetch(
    `http://${FURHATURI}/furhat/say?text=${encText}&blocking=false`,
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
          "time": [0.48, 0.64],
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
          "time": [0.64, 0.80],
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
          "time": [0.80],
          "persist": false,
          "params": {
            "reset": true
          }
        }],
      "class":"furhatos.gestures.Gesture"
    })
  })
}

async function fhGestureWhileTalking(text:string, saying:string) {
  const myHeaders = new Headers();
  myHeaders.append("accept", "application/json");
  const encText = encodeURIComponent(saying);
  return fetch(`http://${FURHATURI}/furhat/gesture?name=${text}&blocking=false`, {
    method: "POST",
    headers: myHeaders,
    body: "",
  }), fetch(
    `http://${FURHATURI}/furhat/say?text=${encText}&blocking=true`,
    {
      method: "POST",
      headers: myHeaders,
      body: "",
    },
  );
}

async function fhGetUser() {
  const myHeaders = new Headers();
  myHeaders.append("accept", "application/json");
  return fetch(`http://${FURHATURI}/furhat/users`, {
    method: "GET",
    headers: myHeaders,
  })
}

async function fhGaze() {
  const myHeaders = new Headers();
  myHeaders.append("accept", "application/json");
  return fetch(`http://${FURHATURI}/furhat/attend?user=RANDOM`, {
    method: "POST",
    headers: myHeaders,
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

//new emotion
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
            "JAW_OPEN": 0.4,
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
            "JAW_OPEN": 0.4,
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


//evil laugh
async function evilLaugh() {
  const myHeaders = new Headers();
  myHeaders.append("accept", "application/json");
  return fetch(`http://${FURHATURI}/furhat/gesture?blocking=false`, {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify({
      "name":"EvilLaughing",
      "frames":[
        {
          "time": [0.32, 0.94],
          "persist": true,
          "params": {
            "BROW_DOWN_LEFT": 1,
            "BROW_DOWN_RIGHT": 1,
            "SMILE_OPEN":0.85,
            "SMILE_CLOSED":0.2,
            "NECK_TILT": -4,
            "EYE_SQUINT_RIGHT": 0.9,
            "EYE_SQUINT_LEFT": 0.9,
            "NOSE_SNEER_LEFT": 0.35,
            "NOSE_SNEER_RIGHT": 0.35,
          }
        },
        {
          "time": [0.94, 1.26],
          "persist": true,
          "params": {
            "BROW_DOWN_LEFT": 1,
            "BROW_DOWN_RIGHT": 1,
            "SMILE_OPEN":0.2,
            "JAW_OPEN": 0.0,
            "EYE_SQUINT_RIGHT": 0.5,
            "EYE_SQUINT_LEFT": 0.5,
            "NOSE_SNEER_LEFT": 0.1,
            "NOSE_SNEER_RIGHT": 0.1,
          }
        },
        {
          "time": [1.26, 1.58],
          "persist": true,
          "params": {
            "BROW_DOWN_LEFT": 1,
            "BROW_DOWN_RIGHT": 1,
            "SMILE_OPEN":0.85,
            "EYE_SQUINT_RIGHT": 0.8,
            "EYE_SQUINT_LEFT": 0.8,
            "NOSE_SNEER_LEFT": 0.35,
            "NOSE_SNEER_RIGHT": 0.35,
          }
        },
        {
          "time": [1.58],
          "persist": true,
          "params": {
            "reset": true
          }
        }],
      "class":"furhatos.gestures.Gesture"
    })
  })
}

//evil smile
async function evilSmile() {
  const myHeaders = new Headers();
  myHeaders.append("accept", "application/json");
  return fetch(`http://${FURHATURI}/furhat/gesture?blocking=false`, {
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

//scream
async function scream() {
  const myHeaders = new Headers();
  myHeaders.append("accept", "application/json");
  return fetch(`http://${FURHATURI}/furhat/gesture?blocking=false`, {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify({
      "name":"EvilLaughing",
      "frames":[
        {
          "time": [0.3, 1.5],
          "persist": true,
          "params": {
            "JAW_OPEN": 0.5,
            "PHONE_AAH": 1,
            "EYE_WIDE_RIGHT": 1,
            "EYE_WIDE_LEFT": 1,
            "BROW_INNER_UP": 1,
            "BROW_UP_LEFT": 1,
            "BROW_UP_RIGHT": 1,
          }
        },
        {
          "time": [1.5],
          "persist": true,
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
      //   {
      //     "time": [1.5, 3.8],
      //     "params":{
      //       audio: "https://bigsoundbank.com/UPLOAD/wav/0283.wav"
      //     }
      //      //Plays audio from the resources folder. File is in resources/sound/Test_audio.wav
      // },
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

//gaze left smile
async function gazeLeftSmile() {
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
            "EYE_LOOK_OUT_LEFT": 0.6,
            "EYE_LOOK_IN_RIGHT": 0.6,
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

//gaze left smile
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

//nod with excitment (wide eyes, arched brows, big smile, nodding)
async function excitedNod() {
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
            "EYE_WIDE_LEFT": 0.7,
            "EYE_WIDE_RIGHT": 0.7,
            "MOUTH_SMILE_LEFT": 1,
            "MOUTH_SMILE_RIGHT": 1,
            "JAW_OPEN": 0.5,
            "BROW_UP_LEFT": 0.7,
            "BROW_UP_RIGHT": 0.7,
            "NECK_TILT": -15,

          }
        },
        {
          "time":[0.70,0.86],
          "persist":true, 
          "params":{
            "EYE_WIDE_LEFT": 0.7,
            "EYE_WIDE_RIGHT": 0.7,
            "MOUTH_SMILE_LEFT": 0.5,
            "MOUTH_SMILE_RIGHT": 0.5,
            "JAW_OPEN": 0.6,
            "BROW_UP_LEFT": 0.7,
            "BROW_UP_RIGHT": 0.7,
            "NECK_TILT": 15,

          }
        },
        {
          "time":[1.16,1.25],
          "persist":true, 
          "params":{
            "EYE_WIDE_LEFT": 0.7,
            "EYE_WIDE_RIGHT": 0.7,
            "MOUTH_SMILE_LEFT": 0.5,
            "MOUTH_SMILE_RIGHT": 0.5,
            "JAW_OPEN": 0.5,
            "BROW_UP_LEFT": 0.7,
            "BROW_UP_RIGHT": 0.7,
            "NECK_TILT": -15,

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

async function gazeDownStop() {
  const myHeaders = new Headers();
  myHeaders.append("accept", "application/json");
  return fetch(`http://${FURHATURI}/furhat/gesture?blocking=true`, {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify({
      "name":"Laughing",
      "frames":[
        {
          "time":[0.32,1.0],
          "persist":true, 
          "params":{
            "EYE_LOOK_DOWN_LEFT": 0.6,
            "EYE_LOOK_DOWN_RIGHT": 0.6,
            "BROW_UP_LEFT": 0.5,
            "BROW_UP_RIGHT": 0.5,
          }
        },
        {
          "time":[2.0],
          "persist":true, 
          "params":{
            "reset":true
            }
        }],
      "class":"furhatos.gestures.Gesture"
    })
  })
} 

//gaze up
async function gazeUp() {
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
            "EYE_LOOK_UP_LEFT": 0.6,
            "EYE_LOOK_UP_RIGHT": 0.6,
            "BROW_UP_LEFT": 0.5,
            "BROW_UP_RIGHT": 0.5,
            "MOUTH_FROWN_LEFT": 0.4,
            "MOUTH_FROWN_RIGHT": 0.4,
            "MOUTH_PUCKER": 0.3,
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

async function gazeUpRight() {
  const myHeaders = new Headers();
  myHeaders.append("accept", "application/json");
  return fetch(`http://${FURHATURI}/furhat/gesture?blocking=false`, {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify({
      "name":"Laughing",
      "frames":[
        {
          "time":[0.32,2.5],
          "persist":true, 
          "params":{
            "EYE_LOOK_UP_LEFT": 0.6,
            "EYE_LOOK_OUT_LEFT": 0.6,
            "EYE_LOOK_IN_RIGHT": 0.6,
            "EYE_LOOK_UP_RIGHT": 0.6,
            "BROW_UP_LEFT": 0.5,
            "BROW_UP_RIGHT": 0.5,
            "MOUTH_FROWN_LEFT": 0.4,
            "MOUTH_FROWN_RIGHT": 0.4,
            "MOUTH_PUCKER": 0.3,
          }
        },
        {
          "time":[3.6],
          "persist":true, 
          "params":{
            "reset":true
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

//gaze back and forth
async function gazeLeftToRight() {
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

//GAZE UP AND DOWN
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
    model: "gpt-3.5-turbo",
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

const dmMachine = createMachine({
  id: "root",
  initial: "Start",
  states: {
    Start: { after: { 1000: "Next" } },
    Next: {
      invoke: {
        id: "fhHello",
        src: fromPromise(async () => {
          return gazeDownStop();
        }),
        onDone: {
          target: "Greet",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    Greet: {
      invoke: {
        src: fromPromise(async () => {
          return smileTalk(), fhSay("Hello and welcome to 'Conversations with Friends!'. In this series we can simulate 2 types of conversations emphasizing on facial expressions. Create a spooky story around a campfire, or meet up with a friend in a cozy cafe.");
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
          return disbelief(), fhSay("But first things first! How shall I call you?");
        }),
        onDone: {
          target: "WaitforUser",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    WaitforUser: {
      invoke: {
        src: fromPromise(async () => {
          return raiseEyebrow();
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
    Nextup: {
      invoke: {
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
          return evilSmile(), fhSay(`So ${input.name}, nice to meet you. What type of conversation would you like to have with me?`);
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
        src: fromPromise(async () => {
          return fhListen();
        }),
        onDone: [
          {
            //nodding = confirmation
          target: "CreateSpookyStory",
          guard: ({event}) => {
            const u = event.output.toLowerCase().replace(/\.$/g, "")
            if (u.includes("stories") || u.includes("story") || u.includes("scary") || u.includes("spooky")|| u.includes("campfire")) {
              return true
            }
            return false
          }, 
          actions: ({ event }) => console.log(event.output),
        },
        {
        target: "CafeMeetUp",
          guard: ({event}) => {
            const u = event.output.toLowerCase().replace(/\.$/g, "")
            if (u.includes("coffee") || u.includes("cafe") || u.includes("café") || u.includes("friend") || u.includes("friends") || u.includes("meet")) {
              return true
            }
            return false
          }, 
          actions: ({ event }) => console.log(event.output),
        },
        {
          target: "noMatchBegining",
            actions: ({ event }) => console.log(event.output),
          },
      ],
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    Fail: {},
    noMatchBegining: {
      invoke: {
        src: fromPromise(async ({input}) => {
          return unimpressed(), fhSay("Hmm! I'm sorry I didn't hear the last part! What did you say?");
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
    CafeMeetUp: {
      invoke: {
        src: fromPromise(async ({input}) => {
          return excited(), fhSay("What a nice choice!") //In this scenario we have met in a cozy cafe on a Friday afternoon.");
        }),
        onDone: {
          target: "ExplainCoffeeScenario",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    ExplainCoffeeScenario: {
      invoke: {
        src: fromPromise(async ({input}) => {
          return gazeUpRight(), fhSay("In this scenario we have met in a cozy cafe on a Friday afternoon.") //In this scenario we have met in a cozy cafe on a Friday afternoon.");
        }),
        onDone: {
          target: "CafeReady",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    CafeReady: {
      invoke: {
        src: fromPromise(async ({input}) => {
          return gazeSmiling(), fhSay("Ready? Go!");
        }),
        onDone: {
          target: "BeginCafe",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    BeginCafe: {
      invoke: {
        src: fromPromise(async () => {
          return fhListen();
        }),
        onDone: [
          {
            //nodding = confirmation
          target: "FurhatDay",
          guard: ({event}) => {
            const u = event.output.toLowerCase().replace(/\.$/g, "")
            if (u.includes("about") || u.includes("how") || u.includes("your") || u.includes("what's up")) {
              return true
            }
            return false
          }, 
          actions: ({ event }) => console.log(event.output),
        },
        {
        target: "MyDayGood",
          guard: ({event}) => {
            const u = event.output.toLowerCase().replace(/\.$/g, "")
            if (u.includes("great") || u.includes("okay") || u.includes("crazy")  || u.includes("good") || u.includes("best") || u.includes("amazing") || u.includes("nice") || u.includes("exciting") || u.includes("wonderful") || u.includes("adventurous")) {
              return true
            }
            return false
          }, 
          actions: ({ event }) => console.log(event.output),
        },
        {
          target: "Dissapoint",
            guard: ({event}) => {
              const u = event.output.toLowerCase().replace(/\.$/g, "")
              if (u.includes("bad") || u.includes("worst") || u.includes("awful") || u.includes("terrible") || u.includes("exhausting") || u.includes("tiring")) {
                return true
              }
              return false
            }, 
            actions: ({ event }) => console.log(event.output),
          },
          {
            target: "MyDayNeutral",
              guard: ({event}) => {
                const u = event.output.toLowerCase().replace(/\.$/g, "")
                if (u.includes("same") || u.includes("boring") || u.includes("nothing") || u.includes("dull") || u.includes("quiet")) {
                  return true
                }
                return false
              }, 
              actions: ({ event }) => console.log(event.output),
            },
        {
          target: "noMatchDayQuestion",
            actions: ({ event }) => console.log(event.output),
          },
      ],
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    noMatchDayQuestion: {
      invoke: {
        src: fromPromise(async ({input}) => {
          return unimpressedRight(), fhSay("Hmm! I'm sorry I didn't hear the last part! What did you say?");
        }),
        onDone: {
          target: "BeginCafe",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    FurhatDay: {
      invoke: {
        src: fromPromise(async ({input}) => {
          return widenedEyes(), fhSay("Me?");
        }),
        onDone: {
          target: "FurhatDayCont",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    FurhatDayCont: {
      invoke: {
        src: fromPromise(async ({input}) => {
          return gazeLeftSmile(), fhGestureWhileTalking("BigSmile","Oh! I could say I had a rather eventful day! Your?");
        }),
        onDone: {
          target: "ListenUser",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    ListenUser: {
      invoke: {
        src: fromPromise(async ({input}) => {
          return raiseEyebrowLEFT();
        }),
        onDone: {
          target: "AskUserDay",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    AskUserDay: {
      invoke: {
        src: fromPromise(async () => {
          return fhListen();
        }),
        onDone: [
        {
        target: "MyDayGood",
          guard: ({event}) => {
            const u = event.output.toLowerCase().replace(/\.$/g, "")
            if (u.includes("great") || u.includes("okay") || u.includes("crazy") || u.includes("good") || u.includes("best") || u.includes("amazing") || u.includes("nice") || u.includes("exciting") || u.includes("wonderful") || u.includes("adventurous")) {
              return true
            }
            return false
          }, 
          actions: ({ event }) => console.log(event.output),
        },
        {
          target: "Dissapoint",
            guard: ({event}) => {
              const u = event.output.toLowerCase().replace(/\.$/g, "")
              if (u.includes("bad") || u.includes("worst") || u.includes("awful") || u.includes("terrible") || u.includes("exhausting") || u.includes("tiring") || u.includes("didn't") || u.includes("wasn't")) {
                return true
              }
              return false
            }, 
            actions: ({ event }) => console.log(event.output),
          },
          {
            target: "MyDayNeutral",
              guard: ({event}) => {
                const u = event.output.toLowerCase().replace(/\.$/g, "")
                if (u.includes("same") || u.includes("boring") || u.includes("nothing") || u.includes("dull") || u.includes("quiet")) {
                  return true
                }
                return false
              }, 
              actions: ({ event }) => console.log(event.output),
            },
            {
              target: "Gossip",
                guard: ({event}) => {
                  const u = event.output.toLowerCase().replace(/\.$/g, "")
                  if (u.includes("your") || u.includes("about") || u.includes("yours")) {
                    return true
                  }
                  return false
                }, 
                actions: ({ event }) => console.log(event.output),
              },
        {
          target: "noMatchUserDay",
            actions: ({ event }) => console.log(event.output),
          },
      ],
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    noMatchUserDay: {
      invoke: {
        src: fromPromise(async ({input}) => {
          return noway(), fhSay("Hmm! I'm sorry I didn't hear the last part! What did you say?");
        }),
        onDone: {
          target: "ListenUser",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    MyDayGood: {
      invoke: {
        src: fromPromise(async ({input}) => {
          return gazeSmiling(), fhSay("Oh! Anything interesting happened?");
        }),
        onDone: {
          target: "Backchannel", //user has the chance to start gossip --> a few more states before we end up at the gossip one. (unless answer is no -> straight to the gossip one)
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    Dissapoint: {
      invoke: {
        src: fromPromise(async ({input}) => {
          return dissapointed();
        }),
        onDone: {
          target: "MyDayBad",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    MyDayBad: {
      invoke: {
        src: fromPromise(async ({input}) => {
          return gazeDown(), fhSay("Oh! I'm so sorry to hear you had a difficult day! Would you like to talk about it?"); //go to gossip state
        }),
        onDone: {
          target: "BackchannelBad",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    MyDayNeutral: {
      invoke: {
        src: fromPromise(async ({input}) => {
          return raiseEyebrow(), fhSay("Hmm! I guess it's nice to have an uneventful day once in a while!");
        }),
        onDone: {
          target: "Sassy",
          actions: [({ event }) => console.log(event.output),
            assign({ 
              thirdAnswer: "uneventful",
              secondAnswer: "boring",
              answer: "dull"
            }),
          ],
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    Sassy: {
      invoke: {
        src: fromPromise(async ({input}) => {
          return fhGestureWhileTalking("Wink", "But I guess that saves us a bit of time. I have so mutch to tell you!");
        }),
        onDone: {
          target: "SassyLaugh",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    SassyLaugh: {
      invoke: {
        src: fromPromise(async ({input}) => {
          return evilLaugh(), fhSay("Heh heh!");
        }),
        onDone: {
          target: "Gossip",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    //had a wonderful day - would you like to talk more about it?
    Backchannel: {
      invoke: {
        src: fromPromise(async ({input}) => {
          return gazeSmiling();
        }),
        onDone: {
          target: "TalkMoreAboutGoodDay",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    }, 
    TalkMoreAboutGoodDay: {
      invoke: {
        src: fromPromise(async () => {
          return fhListen();
        }),
        onDone: [
        {
        target: "YesTalkMore",
          guard: ({event}) => {
            const u = event.output.toLowerCase().replace(/\.$/g, "")
            if (u.includes("yes") || u.includes("uh huh") || u.includes("love") || u.includes("about my") || u.includes("actually") || u.includes("yeah")) {
              return true
            }
            return false
          }, 
          actions: ({ event }) => console.log(event.output),
        },
        {
          target: "NoTalkMore",
            guard: ({event}) => {
              const u = event.output.toLowerCase().replace(/\.$/g, "")
              if (u.includes("no") || u.includes("not") || u.includes("your") || u.includes("about you")) {
                return true
              }
              return false
            }, 
            actions: ({ event }) => console.log(event.output),
          },
        {
          target: "noMatchYesOrNo",
            actions: ({ event }) => console.log(event.output),
          },
      ],
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    noMatchYesOrNo: {
      invoke: {
        src: fromPromise(async ({input}) => {
          return noway(), fhSay("I didn't hear the last part! What did you say?");
        }),
        onDone: {
          target: "Backchannel",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    NoTalkMore: {
      invoke: {
        src: fromPromise(async ({input}) => {
          return gazeLeftSmile(), fhSay("Oh! I see! I'll tell you about mine then!");
        }),
        onDone: {
          target: "Gossip",
          actions: [({ event }) => console.log(event.output),
            assign({ 
              thirdAnswer: "uneventful",
              secondAnswer: "I don't want to talk about it!",
              answer: "No!"
            }),
          ],
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    YesTalkMore: {
      invoke: {
        src: fromPromise(async ({input}) => {
          return fhGestureWhileTalking("Nod", "I'm all ears then!");
        }),
        onDone: {
          target: "BackChannelListen",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    BackChannelListen: {
      invoke: {
        src: fromPromise(async ({input}) => {
          return raiseEyebrowLEFT();
        }),
        onDone: {
          target: "GoodAskChat",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    //extract important info from chatgpt
    GoodAskChat: {
      invoke: {
        src: fromPromise(async () => {
          return fhListen();
        }),
        onDone: {
          target: "GoodExtractInfo",
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
    GoodExtractInfo: {
      invoke: {
        src: fromPromise(async ({ input }) => {
            const data = await fetchFromChatGPT("Extract the important information from the following sentence. " + input.lastResult, 20);
            return data;
          }),
          input: ({ context }) => ({
            lastResult: context.lastResult,
          }),
        onDone: {
          target: "GoodReply",
          actions: [
            assign({ 
              answer: ({event}) => event.output.replace("I","").replace("my","your").replace("The important information is: ","").replace("the important information is: ","").replace("the important information from the sentence is: ","").replace("The important information from the sentence is: ","").replace("important information:","").replace("mportant information: - The speaker ", "").replace("their", "your").replace("mportant information: ","").replace("The important information is ","").replace("the important information is ","").replace("the important information from the sentence is ","").replace("The important information from the sentence is ",""),
            }),
          ],
        },
        onError: {
          target: "Fail",
        },
      },
    },
    GoodReply: {
      invoke: {
        src: fromPromise(async ({input}) => {
          return gazeRightSmile(), fhSay(`Hmm, I see. ${input.answer}, eh?`);
        }),
        input: ({ context }) => ({
          answer: context.answer,
        }),
        onDone: {
          target: "GoodListen",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    GoodListen: {
      invoke: {
        src: fromPromise(async ({input}) => {
          return evilSmile();
        }),
        onDone: {
          target: "GoodNextQuestion",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    //second round:
    GoodNextQuestion: {
      invoke: {
        src: fromPromise(async () => {
          return fhListen();
        }),
        onDone: {
          target: "GoodExtractInfoSecondRound",
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
    GoodExtractInfoSecondRound: {
      invoke: {
        src: fromPromise(async ({ input }) => {
            const data = await fetchFromChatGPT("Extract the important information from the following sentence. " + input.lastResult, 20);
            return data;
          }),
          input: ({ context }) => ({
            lastResult: context.lastResult,
          }),
        onDone: {
          target: "GoodReplySecondRound",
          actions: [
            assign({ 
              secondAnswer: ({event}) => event.output.replace("I","").replace("my","your").replace("the important information is: ","").replace("the important information from the sentence is: ","").replace("The important information is: ","").replace("The important information from the sentence is: ","").replace("important information:","").replace("mportant information: - The speaker ", "").replace("their", "your").replace("mportant information: ","").replace("The important information is ","").replace("the important information is ","").replace("the important information from the sentence is ","").replace("The important information from the sentence is ",""),
            }),
          ],
        },
        onError: {
          target: "Fail",
        },
      },
    },
    GoodReplySecondRound: {
      invoke: {
        src: fromPromise(async ({input}) => {
          return youKnowLook(), fhSay(`Oh! Really? ${input.secondAnswer} sounds interesting. Anything else you would like to share?`);
        }),
        input: ({ context }) => ({
          secondAnswer: context.secondAnswer,
        }),
        onDone: {
          target: "GoodLastBackchannel",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    GoodLastBackchannel: {
      invoke: {
        src: fromPromise(async ({input}) => {
          return gazeLeftToRight();
        }),
        input: ({ context }) => ({
          secondAnswer: context.secondAnswer,
        }),
        onDone: {
          target: "GoodFinalQuestion",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    //third and final round of chatgpt
    GoodFinalQuestion: {
      invoke: {
        src: fromPromise(async () => {
          return fhListen();
        }),
        onDone: [{
          target: "GoodBeginGossip",
          guard: ({event}) => {
            const u = event.output.toLowerCase().replace(/\.$/g, "")
            if (u.includes("no") || u.includes("not") || u.includes("that was it") || u.includes("that was all")) {
              return true
            }
            return false
          },
        },
          {
          target: "GoodExtractInfoThirdRound",
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
    GoodExtractInfoThirdRound: {
      invoke: {
        src: fromPromise(async ({ input }) => {
            const data = await fetchFromChatGPT("Extract the important information from the following sentence. " + input.lastResult, 20);
            return data;
          }),
          input: ({ context }) => ({
            lastResult: context.lastResult,
          }),
        onDone: {
          target: "GoodReplyThirdRound", 
          actions: [
            assign({ 
              thirdAnswer: ({event}) => event.output.replace("I","").replace("my","your").replace("the important information is: ","").replace("the important information from the sentence is: ","").replace("The important information is: ","").replace("The important information from the sentence is: ","").replace("important information:","").replace("mportant information: - The speaker ", "").replace("their", "your").replace("mportant information: ","").replace("The important information is ","").replace("the important information is ","").replace("the important information from the sentence is ","").replace("The important information from the sentence is ",""),
            }),
          ],
        },
        onError: {
          target: "Fail",
        },
      },
    },
    GoodReplyThirdRound: {
      invoke: {
        src: fromPromise(async ({input}) => {
          return excited(), fhSay(`Oh! Wow, ${input.thirdAnswer}?`);
        }),
        input: ({ context }) => ({
          thirdAnswer: context.thirdAnswer,
        }),
        onDone: {
          target: "GoodBeginGossip",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    GoodBeginGossip: {
      invoke: {
        src: fromPromise(async ({input}) => {
          return disbelief(), fhSay(`Well, your day was indeed quite eventful. But let's see if I can top it up! `);
        }),
        onDone: {
          target: "Gossip",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    //talk more about having a bad day
    BackchannelBad: {
      invoke: {
        src: fromPromise(async ({input}) => {
          return shocked();
        }),
        onDone: {
          target: "TalkMoreAboutBadDay",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    TalkMoreAboutBadDay: {
      invoke: {
        src: fromPromise(async () => {
          return fhListen();
        }),
        onDone: [
        {
        target: "YesTalkMoreB",
          guard: ({event}) => {
            const u = event.output.toLowerCase().replace(/\.$/g, "")
            if (u.includes("yes") || u.includes("uh huh") || u.includes("love") || u.includes("about my") || u.includes("yeah")) {
              return true
            }
            return false
          }, 
          actions: ({ event }) => console.log(event.output),
        },
        {
          target: "NoTalkMore",
            guard: ({event}) => {
              const u = event.output.toLowerCase().replace(/\.$/g, "")
              if (u.includes("no") || u.includes("not") || u.includes("your") || u.includes("about you")) {
                return true
              }
              return false
            }, 
            actions: ({ event }) => console.log(event.output),
          },
        {
          target: "noMatchYesNoBad",
            actions: ({ event }) => console.log(event.output),
          },
      ],
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    noMatchYesNoBad: {
      invoke: {
        src: fromPromise(async ({input}) => {
          return noway(), fhSay("I didn't hear the last part! What did you say?");
        }),
        onDone: {
          target: "BackchannelBad",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    YesTalkMoreB: {
      invoke: {
        src: fromPromise(async ({input}) => {
          return fhGestureWhileTalking("Nod", "I'm all ears then!");
        }),
        onDone: {
          target: "BackchannelBadGPT",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    //extract important info from chatgpt
    BackchannelBadGPT: {
      invoke: {
        src: fromPromise(async ({input}) => {
          return gazeDown();
        }),
        onDone: {
          target: "BadAskChat",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    BadAskChat: {
      invoke: {
        src: fromPromise(async () => {
          return fhListen();
        }),
        onDone: {
          target: "BadExtractInfo",
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
    BadExtractInfo: {
      invoke: {
        src: fromPromise(async ({ input }) => {
            const data = await fetchFromChatGPT("Extract the important information from the following sentence. " + input.lastResult, 20);
            return data;
          }),
          input: ({ context }) => ({
            lastResult: context.lastResult,
          }),
        onDone: {
          target: "BackchannelSad",
          actions: [
            assign({ 
              answer: ({event}) => event.output.replace("I","").replace("my","your").replace("the important information is: ","").replace("the important information from the sentence is: ","").replace("The important information is: ","").replace("The important information from the sentence is: ","").replace("important information:","").replace("mportant information: - The speaker ", "").replace("their", "your").replace("mportant information: ","").replace("The important information is ","").replace("the important information is ","").replace("the important information from the sentence is ","").replace("The important information from the sentence is ",""),
            }),
          ],
        },
        onError: {
          target: "Fail",
        },
      },
    },
    BackchannelSad: {
      invoke: {
        src: fromPromise(async ({input}) => {
          return dissapointed();
        }),
        onDone: {
          target: "BadReply",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    BadReply: {
      invoke: {
        src: fromPromise(async ({input}) => {
          return gazeRight(), fhSay(`Hmm, I see. ${input.answer}.`);
        }),
        input: ({ context }) => ({
          answer: context.answer,
        }),
        onDone: {
          target: "BadBackchannel",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    BadBackchannel: {
      invoke: {
        src: fromPromise(async ({input}) => {
          return gazeUp();
        }),
        input: ({ context }) => ({
          answer: context.answer,
        }),
        onDone: {
          target: "BadNextQuestion",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    //second round:
    BadNextQuestion: {
      invoke: {
        src: fromPromise(async () => {
          return fhListen();
        }),
        onDone: {
          target: "BadExtractInfoSecondRound",
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
    BadExtractInfoSecondRound: {
      invoke: {
        src: fromPromise(async ({ input }) => {
            const data = await fetchFromChatGPT("Extract the important information from the following sentence. " + input.lastResult, 20);
            return data;
          }),
          input: ({ context }) => ({
            lastResult: context.lastResult,
          }),
        onDone: {
          target: "BadReplySecondRound",
          actions: [
            assign({ 
              secondAnswer: ({event}) => event.output.replace("I","").replace("my","your").replace("The important information is: ","").replace("The important information from the sentence is: ","").replace("the important information is: ","").replace("the important information from the sentence is: ","").replace("important information:","").replace("mportant information: - The speaker ", "").replace("their", "your").replace("mportant information: ","").replace("The important information is ","").replace("the important information is ","").replace("the important information from the sentence is ","").replace("The important information from the sentence is ",""),
            }),
          ],
        },
        onError: {
          target: "Fail",
        },
      },
    },
    BadReplySecondRound: {
      invoke: {
        src: fromPromise(async ({input}) => {
          return shocked(), fhSay(`Oh! Really? ${input.secondAnswer}.`);
        }),
        input: ({ context }) => ({
          secondAnswer: context.secondAnswer,
        }),
        onDone: {
          target: "Sad",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    Sad: {
      invoke: {
        src: fromPromise(async ({input}) => {
          return fhGestureWhileTalking("ExpressSad","I'm so sorry to hear that! Is there anything else you would like to share?");
        }),
        onDone: {
          target: "LastBadChannel",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    LastBadChannel: {
      invoke: {
        src: fromPromise(async ({input}) => {
          return unimpressedRight();
        }),
        onDone: {
          target: "BadFinalQuestion",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    //third and final round of chatgpt
    BadFinalQuestion: {
      invoke: {
        src: fromPromise(async () => {
          return fhListen();
        }),
        onDone: [{
            target: "BadGossipBegin",
            guard: ({event}) => {
              const u = event.output.toLowerCase().replace(/\.$/g, "")
              if (u.includes("no") || u.includes("not") || u.includes("that was it") || u.includes("that was all")) {
                return true
              }
              return false
            },
          },
        {
          target: "BadExtractInfoThirdRound",
          actions: [({ event }) => console.log(event.output),
            assign({ 
              lastResult: ({ event }) => event.output,
            }),
        ]}
        ],
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    BadExtractInfoThirdRound: {
      invoke: {
        src: fromPromise(async ({ input }) => {
            const data = await fetchFromChatGPT("Extract the important information from the following sentence. " + input.lastResult, 20);
            return data;
          }),
          input: ({ context }) => ({
            lastResult: context.lastResult,
          }),
        onDone: 
        {
          target: "BadReplyThirdRound", 
          actions: [
            assign({ 
              thirdAnswer: ({event}) => event.output.replace("I","").replace("my","your").replace("The important information is: ","").replace("The important information from the sentence is: ","").replace("the important information is: ","").replace("the important information from the sentence is: ","").replace("important information:","").replace("mportant information: - The speaker ", "").replace("their", "your").replace("mportant information: ","").replace("The important information is ","").replace("the important information is ","").replace("the important information from the sentence is ","").replace("The important information from the sentence is ",""),
            }),
          ],
        },
        onError: {
          target: "Fail",
        },
      },
    },
    BadReplyThirdRound: {
      invoke: {
        src: fromPromise(async ({input}) => {
          return shocked(), fhSay(`Oh! ${input.thirdAnswer}?`);
        }),
        input: ({ context }) => ({
          thirdAnswer: context.thirdAnswer,
        }),
        onDone: {
          target: "BadGossipBegin",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    BadGossipBegin: {
      invoke: {
        src: fromPromise(async ({input}) => {
          return gazeLeftToRight(), fhSay(`I'm really sorry to hear your day wasn't the best today! But let me brighten it up with some good news!`);
        }),
        onDone: {
          target: "Gossip",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    //gossip states
    Gossip: {
      invoke: {
        src: fromPromise(async ({input}) => {
          return excited(), fhSay("So, do you remember Alice?");
        }),
        onDone: {
          target: "ListenIntrigued",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    ListenIntrigued: {
      invoke: {
        src: fromPromise(async ({input}) => {
          return raiseEyebrowLEFT();
        }),
        onDone: {
          target: "GossipState2",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    GossipState2: {
      invoke: {
        src: fromPromise(async () => {
          return fhListen();
        }),
        onDone: [{
          target: "WeKnowAlice",
          guard: ({event}) => {
              const u = event.output.toLowerCase().replace(/\.$/g, "")
              if (u.includes("no") || u.includes("not") || u.includes("don't")) {
                return true
              }
              return false
            },
          actions: ({ event }) => console.log(event.output),
        },
        {
          target: "GossipState3",
          actions: ({ event }) => console.log(event.output),
        },
      ],
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    GossipState3: {
      invoke: {
        src: fromPromise(async ({input}) => {
          return excitedNod(), fhSay("Exactly!");
        }),
        onDone: {
          target: "GossipChannel",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    WeKnowAlice: {
      invoke: {
        src: fromPromise(async ({input}) => {
          return eyeroll(), fhSay("We went to school together and she was in our football team! Anyways!");
        }),
        onDone: {
          target: "GossipState5",
          actions: [({ event }) => console.log(event.output),
            assign({ 
              question: ({ event }) => "So",
            }),
        ]
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    GossipChannel: {
        invoke: {
          src: fromPromise(async ({input}) => {
            return gazeRightToLeft();
          }),
          onDone: {
            target: "GossipState4",
            actions: [({ event }) => console.log(event.output),
          ]
          },
          onError: {
            target: "Fail",
            actions: ({ event }) => console.error(event),
          },
        },
      },
    GossipState4: {
      invoke: {
        src: fromPromise(async () => {
          return fhListen();
        }),
        onDone: [{
          target: "GossipState5",
          actions: [({ event }) => console.log(event.output),
            assign({ 
              question: ({ event }) => event.output,
            }),
        ]
        },
      ],
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    GossipState5: {
      invoke: {
        src: fromPromise(async ({input}) => {
          return youKnowLook(), fhSay(`${input.question}? I heard she is starting her own company!`);
        }),
        input: ({ context }) => ({
          question: context.question,
        }),
        onDone: {
          target: "GossipChannel2",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    GossipChannel2: {
      invoke: {
        src: fromPromise(async ({input}) => {
          return raiseEyebrowLEFT();
        }),
        onDone: {
          target: "GossipState6",
          actions: [({ event }) => console.log(event.output),
        ]
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    GossipState6: {
      invoke: {
        src: fromPromise(async () => {
          return fhListen();
        }),
        onDone: [{
          target: "GossipState7",
          guard: ({event}) => {
            const u = event.output.toLowerCase().replace(/\.$/g, "")
            if (u.includes("amazing") || u.includes("fantastic") || u.includes("wonderful") || u.includes("so")) {
              return true
            }
            return false
          },
          actions: [({ event }) => console.log(event.output),
        ]
        },
        {
          target: "GossipState8",
          actions: [({ event }) => console.log(event.output)],
        }
      ],
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    GossipState7: {
      invoke: {
        src: fromPromise(async ({input}) => {
          return excited(), fhSay("I know right! I'm so happy for her!");
        }),
        onDone: {
          target: "IsThatAll",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    GossipState8: {
      invoke: {
        src: fromPromise(async ({input}) => {
          return eyeroll(), fhSay(`Oh ${input.name}. You don't have to be so salty about it!`);
        }),
        input: ({ context }) => ({
          name: context.name,
          // userId: context.userId,
        }),
        onDone: {
          target: "saltyChannel",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    saltyChannel: {
      invoke: {
        src: fromPromise(async ({input}) => {
          return unimpressedRight();
        }),
        input: ({ context }) => ({
          name: context.name,
          // userId: context.userId,
        }),
        onDone: {
          target: "Salty",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    Salty: {
      invoke: {
        src: fromPromise(async () => {
          return fhListen();
        }),
        onDone: {
          target: "Irony",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    Irony: {
      invoke: {
        src: fromPromise(async ({input}) => {
          return evilLaugh(), fhSay("Yeah, yeah! Of course!");
        }),
        onDone: {
          target: "raiseChannel",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    raiseChannel: {
      invoke: {
        src: fromPromise(async ({input}) => {
          return gazeDownUp();
        }),
        onDone: {
          target: "EyeBrowRaise",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
      EyeBrowRaise: {
      invoke: {
        src: fromPromise(async ({input}) => {
          return gazeLeft();
        }),
        onDone: {
          target: "IsThatAll",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    IsThatAll: {
      invoke: {
        src: fromPromise(async () => {
          return fhListen();
        }),
        onDone: {
          target: "ThatIsAll",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    ThatIsAll: {
      invoke: {
        src: fromPromise(async ({input}) => {
          return fhGestureWhileTalking("Nod", "That's all!");
        }),
        onDone: {
          target: "EyeBrowRaise1",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    EyeBrowRaise1: {
      invoke: {
        src: fromPromise(async ({input}) => {
          return gazeRightToLeft();
        }),
        onDone: {
          target: "Seriously",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    Seriously: {
      invoke: {
        src: fromPromise(async () => {
          return fhListen();
        }),
        onDone: [
        {
          target: "GuiltyLook",
          guard: ({event}) => {
            const u = event.output.toLowerCase().replace(/\.$/g, "")
            if (u.includes("sure") || u.includes("more")) {
              return true
            }
            return false
          },
          actions: [({ event }) => console.log(event.output),
        ]
        },
        {
          target: "Sorry",
          actions: ({ event }) => console.log(event.output),
        }],
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    Sorry: {
      invoke: {
        src: fromPromise(async ({input}) => {
          return eyeroll(), fhSay(`I'm sorry I didn't have any stories like: ${input.answer}, or, ${input.secondAnswer}`);
        }),
        input: ({ context }) => ({
          answer: context.answer,
          secondAnswer: context.secondAnswer,
        }),
        onDone: {
          target: "sorryChannel",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    sorryChannel:{
      invoke: {
        src: fromPromise(async ({input}) => {
          return unimpressed();
        }),
        input: ({ context }) => ({
          answer: context.answer,
          secondAnswer: context.secondAnswer,
        }),
        onDone: {
          target: "Apology",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    Apology: {
      invoke: {
        src: fromPromise(async () => {
          return fhListen();
        }),
        onDone: [{
          target: "AcceptApology",
          guard: ({event}) => {
            const u = event.output.toLowerCase().replace(/\.$/g, "")
            if (u.includes("sorry")) {
              return true
            }
            return false
          },
          actions: ({ event }) => console.log(event.output),
        },
        {
          target: "WaitForApology",
          actions: ({ event }) => console.log(event.output),
        },
      ],
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    WaitForApology: {
      invoke: {
        src: fromPromise(async ({input}) => {
          return unimpressedRight();
        }),
        onDone: {
          target: "sorryChannel",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    AcceptApology: {
      invoke: {
        src: fromPromise(async ({input}) => {
          return gazeSmiling(), fhGestureWhileTalking("BigSmile","Alright! Fine!");
        }),
        onDone: {
          target: "Leaving",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    //guilty look --> needs guilty facial expression
    GuiltyLook: {
      invoke: {
        src: fromPromise(async ({input}) => {
          return youKnowLook();
        }),
        onDone: {
          target: "Denial",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    Denial: {
      invoke: {
        src: fromPromise(async ({input}) => {
          return gazeDown(), fhSay("I don't understand what you mean!");
        }),
        onDone: {
          target: "Book",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    Book: {
      invoke: {
        src: fromPromise(async () => {
          return fhListen();
        }),
        onDone: [
        {
          target: "AvoidGaze",
          actions: ({ event }) => console.log(event.output),
        },
      ],
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    AvoidGaze: {
      invoke: {
        src: fromPromise(async ({input}) => {
          return youKnowLook();
        }),
        onDone: {
          target: "Excuse",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    Excuse: {
      invoke: {
        src: fromPromise(async ({input}) => {
          return fhGestureWhileTalking("ExpressFear","Okay! I bought a new book! But I'll read it I promise!");
        }),
        onDone: {
          target: "AvoidGaze1",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    AvoidGaze1: {
      invoke: {
        src: fromPromise(async ({input}) => {
          return youKnowLook();
        }),
        onDone: {
          target: "IfYouPromise",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    IfYouPromise: {
      invoke: {
        src: fromPromise(async () => {
          return fhListen();
        }),
        onDone: [{
          target: "YesPromise",
          actions: ({ event }) => console.log(event.output),
        }],
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    YesPromise: {
      invoke: {
        src: fromPromise(async ({input}) => {
          return excitedNod(), fhSay("I promise!");
        }),
        onDone: {
          target: "Leaving",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    Leaving: {
      invoke: {
        src: fromPromise(async ({input}) => {
          return disbelief(), fhSay("Anyway! Should we get going?");
        }),
        onDone: {
          target: "ConfirmLeave",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    ConfirmLeave: {
      invoke: {
        src: fromPromise(async () => {
          return fhListen();
        }),
        onDone: [{
          target: "Ending",
          guard: ({event}) => {
            const u = event.output.toLowerCase().replace(/\.$/g, "")
            if (u.includes("yeah") || u.includes("yes") || u.includes("good") || u.includes("uh huh") || u.includes("alright") || u.includes("fine")) {
              return true
            }
            return false
          },
          actions: ({ event }) => console.log(event.output),
        },
        //secret music state
        {
          target: "MusicAct",
          guard: ({event}) => {
            const u = event.output.toLowerCase().replace(/\.$/g, "")
            if (u.includes("help") || u.includes("need")) {
              return true
            }
            return false
          },
          actions: ({ event }) => console.log(event.output),
        },
        {
          target: "Rhetorical",
          guard: ({event}) => {
            const u = event.output.toLowerCase().replace(/\.$/g, "")
            if (u.includes("no") || u.includes("wait") || u.includes("yet") || u.includes("not")) {
              return true
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
    Rhetorical: {
      invoke: {
        src: fromPromise(async ({input}) => {
          return widenedEyesfrown(), fhSay(`It was a rhetorical question ${input.name}! We both have things to do!`);
        }),
        input: ({ context }) => ({
          name: context.name,
        }),
        onDone: {
          target: "ConfirmLeave",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    Ending: {
      invoke: {
        src: fromPromise(async ({input}) => {
          return excited(), fhSay("It was so nice seeing you again!");
        }),
        onDone: {
          target: "LeavingCafe",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    //secret music state here
    MusicAct: {
      invoke: {
        src: fromPromise(async ({input}) => {
          return raiseEyebrow(), fhSay("Go on!");
        }),
        onDone: {
          target: "DisBelief",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    DisBelief: {
      invoke: {
        src: fromPromise(async ({input}) => {
          return disbelief();
        }),
        onDone: {
          target: "UserRequestPlay",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    UserRequestPlay: {
      invoke: {
        src: fromPromise(async ({input}) => {
          return fhListen();
        }),
        onDone: [{
          target: "PrepareSong",
          guard: ({event}) => {
            const u = event.output.toLowerCase().replace(/\.$/g, "")
            if (u.includes("music") || u.includes("musical") || u.includes("play") || u.includes("theatre") || u.includes("theater") || u.includes("song")) {
              return true
            }
            return false
          },
          actions: ({ event }) => console.log(event.output),
        },
        {
        target: "nomatchSing",
          actions: ({ event }) => console.log(event.output),
        }
      ],
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    nomatchSing: {
      invoke: {
        src: fromPromise(async ({input}) => {
          return unimpressedRight(), fhSay("You said you needed my help! No?");
        }),
        onDone: {
          target: "UserRequestPlay",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    PrepareSong: {
      invoke: {
        src: fromPromise(async ({input}) => {
          return evilSmile(), fhSay("A play uh? Well I'm all ears!");
        }),
        onDone: {
          target: "PrepareSongChannel",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    PrepareSongChannel: {
      invoke: {
        src: fromPromise(async ({input}) => {
          return evilSmile();
        }),
        onDone: {
          target: "GiveSong",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    GiveSong: {
      invoke: {
        src: fromPromise(async ({input}) => {
          return fhListen();
        }),
        onDone: {
          target: "GetSongConcept",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    GetSongConcept: {
      invoke: {
        src: fromPromise(async ({input}) => {
          return gazeUpRight(), fhSay("Uh huh! I see. Okay I got it!");
        }),
        onDone: {
          target: "gazeThink",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    gazeThink: {
      invoke: {
        src: fromPromise(async ({input}) => {
          return gazeLeftToRight();
        }),
        onDone: {
          target: "UserSings",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    UserSings: {
      invoke: {
        src: fromPromise(async ({input}) => {
          return fhListen();
        }),
        onDone: {
          target: "RobotSing",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    RobotSing: {
      invoke: {
        src: fromPromise(async ({input}) => {
          return raiseEyebrow(), fhSay("Nice to meet you, where you been?"); //song lyrics here
        }),
        onDone: {
          target: "Lyrics",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    Lyrics: {
      invoke: {
        src: fromPromise(async ({input}) => {
          return evilSmile(), fhSay("I could show you incredible things!"); //song lyrics here
        }),
        onDone: {
          target: "Lyrics1",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    Lyrics1: {
      invoke: {
        src: fromPromise(async ({input}) => {
          return fhGestureWhileTalking("Wink","Magic, madness, heaven, sin"); //song lyrics here
        }),
        onDone: {
          target: "UserObjection",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    InterruptChannel: {
      invoke: {
        src: fromPromise(async ({input}) => {
          return gazeSmiling() //song lyrics here
        }),
        onDone: {
          target: "UserObjection",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    UserObjection: {
      invoke: {
        src: fromPromise(async ({input}) => {
          return fhListen();
        }),
        onDone: [{
          target: "IronicReply",
          guard: ({event}) => {
            const u = event.output.toLowerCase().replace(/\.$/g, "")
            if (u.includes("Taylor Swift") || u.includes("taylor") || u.includes("Taylor")) {
              return true
            }
            return false
          },
          actions: ({ event }) => console.log(event.output),
        },
        {
          target: "Ihadto",
          actions: ({ event }) => console.log(event.output),
        }
      ],
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    IronicReply: {
      invoke: {
        src: fromPromise(async ({input}) => {
          return backchannel(), fhSay("Oh! I see you have some taste after all!"); //song lyrics here
        }),
        onDone: {
          target: "Laughing",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    Ihadto: {
      invoke: {
        src: fromPromise(async ({input}) => {
          return evilLaugh(), fhSay("I'm sorry I had to do that!"); //song lyrics here
        }),
        onDone: {
          target: "Laughing",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    Laughing: {
      invoke: {
        src: fromPromise(async ({input}) => {
          return fhLaugh("Huh huh!"); //song lyrics here
        }),
        onDone: {
          target: "RealEndingThisTime",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    RealEndingThisTime: {
      invoke: {
        src: fromPromise(async ({input}) => {
          return gazeDownUp(), fhSay("Alright! We really should get going this time!"); //song lyrics here
        }),
        onDone: {
          target: "FinishTheDialogue",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    FinishTheDialogue: {
      invoke: {
        src: fromPromise(async () => {
          return fhListen();
        }),
        onDone: [{
          target: "Ending",
          guard: ({event}) => {
            const u = event.output.toLowerCase().replace(/\.$/g, "")
            if (u.includes("yeah") || u.includes("yes") || u.includes("good") || u.includes("uh huh") || u.includes("alright") || u.includes("fine")) {
              return true
            }
            return false
          },
          actions: ({ event }) => console.log(event.output),
        },
        {
          target: "Rhetorical",
          guard: ({event}) => {
            const u = event.output.toLowerCase().replace(/\.$/g, "")
            if (u.includes("no") || u.includes("wait") || u.includes("yet") || u.includes("not")) {
              return true
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
    LeavingCafe: {
      invoke: {
        src: fromPromise(async () => {
          return fhListen();
        }),
        onDone: [{
          target: "FinishedCafe",
          actions: ({ event }) => console.log(event.output),
        },
      ],
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    FinishedCafe: {
      invoke: {
        src: fromPromise(async ({input}) => {
          return smileTalk(), fhSay("Bye! See you soon!");
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
    //create a scary story prompt here.
    //
    //
    //
    //
    CreateSpookyStory: {
      invoke: {
        src: fromPromise(async ({input}) => {
          return backchannel(), fhSay("Oh! Nothing better than creating a spooky story with friends a few days before Halloween!");
        }),
       onDone: {
          target: "GetConcept",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    //creepy story prompt here
    GetConcept: {
      invoke: {
        src: fromPromise(async ({input}) => {
          return gazeUpRight(), fhSay("In this scenario, we're gathered around a campfire, roasting marshmallows. You can start by saying the first sentence of a story and we'll continue it together!");
        }),
        onDone: {
          target: "BeginStory",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    //chatgpt prompts
    BeginStory: {
      invoke: {
        src: fromPromise(async ({input}) => {
          return evilSmile(), fhSay("Ready to start? Go!");
        }),
        onDone: {
          target: "ListenStory",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    ListenStory: {
      invoke: {
        src: fromPromise(async ({input}) => {
          return gazeRightSmile();
        }),
        onDone: {
          target: "StoryRobot",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    StoryRobot: {
      invoke: {
        src: fromPromise(async () => {
          return fhListen();
        }),
        onDone: {
          target: "ThinkStory",
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
    ThinkStory: {
      invoke: {
        src: fromPromise(async ({ input }) => {
            const data = await fetchFromChatGPT("give a short sentence to continue the story from: " + input.lastResult, 20);
            return data;
          }),
          input: ({ context }) => ({
            lastResult: context.lastResult,
          }),
        onDone: {
          target: "ContinueStory",
          actions: [
            assign({ 
              story: ({event}) => event.output,
            }),
          ],
        },
        onError: {
          target: "Fail",
        },
      },
    },
    ContinueStory: {
      invoke: {
        src: fromPromise(async ({input}) => {
          return disbelief(), fhSay(input.story);
        }),
        input: ({ context }) => ({
          story: context.story,
        }),
        onDone: {
          target: "ListenChannel",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    ListenChannel: {
      invoke: {
        src: fromPromise(async ({input}) => {
          return evilSmile();
        }),
        onDone: {
          target: "UserStory",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    UserStory: {
      invoke: {
        src: fromPromise(async () => {
          return fhListen();
        }),
        onDone: {
          target: "AddToStory",
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
    AddToStory: {
      invoke: {
        src: fromPromise(async ({ input }) => {
            const data = await fetchFromChatGPT("give a short sentence to continue the story from: " + input.lastResult, 20);
            return data;
          }),
          input: ({ context }) => ({
            lastResult: context.lastResult,
          }),
        onDone: {
          target: "ReallyNow",
          actions: [
            assign({ 
              storyAddition: ({event}) => event.output,
            }),
          ],
        },
        onError: {
          target: "Fail",
        },
      },
    },
    ReallyNow: {
      invoke: {
        src: fromPromise(async ({input}) => {
          return scream();
        }),
        input: ({ context }) => ({
          name: context.name,
        }),
        onDone: {
          target: "Think",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    Think: {
      invoke: {
        src: fromPromise(async ({input}) => {
          return raiseEyebrowLEFT(), fhSay("Hmm!");
        }),
        onDone: {
          target: "AlrightStory",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    AlrightStory: {
      invoke: {
        src: fromPromise(async ({input}) => {
          return shocked(), fhSay(input.storyAddition);
        }),
        input: ({ context }) => ({
          storyAddition: context.storyAddition,
        }),
        onDone: {
          target: "ListenChannel1",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    ListenChannel1: {
      invoke: {
        src: fromPromise(async ({input}) => {
          return gazeUpDown();
        }),
        onDone: {
          target: "UserStory2",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    UserStory2: {
      invoke: {
        src: fromPromise(async () => {
          return fhListen();
        }),
        onDone: {
          target: "AddToStory2",
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
    AddToStory2: {
      invoke: {
        src: fromPromise(async ({ input }) => {
            const data = await fetchFromChatGPT("give a short sentence to continue the story from: " + input.lastResult, 20);
            return data;
          }),
          input: ({ context }) => ({
            lastResult: context.lastResult,
          }),
        onDone: {
          target: "AlrightStory2",
          actions: [
            assign({ 
              storyAdditionSec: ({event}) => event.output,
            }),
          ],
        },
        onError: {
          target: "Fail",
        },
      },
    },
    AlrightStory2: {
      invoke: {
        src: fromPromise(async ({input}) => {
          return fhGestureWhileTalking("ExpressFear",input.storyAdditionSec);
        }),
        input: ({ context }) => ({
          storyAdditionSec: context.storyAdditionSec,
        }),
        onDone: {
          target: "ListenChannel2",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    ListenChannel2: {
      invoke: {
        src: fromPromise(async ({input}) => {
          return disbelief();
        }),
        onDone: {
          target: "UserStory3",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    UserStory3: {
      invoke: {
        src: fromPromise(async () => {
          return fhListen();
        }),
        onDone: {
          target: "AddToStory3",
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
    AddToStory3: {
      invoke: {
        src: fromPromise(async ({ input }) => {
            const data = await fetchFromChatGPT("give a short sentence to continue the story from: " + input.lastResult, 20);
            return data;
          }),
          input: ({ context }) => ({
            lastResult: context.lastResult,
          }),
        onDone: {
          target: "Irritated",
          actions: [
            assign({ 
              storyAdditionThird: ({event}) => event.output,
            }),
          ],
        },
        onError: {
          target: "Fail",
        },
      },
    },
    Irritated: {
      invoke: {
        src: fromPromise(async ({input}) => {
          return eyeroll();
        }),
        onDone: {
          target: "Think2",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    Think2: {
      invoke: {
        src: fromPromise(async ({input}) => {
          return raiseEyebrowLEFT(), fhSay("Hmm!");
        }),
        onDone: {
          target: "AlrightStory3",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    AlrightStory3: {
      invoke: {
        src: fromPromise(async ({input}) => {
          return unimpressedRight(), fhSay(input.storyAdditionThird);
        }),
        input: ({ context }) => ({
          storyAdditionThird: context.storyAdditionThird,
        }),
        onDone: {
          target: "LastOne",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    LastOne: {
      invoke: {
        src: fromPromise(async ({input}) => {
          return evilSmile(), fhSay("Okay! This is your last one!");
        }),
        onDone: {
          target: "RobotLaugh",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    RobotLaugh: {
      invoke: {
        src: fromPromise(async ({input}) => {
          return evilLaugh(), fhSay("Heh heh!");
        }),
        onDone: {
          target: "ListenChannel3",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    ListenChannel3: {
      invoke: {
        src: fromPromise(async ({input}) => {
          return gazeRightSmile();
        }),
        onDone: {
          target: "UserStoryFinal",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    UserStoryFinal: {
      invoke: {
        src: fromPromise(async () => {
          return fhListen();
        }),
        onDone: {
          target: "AddToStoryFinal",
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
    AddToStoryFinal: {
      invoke: {
        src: fromPromise(async ({ input }) => {
            const data = await fetchFromChatGPT("give a short sentence to end the story: " + input.lastResult, 20);
            return data;
          }),
          input: ({ context }) => ({
            lastResult: context.lastResult,
          }),
        onDone: {
          target: "StoryEnding",
          actions: [
            assign({ 
              theEnd: ({event}) => event.output,
            }),
          ],
        },
        onError: {
          target: "Fail",
        },
      },
    },
    StoryEnding: {
      invoke: {
        src: fromPromise(async ({input}) => {
          return gazeSmiling(), fhSay(input.theEnd);
        }),
        input: ({ context }) => ({
          theEnd: context.theEnd,
        }),
        onDone: {
          target: "Commentary",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    Commentary: {
      invoke: {
        src: fromPromise(async ({input}) => {
          return fhLaugh("Huh huh! That was fun!");
        }),
        onDone: {
          target: "NextTimeStory",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    NextTimeStory: {
      invoke: {
        src: fromPromise(async ({input}) => {
          return disbelief(), fhSay(`Hope we get a better story next time!`);
        }),
        onDone: {
          target: "StoryOver",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    StoryOver: {
      invoke: {
        src: fromPromise(async ({input}) => {
          return gazeDownUp(), fhSay(`Bye ${input.name}`); //song lyrics here
        }),
        input: ({ context }) => ({
          name: context.name,
        }),
        onDone: {
          target: "SmileOver",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    SmileOver: {
      invoke: {
        src: fromPromise(async ({input}) => {
          return gazeSmiling(); //song lyrics here
        }),
        onDone: {
          target: "FinishTheStory",
          actions: ({ event }) => console.log(event.output),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    FinishTheStory: {
      invoke: {
        src: fromPromise(async () => {
          return fhListen();
        }),
        onDone: [{
          target: "FinishedStory",
          actions: ({ event }) => console.log(event.output),
        },
      ],
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },
    FinishedStory: {
      invoke: {
        src: fromPromise(async ({input}) => {
          return smileTalk(), fhSay("Bye! See you soon!");
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
    Finished: {}
  },
});

const actor = createActor(dmMachine).start();
console.log(actor.getSnapshot().value);

actor.subscribe((snapshot) => {
  console.log(snapshot.value);
});
