class AddPlanCatalogForeignKey < ActiveRecord::Migration[6.1]
  def change
    add_foreign_key :plans, :catalogs
  end
end
