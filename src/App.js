import React, { useState } from 'react';
import './App.scss';

function App() {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState('');
    const [type, setType] = useState('Expense');
    const [total, setTotal] = useState(0);
    const [items, setItems] = useState([]);

    function handleNameChange(e) {
        setName(e.target.value);
    }
    function handlePriceChange(e) {
        setPrice(e.target.value);
    }

    function handleAmountChange(e) {
        setAmount(e.target.value);
    }

    function handleDateChange(e) {
        setDate(e.target.value);
    }
    
    function handleTypeChange(e) {
        setType(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (name !== "" && type !== "" && amount > 0 && price > 0 && date !== "") {
            setItems([...items, {"name": name, "price": price, "amount": amount, "type": type, "date": date}].sort((a, b) => { 
                let d1 = new Date(a.date), d2 = new Date(b.date); 
                if (d1 > d2) return 1;
                else if (d1 < d2) return -1;
                else return 0;
            }));
            if (type === "Expense") {
                setTotal(total - (price * amount));
            }
            else if (type === "Income") {
                setTotal(total + (price * amount));
            }
            setName("");
            setPrice("");
            setAmount("");
            setDate("");
        }
        else if (name === ""){
            alert("Please enter a name");
        }
        else if (price <= 0){
            alert("Please enter a price");
        }
        else if (amount <= 0){
            alert("Please enter an amount");
        }
        else if (date === ""){
            alert("Please enter a date");
        }
    }

    return (
        <div className="App">
            <h1 className='title'>Expense Tracker</h1>
            <form className='form1' onSubmit={handleSubmit}>
                <label>
                    <p>Name:</p>
                    <input value={name} type="text" name="name" className='in' 
                    onChange={handleNameChange}  />
                </label>
                <label>
                    <p>Price:</p>
                    <input value={price} type="number" name="price" className='in' 
                    onChange={handlePriceChange}  />
                </label>
                <label>
                    <p>Amount:</p>
                    <input value={amount} type="number" name="amount" className='in' 
                    onChange={handleAmountChange} />
                </label>
                <label>
                    <p>Date:</p>
                    <input value={date} type="date" name="date" className='in' 
                    onChange={handleDateChange} />
                </label>
                <label>
                    <p>Type:</p>
                    <select defaultValue={type} className='in' value={type} onChange={handleTypeChange}>
                        <option value="Expense">Expense</option>
                        <option value="Income">Income</option>
                    </select>
                </label>
                <input className='add' type="submit" value="Add" />
            </form>
            <table className='tracker'>
                <thead>
                    {items.length !== 0 && (<tr>
                        <th>Date</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Amount</th>
                        <th>Type</th>
                        <th>Cost</th>
                    </tr>)}
                </thead>
                <tbody>
                    {items.map((i) => 
                    <tr>
                        <td>{i.date}</td>
                        <td>{i.name}</td>
                        <td>{i.price}</td>
                        <td>{i.amount}</td>
                        <td className={`${i.type === "Expense"? "red" : "green"}`}>{i.type}</td>
                        <td className={`${i.type === "Expense"? "red" : "green"}`}>{i.amount * i.price}</td>
                    </tr>
                    )}
                    <tr>
                        <td colSpan="5">Total</td>
                        <td className={`${total < 0 ? "red" : "green"}`}>{total}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default App;
