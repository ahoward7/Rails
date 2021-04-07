json.plan do
    json.id @plan.id
    json.courses @plan.plan_courses do |planCourse|
        json.id planCourse.course.courseID
        json.name planCourse.course.cTitle
        json.year planCourse.year
        json.term planCourse.term
    end
end

json.catalog do
    json.courses @catalog do |course|
        json.id course.courseID
        json.name course.cTitle
        json.credits course.credits
        json.description course.description
    end
end