// what are the elements you need to do

// 1. balance amount
// 2.description
// 3.amount
// 4.income
// 5.expenses
// 6.form
// 7.transaction

const balance =document.querySelector("#balance");
const amount =document.querySelector("#amount");
const incomeAmt = document.querySelector("#income_amt");
const description =document.querySelector("#desc");
const expensesAmt = document.querySelector("#expense_amt");
const form =document.querySelector("#form");
const trans = document.querySelector("#trans");

// dummy data

// const dummyData =[
//     {id: 1, description:"Flower", amount: -20},
//     {id: 2, description:"Salary", amount: 35000},
//     {id: 3, description:"Book", amount: -10},
//     {id: 4, description:"Camera", amount: -150},
//     {id: 5, description:"Petrol", amount: -250},
// ];

// let transactions = dummyData;

function loadTransactionDetails(transaction){
    const sign =transaction.amount < 0 ? "-" : "+";
    const item =document.createElement("li");
    item.classList.add(transaction.amount < 0 ? "exp" : "inc");
    item.innerHTML =`
      ${transaction.description},
    <span>${sign} ${Math.abs(transaction.amount)}</span>
    <button class="btn-del" onclick="removeTrans(${transaction.id})">x</button>
    `;
    
    trans.appendChild(item);


}

// JASON


// remove transaction

function removeTrans(id){
  if(confirm ("Are you sure you want to delete the transaction?")){
    transactions=transactions.filter((transaction)=>transaction.id !=id);
    config();
    updateLocalStorage();
  } else {
    return; 
  }
  };

// create values // update the balance 
function updateAmount(){
    const amounts =transactions.map((transaction)=>transaction.amount);
    const total=amounts.reduce((acc,item)=>(acc+=item),0).toFixed(2);
    balance.innerHTML =  `LKR ${total}`;

// take the income
const income=amounts.filter((item)=> item > 0).reduce((acc,item)=>(acc +=item),0).toFixed(2);
incomeAmt.innerHTML =  `LKR ${income}`;

// take the income

const expense=amounts.filter((item)=> item < 0).reduce((acc,item)=>(acc +=item),0).toFixed(2);
expenseAmt.innerHTML =  `LKR ${Math.abs(expense)}`;

}



function config(){
    trans.innerHTML ="";
    transactions.forEach(loadTransactionDetails);
    updateAmount();
}
window.addEventListener("load", function(){
    config();
});

// form element // description & amount element

function addTransaction(e){
  e.preventDefault();
  if (description.value.trim()=="" || amount.value.trim()==""){
     alert("please enter description and amount");
  } else{
    const transaction ={
      id:uniqueId(),
      description:description.value,
      amount: +amount.value,
    };
    transactions.push(transaction);
    loadTransactionDetails(transaction);
    description.value ="";
    amount.value ="";
    updateAmount();
    updateLocalStorage();
  }
}

form.addEventListener("sumbit", addTransaction);

//1.29
//local storage

let localStorageTrans =JSON.parse(localStorage.getItem("trans"))

let transactions= localStorage.getItem("trans")!== null ? localStorageTrans :[];


function updateLocalStorage(){
  localStorage.setItem("trans",JSON.stringify(transaction));
}


//random number
function uniqueId(){
  return Math.floor(Math.random()*10000000);

}









