class FixCatalogForPlan < ActiveRecord::Migration[6.1]
  def change
    remove_column :plans, :catalog
    add_reference :plans, :catalog, index:true
  end
end
