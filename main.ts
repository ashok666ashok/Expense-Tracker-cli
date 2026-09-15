#!/usr/bin/env node

import {addExpense} from './service/index.ts' 
function init(){
    main()
}
init()
function main(){
    const method = process.argv[2]
    switch(method){
        case "add":
            if(addExpense()){
                console.log("Expence Added Successfully")
                process.exit(1)
            }else{
                console.log("some Error Occured")
                process.exit(1)
            }
            break;
        default:
            console.log("--help")
    }
}