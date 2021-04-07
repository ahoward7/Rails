class FixMajorRef < ActiveRecord::Migration[6.1]
  def change
    remove_column :plans, :major
    add_reference :plans, :major_id, index:true
    add_reference :users, :major_id, index:true
  end
end
