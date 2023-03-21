import mongodb from "mongodb";
const ObjectId = mongodb.ObjectId;

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

    static async getRestaurantById(id) {
        try {
            const pipeline = [
                {
                    $match: {
                        _id: new ObjectId(id),
                    },
                },
                {
                    $lookup: {
                        from: "reviews",
                        let: {
                            id: "$_id",
                        },
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $eq: ["$restaurant_id", "$$id"],
                                    },
                                },
                            },
                            {
                                $sort: {
                                    date: -1,
                                },
                            },
                        ],
                        as: "reviews",
                    },
                },
                {
                    $addFields: {
                        reviews: "$reviews",
                    },
                },
            ]
            return await restaurants.aggregate(pipeline).next()
        } catch (e) {
            console.error(`Something went wrong in getRestaurantByID: ${e}`)
            throw e
        }
    }

    static async getCuisines() {
        let cuisins = [];
        try {
            cuisins = await restaurants.distinct("cuisine");
        } catch (e) {
            console.error(`unable to get cuisine ${e}`)
        }
        return cuisins;
    }
}