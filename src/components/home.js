import '../index.css'
import image from '../image/water_pic.png';
import list from '../image/list.svg'
import dateIcon from '../image/date.svg'
import Navbar from './navbar'
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import checkAuth from "./auth/checkAuth";
import { useSelector } from "react-redux";

function Home(){

  const getToday = () => new Date().toLocaleDateString();
  const user = useSelector(state => state.auth.user);
  const storageKey = user ? "intakeList_" + user.email : null;
  const [intake, setIntake] = useState(null);

  useEffect(() => {
    if (!storageKey) return;
    const currentDate = getToday();
    const existingEntries = JSON.parse(localStorage.getItem(storageKey)) || [];
    const todayEntry = existingEntries.find(
      item => item.date === currentDate
    );
    setIntake(todayEntry || null);
  }, [storageKey]);

  const handleAdd = () => {
    if (!storageKey) return;
    const currentDate = getToday();
    const currentTime = new Date().toLocaleTimeString();
    const existingEntries = JSON.parse(localStorage.getItem(storageKey)) || [];
    const alreadyExists = existingEntries.find(
      item => item.date === currentDate
    );
    
    if (alreadyExists) {
      alert("You can only add one intake per day.");
      return;
    }

    const quantityInput = prompt("Enter water intake in Liters");
    if (!quantityInput) return;

    const newEntry = {
      id: Date.now(),
      date: currentDate,
      quantity: quantityInput,
      time: currentTime
    };

    const updatedEntries = [...existingEntries, newEntry];
    localStorage.setItem(storageKey, JSON.stringify(updatedEntries));
    setIntake(newEntry);
  };

  return(
  <div>
    <Navbar/>
    <div className='container'>
      <div className='row align-items-center mb-4 p-4 shadow rounded'>
        <div className='col-md-6'>
          <h1>Welcome!</h1>
          <p>Track your daily water intake</p>
        </div>
        <div className='col-md-6'>
          <img className='water' src={image} alt='water intake'/>
        </div>
      </div>

      <div className='row p-4 shadow rounded'>
        <div className='col'>
          <h2>Today's Water Intake</h2>
          <p>Date : {getToday()}</p>
          <p>Quantity : {intake ? intake.quantity + " L" : "Not Added"}</p>
          <p>Logged at : {intake ? intake.time : "Not Logged Yet"}</p>
          <button className='btn btn-success' onClick={handleAdd}>Add Water Intake</button>
        </div>
      </div>

      <div className='row mt-4 p-4 shadow rounded'>
        <div className='col-md-6 text-center mb-3'>
          <img className='checklist' src={list} alt='checklist'/>
          <h3>View Intake List</h3>
          <p>See your daily water intake history</p>
          <Link to="/viewlist"><button className='btn btn-primary'>View List</button></Link>
        </div>
        <div className='col-md-6 text-center mb-3'>
          <img className='graph' src={dateIcon} alt='difference'/>
          <h3>Find Difference</h3>
          <p>Compare water intake between dates</p>
          <Link to="/compare"><button className='btn btn-primary'>Compare</button></Link>
        </div>

      </div>
    </div>
  </div>
  )
}

export default checkAuth(Home);
