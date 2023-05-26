import {codeGenerator} from "../../utils";
import StoreModule from "../module";

class Catalog extends StoreModule {

  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0);
    this.limit = 0
  }

  initState() {
    return {
      list: []
    }
  }

  async findLimit() {
    const response = await fetch(`/api/v1/articles?limit=1000&skip=1`);
    const json = await response.json();
    /* console.log(json.result.items.length) */
    /* this.limit = json.result.items.length; */
    /* console.log(this.limit) */
    this.setState({
      ...this.getState(),
      limit: Math.ceil(json.result.items.length / 10)
   }, 'Загружены товары из АПИ');
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
