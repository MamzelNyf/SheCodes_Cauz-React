import React, {useState} from "react"
import "./dropdown.css"

function Dropdown({ title, data , handleDropDown, value}) {
  const [dataValue, setDataValue] = useState(title)
  const onChange = ( event) => {
    setDataValue(event.target.value)
    handleDropDown(event.target.value)
  }


  return (
  <div>
      <select
        className="dropdown"
          onChange={onChange}
          value={value  ? value : dataValue}>
          <option value={title} disabled>{title} </option>
          {data.map(({ name, id }) => (
          <option key={id} value={name}>
              {name}
          </option>
          ))}
      </select>
  </div>
  )
}

export default Dropdown
