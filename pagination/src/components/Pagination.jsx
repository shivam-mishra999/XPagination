import React, {useState, useEffect} from 'react';
import styles from "./Pagination.module.css";

export default function Pagination() {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 10;

    useEffect(() => {
        fetch("https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json")
        .then((response) => {
            if(!response.ok){
                throw new Error("Failed to fetch data")
            }
            return response.json();
        })
        .then((data) => setData(data))
        .catch((error) => {
            console.log("Error in fetching data: ", error);
            alert('Failed to fetch data');
        },[]);
    })
    
    const numberOfPages = Math.ceil(data.length / recordsPerPage);


    const getPaginatedData = () => {
        const lastIndex = currentPage * recordsPerPage;
        const firstIndex = lastIndex - recordsPerPage;
        return data.slice(firstIndex, lastIndex);
    } 

    const handlePrevious = (event) => {
        if(currentPage > 1){
            setCurrentPage(currentPage-1);
        }
    }

    const handleNext = (event) => {
        if(currentPage < numberOfPages){
            setCurrentPage(currentPage + 1);
        }
    }




    
  return (
    <div className={styles.container}>
        <h1>Employee Data Table</h1>
      <table className={styles.table}>
        <thead>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
        </thead>
        <tbody>
                {getPaginatedData().map((item) => (
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.email}</td>
                        <td>{item.role}</td>
                    </tr>
                ))}
        </tbody>
      </table>
      <div className={styles.button}>
        <button onClick={handlePrevious}>Previous</button>
        <button>{currentPage}</button>
        <button onClick={handleNext}>Next</button>
      </div>
    </div>
  )
}
