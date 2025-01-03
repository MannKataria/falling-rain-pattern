import React, { useState } from "react";
import { Link } from "react-router-dom";

import styles from "./Grid.module.css";

const Grid = () => {
  const [row, setRow] = useState("");
  const [col, setCol] = useState("");

  return (
    <div className={styles.gridOuterContainer}>
      <div className={styles.gridInnerContainer}>
        <h1 className={styles.heading}>Generate Grid</h1>
        <div>
          <input
            placeholder="Number of Rows..."
            className={styles.gridInput}
            type="text"
            onChange={(event) => setRow(event.target.value)}
          />
        </div>
        <div>
          <input
            placeholder="Number of Columns..."
            className={`${styles.gridInput} ${styles.mt20}`}
            type="text"
            onChange={(event) => setCol(event.target.value)}
          />
        </div>
        <Link
          onClick={(event) => (!row || !col ? event.preventDefault() : null)}
          to={`/rain?row=${row}&col=${col}`}
        >
          <button className={`${styles.button} ${styles.mt20}`} type="submit">
            Generate
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Grid;
