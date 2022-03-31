https://learn-2.galvanize.com/cohorts/3231/blocks/94/content_files/Front%20End%20Capstone/project-atelier-catwalk/reviews.md

1) GET '/reviews?'
  - Requires a product_id parameter to be encoded in the url
  - ex https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews?product_id=2
  -more parameters are in learn
  -it will return an object that includes an array which contains info about all the reviews for the given id

2) GET '/reviews/meta?'
   - Requires a product_id parameter to be encoded in the url
  - ex https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews/meta?product_id=2
  -more parameters are in learn
  -it will return an object that has info about the overall result of all the reviews, i.e. total ratings etc...

3) POST '/reviews'
  - Expects a body with the following properties
  - product_id	integer	Required ID of the product to post the review for
  - rating	int	Integer (1-5) indicating the review rating
  - summary	text	Summary text of the review
  - body	text	Continued or full text of the review
  - recommend	bool	Value indicating if the reviewer recommends the product
  - name	text	Username for question asker
  - email	text	Email address for question asker
  - photos	[text]	Array of text urls that link to images to be shown
  - characteristics	object	Object of keys representing characteristic_id and values representing the review value for that characteristic. { "14": 5, "15": 5 //...}


4) PUT '/reviews/:review_id/helpful
  - Updates a given review, marking it as 'helpful'
  - requires a review_id in the URL
  - will return 204 if successful

5) PUT '/reviews/:review_id/report'
  - updates a given review, marking it as 'reported', it will not delete it from the db, but it will not be sent over in subsequent get requests to '/reviews'
  - will return 204 if successful


************  Examples *******************


1) GET '/reviews?'
{
  "product": "2",
  "page": 0,
  "count": 5,
  "results": [
    {
      "review_id": 5,
      "rating": 3,
      "summary": "I'm enjoying wearing these shades",
      "recommend": false,
      "response": null,
      "body": "Comfortable and practical.",
      "date": "2019-04-14T00:00:00.000Z",
      "reviewer_name": "shortandsweeet",
      "helpfulness": 5,
      "photos": [{
          "id": 1,
          "url": "urlplaceholder/review_5_photo_number_1.jpg"
        },
        {
          "id": 2,
          "url": "urlplaceholder/review_5_photo_number_2.jpg"
        },
        // ...
      ]
    },
    {
      "review_id": 3,
      "rating": 4,
      "summary": "I am liking these glasses",
      "recommend": false,
      "response": "Glad you're enjoying the product!",
      "body": "They are very dark. But that's good because I'm in very sunny spots",
      "date": "2019-06-23T00:00:00.000Z",
      "reviewer_name": "bigbrotherbenjamin",
      "helpfulness": 5,
      "photos": [],
    },
    // ...
  ]
}

2) GET '/reviews/meta'
{
  "product_id": "2",
  "ratings": {
    2: 1,
    3: 1,
    4: 2,
    // ...
  },
  "recommended": {
    0: 5
    // ...
  },
  "characteristics": {
    "Size": {
      "id": 14,
      "value": "4.0000"
    },
    "Width": {
      "id": 15,
      "value": "3.5000"
    },
    "Comfort": {
      "id": 16,
      "value": "4.0000"
    },
    // ...
}