class CreatePlans < ActiveRecord::Migration[6.1]
  def change
    create_table :plans do |t|
      t.integer :studentID
      t.string :name
      t.integer :curr_year
      t.string :curr_term
      t.string :major
      t.integer :catalog

      t.timestamps
    end
  end
end
