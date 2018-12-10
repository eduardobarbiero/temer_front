import configs  from 'configs/index';
import axios from 'axios';

// Store controller de Produtos
export default class ProductsController {

    // Listagem de produtos
    static index() {
        return new Promise((resolve, reject) => {
            axios.get(`${configs.api.apiUrl}/api/products`).then(data => resolve(data.data)).catch(() => reject(true));
        })
    }
}