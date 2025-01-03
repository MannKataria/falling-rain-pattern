import React, { useEffect, useState } from "react";
import styles from "./Rain.module.css";
import { useLocation, Link } from "react-router-dom";
import queryString from "query-string";

const Rain = () => {
  const location = useLocation();

  const [rows, setRows] = useState(15);
  const [cols, setCols] = useState(20);

  const [drops, setDrops] = useState([]);
  const [color, setColor] = useState({
    color1: "rgb(0, 0, 255)",
    color2: "rgba(0, 0, 255, 0.8)",
    color3: "rgba(0, 0, 255, 0.6)",
    color4: "rgba(0, 0, 255, 0.4)",
    color5: "rgba(0, 0, 255, 0.2)",
  });

  const generateDrops = () => {
    const dropPositions = [];
    while (dropPositions.length < cols) {
      const col = dropPositions.length;
      const randomRow = Math.floor(Math.random() * rows);
      const row2 = (randomRow + 1) % rows;
      const row3 = (row2 + 1) % rows;
      const row4 = (row3 + 1) % rows;
      const row5 = (row4 + 1) % rows;

      dropPositions.push({
        row1: randomRow,
        row2: row2,
        row3: row3,
        row4: row4,
        row5: row5,
        col: col,
      });
    }
    setDrops(dropPositions);
  };

  const moveDropsDown = () => {
    setDrops((prevDrops) => {
      return prevDrops.map((drop) => {
        const { row1, col } = drop;
        const newRow1 = (row1 + 1) % rows;
        const newRow2 = (newRow1 + 1) % rows;
        const newRow3 = (newRow2 + 1) % rows;
        const newRow4 = (newRow3 + 1) % rows;
        const newRow5 = (newRow4 + 1) % rows;
        return {
          row1: newRow1,
          row2: newRow2,
          row3: newRow3,
          row4: newRow4,
          row5: newRow5,
          col: col,
        };
      });
    });
  };

  useEffect(() => {
    const { row, col } = queryString.parse(location.search);
    setRows(row);
    setCols(col);
    generateDrops();

    const moveInterval = setInterval(moveDropsDown, 50);

    let j = 0;
    const colorChangeInterval = setInterval(() => {
      const colors = [
        {
          color1: "rgb(0, 0, 255)",
          color2: "rgba(0, 0, 255, 0.8)",
          color3: "rgba(0, 0, 255, 0.6)",
          color4: "rgba(0, 0, 255, 0.4)",
          color5: "rgba(0, 0, 255, 0.2)",
        },
        {
          color1: "rgb(0, 255, 255)",
          color2: "rgba(0, 255, 255, 0.8)",
          color3: "rgba(0, 255, 255, 0.6)",
          color4: "rgba(0, 255, 255, 0.4)",
          color5: "rgba(0, 255, 255, 0.2)",
        },
        {
          color1: "rgb(255, 0, 0)",
          color2: "rgba(255, 0, 0, 0.8)",
          color3: "rgba(255, 0, 0, 0.6)",
          color4: "rgba(255, 0, 0, 0.4)",
          color5: "rgba(255, 0, 0, 0.2)",
        },
        {
          color1: "rgb(0, 255, 0)",
          color2: "rgba(0, 255, 0, 0.8)",
          color3: "rgba(0, 255, 0, 0.6)",
          color4: "rgba(0, 255, 0, 0.4)",
          color5: "rgba(0, 255, 0, 0.2)",
        },
        {
          color1: "rgb(255, 255, 0)",
          color2: "rgba(255, 255, 0, 0.8)",
          color3: "rgba(255, 255, 0, 0.6)",
          color4: "rgba(255, 255, 0, 0.4)",
          color5: "rgba(255, 255, 0, 0.2)",
        },
      ];
      j = (j + 1) % colors.length;
      const newColor = colors[j];
      setColor(newColor);
    }, 1500);

    return () => {
      clearInterval(moveInterval);
      clearInterval(colorChangeInterval);
    };
  }, [rows, cols, location.search]);

  return (
    <div className={styles.rainOuterContainer}>
      <Link to="/">
        <button className={styles.backButton} type="submit">
            Back
        </button>
      </Link>
      <div
        className={styles.rainInnerContainer}
        style={{
          width: `${2.5 * cols}rem`,
          height: `${2.5 * rows}rem`,
        }}
      >
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <div key={rowIndex} className={styles.rainRow}>
            {Array.from({ length: cols }).map((_, colIndex) => {
              const isDrop1 = drops.some((drop) => {
                return drop.col === colIndex && drop.row5 === rowIndex;
              });
              const isDrop2 = drops.some((drop) => {
                return drop.col === colIndex && drop.row4 === rowIndex;
              });
              const isDrop3 = drops.some((drop) => {
                return drop.col === colIndex && drop.row3 === rowIndex;
              });
              const isDrop4 = drops.some((drop) => {
                return drop.col === colIndex && drop.row2 === rowIndex;
              });
              const isDrop5 = drops.some((drop) => {
                return drop.col === colIndex && drop.row1 === rowIndex;
              });
              return (
                <div
                  key={colIndex}
                  className={styles.rainCell}
                  style={{
                    backgroundColor: isDrop1
                      ? color.color1
                      : isDrop2
                      ? color.color2
                      : isDrop3
                      ? color.color3
                      : isDrop4
                      ? color.color4
                      : isDrop5
                      ? color.color5
                      : "transparent",
                  }}
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Rain;
