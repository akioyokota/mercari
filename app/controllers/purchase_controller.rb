class PurchaseController < ApplicationController
  require 'payjp'

  def show
    @address = Address.where(user_id: current_user.id).first
    card = Card.where(user_id: current_user.id).first
    @product = Product.find(params[:id])
    if card.blank?
      redirect_to controller: "cards", action: :new
    else
      Payjp.api_key = Rails.application.credentials.payjp[:PAYJP_SECRET_KEY]
      # Payjp.api_key = ENV["PAYJP_SECRET_KEY"]
      customer = Payjp::Customer.retrieve(card.customer_id)
      @default_card_information = customer.cards.retrieve(card.card_id)
    end
  end

  def pay
    card = Card.where(user_id: current_user.id).first
    @product = Product.find(params[:id])
    Payjp.api_key = Rails.application.credentials.payjp[:PAYJP_SECRET_KEY]
    # Payjp.api_key = ENV['PAYJP_SECRET_KEY']
    Payjp::Charge.create(
    :amount => @product.price,
    :customer => card.customer_id,
    :currency => 'jpy',
  )
  redirect_to action: :done
  end

  def done
    @product = Product.find(params[:id])
  end

end