import React, { useState } from "react"
// import FontAwesome from "react-fontawesome"
import { ArrowDownCircle, ArrowUpCircle } from "react-feather"
import "./dropdown.css"

function Dropdown({ title, data }) {
  const [listOpen, setListOpen] = useState(false)

  const toggleList = () => {
    setListOpen(!listOpen)
  }

  return (
    <div className="dd-wrapper">
      <div className="dd-header" onClick={() => toggleList()}>
        <div className="dd-header-title">{title}</div>
        {listOpen ? <ArrowDownCircle /> : <ArrowUpCircle />}
      </div>
      {listOpen && (
        <ul className="dd-list">
          {data.map((item) => (
            <li className="dd-list-item" key={item.id}>
              {item.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Dropdown
