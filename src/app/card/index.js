import {memo, useCallback, useEffect, useState} from 'react';
import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import List from "../../components/list";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import Pages from '../../components/pages';
import CardInfo from '../../components/card-info';
import { useParams } from "react-router-dom"

function Card() {

  const store = useStore();

  const [index, setIndex] = useState()

/*   useEffect(() => {
    
    store.actions.catalog.openPage("646b6e1fe1626c0bd8518053")

  }, []); */

  

  /* useEffect(() => {
    store.actions.catalog.findLimit();
  }, []); */

  const select = useSelector(state => ({
    product: state.catalog.product,
    flag: state.catalog.flag,
    amount: state.basket.amount,
    sum: state.basket.sum
  }));

  console.log('a',select.product)

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
  }

  const renders = {
    item: useCallback((item) => {
      return <Item item={item} onAdd={callbacks.addToBasket}/>
    }, [callbacks.addToBasket]),
  };

  return (
    
    <PageLayout>
      <Head title={select.flag? select.product.title : ''}/>
      <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount}
                  sum={select.sum}/>
      <CardInfo product={select.product} flag={select.flag} onAdd={callbacks.addToBasket} />
      
      {/* <List list={select.list} renderItem={renders.item}/>
      <Pages handleClick={(count) => setIndex(count)} limit={select.limit} /> */}
    </PageLayout>
    
  );
}

export default memo(Card);