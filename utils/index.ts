import {existsSync,writeFileSync,readFileSync} from 'fs';
export function createFile(filename:string):boolean{
        try {
            writeFileSync(filename,'[]')
            return true
        } catch (error) {
            console.log(error)
            return false
        }
}

export function readFile(filename:string):any{
    try {
        let data:any = readFileSync(filename,'utf-8')
        if(data.trim() == ""){
            writeFileSync(filename,'[]')
            data = '[]'
        }
        return data 
    } catch (error) {
        console.log(error)
        return false
    }
}

export function isFileExists(filename:string):boolean{
    if(existsSync(filename)){
        return true
    }else{
        return false
    }
}