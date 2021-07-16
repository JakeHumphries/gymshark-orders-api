## Brief

Imagine for a moment that one of our product lines ships in various pack sizes:

- 250 Items
- 500 Items
- 1000 Items
- 2000 Items
- 5000 Items

Our customers can order any number of these items through our website, but they will always only be given complete
packs.

1. Only whole packs can be sent. Packs cannot be broken open.
2. Within the constraints of Rule 1 above, send out no more items than necessary to fulfil the order.
3. Within the constraints of Rules 1 & 2 above, send out as few packs as possible to fulfil each order.

Write an application that can calculate the number of packs we need to ship to the customer.The API must be written in
Golang & be usable by a HTTP API (by whichever method you choose).

Optional:

- Keep your application flexible so that pack sizes can be changed and added and removed without having to change the
  code.
- Create a UI to interact with your API

## Implementation

I have implemented a express based nodejs API written in typescript. You can pass in a orderQuantity to the express API
and the result will be a JSON object with the pack breakdown. You can also add or delete pack sizes from the pack size
list by calling the endpoints below.

When building this app i have taken a domain driven approach.

by default the pack sizes list is: `[ 500, 1000, 250, 5000, 2000 ]`

## Intialising the app locally

run `npm install` then run `npm run start`

## Calling endpoints

to get a pack breakdown you can send a GET request to `http://localhost:3000/get-pack-breakdown/{orderquantity}`

to add a pack size to the list of pack sizes you can send a POST request to `http://localhost:3000/add-pack-size`

example body: `{"packSize": "100"}`

to delete a pack size to the list of pack sizes you can send a POST request to `http://localhost:3000/delete-pack-size`

example body: `{"packSize": "100"}`

## Running the test

run `npm run test`
