https://learn-2.galvanize.com/cohorts/3231/blocks/94/content_files/Front%20End%20Capstone/project-atelier-catwalk/qa.md

1) GET '/qa/questions'
  - requires a product_id parameter in the URL
  - ex. https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions?product_id=1
  - returns a list of Q's about a given product


2) GET '/qa/questions/:question_id/answers'
  - requires a product_id parameter in the URL
  - ex. https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions/1/answers
  - returns a list of answers to a given question ID.


3) POST '/qa/questions'
  - will write a new question to the db
  - expects a body with the following parameters
  Param | type | description
  body  	text	 Text of question being asked
  name  	text  	Username for question asker
  email 	text  	Email address for question asker
  product_id	integer  	Required ID of the Product for which the question is posted

4) POST '/qa/questions/:question_id/answers'
  - writes an answer to a given question in the db
  - requires a product_id parameter in the URL
  - ex. https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions/1/answers
  - expects a body with the following parameters
  Param | type | description
body	text	Text of question being asked
name	text	Username for question asker
email	text	Email address for question asker
photos	[text, ...]	An array of urls corresponding to images to display

5) PUT '/qa/questions/:question_id/helpful'
  - -updates a given question, marks it as helpful
  - ex https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions/1/helpful
  - requires a product_id parameter in the URL

6) PUT '/qa/questions/:question_id/report'
  - updates a Q to show it was reported, doesn't delete it from db but it will not be returned in subsequent get requests
  - requuires a question_id in URL
  - ex https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions/1/report

7) PUT /qa/answers/:answer_id/helpful
  - updates a given answer, marks it as helpful
  - weird that it doesnt need an associated question id but this is what learn says. a PUT req the URL below works so it should be good (204)
  - ex https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/answers/1/helpful

8) PUT /qa/answers/:answer_id/report
  - - updates an answer to show it was reported, doesn't delete it from db but it will not be returned in subsequent get requests
  - requuires an answer id in URL
  - ex https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions/1/report

*********examples****************************

1) GET '/qa/questions'
{
  "product_id": "5",
  "results": [{
        "question_id": 37,
        "question_body": "Why is this product cheaper here than other sites?",
        "question_date": "2018-10-18T00:00:00.000Z",
        "asker_name": "williamsmith",
        "question_helpfulness": 4,
        "reported": false,
        "answers": {
          68: {
            "id": 68,
            "body": "We are selling it here without any markup from the middleman!",
            "date": "2018-08-18T00:00:00.000Z",
            "answerer_name": "Seller",
            "helpfulness": 4,
            "photos": []
            // ...
          }
        }
      },
      {
        "question_id": 38,
        "question_body": "How long does it last?",
        "question_date": "2019-06-28T00:00:00.000Z",
        "asker_name": "funnygirl",
        "question_helpfulness": 2,
        "reported": false,
        "answers": {
          70: {
            "id": 70,
            "body": "Some of the seams started splitting the first time I wore it!",
            "date": "2019-11-28T00:00:00.000Z",
            "answerer_name": "sillyguy",
            "helpfulness": 6,
            "photos": [],
          },
          78: {
            "id": 78,
            "body": "9 lives",
            "date": "2019-11-12T00:00:00.000Z",
            "answerer_name": "iluvdogz",
            "helpfulness": 31,
            "photos": [],
          }
        }
      },
      // ...
  ]
}



2) GET 'qa/questions/:question_id/answers'

{
  "question": "1",
  "page": 0,
  "count": 5,
  "results": [
    {
      "answer_id": 8,
      "body": "What a great question!",
      "date": "2018-01-04T00:00:00.000Z",
      "answerer_name": "metslover",
      "helpfulness": 8,
      "photos": [],
    },
    {
      "answer_id": 5,
      "body": "Something pretty durable but I can't be sure",
      "date": "2018-01-04T00:00:00.000Z",
      "answerer_name": "metslover",
      "helpfulness": 5,
      "photos": [{
          "id": 1,
          "url": "urlplaceholder/answer_5_photo_number_1.jpg"
        },
        {
          "id": 2,
          "url": "urlplaceholder/answer_5_photo_number_2.jpg"
        },
        // ...
      ]
    },
    // ...
  ]
}


