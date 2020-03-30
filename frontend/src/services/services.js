import axios from 'axios';
/*primeiro instala o pacote axios

configura a url base para toda requisição e depois importa o pacote em casa classe
*/
const api = axios.create({
    baseURL: 'http://localhost:3333'
});

export default api;