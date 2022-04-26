puts "🌱 Seeding spices..."

# Seed your database here
Customer.create(name: "Brody")
Customer.create(name: "Johnny")
Customer.create(name: "Kyler from the future")

Order.create(customer_id: 1)
Order.create(customer_id: 2)
Order.create(customer_id: 3)

Product.create(name: "Banana", category: "food", price: 0.99)
Product.create(name: "Nachos", category: "food", price: 6.73)
Product.create(name: "Doritos", category: "food", price: 3.11)
Product.create(name: "Laptop", category: "tech", price: 1499.99)
Product.create(name: "Elden Ring", category: "tech", price: 59.99)
Product.create(name: "Mercedes-Benz G63 AMG 6x6", category: "auto", price: 512000.00)
Product.create(name: "Socks", category: "clothing", price: 5.99)
Product.create(name: "Hoodie", category: "clothing", price: 29.99)
Product.create(name: "Sunglasses", category: "clothing", price: 17.99)
Product.create(name: "Chainsaw", category: "tools", price: 399.99)
Product.create(name: "Sledge Hammer", category: "tools", price: 37.99)

OrderItem.create(product_id: 2, order_id: 1, quantity: 1)
OrderItem.create(product_id: 3, order_id: 1, quantity: 1)
OrderItem.create(product_id: 1, order_id: 2, quantity: 6)
OrderItem.create(product_id: 5, order_id: 2, quantity: 3)
OrderItem.create(product_id: 4, order_id: 3, quantity: 1)

puts "✅ Done seeding!"
