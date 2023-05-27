import {codeGenerator} from "../../utils";
import StoreModule from "../module";

class Catalog extends StoreModule {

  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0);
    this.limit = 0;
    this.product = [];
    this.flag = false
  }

  initState() {
    return {
      list: []
    }
  }

  async openPage(id) {
    const response = await fetch(`/api/v1/articles/${id}`);
    const json = await response.json();
    let elem = json.result;
    this.setState({
      ...this.getState(),
      product: elem,
      flag: true
   }, 'Загружен максимум');
  }

  async findLimit() {
    const response = await fetch(`/api/v1/articles?limit=1000&skip=1`);
    const json = await response.json();
    this.setState({
      ...this.getState(),
      limit: Math.ceil(json.result.items.length / 10)
   }, 'Загружен максимум');
  }

  async load(index) {
    const response = await fetch(`/api/v1/articles?limit=10&skip=${index}`);
    const json = await response.json();
    this.setState({
       ...this.getState(),
       list: json.result.items
    }, 'Загружены товары из АПИ');
  }
}

export default Catalog;
