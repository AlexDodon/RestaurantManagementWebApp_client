import axios from 'axios'

const STOCK_API_BASE_URL = 'http://localhost:8080/api/stockItems'

class StockApiService {

    fetchStocks() {
        var res = axios.get(STOCK_API_BASE_URL);
        return res;
    }

    async fetchStockById(StockId) {
        let res = null;
        
        try {
        res = await axios.get(STOCK_API_BASE_URL + '/' + StockId);
        } catch (err) {
            res = err.response;
        } finally {
            console.log("Fetched Stock: ")
            console.log(res);
            return res;
        }
    }

    async deleteStock(StockId) {
        let res = null;

        try {
        res = await axios.delete(STOCK_API_BASE_URL + '/' + StockId);
        } catch (err) {
            res = err.response;
        } finally {
            console.log(res);
            return res;
        }
    }

    addStock(Stock) {
        console.log(Stock);
        return axios.post(STOCK_API_BASE_URL, Stock);
    }

    editStock(Stock) {
        console.log(Stock)
        return axios.put(STOCK_API_BASE_URL + '/' + Stock.id, Stock);
    }

}

export default new StockApiService();
