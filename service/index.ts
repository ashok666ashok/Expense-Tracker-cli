import { getUnpackedSettings } from 'node:http2';
import { nextId, saveExpense } from '../helper/index.ts';
import { Expense } from '../interface/index.ts';
import { isFileExists,createFile,readFile } from '../utils/index.ts';
import { parseArgs } from 'node:util';

const DB_PATH = 'datas.json';
 function configure():boolean{
    if(!isFileExists(DB_PATH)){
        return createFile(DB_PATH)
    }
    return true
    
}
export function addExpense():boolean{
    if(!configure()){
        console.log("please restart the program...")
        return false
    }else{
        let description:string = "";
        let amount:number = 0;
        const args = process.argv.slice(3)
        if(args[0]==="--description"){
            description = args[1]  
        }else{
            return false
        }
        if(args[2]==="--amount"){
            amount = Number(args[3])
        }else{
            return false
        }
        if(description === ""){
            return false
        }
        if(isNaN(amount)){
            return false
        }
        const data:Array<Expense>= JSON.parse(readFile(DB_PATH))
        const id:number = nextId(data)
        const task:Expense={
            id:id,
            description:description,
            amount:amount,
            createdAt:new Date().toLocaleString(),
            updatedAt:undefined
        }
        data.push(task)
        if(saveExpense(DB_PATH,data)){
            return true
        }else{
            return false
        }
    }
}