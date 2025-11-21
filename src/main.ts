import { setup, createActor, fromPromise, assign } from "xstate";

const FURHATURI = "127.0.0.1:54321";
const OLLAMA_API_URL = "http://localhost:11434/api/chat";

interface DMContext {
  lastResult: string;
  extractedGesture: string;
  messages: Message[];
  isFirstMessage: boolean;
}

type Message = { role: "assistant" | "user" | "system"; content: string };

// ---------- OLLAMA CHAT COMPLETION ----------

async function fetchChatCompletion(messages: Message[]): Promise<string> {
  console.log("Calling Ollama with messages:", messages);

  try {
    const response = await fetch(OLLAMA_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llava:13b",
        messages: messages,
        stream: false,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Ollama API error:", response.status, errorText);
      throw new Error(`Ollama API error: ${response.status}`);
    }

    const data = await response.json();
    console.log("Ollama response:", data);

    const assistantMessage = data.message.content;
    return assistantMessage;
  } catch (error) {
    console.error("Error calling Ollama:", error);
    return "Error while connecting to the language model. Probably ssh tunnel is not active.";
  }
}

// ---------- FURHAT HELPERS ----------

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

async function fhSay(text: string, isFirstMessage: boolean = false) {
  const myHeaders = new Headers();
  myHeaders.append("accept", "application/json");
  const encText = encodeURIComponent(text);

  return fetch(`http://${FURHATURI}/furhat/say?text=${encText}&blocking=true`, {
    method: "POST",
    headers: myHeaders,
    body: "",
  });
}

// ---------- GESTURE FUNCTIONS ----------

