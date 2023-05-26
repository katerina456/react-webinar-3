import {memo, useState} from "react";
import PropTypes from 'prop-types';
import Item from "../item";
import './style.css';

function Pages({limit, handleClick}){

  const [id, setId] = useState(0);

  function chagePage(elem) {
    elem.style.background = 'green'
    handleClick(+elem.dataset.id * 10)
  }

  return (
    <div className='Pages'>{
      Array.from(new Array(limit)).map((item, index) => 
      <div key={index} className="Pages-item" data-id={index} 
           onClick={(event) => chagePage(event.target)}>
        {index + 1}
      </div>
      )}
    </div>
  )
}



export default memo(Pages);