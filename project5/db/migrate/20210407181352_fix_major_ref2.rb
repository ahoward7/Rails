class FixMajorRef2 < ActiveRecord::Migration[6.1]
  def change
    remove_reference :plans, :major_id_id, index: true
    remove_reference :users, :major_id_id, index: true

    add_reference :plans, :major, index:true
    add_reference :users, :major, index:true
  end
end
