class Requirement < ApplicationRecord
  has_many :category
  belongs_to :major
  belongs_to :catalog
end
