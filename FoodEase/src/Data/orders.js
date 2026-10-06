const orders = [
  {
    id: "FE1001",
    restaurant: "Pizza Palace",
    restaurantId: 1,

    items: [
      {
        id: 1,
        name: "Classic Margherita Pizza",
        quantity: 1,
        price: 249
      },
      {
        id: 2,
        name: "Chicken Pepperoni Pizza",
        quantity: 1,
        price: 349
      }
    ],

    subtotal: 598,
    deliveryFee: 40,
    tax: 30,
    total: 668,

    status: "Delivered",
    orderDate: "02 Oct 2026",
    deliveryTime: "30 min",

    address: "12, Main Street, Chennai",

    paymentMethod: "UPI"
  },

  {
    id: "FE1002",
    restaurant: "Spice Kitchen",
    restaurantId: 3,

    items: [
      {
        id: 5,
        name: "Chicken Biryani",
        quantity: 2,
        price: 299
      }
    ],

    subtotal: 598,
    deliveryFee: 30,
    tax: 30,
    total: 658,

    status: "On the way",
    orderDate: "03 Oct 2026",
    deliveryTime: "25 min",

    address: "12, Main Street, Chennai",

    paymentMethod: "Cash on Delivery"
  }
];

export default orders;