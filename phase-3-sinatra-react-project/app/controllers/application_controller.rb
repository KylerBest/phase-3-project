class ApplicationController < Sinatra::Base
  set :default_content_type, 'application/json'
  
  # Add your routes here

  get "/products" do
    products = Product.all
    products.to_json
  end

  get "/orders" do
    orders = Order.all
    orders.to_json(include: [
      {customer: {only: :name}}, {order_items: {include: 
        {product: {only: [:name, :category, :price]}}}
      }
    ])
  end

  get "/customers" do 
    customers = Customer.all
    customers.to_json
  end

  get "/customers/:name" do
    customer = Customer.find_by(name: params[:name])
    customer.to_json
  end

  delete "/customers/:id" do
    customer = Customer.find(params[:id])
    customer.destroy
    customer.to_json
  end

  delete "/orders/:id" do 
    order = Order.find(params[:id])
    order.destroy
    order.to_json(include: [:order_items, :customer])
  end

  delete "/order_items/:id" do
    order_item = OrderItem.find(params[:id])
    order_item.destroy
    order_item.to_json
  end
  
  post "/customers" do 
    customer = Customer.create(
      name: params[:name]
    )
    customer.to_json
  end
  
  post "/orders" do 
    order = Order.create(
      customer_id: params[:customer_id]
    )
    order.to_json
  end

  post "/order_items" do
    order_item = OrderItem.create(
      product_id: params[:product_id],
      order_id: params[:order_id],
      quantity: params[:quantity]
    )
    order_item.to_json
  end 

  patch "/order_items/:id" do 
    order_item = OrderItem.find(params[:id])
    order_item.update(
      quantity: params[:quantity]
    )
    order_item.to_json
  end

end
