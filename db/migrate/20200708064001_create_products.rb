class CreateProducts < ActiveRecord::Migration[6.0]
  def change
    create_table :products do |t|
      t.string :name, null: false
      t.text :detail, null: false
      t.integer :price, null: false
      t.integer :condition, null: false
      t.integer :size
      t.integer :day, null: false
      t.integer :method, null: false
      t.integer :fee, null: false
      t.integer :brand_id
      t.integer :prefecture_id, null: false
      t.integer :buyer_id
      t.references :user, foreign_key: true
      t.references :category, null: false, foreign_key: true
      t.timestamps
    end
  end
end
