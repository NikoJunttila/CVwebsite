export interface cooking {
    img: string;
    time: string,
    name: string;
    id : number;
    rating:number;
    portions: number;
    ingredients: ingredient[];
    howTo : string[];
    tags : string[];
}
interface ingredient{
    amount : number;
    name : string;
    what : string;
}
export interface shopping {
    name : string;
    ingredients : string[];
}