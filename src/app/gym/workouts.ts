export interface Workouts {
    name : string;
    description : string;
    days : number;
}

export interface EXERCISES {
    name : string;
    sets? : number;
    reps? : number;
    setsDone?: number;
    done?: boolean;
}