
An overview of the /products path, with its possible endpoints.
This path generally will get info regarding products. If you want the most specific info you must make a request to a specific product

1)Get '/products'
  - returns a list of products.

2)GET '/products/:product_id'
  - retuns info on a specific product. Its return value differs from the previous one. It returns just one object, which also includes a 'features' property that is not present on each product object in the whole list.

3) GET '/products/:product_id/styles'
  - returns an object that represents a product. It will have a property that is an array of all the 'styles' that the product comes in i.e. different color options for the same shoe. this also contains info on how many of each style and size are in stock.

4) GET /products/:product_id/related
  - gets an array of related product id's for the given product.


*************  examples *************


1) GET '/products' -
          ex
        [
          {
                "id": 1,
                "name": "Camo Onesie",
                "slogan": "Blend in to your crowd",
                "description": "The So Fatigues will wake you up and fit you in. This high energy camo will have you blending in to even the wildest surroundings.",
                "category": "Jackets",
                "default_price": "140"
            },
          {
                "id": 2,
                "name": "Bright Future Sunglasses",
                "slogan": "You've got to wear shades",
                "description": "Where you're going you might not need roads, but you definitely need some shades. Give those baby blues a rest and let the future shine bright on these timeless lenses.",
                "category": "Accessories",
                "default_price": "69"
            },
            // ...
          ]




  -GET '/products/:product_id' -
    ex

    {
      "id": 11,
      "name": "Air Minis 250",
      "slogan": "Full court support",
      "description": "This optimized air cushion pocket reduces impact but keeps a perfect balance underfoot.",
      "category": "Basketball Shoes",
      "default_price": "0",
      "features": [
        {
              "feature": "Sole",
              "value": "Rubber"
        },
        {
              "feature": "Material",
              "value": "FullControlSkin"
        },
      // ...
      ],
    }






  -GET '/products/:product_id/styles'
  - returns an object that represents a product. It will have a property that is an array of all the 'styles' that the product comes in i.e. different color options for the same shoe. this also contains info on how many of each style and size are in stock.

  {
    "product_id": "1",
    "results": [
  	{
            "style_id": 1,
            "name": "Forest Green & Black",
            "original_price": "140",
            "sale_price": "0",
            "default?": true,
            "photos": [
  			{
                    "thumbnail_url": "urlplaceholder/style_1_photo_number_thumbnail.jpg",
                    "url": "urlplaceholder/style_1_photo_number.jpg"
                },
  			{
                    "thumbnail_url": "urlplaceholder/style_1_photo_number_thumbnail.jpg",
                    "url": "urlplaceholder/style_1_photo_number.jpg"
                }
  			// ...
            ],
        "skus": {
                	"37": {
                    		"quantity": 8,
                    		"size": "XS"
                	},
                	"38": {
                    		"quantity": 16,
                    		"size": "S"
                	},
                	"39": {
                    		"quantity": 17,
                    		"size": "M"
                	},
            //...
            	}
    },
  {
        "style_id": 2,
        "name": "Desert Brown & Tan",
        "original_price": "140",
        "sale_price": "0",
        "default?": false,
        "photos": [
  			{
                    "thumbnail_url": "urlplaceholder/style_2_photo_number_thumbnail.jpg",
                    "url": "urlplaceholder/style_2_photo_number.jpg"
        }
      // ...
            ],
        "skus": {
                	"37": {
                    		"quantity": 8,
                    		"size": "XS"
                	},
                	"38": {
                    		"quantity": 16,
                    		"size": "S"
                	},
                	"39": {
                    		"quantity": 17,
                    		"size": "M"
                	},
            //...
            	}
    },
  // ...
}

  -GET /products/:product_id/related -gets an array of related product id's for the given product

    [
      2,
      3,
      8,
      7
    ],