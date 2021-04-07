json.plan @plan do |plan|
    json.id plan.id
    json.startYear plan.start_year
    json.currYear plan.curr_year
    json.currTerm plan.curr_term
    json.major plan.major_id
end

json.catalog @catalog do |catalogCourse|
    json.id catalogCourse.course.courseID
    json.name catalogCourse.course.cTitle
    json.credits catalogCourse.course.credits
    json.description catalogCourse.course.description
end

json.requirements @requirement.categories

json.enrolled @enrolled do |planCourse|
    json.id planCourse.course.courseID
    json.title planCourse.course.cTitle
    json.credits planCourse.course.credits
    json.description planCourse.course.description
    json.year planCourse.pYear
    json.term planCourse.pTerm
end

json.majors @majors do |major|
    json.id major.id
    json.title major.majorTitle
end