# Assignment Lab3. Social robotics

## Part A

### 1. New gestures

To understand how the system work I first implemented the BigSmile gesture as it is shown in Furhat documentation (https://docs.furhat.io/remote-api/#furhatgestures) for testing.

Then I proceed to creating the 'BigSurprise' gesture. I was inspired by a really expressive gesture my sambo uses to do to show surprise when talking to our son. The mouth is rounded and brows are up, a bit longer than for usual face expressions. Globally the gesture is exaggerated as it is often the case in interaction with children. The parameter PHONE_OH is used to get a rounded mouth and I also added a light value for NECK_ROLL to try and get a more naturalistic gesture. But it's really difficult to get something naturalistic.

The next step was adding the 'Disagree' gesture. The initial idea was to mimic a head shaking simply meaning "no". But, when introducing parameters BROW_DOWN_LEFT and BROW_DOWN_RIGHT, it rather seems to express a strong disagreement as in "no way". That's why I even set SMILE_CLOSED and SMILE_OPEN to 0, because Furhat default state already looks like it's smiling.

For all three gestures, I defined a function, an actor calling that function and a state to invoke this actor. Additional states were included in order to transition to next gesture only after some time for testing all of them in a row and without overlap.

### 4. Adding sound to gesture

For a bit of variation, I chose to add sound to an existing gesture, in order to call the function fhGesture. 
It was not straightforward to know how to define function fhSound with an url as parameter and actor fhAngerWithSound calling two functions. It's also tricky that the audio file can't be read locally but has to be online.

I found a free sound 'Grrr' online (https://pixabay.com/sound-effects/grrr-137901/) to include to the built-in gesture ExpressAnger which looks like growling. And I was lucky enough for this sound to be perfectly timed with the gesture.

### 3. Short demonstration dialogue

Here is the demonstration dialogue:

\- System: Hi \
\- User: Hey! Guess what? I'm going to karaoke tonight! \
\- System: [*shows surprise*] Really? \
\- User: Yeah! And you're coming with me! \
\- System: [*shows disagreement*] No way! I'm not going! \
\- User: Then I'll never speak to you again! \
\- System: [*shows anger*]

The last 2 turns were added only in the reviewed version for the second submission, just for the fun of including all the new gestures, even if it sounds a bit far-fetched.

The dialogue is simulated by alternating Listen states and Speak states. Each system turn is composed by 2 states, first gesture and then speaking.

In the first version, a dedicated actor calling the funtion fhSay was built for each speaking state as I didn't manage to edit the actor so that it would take a variable parameter text. My idea was to use the context to feed the promise but the issue was that I put context as parameter within the actor. In the second version, the actor takes input as parameter, and the input is defined on the basis of the context in the speaking state (({context}) => context.message1). This makes actor fhSay usable for all speaking states. 

### 2. User tracking

Function, actor and state were added for both GetUser and AttendUser.

The function fhGetUser applies method GET with endpoint /furhat/users, whereas the function fhAttendUser applies method POST with endpoint /furhat/attend?user=CLOSEST to attend to the closest user.

The challenge here was the lack of information in the Furhat documentation, especially considering that examples are shown in Kotlin. But with help from TA Viktoria, the functions were defined. Besides, it's not evident that once the actor is invoked, attention to user just persists all along the dialogue. So transitioning directly from state Next (greeting invoking fhHello) to GetUser then to AttendUser is sufficient to get attention for all following states.

Another confusing thing was to check if the code was working. Indeed, the terminal showed that my code was running with no errors, but Furhat wasn't moving its head to follow me as I moved around in front of my screen. I assumed that the system might use my camera, when in reality a virtual user needs to be added through the web interface.

Overall, I would say that it was a bit difficult to learn how to use the whole integrated system (state machine, virtual Furhat, web interface, terminal), but it was fun, and I guess that, with time, one can become familiar with it.