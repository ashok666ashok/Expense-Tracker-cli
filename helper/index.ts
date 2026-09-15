import { writeFileSync } from "node:fs";
import { Expense } from "../interface/index.ts";


export function nextId(data:Array<Expense>|[]):number{
    if(data.length === 0){
        return 1
    }else{
        return Math.max(...data.map((e:{id:number})=>e.id))+1
    }
}


export function saveExpense(filename:string,data:Array<Expense>):boolean{
    try {
        writeFileSync(filename,JSON.stringify(data,null,2))
        return true
    } catch (error) {
        return false
    }
}