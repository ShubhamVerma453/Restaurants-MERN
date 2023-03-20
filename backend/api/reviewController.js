import RestaurantsDAO from "../dao/restaurantsDAO.js";

export default class reviewCtrl {
    static async apiAddReview(req, res, next){
        try{
            const date = new Date();
            const restaurantId = req.body.restaurantId;
            const reviewTxt = req.body.reviewTxt;
            const userInfo = {
                name : req.body.name,
                _id : req.body.user_id
            }

            const response = await RestaurantsDAO.addReview(restaurantId, reviewTxt, userInfo, date);
            res.JSON({status : "sucesss"});
        } catch (e){
            res.status(500).JSON({error : e.message})
        }
    }

    static async apiUpdateReview(req, res, next){
        try{
            const reviewId = req.body.reviewId;
            const reviewTxt = req.body.reviewTxt;
            const userId = req.body.user_id;
            const date = new Date();

            const response = await RestaurantsDAO.updateReview(reviewId, reviewTxt, userId, date);

            var { error } = response;
            if(error)
                res.status(400).JSON({error});
            if(response.modifiedCount === 0){
                throw new Error("unable to update review, user may not the original poster");
            }
        } catch (e){
            res.status(500).JSON({error : e.message})
        }
    }

    static async apiDeleteReview(req, res, next){
        try{
            const reviewId = req.query.reviewId;
            const userId = req.body.user_id;

            const response = await RestaurantsDAO.deleteReview(reviewId, userId);
            res.JSON({status : "sucesss"});
        } catch (e){
            res.status(500).JSON({error : e.message})
        }
    }

}