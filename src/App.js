import React, { useEffect, useState } from 'react';
import './App.scss';

function App() {
    const [action, setAction] = useState(''); // add - delete - edit
    const [editIndex, setEditIndex] = useState(''); 
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState('');
    const [type, setType] = useState('Expense');
    const [editName, setEditName] = useState('');
    const [editPrice, setEditPrice] = useState('');
    const [editAmount, setEditAmount] = useState('');
    const [editDate, setEditDate] = useState('');
    const [editType, setEditType] = useState('Expense');
    const [total, setTotal] = useState(localStorage.getItem("total")? JSON.parse(localStorage.getItem("total")) : 0);
    const [items, setItems] = useState(localStorage.getItem("items")? JSON.parse(localStorage.getItem("items")) : []);

    function handleDeleteItem(index) {
        setAction("");
        if (items[index].type === "Expense") {
            setTotal(total + (items[index].amount * items[index].price));
        }
        else if (items[index].type === "Income") {
            setTotal(total - (items[index].amount * items[index].price));
        }
        setItems(items.slice(0, index).concat(items.slice(index + 1)));
    }

    function handleEditItem(index) {
        if (action !== "edit") {
            setAction("edit");
            setEditIndex(index);
        }
        else {
            if (editName === ""){
                alert("Please enter a name");
                return
            }
            else if (editPrice <= 0){
                alert("Please enter a price");
                return
            }
            else if (editAmount <= 0){
                alert("Please enter an amount");
                return
            }
            else if (editDate === ""){
                alert("Please enter a date");
                return
            }

            if (items[index].type === "Expense" && editType === "Expense") {
                setTotal(total + (items[index].amount * items[index].price) - (editPrice * editAmount));
            }
            else if (items[index].type === "Income" && editType === "Income") {
                setTotal(total - (items[index].amount * items[index].price) + (editPrice * editAmount));
            }
            else if (items[index].type === "Income" && editType === "Expense") {
                setTotal(total - (items[index].amount * items[index].price) - (editPrice * editAmount));
            }
            else if (items[index].type === "Expense" && editType === "Income") {
                setTotal(total - (items[index].amount * items[index].price) + (editPrice * editAmount));
            }

            setItems([...items.slice(0, index).concat(items.slice(index + 1)),
                {"name": editName, "price": editPrice, "amount": editAmount, "type": editType, "date": editDate}]
                .sort((a, b) => { 
                let d1 = new Date(a.date), d2 = new Date(b.date); 
                if (d1 > d2) return 1;
                else if (d1 < d2) return -1;
                else return 0;
            }));

            setAction("");
            setEditIndex("");
        }
    }

    function addItem(items, name, type, amount, price, date, setName, setAmount, setPrice, setDate) {
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

    function handleSubmit(e) {
        e.preventDefault();
        if (action === "edit") {
            handleEditItem(editIndex);
        }
        else {
            addItem(items ,name, type, amount, price, date, setName, setAmount, setPrice, setDate);
        }
    }

    useEffect(() => {
        localStorage.setItem("items", JSON.stringify(items));
        localStorage.setItem("total", JSON.stringify(total));
    }, [items, total]);

    return (
        <div className="App">
            <h1 className='title'>Expense Tracker</h1>
            <form autoComplete='off' className='form1' onSubmit={handleSubmit}>
                <label>
                    <p>Name:</p>
                    <input value={name} type="text" name="name" className='in' 
                    onChange={(e) => setName(e.target.value)}  />
                </label>
                <label>
                    <p>Price:</p>
                    <input value={price} type="number" name="price" className='in' 
                    onChange={(e) => setPrice(e.target.value)}  />
                </label>
                <label>
                    <p>Amount:</p>
                    <input value={amount} type="number" name="amount" className='in' 
                    onChange={(e) => setAmount(e.target.value)} />
                </label>
                <label>
                    <p>Date:</p>
                    <input value={date} type="date" name="date" className='in' 
                    onChange={(e) => setDate(e.target.value)} />
                </label>
                <label>
                    <p>Type:</p>
                    <select defaultValue={type} className='in' value={type} onChange={(e) => setType(e.target.value)}>
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
                        <th>Action</th>
                    </tr>)}
                </thead>
                <tbody>
                    {items.map((i, index) => { 
                        if (action === "edit") {
                            if (index === editIndex) {
                                return <tr>
                                <td>
                                    <input value={editDate} type="date" name="editdate" className='in' 
                                    onChange={(e) => setEditDate(e.target.value)} />
                                </td>
                                <td>
                                    <input value={editName} type="text" name="editname" className='in' 
                                    onChange={(e) => setEditName(e.target.value)}  />
                                </td>
                                <td>
                                    <input value={editPrice} type="number" name="editprice" className='in' 
                                    onChange={(e) => setEditPrice(e.target.value)}  />
                                </td>
                                <td>
                                    <input value={editAmount} type="number" name="editamount" className='in' 
                                    onChange={(e) => setEditAmount(e.target.value)} />
                                </td>
                                <td className={`${i.type === "Expense"? "red" : "green"}`}>
                                    <select defaultValue={editType} className='in' value={editType} 
                                    onChange={(e) => setEditType(e.target.value)}>
                                        <option value="Expense">Expense</option>
                                        <option value="Income">Income</option>
                                    </select>
                                </td>
                                <td className={`${editType === "Expense"? "red" : "green"}`}>{editAmount * editPrice}</td>
                                <td className='action'>
                                    <button className='delete' onClick={() => handleDeleteItem(index)}>Delete</button>
                                    <button className='edit' onClick={() => handleEditItem(index)}>Edit</button>
                                </td>
                            </tr>  
                            }
                            else {
                                return <tr>
                                    <td>{i.date}</td>
                                    <td>{i.name}</td>
                                    <td>{i.price}</td>
                                    <td>{i.amount}</td>
                                    <td className={`${i.type === "Expense"? "red" : "green"}`}>{i.type}</td>
                                    <td className={`${i.type === "Expense"? "red" : "green"}`}>{i.amount * i.price}</td>
                                    <td className='action'>
                                        <button className='delete' onClick={() => handleDeleteItem(index)}>Delete</button>
                                        <button className='edit' onClick={() => handleEditItem(index)}>Edit</button>
                                    </td>
                                </tr>                        
                            }
                        } 
                        else {
                            return <tr>
                                <td>{i.date}</td>
                                <td>{i.name}</td>
                                <td>{i.price}</td>
                                <td>{i.amount}</td>
                                <td className={`${i.type === "Expense"? "red" : "green"}`}>{i.type}</td>
                                <td className={`${i.type === "Expense"? "red" : "green"}`}>{i.amount * i.price}</td>
                                <td className='action'>
                                    <button className='delete' onClick={() => handleDeleteItem(index)}>Delete</button>
                                    <button className='edit' onClick={() => handleEditItem(index)}>Edit</button>
                                </td>
                            </tr>
                        }
                        })}
                    {items.length !== 0 && 
                        (<tr>
                            <td colSpan="5">Total</td>
                            <td className={`${total < 0 ? "red" : "green"}`}>{total}</td>
                            <td></td>
                        </tr>)}
                </tbody>
            </table>
        </div>
    );
}

export default App;
