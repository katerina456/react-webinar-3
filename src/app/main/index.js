import {memo, useCallback, useEffect, useState, useMemo} from 'react';
import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import List from "../../components/list";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import Pages from '../../components/pages';

function Main() {

  const store = useStore();

  const [index, setIndex] = useState(0)

  useEffect(() => {
    store.actions.catalog.load(index);
  }, [index]);

  useEffect(() => {
    store.actions.catalog.findLimit();
  }, []);

  const select = useSelector(state => ({
    list: state.catalog.list,
    limit: state.catalog.limit,
    amount: state.basket.amount,
    sum: state.basket.sum
  }));

  const pagesArray = useMemo(() => {
    let array = [1]
    if (index <= 20) {
      array.push(2, 3)
      if (index < 20) {
        array.push('...')
      } else {
        array.push(4, '...')
      }
    } else if (select.limit - index /10 < 4) {
      array.push('...', select.limit - 4, select.limit - 3, select.limit - 2)
    } else {
      array.push('...', index / 10 - 1, index / 10 , index / 10 + 1, '...')
    }

    array.push(select.limit - 1)
    return array
  }, [select, index])

  const callbacks = {
    openCard: useCallback(_id => store.actions.catalog.openPage(_id),[store]),
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
  }

  const renders = {
    item: useCallback((item) => {
      return <Item item={item} onOpen={callbacks.openCard} onAdd={callbacks.addToBasket}/>
    }, [callbacks.addToBasket]),
  };

  return (  
    <PageLayout>
      <Head title='Магазин'/>
      <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount}
                  sum={select.sum}/>
      <List list={select.list} renderItem={renders.item}/>
      <Pages handleClick={(count) => setIndex(count)} array={pagesArray} />
    </PageLayout>
    
  );
}

export default memo(Main);
