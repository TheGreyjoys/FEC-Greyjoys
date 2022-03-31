Learn does not specify a way for a certain cart to be associated with a certain user or session. The GET route returns me an empty array, I was so far unable to get the POST route working though.

1) GET '/cart'
  - returns an array with all the items in the cart, inculing the sku_id and the count (# of those products)
 - ex)
[
    {
        "sku_id": 1,
        "count": 2
    },
    {
        "sku_id": 3,
        "count": 1
    },
    {
        "sku_id": 5,
        "count": 33
    },
    //...
]

2) POST '/cart'
  - attach a body with sku_id to add something to the cart.
  - I was unable to get this route to work on postman.
  - A POST req. to this route returned a status 500 (internal server error)
  - I imagine that it might secretly expect more parameters but the docs on learn are not helping.