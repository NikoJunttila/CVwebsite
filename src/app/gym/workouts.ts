export interface Workouts {
    name : string;
    description : string;
    days : string;
    id : number;
    plans : singleWorkout[];
    madeBy? : string;
}
export interface singleWorkout {
    notes? : string;
    date: any;
    aproxTime: number;
    day : string;
    exercises : dunno[];
}
export interface dunno {
    sets: number;
    reps: string;
    exercise: string;
    setsDone: number;
    done: boolean;
    weight?: number;
    editing?:boolean;
}
export interface subWorkout {
    name: string;
    workout : dunno[];
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
    image?: string;
}
export interface guide {
    name: string;
    description : string;
    link? : any;
}