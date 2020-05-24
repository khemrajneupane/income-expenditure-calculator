import React from "react";
import { useState, useEffect } from "react";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import transactions from "./services/transaction";
import 'bootstrap/dist/css/bootstrap.min.css';
const App = () => {
  const [transaction, setTransaction] = useState([]);
  const [incTitle, setIncTitle] = useState("");
  const [expTitle, setExpTitle] = useState("");
  const [expAmount, setExpAmount] = useState("");
  const [incAmount, setIncAmount] = useState("");
  const [months, setMonths] = useState(['January', 'February', 'March', 'April',
    'May', 'June', 'July', 'August', 'September',
    'October', 'November', 'December']);
  const [chooseMonth,setChooseMonth] = useState("");
  const [chooseYear, setChooseYear] = useState(0);
  const [year, setYear] = useState(()=>{
    let yearList = [];
    for(let j = 1900; j <= new Date().getFullYear(); j++){
      yearList.push(j)
    }
    return (yearList);
  });
 
  const yearChange = (e)=> {
    setChooseYear(e.target.value)
 
  }

  const monthChange = event => {
    setChooseMonth(event.target.value);
  };

  useEffect(() => {
    transactions.getAll().then(transac => {
      setTransaction(transac);
    });
  }, []);
/******* */
const incomeTitleChange = event => {
 
  setIncTitle(event.target.value);
  
};

const expenseTitleChange = event => {
  setExpTitle(event.target.value);
  
};

const expenseAmountChange = event => {
  setExpAmount(event.target.value);
  
};

const incomeAmountChange = event => {
  setIncAmount(event.target.value);
 
};
const handleSubmit =(e)=>{
  e.preventDefault();
  const newTransaction ={
      year:chooseYear,
      month:chooseMonth,
      income: [
        {
          title:incTitle,
          amount:incAmount
        }
      ],
      expense: [
        {
          title:expTitle,
          amount:expAmount
        }
      ],
  }
  transactions.createTransaction(newTransaction);
}

const findBy = (selectedMonth)=> {
 const byMonths = transaction.filter(m=>m.month===selectedMonth);
 setTransaction(byMonths);
  }

  
  return (<div className="container">
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="#">Navbar</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavDropdown">
        <ul className="navbar-nav">
          <li className="nav-item active">
            <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Features</a>
          </li>
        </ul>
      </div>
    </nav>
   <div className = "form-row"><Button  className = "text-center form-group col-md-4 mx-auto" onClick = {()=>findBy(chooseMonth)}>FindBy </Button><select className = "form-control col-md-4 mx-auto" onChange = {(e)=>monthChange(e)}>
      {months.map((m, i) => <option key={i}>{m}</option>)}
    </select> 
    </div>

    <Table striped bordered hover>
      <thead>
        <tr>
          <th>IncomeTitle</th>
          <th>IncomeAmount</th>
          <th>ExpenseTitle</th>
          <th>ExpenseAmount</th>
          <th>Year</th>
          <th>Month</th>
          <th colSpan="2">activities</th>
        </tr>

      </thead>
      <tbody>

        {transaction.map((m, i) =>
          <tr key={m.id}>
            <td>{m.income[0].title}</td>
            <td>{m.income[0].amount}</td>
            <td>{m.expense[0].title}</td>
            <td>{m.expense[0].amount}</td>
            <td>{m.year}</td>
            <td>{m.month}</td>
            <td><Button className="btn btn-danger" onClick={() => transactions.deleteItem(m.id)}>remove</Button></td>
           
          </tr>
        )}

      </tbody> 
    </Table>
    <form onSubmit = {(e)=>handleSubmit(e)}>
    <div class="form-row">
    <div class="form-group col-md-4">
    
    <label htmlFor="yearOptions">Select transaction Year </label><select  id = "yearOptions" className="form-control" onChange = {(e)=>yearChange(e)}>
        {year.map((m,i)=><option key = {i} value = {m[i]}>{m}</option>)}
    </select> 
    </div>
    <div class="form-group col-md-4">
    <label htmlFor="monthOptions">Select transaction month </label><select  id = "monthOptions" className="form-control" onChange = {(e)=>monthChange(e)}>
      {months.map((m, i) => <option value = {months[i]} key={i}>{m}</option>)}
    </select> 
   </div>  
    <div class="form-group col-md-4">
{incTitle!="Other"?(<><label htmlFor = "salary">Type of income: </label><select id = "salary" className="form-control" onChange={(e) => incomeTitleChange(e)}>
        <option value = "Salary">Salary</option>
        <option value = "PropertySales">PropertySales</option>
        <option value = "Gift">Gift</option>
        <option value = "Other">Other</option>
      </select></>):(<input className="form-control text-center" type="text" placeholder="type of income" value={incTitle} onChange={(e) => incomeTitleChange(e)} />)}
      </div>
    

   
    <div class="form-group col-md-12">
      <label htmlFor = "incomeAmount">Income Amount: </label><input id ="incomeAmount" className="form-control text-center" type="text" placeholder="income amount" value={incAmount} onChange={(e) => incomeAmountChange(e)} />
      <label htmlFor = "expenseTitle">Type of expense</label><input id = "expenseTitle" className="form-control text-center" type="text" placeholder="type of expense" value={expTitle} onChange={(e) => expenseTitleChange(e)} />
      <label htmlFor = "expenseAmount">Expense Amount</label><input id = "expenseAmount" className="form-control text-center" type="text" placeholder="expense amount" value={expAmount} onChange={(e) => expenseAmountChange(e)} />
      
      <Button className="btn btn-info float-right" type="submit">submit</Button>
          </div>
          </div>
    
    </form>

  </div>)
};
export default App;