I implemented three gestures and integrated them into a short demonstration dialogue. The gestures included BrowRaise, HeadNod, and a sound-based gesture called ConfusedWithSound.

During development, there were several technical issues. Initially, the robot produced no sound when speaking or playing gestures. I realized that the problem was related to the voice configuration, so I switched to a different voice (“Joanna”). Then this issue was solved.

Later, I found that the robot was speaking but not performing gestures. This turned out to be caused by a formatting issue in my gesture definitions. Specifically, I had written the time values as arrays instead of single numbers. Once corrected, the gestures started to work properly in the simulator.