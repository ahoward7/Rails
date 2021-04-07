class CreateMajors < ActiveRecord::Migration[6.1]
  def change
    create_table :majors do |t|
      t.string :majorTitle

      t.timestamps
    end
  end
end
