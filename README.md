# Expense-Tracker-cli
command line interface to track expense </br>

## Tech-stack
Nodejs </br>
Typescript

## Installation 
git clone https://github.com/ashok666ashok/Expense-Tracker-cli </br>
npm i </br>
npm i commander,tsx,typescript </br>
run this command(below):
```
    npx tsx main.ts [operation]

```

## Operation
``` 
        add --description <string> --amount <number> (to add expense)
        delete --id <number> (to delete expense with expense ID)
        summary (to show total expense)
        summary --month <number> (to show the total expense of specified month)
        list (to list all expenses)
```
## help
```
            npx tsx main.ts [operation] --help
```

project inspired by roadmap.sh [visit roadmap.sh] https://roadmap.sh/projects/expense-tracker




