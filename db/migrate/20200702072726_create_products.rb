class CreateProducts < ActiveRecord::Migration[6.0]
  def change
    create_table :products do |t|
      t.references :user, null: false
      t.references :category, null: false
      t.references :bland, null: false
      t.string :name, null: false
      t.integer :price, null: false
      t.text :detail
      t.integer :condition, null: false
      t.string :size
      t.string :days, null: false
      t.integer :method, null: false
      t.integer :fee, null: false
      t.string :location, null: false
      t.timestamps
    end
  end
end
