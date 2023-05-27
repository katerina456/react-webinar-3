import {memo, useState} from "react";

import './style.css';

function Pages({handleClick, array}){

  const [id, setId] = useState(0);

  function chagePage(elem) {
    setId(+elem.dataset.id * 10)
    handleClick(+elem.dataset.id * 10)
  }
  
  return (
    <div className='Pages'>{

    array.map((item, index) => {
      if (item !== '...') {
        return (<div key={item + index} className="Pages-item" data-id={item} 
                onClick={(event) => chagePage(event.target)}
                style={{background: item * 10 ===id && '#0087E9'}}>
                  {item}
                </div>)
        } else {
          return (<div key={item + index} className="Pages-item Pages-dots">
                    {item}
                  </div>)
        }
      }
          
      )}
    </div>
  )
}



export default memo(Pages);

{/* <div key={item} className="Pages-item" data-id={item} 
              onClick={(event) => chagePage(event.target)}>
            {item}
          </div> */}