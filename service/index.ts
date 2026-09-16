import { nextId, saveExpense } from '../helper/index.ts';
import { Expense } from '../interface/index.ts';
import { isFileExists,createFile,readFile } from '../utils/index.ts';

const DB_PATH = 'datas.json';
 function configure():boolean{
    if(!isFileExists(DB_PATH)){
        return createFile(DB_PATH)
    }
    return true;
    
}
export function addExpense(description:string,amount:number):boolean{
    if(!configure()){
        console.log("please restart the program...");
        return false;
    }else{
        const data=listExpenses()
        if(Array.isArray(data)) {
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
        } else {
           return false; 
        }   
    }
}

export function deleteExpense(id:number):boolean{
    const datas:Array<Expense> = JSON.parse(readFile(DB_PATH))
    const idx = datas.findIndex((data)=>data.id===id)
    if(idx != -1){
        datas.splice(idx,1)
        return saveExpense(DB_PATH,datas)
    }else{
        return false
    }
}

export function listExpenses(month?:number):Array<Expense>|boolean{
    try {
        const datas:Array<Expense> = JSON.parse(readFile(DB_PATH))
        if(month !== undefined && month >= 1 && month <= 12){
            const expenses:Array<Expense> = datas.filter((data)=>{
                const createdMonth:number = new Date(data.createdAt).getMonth() + 1
                return createdMonth === month
            })
            return expenses
        }else{
            return datas;
        }
    } catch (error) {
        return false;
    }
    
}
