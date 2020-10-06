import React, {useState} from "react"
// import { ArrowDownCircle, ArrowUpCircle } from "react-feather"
import "./dropdown.css"

function Dropdown({ title, data , handleDropDown}) {
//   const [listOpen, setListOpen] = useState(false)
//   const toggleList = () => {
//     setListOpen(!listOpen)
//   }
  const [dataValue, setDataValue] = useState(title)
  const onChange = ( event) => {
    setDataValue(event.target.value)
    handleDropDown(event.target.value)
  }

  return (
  <div>
      <select
          onChange={onChange}
          value={dataValue}>
          <option value={title} disabled>{title} </option>
          {data.map(({ name, id }) => (
          <option key={id} value={name}>
              {name}
          </option>
          ))}
      </select>
      <p>{dataValue}</p>
  </div>
    /* <div className="dd-wrapper">
        <div className="dd-header" onClick={() => toggleList()}>
        <div className="dd-header-title">{title}</div>
        {listOpen ? <ArrowDownCircle /> : <ArrowUpCircle />}
      </div>
      {listOpen && (
        <ul className="dd-list">
          {data.map((item) => (
            <li className="dd-list-item" key={item.id}>
              {item.name}
            </li>
          ))}
        </ul>
      )}
    </div> */
  )
}

export default Dropdown
