import { useState } from "react";
import data from "./data";
import "./style.css";

export default function Accordian() {
  const [selected, setSelected] = useState(null);
  const [enableMultiSelection, setEnableMultiSelection] = useState(false);
  const [multiple, setMultiple] = useState([]);

  function handleSingleSelection(getCurrentId) {
    setSelected(getCurrentId === selected ? null : getCurrentId);
  }

  function handleMultipleSelection(getCurrentId) {
    let cpyMultiple = [...multiple];
    let checkIndexOfArray = cpyMultiple.indexOf(getCurrentId);

    if (checkIndexOfArray === -1) {
      cpyMultiple.push(getCurrentId);

      setMultiple(cpyMultiple);
    }
  }

  return (
    <div className="wrapper">
      <button onClick={() => setEnableMultiSelection(!enableMultiSelection)}>
        Enable Multi-Selection
      </button>
      <div className="accordian">
        {data && data.length > 0 ? (
          data.map((dataItem) => (
            <div className="item" key={dataItem.id}>
              <div
                onClick={
                  enableMultiSelection
                    ? () => handleMultipleSelection(dataItem.id)
                    : () => handleSingleSelection(dataItem.id)
                }
                className="title"
              >
                <h3>{dataItem.question}</h3>
                <span>+</span>
              </div>
              {enableMultiSelection
                ? multiple.indexOf(dataItem.id) !== -1 && (
                    <div className="content">
                      <p>{dataItem.answer}</p>
                    </div>
                  )
                : selected === dataItem.id && (
                    <div className="content">
                      <p>{dataItem.answer}</p>
                    </div>
                  )}
              {/*  {selected === dataItem.id ? (
                <div className="content">
                  <p>{dataItem.answer}</p>
                </div>
              ) : null} */}
            </div>
          ))
        ) : (
          <div>No data found</div>
        )}
      </div>
    </div>
  );
}
