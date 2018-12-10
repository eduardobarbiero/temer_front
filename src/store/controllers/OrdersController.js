import configs  from 'configs/index';
import axios from 'axios';

// Store controller de Pedidos
export default class OrdersController {

    // Listagem dos pedidos
    static index() {
        return new Promise((resolve, reject) => {
            axios.get(`${configs.api.apiUrl}/api/orders`).then(data => resolve(data.data)).catch(() => reject(true));
        })
    }

    // Cria pedido
    static create(send) {
        return new Promise((resolve, reject) => {
            axios.post(`${configs.api.apiUrl}/api/orders`, Object.assign({}, send))
                .then((data) => resolve(data.data))
                .catch((data) => reject(true))
        });
    }

    // Retorna um pedido por id
    static edit(orderId) {
        return new Promise((resolve, reject) => {
            axios.get(`${configs.api.apiUrl}/api/orders/${orderId}`).then(data => resolve(data.data)).catch(() => reject(true));
        })
    }

    // Atualiza pedido
    static update(send) {        
        return new Promise((resolve, reject) => {
            axios.put(`${configs.api.apiUrl}/api/orders/${send.id}`, Object.assign({}, send))
                .then((data) => resolve(data.data))
                .catch((data) => reject(true))
        });
    }

    // Deleta pedido
    static delete(orderId) {
        return new Promise((resolve, reject) => {
            axios.delete(`${configs.api.apiUrl}/api/orders/${orderId}`)
                .then((data) => resolve(true))
                .catch((data) => reject(true))
        });
    }    
}