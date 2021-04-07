class CreateCatalogs < ActiveRecord::Migration[6.1]
  def change
    create_table :catalogs do |t|
      t.integer :year

      t.timestamps
    end
  end
end
