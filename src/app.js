import React, {useCallback} from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Basket from './components/basket';
import Layout from './components/layout';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {

  const list = store.getState().list;
  
  let count = 0;
  let summa = 0;

  let basket = store.basket
  basket.forEach(element => {
    count += element.count;
    summa += element.count * element.price
  });

  const callbacks = {
    onAddBasketItem: useCallback((code) => {
      store.addBasketItem(code);
    }, [store]),

    onRemoveBasketItem: useCallback((code) => {
      store.removeBasketItem(code);
    }, [store]),

    /* onSelectItem: useCallback((code) => {
      
      store.selectItem(code);
    }, [store]), */

    onOpen: useCallback(() => {
      store.openBasket();
    }, [store]),

    onClose: useCallback(() => {
      store.closeBasket();
    }, [store])
  }

  return (
    <PageLayout>
      <Head title='Магазин'/>
      <Controls onOpen={callbacks.onOpen} count={count} summa={summa} />
      <List list={list}
            onAddBasketItem={callbacks.onAddBasketItem}
            /* onSelectItem={callbacks.onSelectItem} *//>

      {store.showBasket &&<Layout>
         <Basket basketList={basket} summa={summa} 
            onRemoveBasketItem={callbacks.onRemoveBasketItem} onClose={callbacks.onClose} />
      </Layout>}
      
    </PageLayout>
  );
}

export default App;
