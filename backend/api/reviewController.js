import ReviewDAO from "../dao/reviewDAO.js";

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

            const response = await ReviewDAO.addReview(restaurantId, reviewTxt, userInfo, date);
            var { error } = response;
            if(error)
                res.status(400).json({error});
            res.json({status : "sucesss"});
        } catch (e){
            res.status(500).json({error : e.message})
        }
    }

    static async apiUpdateReview(req, res, next){
        try{
            const reviewId = req.body.reviewId;
            const reviewTxt = req.body.reviewTxt;
            const userId = req.body.user_id;
            const date = new Date();

            const response = await ReviewDAO.updateReview(reviewId, reviewTxt, userId, date);

            var { error } = response;
            if(error)
                res.status(400).json({error});
            if(response.modifiedCount === 0){
                throw new Error("unable to update review, user may not the original poster");
            }
            res.json({status : "sucesss"});
        } catch (e){
            res.status(500).json({error : e.message})
        }
    }

    static async apiDeleteReview(req, res, next){
        try{
            const reviewId = req.query.reviewId;
            const userId = req.body.user_id;

            const response = await ReviewDAO.deleteReview(reviewId, userId);
            var { error } = response;
            if(error)
                res.status(400).json({error});
            res.json({status : "sucesss"});
        } catch (e){
            res.status(500).json({error : e.message})
        }
    }

}