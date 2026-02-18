import { useState } from "react";
import Navbar from "./navbar";
import { useSelector } from "react-redux";

function Compare() {

  const user = useSelector(state => state.auth.user);
  const storageKey = user ? "intakeList_" + user.email : null;

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [result, setResult] = useState(null);

  const handleCompare = () => {
    if (!fromDate || !toDate) {
      alert("Please select both dates.");
      return;
    }
    
    if (!storageKey) return;
    const intakeList = JSON.parse(localStorage.getItem(storageKey)) || [];
    const fromEntry = intakeList.find(item => item.date === formatDate(fromDate));
    const toEntry = intakeList.find(item => item.date === formatDate(toDate));

    if (!fromEntry || !toEntry) {
      alert("No intake data found for selected dates.");
      return;
    }

    const difference = Math.abs(
      parseFloat(toEntry.quantity) - parseFloat(fromEntry.quantity)
    );

    setResult(difference);
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString();
  };

  return (
  <div>
    <Navbar />
    <div className="container py-4">
      <h2 className="mb-4">Compare Water Intake</h2>
      <div className="row mb-3">
        <div className="col-md-6">
          <label>From Date</label>
          <input type="date" className="form-control" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
        </div>
        <div className="col-md-6">
          <label>To Date</label>
          <input type="date" className="form-control" value={toDate} onChange={(e) => setToDate(e.target.value)} />
        </div>
      </div>
      <button className="btn btn-primary"style={{marginLeft:'45%',marginTop:'20px'}} onClick={handleCompare}>
        Compare
      </button>
        
      {result !== null && (
        <div className="mt-4 alert alert-info">
          <h5>Difference: {result} Liters</h5>
        </div>
      )}
    </div>
  </div>
  );
}

export default Compare;
