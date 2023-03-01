export interface Workouts {
    name : string;
    description : string;
    days : string;
    id : number;
    plans? : singleWorkout[];
}
export interface singleWorkout {
    id: number;
    day : string;
    exercises : string[];
}
export interface dunno {
    sets: number;
    reps?: string;
    exercise: string;
    setsDone?: number;
    done?: boolean;
}
export interface rlyDunno {
    id: number;
    workout : dunno[];
}
export interface EXERCISES {
    name : string;
    sets? : number;
    reps? : number;
    setsDone?: number;
    done?: boolean;
}

export interface quote {
    text? : string;
    author?: string;
}
export interface guide {
    name: string;
    description : string;
    link? : any;
}