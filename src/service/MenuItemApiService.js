import axios from 'axios'

const MENUITEM_API_BASE_URL = 'http://localhost:8080/api/menuItems'

class MenuItemApiService {

    fetchMenuItems() {
        var res = axios.get(MENUITEM_API_BASE_URL);
        return res;
    }

    async fetchMenuItemById(MenuItemId) {
        let res = null;
        
        try {
        res = await axios.get(MENUITEM_API_BASE_URL + '/' + MenuItemId);
        } catch (err) {
            res = err.response;
        } finally {
            console.log("Fetched MenuItem: ")
            console.log(res);
            return res;
        }
    }

    async deleteMenuItem(MenuItemId) {
        let res = null;

        try {
        res = await axios.delete(MENUITEM_API_BASE_URL + '/' + MenuItemId);
        } catch (err) {
            res = err.response;
        } finally {
            console.log(res);
            return res;
        }
    }

    addMenuItem(MenuItem) {
        console.log(MenuItem);
        return axios.post(MENUITEM_API_BASE_URL, MenuItem);
    }

    editMenuItem(MenuItem) {
        console.log(MenuItem)
        return axios.put(MENUITEM_API_BASE_URL + '/' + MenuItem.id, MenuItem);
    }

}

export default new MenuItemApiService();
