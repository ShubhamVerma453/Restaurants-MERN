import RestaurantsDAO from "../dao/restaurantsDAO.js";

export default class RestaurantController {
    static async apiGetRestaurants(req, res, next){
        let restaurantsPerPage = req.query.restaurantsPerPage ? parseInt(req.query.restaurantsPerPage, 10) : 20;
        let page = req.query.page ? parseInt(req.query.page, 2) : 0;
        let filters = {};
        if(req.query.cuisine){
            filters.cuisine = req.query.cuisine;
        } else if (req.query.zipcode) {
            filters.zipcode = req.query.zipcode;
        } else if (req.query.name){
            filters.name = req.query.name;
        }

        const {restaurantsList, noOfRestaurants} = await RestaurantsDAO.getRestaurants({
            filters,
            page,
            restaurantsPerPage
        });

        let response = {
            restaurants : restaurantsList,
            page : page,
            filters : filters,
            enteriesPerPage : restaurantsPerPage,
            totalRestaurants : noOfRestaurants
        }

        res.json(response);
    }

    static async apiGetRestaurantById(req, res, next){
        try {
            let id = req.params.id || {};

            let restaurant = await RestaurantsDAO.getRestaurantById(id);
            if(!restaurant){
                res.status(404).json({error : "restaurant not found"});
                return;
            }
            res.json(restaurant);
        } catch (e) {
            console.error(`api ${e}`);
            res.status(500).json({error : e});
        }
    }

    static async apiGetCuisines(req, res, next){
        try {
            let cuisines = await RestaurantsDAO.getCuisines();
            res.json(cuisines);
        } catch (e) {
            console.error(`api ${e}`);
            res.status(500).json({error : e});
        }
    }
}