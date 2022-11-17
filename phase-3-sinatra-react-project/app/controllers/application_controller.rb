class ApplicationController < Sinatra::Base
  set :default_content_type, 'application/json'
  
  # Add your routes here

  get "/startup" do
    customers = Customer.all
    products = Product.all
    
    startup = Hash[products: products,
      customers: JSON.parse(customers.to_json(include: 
        {orders: {include: 
          [:customer, {order_items: {include: 
            :product}}]}}))]

    startup.to_json
  end

  delete "/orders/:id" do 
    order = Order.find(params[:id])
    order.destroy
    order.to_json(include: :customer)
  end

  post "/orders" do 
    customer = Customer.find_or_create_by(name: params[:name])
    order = customer.orders.create()
    params[:cart].each do |key, product|
      order.order_items.create(
        product_id: key,
        quantity: product[:quantity]
      )
    end
    order.to_json(include: [:customer, {order_items: {include: :product}}])
  end

  patch "/orders/:id" do 
    order = Order.find(params[:id])
    params[:items].each do |item|
      new_item = order.order_items.find(item[:id])
      new_item.update(quantity: item[:quantity])
      if new_item[:quantity] < 1
        new_item.destroy
      end
    end
    if order.order_items.length == 0 
      order.destroy
    end
    order.to_json(include: [:customer, {order_items: {include: :product}}])
  end

end
