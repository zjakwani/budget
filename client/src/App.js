import React, {useState, useEffect} from "react";
import Axios from "axios";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';

function App() {

  const [transactionName, setTransaction] = useState("");
  const [amount, setAmount] = useState("");
  const [transactionList, setList] = useState([]);
  const [newAmount, setNewAmount] = useState("");

  useEffect(() => {
    Axios.get("http://localhost:3001/api/retrieve").then((i) => {
      setList(i.data);
    })
  }, [])

  const submitTransaction = () => {
    Axios.post("http://localhost:3001/api/add", {transactionName, amount});


    setList([...transactionList, {transactionName, amount}]);
  };

  const deleteTransaction = (i) => {

    setList(transactionList.filter(t => t.transactionName !== i));
    Axios.delete(`http://localhost:3001/api/delete/${i}`);
  }

  const updateTransaction = (i) => {

    Axios.put("http://localhost:3001/api/update", {transactionName: i, amount: newAmount});
    setNewAmount("");
  }


  return (
    <div className="App">
      <h1>Fitness tracker</h1>

      <div className="enter">
        <label>Workout name</label>
        <input type="text" name="transaction" onChange={(userInput) => {
          setTransaction(userInput.target.value);
        }}/>
        
        <label>Calories burned</label>
        <input type="number" name="amount" onChange={(userInput) => {
          setAmount(userInput.target.value);
        }}/>

        <Button onClick={submitTransaction}>Submit</Button>

        {Array.from(transactionList).map((i) => {
          return (
             <div class="card">
               <div class="card-header">{i.transactionName}</div>
              <div class="card-body">
              <h5 class="card-title">Calories burned: {i.amount}</h5>

              <Button variant="danger" onClick={() => {deleteTransaction(i.transactionName)}}>Delete</Button>

              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <span class="input-group-text" id="basic-addon1">Calories</span>
                </div>
                <input type="text" class="form-control" onChange={(e) => {setNewAmount(e.target.value)}}/>
                <div class="input-group-append">
                  <Button variant="success" onClick={() => {updateTransaction(i.transactionName)}}>Update</Button>
                </div>
              </div>

              </div>

              
              
            </div> );
        })}
      </div>
    </div>
  );
}

export default App;
