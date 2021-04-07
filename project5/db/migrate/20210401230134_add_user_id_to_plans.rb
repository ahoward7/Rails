class AddUserIdToPlans < ActiveRecord::Migration[6.1]
  def change
    add_column :plans, :user_id, :integer
  end
end