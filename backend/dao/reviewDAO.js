import mongodb from "mongodb";
const ObjectId = mongodb.ObjectId;

let reviews;

export default class reviewsDAO {
    static async getConnection(conn) {
        if (reviews)
            return;
        try {
            reviews = await conn.db(process.env.RESTREVIEW_NS).collection("reviews");
        } catch (err) {
            console.error(`Unable to get connection ${err}`);
        }
    }

    static async addReview(restaurantId, reviewTxt, userInfo, date){
        try {
            const reviewDoc = {
                user : userInfo.name,
                user_id : userInfo._id,
                date : date,
                review : reviewTxt,
                restaurant_id : new ObjectId(restaurantId)
            };
            return await reviews.insertOne(reviewDoc);
        } catch (e) {
            console.error(`unable to post review ${e}`);
            return {error : e};
        }
    }

    static async updateReview(reviewId, reviewTxt, userId, date){
        try {
            const response = await reviews.updateOne(
                {user_id : userId, _id : new ObjectId(reviewId)},
                {$set : {review : reviewTxt, date : date}}
            );
            return response;
        } catch (e) {
            console.error(`unable to update review ${e}`);
            return {error : e};
        }
    }

    static async deleteReview(reviewId, userId){
        try {
            const response = await reviews.deleteOne({
                _id : new ObjectId(reviewId),
                user_id : userId
            }) ;
            return response;
        } catch (e) {
            console.error(`unable to delete review ${e}`);
            return {error : e};
        }
    }
}