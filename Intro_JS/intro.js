//Ascending & Descending order
let numbers= [3,4,56,7,8,1]

console.log("Ascending order: "+sortAscending(numbers))
console.log("Descending order: "+sortDescending(numbers))

function sortAscending(numbers){
    for(let i=0;i<numbers.length;i++){
        for(let j=0;j<numbers.length;j++){
            if(numbers[i]<numbers[j]){
                let temp=numbers[j]
                numbers[j]=numbers[i]
                numbers[i]=temp
            }
        }
    }
    return numbers
}

function sortDescending(numbers){
    for(let i=0;i<numbers.length;i++){
        for(let j=0;j<numbers.length;j++){
            if(numbers[i]>numbers[j]){
                let temp=numbers[j]
                numbers[j]=numbers[i]
                numbers[i]=temp
            }
        }
    }
    return numbers
}

//Even or Odd
let number=5

if(isEven(number)==true){
    console.log("\n"+number+" is even.")
}else{
    console.log("\n"+number+" is odd.")
}

function isEven(number){
    if(number%2==0){
        return true
    }else{
        return false
    }
}

//Find smallest/largest number in an array
let numberArr=[52,1,102,30,3,12,205]

console.log("\nSmallest number in array "+numberArr+" is "+findSmallestNumber(numberArr))
console.log("Largest number in array "+numberArr+" is "+findLargestNumber(numberArr))

function findSmallestNumber(arr){
    let smallest=arr[0]
    for(let i=0;i<arr.length;i++){
        if(arr[i]<smallest){
            smallest=arr[i]
        }
    }
    return smallest
}

function findLargestNumber(arr){
    let largest=arr[0]
    for(let i=0;i<arr.length;i++){
        if(arr[i]>largest){
            largest=arr[i]
        }
    }
    return largest
}

//Checks if item is an array
let arr=[65,71,43,23,12,15]
let int=5
let isboolean= false

console.log("\nTrue - Item is an array \\ False - Item is Not an array")
console.log(checksForArrays(number))
console.log(checksForArrays(arr))
console.log(checksForArrays(isboolean))


function checksForArrays(isArray){
    if(isArray.length>1){
        return true
    }else{
        return false
    }
}

//Fizz-Buzz App
let num=15

console.log("\nIs "+num+" a Fizz or Buzz or Fizz Buzz? "+fizzBuzz(num))
num=4
console.log("Is "+num+" a Fizz or Buzz or Fizz Buzz? "+fizzBuzz(num))
num=10
console.log("Is "+num+" a Fizz or Buzz or Fizz Buzz? "+fizzBuzz(num))
num=12
console.log("Is "+num+" a Fizz or Buzz or Fizz Buzz? "+fizzBuzz(num))

function fizzBuzz(num){
    if(num%5==0 && num%3==0){
        return "Fizz Buzz"
    }else if(num%5==0){
        return "Buzz"
    }else if(num%3==0){
        return "Fizz"
    }else{
        return "Not a Fizz or Buzz"
    }
}

//remove duplicate items in an array
let duplicateArray=["John","Mary","Alex","Steve","Mary","John"]

console.log("\n"+duplicateArray)
console.log(removeDuplicates(duplicateArray))

function removeDuplicates(dupArray){
    for(let i=0;i<dupArray.length;i++){
        for(let j=1;j<dupArray.length-i;j++){
            if(dupArray[i]==dupArray[j]){
                dupArray.pop(j)
            }
        }
    }
    return newArray=dupArray
}

console.log("\n\nPalindrome App")
//Palindrome
console.log("\n")
console.log(isPalindrome("is"))
console.log(isPalindrome("cat"))
console.log(isPalindrome("noon"))
console.log(isPalindrome("mom"))

function isPalindrome(word){
    if(word.length<=2){
        return "There aren't any Palindromes for 1 or 2 letter words."
    }else{
        let newWord=""
        for(var i=word.length-1;i>=0;i--){
            newWord+=word[i]
        }
        if(newWord==word){
            return (word+" is a Palindrome!")
        }else{
            return (word+" is Not a Palindrome!")
        }
    }
}

console.log("\n\nBank Account App")
//BankAccount Class Assignment
class BankAccount{
    constructor(firstName,lastName,accountType,initialAmount){
        this.firstName=firstName
        this.lastName=lastName
        this.middleName=""
        this.accountType=accountType
        this.balance=this.openAccount(initialAmount)
        this.status="Open"
    }
    
    openAccount(initialAmount){
        if(initialAmount>=100){
            this.status="Opened"
            console.log("Your account was successfully "+this.status)
            return 100
        }else{
            console.log("$100 is required to open a Bank Account.")
            return this.status="Closed"
        }
    }

    transferFunds(amount,destinationAccount){
        this.balance-=amount
        destinationAccount.balance+=amount
        if(this.balance<0){
            //apply fees
            return this.overdraftFees()
        }else{
            return (this.balance,destinationAccount.balance)
        }
    }

    withdraw(amount){
        this.balance-=amount
        if(this.balance<0){
            //apply fees
            this.overdraftFees()
        }else{
            return this.balance
        }
    }

    overdraftFees(){
        const negativeBalance=35
        this.balance-=negativeBalance
        this.status="Freeze"
        return "Overdraft!!! Curent Balance: "+this.balance+" your account is now "+this.status
    }

}


myCheckings= new BankAccount("Derek","Dunlap","Checking",100)
mySavings=new BankAccount("Derek","Dunlap","Savings",200)

//Withdraw
console.log("Current Balance: "+myCheckings.withdraw(50))
//Transfer Funds
console.log("Current Balance: "+myCheckings.transferFunds(150,mySavings))
