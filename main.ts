#!/usr/bin/env node

import { saveExpense } from './helper/index.ts';
import { Expense } from './interface/index.ts';
import {addExpense, deleteExpense, listExpenses} from './service/index.ts';
import {program} from 'commander'; 
function init(){
    main()
}
init()
function main(){
    program.command('add')
    .requiredOption('--description <string>', 'Desc text')
    .requiredOption('--amount <number>','Amount value')
    .action((option) => {
        const description:string = option.description;
        const amount:number = Number(option.amount);
        const status = addExpense(description,amount);
        if(status){
            console.log("Expense added successfully.")
            process.exit(0)
        }else{
            console.log("unable to add Expense.\nPlease restart the program.")
            process.exit(1)
        }
    });

    program.command('list')
    .action(() => {
        const expenses:Array<Expense>|boolean = listExpenses();
        if(Array.isArray(expenses)){
            if(expenses.length > 0){
              console.log("# ID  Date        Description  Amount");
                expenses.forEach(expense => {
                const date = new Date(expense.createdAt).toISOString().split('T')[0];
                const id = String(expense.id).padEnd(3);
                const d = date.padEnd(11);
                const desc = expense.description.padEnd(12);
                  
                console.log(`# ${id} ${d} ${desc} $${expense.amount}`);
                });
            }else{
                console.log("# No Expenses.")
            }
            process.exit(0)
        }else{
            console.log("unable to list expenses.\nPlease restart the program.")
            process.exit(1)
        }
    });

    program.command("summary")
    .option("--month <number>","month in number")
    .action((option)=>{
        const month:number|undefined = option.month ? Number(option.month) : undefined ;
        const expenses = listExpenses(month);
        if(Array.isArray(expenses)){
            let summary:number = 0
            expenses.forEach((expense)=>{
                summary += expense.amount;
            })
            console.log(`# Total expense: $${summary}`)
            process.exit(0)
        }else{
            console.log("unable to get summary.\nPlease restart the program.")
            process.exitA(1)
        }

    })

    program.command("delete")
    .requiredOption("--id <number>","expense ID")
    .action((option)=>{
        const status:boolean = deleteExpense(Number(option.id))
        if(status){
            console.log("# Expense deleted successfully.")
            process.exit(0)
        }else{
            console.log("unable to delete expense.\nPlease restart the program.")
            process.exit(1)
        }
    })
    
    program.parse();  
}
