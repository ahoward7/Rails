class Plan < ApplicationRecord
    belongs_to(:user)
    has_many :plan_courses
    has_one :catalog
 	has_many :courses, through: :plan_courses
end
