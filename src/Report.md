# **Lab 3: Social Robotics**

## Part A:
For this assignment I created three gestures, (two of which are without sound).
- The first gesture is one in which Furhat display a thinking expression with subtle eye movements and a head tilt. Thus, showing contemplation. 
The second feature is suprise and similar to the previous gesture contains alot of eye movements to show astonishment.
- Lastly, the third gesture is a laugh, this gesture is further enhanced by pairing it with an audio. The audio is an mp3 file downloaded from Pixabay https://pixabay.com/sound-effects/woman-laugh-6421/ . Thus, creating a multimodal expression/gesture. However, since the audio file contains a female voice, I configured Furhat to use Ruth-Neural(en-US) from Amazon Polly, in order to ensure coherence between Furhat's voice (during the dialogues) and the audio laugh.

User trackcing was implemented using the attend function in order to automatically focus on the closest user. Thus, ensuring that Furhat maintains appropriate eye contact throughout the interaction. 

## Dialogue demo:
Furhat -> Hi! Ask me anything?

User-> What's your plans for today?

Furhat -> /*thinking*/ Hmm nothing much. How about you?"

User -> I'm going to relax all weekend

Furhat -> /*suprise*/ That's wonderful to hear!

User -> "I need to go now, bye!!!"

Furhat -> /*laugh*/ Ok goodbye, enjoy your weekend!
