import React, { useEffect } from "react";
import "./sidebar.css";
import optionBank from "../../../data/OptionBank";
import { FaEraser, FaUndo } from "react-icons/fa";
import { i18n } from "../../../i18n";

function Sidebar({ screenshot, value, setvalue, setAmount, setSize, size
  , undo,
  erase,
  color,
  changeColor,
  brushSize,
  changeBrushSize,
  clear


}) {
  useEffect(() => {
    let data;
  }, [value]);



  return (
    <div className="app__sidebar">
      <div className="sidebar__form">
        <div className="form__group">
          <label htmlFor=""> {i18n('common.selectbank')}</label>
          <select
            name="bank"
            className="app__select"
            onChange={(e) => setvalue(e.target.value)}
          >
            {optionBank.map((item, index) => (
              <option key={index} value={item.value}>{item.name} </option>
            ))}
          </select>
        </div>
        {value === "800" && (
          <div className="form__group">
            <label htmlFor=""> {i18n('common.selectsize')}</label>
            <select
              name="bank"
              className="app__select"
              onChange={(e) => setSize(e.target.value)}
            >
              <option value="small">Small</option>
              <option value="large">Large</option>
            </select>
          </div>
        )}
        <div className="form__group">
          <label htmlFor=""> {i18n('common.writeamount')}</label>
          <input
            type="text"
            onChange={(e) => setAmount(e.target.value)}
            maxLength={7}
          />
        </div>
        <div className="form__group">
          <label htmlFor="">{i18n('common.tools')}</label>
          <div className="app__tools">
            <input type="color" value={color} onChange={changeColor} className="btn--color" />
            <button className="undo" onClick={undo}>
              <FaUndo />
            </button>
            <button onClick={erase} className="erase__button">
              <FaEraser />
            </button>
          </div>
        </div>
        <div className="form__group">
          <label htmlFor="">{i18n('common.brushsize')}</label>
          <input
            type="range"
            min="1"
            max="70"
            value={brushSize}
            onChange={changeBrushSize}
          />
          <button onClick={clear} className="clear__button">Clear</button>
        </div>
      </div>
      <div className="app__screenshot" onClick={() => screenshot()}>
        <img src="/sidebar/screenshot.png" alt="" width={80} />
      </div>
    </div>
  );
}

export default Sidebar;
