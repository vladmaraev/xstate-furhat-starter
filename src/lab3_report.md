I define the wink gesture of eyes by adjust parameters:  

```           
            "EPICANTHIC_FOLD": 0.3,
            "EYE_SQUINT_LEFT": 1.0,
            "BROW_DOWN_LEFT": 1.0
```
Since two winks are seperately going on so we need to set time:  

```           
            time: [1.96, 2.28],
            time: [2.28, 2.60],
```

Also, I define gesture of smile and neck rolling:  

```           
            BLINK_LEFT: 10.1,
            BLINK_RIGHT: 10.1,
            NECK_ROLL: 10 
```

For audio playing, we just need to change the parameter of fetch function from 'text=${encText}' to 'url=${encURL}' so that audio resource can be read from internet.
