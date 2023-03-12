let restaurants;

export default class RestaurantsDAO {
    static async getConnection(conn) {
        if (restaurants)
            return;
        try {
            restaurants = await conn.db(process.env.RESTREVIEW_NS).collection("restaurants");
        } catch (err) {
            console.error(`Unable to get connection ${err}`);
        }
    }

    static async getRestaurants({
        filters = null,
        page = 0,
        restaurantsPerPage = 20
    } = {}) {
        let query;
        if (filters) {
            if ("name" in filters) {
                query = { $text: { $search: filters["name"] } };
            } else if ("cuisine" in filters) {
                query = { "cuisine": { $eq: filters["cuisine"] } };
            } else if ("zipcode" in filters) {
                query = { "address.zipcode": { $eq: filters["zipcode"] } };
            }
        }

        let curser
        try {
            curser = await restaurants
                .find(query)
        } catch (err) {
            console.error(`unable to find command ${err}`);
            return { restaurantsList: [], noOfRestaurants: 0 };
        }

        let displayCursor = curser.limit(restaurantsPerPage).skip(restaurantsPerPage * page);
        try {
            const restaurantsList = await displayCursor.toArray();
            const noOfRestaurants = await restaurants.countDocuments(query);
            return { restaurantsList, noOfRestaurants };
        } catch (err) {
            console.error(`unable to convert arr or problem in counting  ${err}`);
            return { restaurantsList: [], noOfRestaurants: 0 };
        }
    }
}