class FixRequirementRef < ActiveRecord::Migration[6.1]
  def change
    remove_reference :categories, :requirement_id_id, index: true

    add_reference :categories, :requirement, index:true
  end
end
