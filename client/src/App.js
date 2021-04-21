import React, {useState, useEffect} from "react";
import Axios from "axios";
import './App.css';

function App() {

  const [transactionName, setTransaction] = useState("");
  const [amount, setAmount] = useState("");
  const [transactionList, setList] = useState([]);

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

        <button onClick={submitTransaction} id="bSubmit">Submit</button>

        {transactionList.map((i) => {
          return (
             <div className="item">
              <p>Workout name: {i.transactionName}</p>
              <p>Calories burned: {i.amount}</p>

              <button onClick={() => {deleteTransaction(i.transactionName)}}>Delete</button>
            </div> );
        })}
      </div>
    </div>
  );
}

export default App;
