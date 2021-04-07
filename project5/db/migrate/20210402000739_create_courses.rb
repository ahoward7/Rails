class CreateCourses < ActiveRecord::Migration[6.1]
  def change
    create_table :courses do |t|
      t.string :courseID
      t.string :cTitle
      t.integer :credits
      t.string :description

      t.timestamps
    end
  end
end
