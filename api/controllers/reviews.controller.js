
const GOOGLE_API_KEY = 'AIzaSyAGeCHJUU7bk1WF0MLf5B2pc4GtfTsdA9Q';
const PLACE_ID = 'ChIJZ3WdMqSPeWcRaqOZEYf-g34';

export const getGoogleReviews = async (req, res, next) => {

    try {
        const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&key=${GOOGLE_API_KEY}`;
        const response = await fetch(url);
        const reviews = await response.json();
        res.json(reviews.result.reviews);
    } catch (error) {
        console.error("Error fetching reviews:", error.message);
        res.status(500).send("Server error");
    }
}