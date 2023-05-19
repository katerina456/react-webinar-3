import React from "react";
import PropTypes from 'prop-types';
import './style.css';

function Controls({onOpen, count, summa}){
  return (
    <div className='Controls'>
      <p className="Controls-info">В корзине: 
        <span className="Controls-span">
          {count !== 0? ` ${count} / ${summa}  ₽` : ' пусто'}
        </span>
      </p>
      <button onClick={() => onOpen()}>Перейти</button>
    </div>
  )
}

Controls.propTypes = {
  onOpen: PropTypes.func
};

Controls.defaultProps = {
  onOpen: () => {}
}

export default React.memo(Controls);
