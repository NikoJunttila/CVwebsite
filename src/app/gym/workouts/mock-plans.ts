import { Exercises } from "../maker/exercises";
import { Workouts } from "../workouts";

export const Plans : Workouts[] = [
    {name:"stronglifts 5x5",description:"Do three workouts per week. Never train two days in a row or do two workouts in a day. Wait one day before doing your next workout. This gives your body time to recover, get stronger and build muscle so you can lift heavier next workout. Alternate workout A and B each time you train. Most people train Monday, Wednesday and Friday. This gives you one recovery day between each workout, and two recovery days before your next workout on Monday. What also works is to train Tuesday, Thursday, and Saturday… or Sunday, Tuesday, and Thursday. Start StrongLifts 5×5 by doing workout A. Go home, eat and sleep. Two days later do workout B. Another two days later do workout A. Your first week will look like this if you train Mo/We/Fr",days:"3",id:1,
    plans:[{id:1,day:"week 1: Monday - A",exercises:["Squat","Bench Press","Barbell Row"]},{id:2,day:"week 1:Wednesday - B",exercises:["Squat","Overhead Press","Deadlift"]},{id:3,day:"week 1:Friday - A",exercises:["Squat","Bench Press","Barbell Row"]},
    {id:4,day:"week 2: Monday - B",exercises:["Squat","Overhead press","Deadlift"]},{id:5,day:"week 2: Wednesday - A",exercises:["Squat","Bench press","Barbell row"]},{id:6,day:"week 2: Friday - B",exercises:["Squat","Overhead press","Deadlift"]},
]

},
    {name:"ppl",description:"If you're looking for a practical way to program your training, you've undoubtedly come across the famous Push Pull Legs split. This training method has been around for a while, and many people today swear by its efficacy and usefulness. The Push-Pull Legs split is a way of organizing your weekly workouts by dividing your training into three categories: push exercises, pull exercises, and legs exercises. With this split, you combine different muscle groups with similar functions and train them together. Instead of training them separately, you can bundle them together, work them hard, and then give them sufficient time to recover before training them again. for 3 times a week train on Monday/Wednesday/friday. and 6 times train do Mon-saturday each workout twice. Below you can see what muscle groups each training day includes.",
    days:"3-6",id:2,plans:[
    {id:7,day:"Push = Chest/Shoulders/triceps",exercises:["Flat Barbell Bench Press","Incline Bench Press","Seated Shoulder Press","Flat Bench Dumbell Flyes","Standing Dumbell Lateral Raises","Tricep Rope Pushdown","EZ Bar Skullcrusher"]},
    {id:8,day:"Pull = Back/biceps/",exercises:["Barbell Row","Neutral Lat Pulldown","Dumbbell Shrug","Face Pull","Barbell Curl","Hammer Curl","Leg Raises",]},
    {id:9,day:"Legs",exercises:["Barbell Squat","Romanian Deadlift","Leg Press","Barbell Lunges","Leg Curl","Calf press"]},
]},
    {name:"Spring Shred: 8 Week Fat Loss Workout Plan",
    description:"The last few months have been great for many of us in the iron game. We've upped the calories as well as the weights and the result has been new found mass and power. I hope you've had fun with that but now spring is here which means summer isn't far behind. The jackets go away and the tank tops come out to play. So now our focus needs to be on taking that foundation we've built since Thanksgiving and sculpting it out so come June we can reveal our ultimate physique. You ready for this eight week program? I thought so. Let's go. This is an eight week program. The rest periods change over the course of the eight weeks. This means every time you step in the gym, you're going to have to bring it because the rest time will gradually decrease. Weeks 1 and 2 - 2 minutes rest between sets. Weeks 3 and 4 - 90 seconds rest between sets.Weeks 5 and 6 - 60 seconds rest between sets. Weeks 7 and 8 - 45 seconds rest between sets. ",
    days:"5",id:3,plans:[
        {id:15,day:"Day 1: Chest & Abs",exercises:["Incline Barbell Bench Press 3x10","Dumbbell Fly 3x12","Weighted Dip 3x12","Pec-Deck 3x12","Cable Crossover 3x12","Hanging Leg Raise 3x12","Side Bends 3x15","Plank 3xfailure","Rope Crunch 3x15"]},
        {id:16,day:"Day 2: Back",exercises:["Neutral Grip Pullups 3xfailure","Bent Over Barbell Row 3x12","Straight Arm Pulldown 3x12","Wide Grip Seated Row 3x12","Deadlift 3x15"]},
        {id:17,day:"Day 3: Shoulders",exercises:["Lateral Raise 3x10","Shoulder Press 3x12","Front Plate Raise 3x12","High Rope Face Pull 3x12"]},
        {id:18,day:"Day 4: Arms",exercises:["EZ Bar Preacher Curl 3x12","Close Grip Bench Press 3x12","Hammer Curl 3x12","Overhead Rope Extension 3x12","Reverse Grip Pushdown 3x15"]},
        {id:19,day:"Day 5: Legs",exercises:["Squat 3x8","Leg Press 3x15","Single Leg Extension 3x15","Seated Leg Curl 3x15","Lying Leg Curl 3x15","Calf raise 3x20"]},
    ]},
    {name:"M-F",description:"Build muscle and lose fat with this Monday-Friday workout routine. Crush the gym throughout the work week & enjoy your weekends off with this workout split.",
    days:"5",id:4,plans:[
        {id:10,day:"Monday: Back",exercises:["Deadlift 4x6","Lat Pull Down 4x8-12","Dumbbell Row 4x8-12","machine row 4x10","One Arm Cable Row 3x12","Straight Arm Cable Pull Down 2x15",]},
        {id:11,day:"Tuesday: Chest & Abs",exercises:["Incline Bench Press 4x6","Decline Bench Press 4x8-12","Bench Press 3x12","chest fly 3x12","Push Ups 3xfailure","Hanging Leg Raise 3x12",]},
        {id:12,day:"Wednesday: Legs",exercises:["Barbell Back Squat 5x6","Romanian Deadlift 4x8-12","Leg Press 3x10-15","Leg Curl 3x12-15","Walking Lunge 3x15","calf raise 4x20",]},
        {id:13,day:"Thursday: Shoulders & Abs",exercises:["Military Press 4x6","Lateral Raise 4x8-12","Reverse Machine Fly 4x8-12","Cable Front Raise 4x12","Shrugs 4x15","Decline Sit Up 3x15","ab wheel 3x12",]},
        {id:14,day:"Friday: Arms",exercises:["EZ Bar Curl 4x8-12","EZ Bar Skullcrusher 4x8-12","Hammer Curl 4x12","Tricep Dip 4x12","wrist Extension 4x12","Cable Overhead Tricep Extension 4x8-12",]},
    ]},
]

/* {id:10,day:"",exercises:["",]} */