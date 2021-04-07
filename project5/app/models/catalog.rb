class Catalog < ApplicationRecord
    belongs_to :plan, optional: true
    has_many :catalog_courses
    has_many :courses, through: :catalog_courses
end
