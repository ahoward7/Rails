# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

############################################################################################################################
######################################################### Majors ###########################################################
############################################################################################################################
major1 = Major.new
major1.majorTitle = "Computer Science"
major1.save!

major2 = Major.new
major2.majorTitle = "Computer Engineering"
major2.save!

############################################################################################################################
####################################################### Catalogs ###########################################################
############################################################################################################################

catalog1 = Catalog.new
catalog1.year = 2018
catalog1.save!

############################################################################################################################
######################################################### Users ############################################################
############################################################################################################################

user1 = User.new
user1.login = "joe"
user1.email = "joe@cedarville.edu"
user1.password = "password"
user1.password_confirmation = "password"
user1.major_id = major1.id
user1.save!

user2 = User.new
user2.login = "pete"
user2.email = "pete@cedarville.edu"
user2.password = "password"
user2.password_confirmation = "password"
user2.major_id = major2.id
user2.save!

############################################################################################################################
######################################################### Plans ############################################################
############################################################################################################################

#give joe a couple of plans
plan1 = Plan.new
plan1.name = "Plan1"
plan1.user_id = user1.id
plan1.major_id = major1.id
plan1.catalog_id = catalog1.id
plan1.curr_year = 2019;
plan1.curr_term = "Fall"
plan1.save!

plan2 = Plan.new
plan2.name = "Plan2"
plan2.user_id = user1.id
plan2.major_id = major2.id
plan2.catalog_id = catalog1.id
plan2.curr_year = 2019;
plan2.curr_term = "Fall"
plan2.save!

############################################################################################################################
######################################################## Courses ###########################################################
############################################################################################################################

course1 = Course.new
course1.courseID = "CS-1210"
course1.cTitle = "C++"
course1.credits = "2"
course1.description = "This is a c++ course"
course1.save!

course2 = Course.new
course2.courseID = "CS-1220"
course2.cTitle = "Object Oriented C++"
course2.credits = "3"
course2.description = "This is another c++ course"
course2.save!

course3 = Course.new
course3.courseID = "MATH-1710"
course3.cTitle = "Calculus 1"
course3.credits = "5"
course3.description = "This is a calculus course"
course3.save!

course4 = Course.new
course4.courseID = "CY-3320"
course4.cTitle = "Linux Systems Programming"
course4.credits = "3"
course4.description = "This is a linux course"
course4.save!

course5 = Course.new
course5.courseID = "MATH-1720"
course5.cTitle = "Calculus 2"
course5.credits = "5"
course5.description = "This is another calculus course"
course5.save!

############################################################################################################################
################################################### Plan Courses ###########################################################
############################################################################################################################

planCourse1 = PlanCourse.new
planCourse1.plan_id = plan1.id;
planCourse1.course_id = course1.id;
planCourse1.year = 2018
planCourse1.term = "Fall"
planCourse1.save!

############################################################################################################################
################################################## Catalog Courses #########################################################
############################################################################################################################

catalogCourse1 = CatalogCourse.new
catalogCourse1.catalog_id = catalog1.id;
catalogCourse1.course_id = course1.id;
catalogCourse1.save!

catalogCourse2 = CatalogCourse.new
catalogCourse2.catalog_id = catalog1.id;
catalogCourse2.course_id = course2.id;
catalogCourse2.save!

catalogCourse3 = CatalogCourse.new
catalogCourse3.catalog_id = catalog1.id;
catalogCourse3.course_id = course3.id;
catalogCourse3.save!

catalogCourse4 = CatalogCourse.new
catalogCourse4.catalog_id = catalog1.id;
catalogCourse4.course_id = course4.id;
catalogCourse4.save!

############################################################################################################################
################################################### Requirements ###########################################################
############################################################################################################################

req1 = Requirement.new
req1.major_id = major1.id;
req1.catalog_id = catalog1.id;
req1.save!

req2 = Requirement.new
req2.major_id = major1.id;
req2.catalog_id = catalog1.id;
req2.save!

req3 = Requirement.new
req3.major_id = major1.id;
req3.catalog_id = catalog1.id;
req3.save!

############################################################################################################################
#################################################### Categories ############################################################
############################################################################################################################

category1 = Category.new
category1.categoryName = "Core"
category1.requirement_id = req1.id
category1.save!

category2 = Category.new
category2.categoryName = "Cognates"
category2.requirement_id = req1.id
category2.save!

category3 = Category.new
category3.categoryName = "Electives"
category3.requirement_id = req1.id
category3.save!

############################################################################################################################
################################################## Category Courses ########################################################
############################################################################################################################

categoryCourse1 = CategoryCourse.new
categoryCourse1.category_id = category1.id;
categoryCourse1.course_id = course1.id;
categoryCourse1.save!

categoryCourse2 = CategoryCourse.new
categoryCourse2.category_id = category1.id;
categoryCourse2.course_id = course2.id;
categoryCourse2.save!

categoryCourse3 = CategoryCourse.new
categoryCourse3.category_id = category2.id;
categoryCourse3.course_id = course3.id;
categoryCourse3.save!

categoryCourse4 = CategoryCourse.new
categoryCourse4.category_id = category3.id;
categoryCourse4.course_id = course4.id;
categoryCourse4.save!