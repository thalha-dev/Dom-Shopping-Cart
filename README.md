We’ll be creating a simple shopping cart application using html,css and Advanced JS concepts.
The topics we’ll cover include promises, async await , using storage APIs and basic API calls while also dealing with complex DOM Manipulations.
Here’s a list of features that this project includes and you’ll be graded on these points -

- Signup and login handle using local storage - multiple users - if not logged in don’t let the person enter the shop or my cart or profile
- Fetching of products using api - in the shop page - you can save the products in localstorage as well (Hint)
- Filter of items - based on name (search bar), price and rating (sidebar) + (filtering based on colour and size is for bonus - not mandatory but optional )
- Shopping cart handle using localstorage (Adding and removing items)
- Checkout functionality of my cart - after razorpay.open() delete myCart items and remove it.
- Profile page - show data taken using signup and allow user to edit it.
- Basic HTML & CSS animations and styling will be tested too

## Project Breakup

1. User Interface

   Create the UI as shown in the Figma
   Create 6 pages - index.html, login.html, signup.html ,shop.html,cart.html and profile.html
   Make sure the UI is exact - use the font Inter (from google fonts)
   You can extract the other assets from figma itself.
   The shop.html page will have one main search input field. It will have 5 toggle buttons under it. On the left it will have a fixed sidebar - which will have multiple checkbox’s as shown in the ui. It will also have a slider. (input type=”range”)
   The signup page will have 5 inputs - first name,last name, email, password and confirm password and a signup button.
   The login page will have 2 inputs only email and password and the login button.
   Apart from the UI make basic events on click of buttons, and console log which button was clicked. Also store all inputs in variables and console log them on click of signup and login button and onChange event of input of search.

2. Product Page

   Get request on the api call to get all products - as soon as you land on the shop page.
   Map the products array and show the products in a flex in the shop page as shown in the figma.
   Also, perform basic functions like the search bar where you have to filter by product name and sidebar component functions and make the filters work. (filter by color, price , product types - men's , women's, electronics , jewellery)
   In the shop page make the toggle button’s work - on clicking of men’s just show men’s products and so on. Make sure the toggle which is created has a black background. If on searching no product is there, show a message saying that you couldn’t find the product the user searched for.

3. Login & Sign Up

   Handle login and signup using local storage - also generate a token (random 16 byte string) every time you log in. If the user isn't logged in make sure to remove them and take them back to the login page.
   Make another page called profile.html where you’ll show all the information given by the user while signing up and allow editing of user information.
   Make sure if an email is already used you don’t allow them to signup with the same email again. If password or email is incorrect show these errors as well.
   Signup -> [users] save in local storage
   Login -> avi@gmail - > exists in the [users] -> password matches -> currentUser {} - > save it in localstorage

4. My Cart and Checkout functionality

   Also, add items to the cart and also save it using local storage.
   Make a new page called my cart page - add the functionality of removing the items that you added.
   On click of the checkout, button get rid of the cart and show an alert saying that the items were purchased.
   Razorpay Integration - rzp_test_PV1oQ0oMtgXOsq

### Resources

- Starter Template - https://github.com/jayeshsadhwani99/f3-project

- Figma - https://www.figma.com/file/0LzO7mD7G9JDYXbaOK8wuI/Shopping-Cart-Contest?node-id=0%3A1&t=YOclG9pB48jKYKMl-1

- API EndPoint - https://fakestoreapi.com/

- Get Request For Products - https://fakestoreapi.com/products

- JSON Structure given from the API

```javascript
{
"id": 1,
"title": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
"price": 109.95,
"description": "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
"category": "men's clothing",
"image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
"rating": { "rate": 3.9, "count": 120 } ,
“Colours”:[“red”,”blue”,”black”],
“sizes”:[“s”,”l”,”m”,”xl”]
},
```

### Marking Scheme

1. Signup and login handle using local storage (10 marks)

   - 2 marks for creating a signup form with required fields (e.g., name, email, password)
   - 3 marks for storing user data securely using local storage
   - 5 marks for creating a login form and verifying user credentials and handling authentication errors (e.g.,
   - incorrect email or password)

2. Shopping cart handle using local storage (Adding and removing items) (10 marks):

   - 5 marks for creating a product cards with details (e.g., name, price, image, description) and adding products to the cart and updating the cart UI
   - 2 marks for removing products from the cart and updating the cart UI and storing cart data using local storage

3. Fetching of products using API (10 marks):

   - 5 marks for making API calls to fetch product data
   - 5 marks for displaying product data on the webpage

4. Filter of items - based on name, price, etc. (10 marks):

   - 3 marks for implementing a filter UI (e.g., dropdown, search bar)
   - 3 marks for filtering products based on user input
   - 5 marks for updating the product catalog UI based on the filtered products

5. Sorting of these based on the above + date bought for my orders or my items (10 marks):

   - 5 marks for implementing a sorting UI and sorting products based on user input
   - 5 marks for updating the product catalog UI based on the sorted products

6. Basic html+css animations and styling will be tested too. (10 marks):

   - 5 marks for creating an attractive and user-friendly UI with appropriate colors, fonts, layout and implementing basic animations (e.g., hover effects, button animations)
   - 5 marks for ensuring responsive design for different screen sizes

7. Profile page - show data taken using signup and allow user to edit it. (10 marks):

   - 5 marks for creating a profile page with user data (e.g., name, email)
   - 5 marks for allowing users to edit their profile data and storing it securely using local storage

8. My Cart and Checkout functionality (20 marks):

   - 5 marks for creating a cart page with product details (e.g., name, price, quantity)
   - 5 marks for implementing checkout functionality (e.g., calculating total price, displaying payment options)
   - 5 marks for handling payment processing using an appropriate payment gateway API
   - 5 marks for ensuring secure and error-free transaction processing

9. Host and deploy (10 marks):