async function angryGesture() {
  const myHeaders = new Headers();
  myHeaders.append("accept", "application/json");
  return fetch(`http://${FURHATURI}/furhat/gesture?blocking=false`, {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify({
      name: "angryGesture",
      frames: [
        {
          time: [0.3],
          persist: true,
          params: {
            BROW_UP_RIGHT: -5.0,
            BROW_UP_LEFT: -5.0,
            LOOK_UP_LEFT: 4.0,
            LOOK_UP_RIGHT: 5.0,
          },
        },
        {
          time: [1.5],
          persist: true,
          params: {
            NECK_TILT: -5.0,
            NECK_PAN: 5.0,
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
}

async function seriousGesture() {
  const myHeaders = new Headers();
  myHeaders.append("accept", "application/json");
  return fetch(`http://${FURHATURI}/furhat/gesture?blocking=false`, {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify({
      name: "seriousGesture",
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
}

async function kiddingGesture() {
  const myHeaders = new Headers();
  myHeaders.append("accept", "application/json");
  return fetch(`http://${FURHATURI}/furhat/gesture?blocking=false`, {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify({
      name: "kiddingGesture",
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
}

async function thinkingGesture() {
  const myHeaders = new Headers();
  myHeaders.append("accept", "application/json");
  return fetch(`http://${FURHATURI}/furhat/gesture?blocking=false`, {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify({
      name: "thinkingGesture",
      frames: [
        {
          time: [0.3],
          persist: true,
          params: {
            BROW_DOWN_LEFT: 4.0,
            BROW_DOWN_RIGHT: 4.0,
          },
        },
        {
          time: [1.0],
          persist: true,
          params: {
            NECK_TILT: 10.0,
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
}

async function happyGesture() {
  const myHeaders = new Headers();
  myHeaders.append("accept", "application/json");
  return fetch(`http://${FURHATURI}/furhat/gesture?blocking=false`, {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify({
      name: "happyGesture",
      frames: [
        {
          time: [0.5],
          persist: true,
          params: {
            SMILE: 5.0,
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
}

async function sadGesture() {
  const myHeaders = new Headers();
  myHeaders.append("accept", "application/json");
  return fetch(`http://${FURHATURI}/furhat/gesture?blocking=false`, {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify({
      name: "sadGesture",
      frames: [
        {
          time: [0.5],
          persist: true,
          params: {
            SMILE: -5.0,
            BROW_DOWN_LEFT: 3.0,
            BROW_DOWN_RIGHT: 3.0,
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
}

// Generic gesture by name (not used in machine, but kept if you want it)
async function fhGesture(name: string) {
  const myHeaders = new Headers();
  myHeaders.append("accept", "application/json");
  const encName = encodeURIComponent(name);
  return fetch(
    `http://${FURHATURI}/furhat/gesture?name=${encName}&blocking=true`,
    {
      method: "POST",
      headers: myHeaders,
      body: "",
    },
  );
}

// ---------- LISTEN & ATTEND ----------

async function fhListen() {
  const myHeaders = new Headers();
  myHeaders.append("accept", "application/json");
  return fetch(`http://${FURHATURI}/furhat/listen`, {
    method: "GET",
    headers: myHeaders,
  })
    .then((response) => response.body)
    .then((body) => body!.getReader().read())
    .then((reader) => reader.value)
    .then((value) => JSON.parse(new TextDecoder().decode(value)).message);
}

const availableGestures: Array<string> = [
  "angry",
  "kidding",
  "serious",
  "thinking",
  "happy",
  "sad",
];

// Extracts "angry" from "do angry gesture", etc.
function extractGesture(utterance: string): string | null {
  const u = utterance.toLowerCase();
  for (const g of availableGestures) {
    if (u.includes("do " + g)) return g;
    if (u.includes("do " + g + " gesture")) return g;
    if (u.includes("do " + g + " face")) return g;
  }
  return null;
}

const timer = fromPromise(
  ({ input }: { input: { ms: number } }) =>
    new Promise((resolve) => setTimeout(resolve, input.ms))
);

async function fhAttendUser() {
  const myHeaders = new Headers();
  myHeaders.append("accept", "application/json");
  return fetch(`http://${FURHATURI}/furhat/attend?user=CLOSEST`, {
    method: "POST",
    headers: myHeaders,
    body: "",
  });
}

// ---------- STATE MACHINE ----------

const dmMachine = setup({
  actors: {
    timer,

    fhSetVoice: fromPromise(async () => {
      return fhVoice("en-US-EchoMultilingualNeural");
    }),
    fhAttend: fromPromise(async () => {
      return fhAttendUser();
    }),
    fhSpeak: fromPromise(
      async ({ input }: { input: { text: string; isFirstMessage: boolean } }) => {
        return fhSay(input.text, input.isFirstMessage);
      }
    ),
    fhListen: fromPromise(async () => {
      return fhListen();
    }),
    chatCompletion: fromPromise(
      async ({ input }: { input: { messages: Message[] } }) => {
        const response = await fetchChatCompletion(input.messages);
        return response;
      }
    ),

    fhAngryGesture: fromPromise(async () => angryGesture()),
    fhKiddingGesture: fromPromise(async () => kiddingGesture()),
    fhSeriousGesture: fromPromise(async () => seriousGesture()),
    fhThinkingGesture: fromPromise(async () => thinkingGesture()),
    fhHappyGesture: fromPromise(async () => happyGesture()),
    fhSadGesture: fromPromise(async () => sadGesture()),
  },
}).createMachine({
  id: "DM",
  context: {
    lastResult: "",
    extractedGesture: "",
    isFirstMessage: true,
    messages: [
      {
        role: "system",
        content:
          "You are a virtual assistant, integrated with a Furhat face, who can talk about any matter. You can chit-chat with the user. However, you are programmed to expect to do gestures.\
          You have the following faces in your inventory:\
            'angry',\
            'kidding',\
            'serious',\
            'thinking',\
            'happy',\
            'sad'",
      },
      {
        role: "assistant",
        content:
          "Hello. We can talk. Or you can command me to do faces like 'do angry gesture', 'do sad face' or 'do thinking gesture' and I will do it!",
      },
    ],
  } satisfies DMContext,
  initial: "SetupFurhat",
  states: {
    // --- INITIAL SETUP: VOICE + ATTEND ---
    SetupFurhat: {
      initial: "SetVoice",
      states: {
        SetVoice: {
          invoke: {
            src: "fhSetVoice",
            onDone: {
              target: "AttendUser",
              actions: () => console.log("Furhat voice set"),
            },
            onError: {
              target: "#DM.Loop",
              actions: ({ event }) =>
                console.error("Furhat voice error:", event),
            },
          },
        },
        AttendUser: {
          invoke: {
            src: "fhAttend",
            onDone: {
              target: "#DM.Loop",
              actions: () => console.log("Furhat attending user"),
            },
            onError: {
              target: "#DM.Loop",
              actions: ({ event }) =>
                console.error("Furhat attend error:", event),
            },
          },
        },
      },
    },

    // --- MAIN LOOP: SPEAKING → LISTENING → PROCESSING ---
    Loop: {
      initial: "Speaking",
      states: {
        Speaking: {
          invoke: {
            src: "fhSpeak",
            input: ({ context }) => {
              const lastMessage =
                context.messages[context.messages.length - 1];
              return {
                text: lastMessage.content,
                isFirstMessage: context.isFirstMessage,
              };
            },
            onDone: {
              target: "Listening",
              actions: [
                () => console.log("Furhat finished speaking"),
                assign({ isFirstMessage: false }),
              ],
            },
            onError: {
              target: "Listening",
              actions: ({ event }) =>
                console.error("Furhat speak error:", event),
            },
          },
        },

        Listening: {
          invoke: {
            src: "fhListen",
            onDone: [
              {
                // If user utterance contains a gesture command
                guard: ({ event }) => {
                  const utterance = event.output as string;
                  const g = extractGesture(utterance);
                  return g !== null;
                },
                target: "#DM.GestureState",
                actions: assign(({ context, event }) => {
                  const utterance = event.output as string;
                  const g = extractGesture(utterance);
                  return {
                    lastResult: utterance,
                    extractedGesture: g || "",
                    messages: [
                      ...context.messages,
                      { role: "user" as const, content: utterance },
                    ],
                  };
                }),
              },
              {
                // Otherwise, go to LLM processing
                target: "ProcessingResponse",
                actions: assign(({ context, event }) => {
                  const utterance = event.output as string;
                  return {
                    lastResult: utterance,
                    messages: [
                      ...context.messages,
                      { role: "user" as const, content: utterance },
                    ],
                  };
                }),
              },
            ],
            onError: {
              target: "Speaking",
              actions: ({ event }) =>
                console.error("Furhat listen error:", event),
            },
          },
        },

        ProcessingResponse: {
          invoke: {
            src: "chatCompletion",
            input: ({ context }) => ({
              messages: context.messages,
            }),
            onDone: {
              target: "Speaking",
              actions: assign(({ context, event }) => ({
                messages: [
                  ...context.messages,
                  {
                    role: "assistant" as const,
                    content: event.output as string,
                  },
                ],
              })),
            },
            onError: {
              target: "Speaking",
              actions: assign(({ context }) => ({
                messages: [
                  ...context.messages,
                  {
                    role: "assistant" as const,
                    content: "I couldn't process that. Please say it again.",
                  },
                ],
              })),
            },
          },
        },
      },
    },

    // --- GESTURE ROUTER STATE ---
    GestureState: {
      always: [
        {
          guard: ({ context }) => context.extractedGesture === "angry",
          target: "AngryGesture",
        },
        {
          guard: ({ context }) => context.extractedGesture === "kidding",
          target: "KiddingGesture",
        },
        {
          guard: ({ context }) => context.extractedGesture === "serious",
          target: "SeriousGesture",
        },
        {
          guard: ({ context }) => context.extractedGesture === "thinking",
          target: "ThinkingGesture",
        },
        {
          guard: ({ context }) => context.extractedGesture === "happy",
          target: "HappyGesture",
        },
        {
          guard: ({ context }) => context.extractedGesture === "sad",
          target: "SadGesture",
        },
        {
          // Fallback if something goes wrong
          target: "Loop",
        },
      ],
    },

    // --- INDIVIDUAL GESTURE STATES ---

    AngryGesture: {
      invoke: {
        src: "fhAngryGesture",
        onDone: {
          target: "Loop",
          actions: () => console.log("Angry gesture completed."),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },

    KiddingGesture: {
      invoke: {
        src: "fhKiddingGesture",
        onDone: {
          target: "Loop",
          actions: () => console.log("Kidding gesture completed."),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },

    SeriousGesture: {
      invoke: {
        src: "fhSeriousGesture",
        onDone: {
          target: "Loop",
          actions: () => console.log("Serious gesture completed."),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },

    ThinkingGesture: {
      invoke: {
        src: "fhThinkingGesture",
        onDone: {
          target: "Loop",
          actions: () => console.log("Thinking gesture completed."),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },

    HappyGesture: {
      invoke: {
        src: "fhHappyGesture",
        onDone: {
          target: "Loop",
          actions: () => console.log("Happy gesture completed."),
        },
        onError: {
          target: "Fail",
          actions: ({ event }) => console.error(event),
        },
      },
    },

    SadGesture: {
      invoke: {
        src: "fhSadGesture",
        onDone: {
          target: "Loop",
          actions: () => console.log("Sad gesture completed."),
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