import {memo, useCallback, useEffect, useState} from 'react';
import './style.css';


function CardInfo() {


  return (
    <div className='Card-info'>
      <p className='card-info-text'>
        Описание товара из множества букв. Описание товара из букв. В АПИ может быть меньше букв. Описание товара из множества букв.
      </p>
      <p className='card-info-text'>
        Страна производитель: <span className='card-info-bold'>Россия (RU)</span>
      </p>
      <p className='card-info-text'>
        Категория: <span className='card-info-bold'>Электронника123a</span>
      </p>
      <p className='card-info-text'>
        Год выпуска: <span className='card-info-bold'>2015</span>
      </p>
      <p className='card-info-text card-info-price'>
        Цена: 12,57 ₽
      </p>
      <button className='card-indo-button'>Добавить</button>
    </div>
  );
}

export default memo(CardInfo);