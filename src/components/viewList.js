import { useEffect, useState } from "react";
import Navbar from "./navbar";
import { useSelector } from "react-redux";

function ViewList() {
  const user = useSelector(state => state.auth.user);
  const storageKey = user ? "intakeList_" + user.email : null;
  const [intakeList, setIntakeList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 3;
  
  useEffect(() => {
    if (!storageKey) return;
    const storedData = JSON.parse(localStorage.getItem(storageKey)) || [];
    setIntakeList(storedData);
  }, [storageKey]);

  const handleDelete = (id) => {
    if (!storageKey) return;
    const confirmDelete = window.confirm("Are you sure you want to delete this record?");
    if (!confirmDelete) return;
    const updatedList = intakeList.filter(item => item.id !== id);
    localStorage.setItem(storageKey, JSON.stringify(updatedList));
    setIntakeList(updatedList);
    if (currentRecords.length === 1 && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleEdit = (id) => {
    if (!storageKey) return;
    const newQuantity = prompt("Enter updated quantity in Liters");
    if (!newQuantity) return;
    const updatedList = intakeList.map(item => {
      if (item.id === id) {
        return {
          ...item,
          quantity: newQuantity,
          time: new Date().toLocaleTimeString()
        };
      }
      return item;
    });

    localStorage.setItem(storageKey, JSON.stringify(updatedList));
    setIntakeList(updatedList);
  };

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;

  const currentRecords = intakeList.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );

  const totalPages = Math.ceil(intakeList.length / recordsPerPage);

  const goToPrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
  <div>
    <Navbar />
    <div className="container py-4">
      <h2 className="mb-4">Water Intake History</h2>
      {intakeList.length === 0 ? (<p>No records found.</p> ) : (
          <div>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Date</th>
                <th>Quantity</th>
                <th>Logged Time</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentRecords.map((item) => (
                <tr key={item.id}>
                  <td>{item.date}</td>
                  <td>{item.quantity} L</td>
                  <td>{item.time}</td>
                  <td>
                    <button className="btn btn-sm btn-warning mr-2" onClick={() => handleEdit(item.id)}>Edit</button>
                    <button className="btn btn-sm btn-danger" onClick={() => handleDelete(item.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          <ul className="pagination justify-content-center">
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <button className="page-link" onClick={goToPrevious}>Previous</button>
            </li>
            {[...Array(totalPages)].map((_, index) => (
              <li key={index} className={`page-item ${currentPage === index + 1 ? "active" : ""}`}>
              <button className="page-link" onClick={() => setCurrentPage(index + 1)} >
                {index + 1}
              </button>
            </li>
          ))}

            <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
              <button className="page-link" onClick={goToNext}>Next</button>
             </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default ViewList;
