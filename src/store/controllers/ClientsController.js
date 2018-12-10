import configs  from 'configs/index';
import axios from 'axios';

// Store controller de Clientes
export default class ClientsController {

    // Listagem de clientes
    static index() {
        return new Promise((resolve, reject) => {
            axios.get(`${configs.api.apiUrl}/api/clients`).then(data => resolve(data.data)).catch(() => reject(true));
        })
    }
}