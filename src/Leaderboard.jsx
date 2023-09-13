import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AgGridReact } from "ag-grid-react";
import { useState, useEffect } from "react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "./Leaderboard.css";
import axios from "axios";

function Leaderboard() {
  let [rowData, setRowData] = useState([]);
  let columnDefs = [
    { field: "rank", width: 100 },
    { field: "username", width: 150 },
    { field: "score", width: 100 },
    { field: "date", width: 150 },
  ];

  useEffect(() => {
    axios
      .get("http://localhost:3000")
      .then((res) => {
        return res.data;
      })
      .then((data) => {
        //sort the higher values at the top
        data.sort((a, b) => {
          return b.score - a.score;
        });
        let rank = 1;
        data.forEach((entry) => {
          entry.rank = rank;
          rank += 1;
        });
        console.log(data);
        setRowData(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="container">
      <div
        className="ag-theme-alpine leaderboard"
        style={{ height: 400, width: 550 }}
      >
        <AgGridReact rowData={rowData} columnDefs={columnDefs}></AgGridReact>
      </div>
      <Link to="/">
        <Button variant="primary" className="home">
          Home
        </Button>
      </Link>
    </div>
  );
}

export default Leaderboard;
