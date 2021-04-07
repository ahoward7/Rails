$(document).ready(startUp);

//---------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------Global Variables-----------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------------------
var projectID;
var theme = 0;
var currCourse = [];
var allCourse = [];

//---------------------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------Objects for Courses---------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------------------

// Plan object
class Plan {

    // Constructor
    constructor() {
        this.plan = "";
        this.year = "";
        this.major = "";
        this.student = "";
        this.semester = "";
        this.startYear = "";
        this.courseArray = [];
        this.unusedCourseArray = [];
    }

    // Getters
    getPlanName() {
        return this.plan;
    }

    getYear() {
        return this.year;
    }

    getMajor() {
        return this.major;
    }

    getStudent() {
        return this.student;
    }

    getTerm() {
        return this.semester;
    }

    getStartYear() {
        return this.startYear;
    }

    getCourseArray() {
        return this.courseArray;
    }

    getUnusedArray() {
        return this.unusedCourseArray;
    }

    getCourse(num) {
        return this.courseArray[num];
    }

    // Setters
    setPlan(plan) {
        this.plan = plan;
    }

    setYear(year) {
        this.year = year;
    }

    setMajor(major) {
        this.major = major;
    }

    setStudent(student) {
        this.student = student;
    }

    setSemester(semester) {
        this.semester = semester;
    }

    setStartYear(year) {
        this.startYear = year;
    }
    // Push course
    pushCourse(course) {
        this.courseArray.push(course);
    }

    pushUnusedCourse(course) {
        this.unusedCourseArray.push(course);
    }
}

// Course object
class Course {

    // Constructor
    constructor(term, year, courseID, description, courseName, credits) {
        this.term = term;
        this.year = year;
        this.description = description;
        this.ID = courseID;
        this.name = courseName;
        this.credits = credits;
    }

    // Getters
    getTerm() {
        return this.term;
    }

    getYear() {
        return this.year;
    }

    getID() {
        return this.ID;
    }

    getDescription() {
        return this.description;
    }

    getName() {
        return this.name;
    }

    getCredits() {
        return this.credits;
    }

    // Setters
    setTerm(term) {
        this.term = term;
    }

    setYear(year) {
        this.year = year;
    }
}

// Year object
class Year {

    // Constructor
    constructor(year) {
        this.year = year;
        this.termsObj = [];
        this.terms = [];
    }

    // Getters
    getYear() {
        return this.year;
    }

    getTerms() {
        return this.terms;
    }

    getTermsObj() {
        return this.termsObj;
    }

    // Array pushers
    pushTerms(term) {
        this.terms.push(term);
    }

    pushTermsObj(term) {
        this.termsObj.push(term);
    }
}

// Term object
class Term {
    constructor(term) {
        this.term = term;
        this.courses = [];
    }

    // Getters
    getTerm() {
        return this.term;
    }

    getCourses() {
        return this.courses;
    }

    // Push course
    pushCourses(course) {
        this.courses.push(course);
    }
}

class Major {
    constructor(major) {
        this.major = major;
        this.categories = [];
        this.categoriesObj = [];
    }

    getMajor() {
        return this.major;
    }

    getCategories() {
        return this.categories;
    }

    getCategoriesObj() {
        return this.categoriesObj;
    }

    pushCategory(cat) {
        this.categories.push(cat);
    }

    pushCategoryObj(cat) {
        this.categoriesObj.push(cat);
    }
}

class Category {
    constructor(category) {
        this.category = category;
        this.courses = [];
    }

    getCategory() {
        return this.category;
    }

    getCourses() {
        return this.courses;
    }

    pushCourse(cat) {
        this.courses.push(cat);
    }
}

class reqCourse {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }

    getID() {
        return this.id;
    }

    getName() {
        return this.name;
    }
}

//---------------------------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------Read in Database---------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------------------

function readData() {
    $.get("http://localhost:3000/plans.json", function (data) {
        alert(data);
        getCourses(data);
    });
}

function changeCourseColors() {
    $("#core-column, #elective-column, #cognate-column").children(".semester-class").each(function(i, course) {
        $(course).css("color", "hotpink");
    })
}

var myPlans = [];
var catalogArray = [];

var incr = 0;
function getCourses(myData) {
    $(".class-column").empty();
    var table = $("#data-table").DataTable();
    table.clear();

    let obj = JSON.parse(myData);
    let cat = obj.catalog;
    let plans = obj.plans;
    let reqs = obj.requirements;
    let defaultMajor = obj.defMajor;
    let enrolled = obj.enrolled;

    // Parse out courses from catalog
    $.each(cat, function (i, course) {
        let id = course.id;
        let name = course.name;
        let credits = course.credits;

        let myCourse = [];
        myCourse.push(id);
        myCourse.push(name);
        catalogArray.push(myCourse);

        makeCourseDivs(id, name, credits);
    });

    // Parse out information from plan
    $.each(plans, function (i, plan) {
        let studentName = plan.studentName;
        let planName = plan.planName;
        let major = plan.major;
        let currYear = plan.currYear;
        let currTerm = plan.currTerm;
        let startYear = plan.startYear;

        myPlans[i] = new Plan();
        myPlans[i].setPlan(planName)
        myPlans[i].setYear(currYear);
        myPlans[i].setMajor(major);
        myPlans[i].setStudent(studentName);
        myPlans[i].setSemester(currTerm);
        myPlans[i].setStartYear(startYear);
    });

    // Insert data from plan to header
    for (let i = 0; i < myPlans.length; i++) {
        if (myPlans[i].getMajor() == defaultMajor) {
            $("#student").html("Student: " + myPlans[i].getStudent());
            $("#catalog").html("Catalog: " + myPlans[i].getYear());
            $("#minor").html("Minor: Bible");
        }
    }

    let sYear = myPlans[0].getStartYear();
    let world = 0;

    for (let i = 1; i < 5; i++) {
        $("#fall" + i).find(".semester-term").html("Fall " + sYear);
        world++;
        $("#fall" + i).find(".world-name").html("W4-" + (world));
        sYear++;
        $("#spring" + i).find(".semester-term").html("Spring " + sYear);
        world++;
        $("#spring" + i).find(".world-name").html("W4-" + (world));
        $("#summer" + i).find(".semester-term").html("Summer " + sYear);
        world++;
        $("#summer" + i).find(".world-name").html("W4-" + (world));
    }

    // Insert requirements into accordion
    let conReqs = convertReqs(reqs);

    if (incr == 0) {
        for (let i = 0; i < conReqs.length; i++) {
            var o = new Option(conReqs[i].getMajor(), conReqs[i].getMajor());
            $(o).html(conReqs[i].getMajor());
            $("#major-select").append(o);
            $("#major-select").val(defaultMajor);

            if (conReqs[i].getMajor() == defaultMajor) {
                insertReqs(conReqs[i].getCategoriesObj());
            }
        }
        incr++;
    }
    else {
        for (let i = 0; i < conReqs.length; i++) {
            let major = $("#major-select").val();
            if (conReqs[i].getMajor() == major) {
                insertReqs(conReqs[i].getCategoriesObj());
            }
        }
    }

    $.each(enrolled, function (i, en) {
        myPlans[0].pushCourse(new Course(en.term, en.year, en.id, en.description, en.title, en.credits));
    });

    insertCourses(convertCourses(myPlans[0].getCourseArray()));

    let totHours = 0;
    $(".credits").each(function (i, creds) {
        totHours += parseInt($(creds).html().substr(7));
    });

    $("#total-hours").html("Total Hours: " + totHours)

    dimSemesters(myPlans[0]);

    markRequirements();
}

function convertCatalog(cat) {
    $.each(cat, function (i, course) {
        for (let i = 0; i < myPlans.length; i++) {
            myPlans[i].pushCourse(new Course("", "", course.id, course.description, course.name, course.credits));
        }
    });
}

function convertEnrolled(enrolled) {
    $.each(enrolled, function (i, en) {
        myPlans[0].pushCourse(new Course(en.year, en.term, en.id, en.description, en.title, en.credits));
    });
}

function markRequirements() {
    let courseArray = [];

    $(".semesters").find(".semester-class").each(function (i, course) {
        courseArray.push($(course).html())
    });

    $(".accordion-item").find(".semester-class").each(function (i, course) {
        $(this).css("padding", "0");
        var enrolled = false;

        $.each(courseArray, function(k, combined) {
            combined = combined.substr(0, combined.length - 52);
            if ($(course).html() == combined) {
                $(course).css("color", "green");
                enrolled = true;
            }
        });

        if (!enrolled) {
            $(course).css("color", "brown");
        }
    });
}

//---------------------------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------Read in Required---------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------------------

function convertReqs(reqs) {
    let majors = [];
    let majorsObj = []

    $.each(reqs, function (i, req) {
        let major = req.major;
        if (!majors.includes(major)) {
            majors.push(major);
            majorsObj.push(new Major(major));
        }
    });

    $.each(reqs, function (i, req) {
        let major = req.major;
        let category = req.categoryName;

        $.each(majors, function (j, maj) {
            let categories = majorsObj[j].getCategories();

            if (major == maj && !categories.includes(category)) {
                majorsObj[j].pushCategory(category);
                majorsObj[j].pushCategoryObj(new Category(category));
            }
        });
    });

    $.each(reqs, function (i, req) {
        let major = req.major;
        let category = req.categoryName;
        let course = req;

        $.each(majors, function (j, maj) {
            let categories = majorsObj[j].getCategories();
            let categoriesObj = majorsObj[j].getCategoriesObj();

            $.each(categories, function (k, cat) {
                let courses = categoriesObj[k].getCourses();

                if (major == majors[j] && category == cat && !courses.includes(course)) {
                    categoriesObj[k].pushCourse(course);
                }
            });
        });
    });

    return majorsObj;
}

function insertReqs(catArray) {
    $.each(catArray, function (i, cat) {
        // $('<h1 />', {
        //     'id': 'accordion-header' + (i + 1),
        //     'class': 'accordion-header',
        //     text: cat.getCategory()
        // }).appendTo($(".accordion"));

        // $('<div />', {
        //     'id': 'accordion-item' + (i + 1),
        //     'class': 'accordion-item',
        // }).appendTo($(".accordion"));

        // $('<div />', {
        //     'class': 'class-column',
        // }).appendTo($("#accordion-item" + (i + 1)));

        // $('<div />', {
        //     'id': 'goomba' + (i + 1),
        // }).appendTo($("#accordion-item" + (i + 1)));
        $("#accordion-header" + (i+1)).html(cat.getCategory());
        $.each(cat.getCourses(), function (j, course) {
            $('<span />', {
                'class': 'semester-class',
                draggable: 'true',
                text: course.courseID + " " + course.title,
            }).appendTo($("#accordion-item" + (i+1)).find(".class-column"));
        });
    });
}

function insertRequiredCourses(myData) {
    let obj = jQuery.parseJSON(myData);

    let coresObj = obj.categories.Core.courses;
    let cognatesObj = obj.categories.Cognates.courses;
    let electivesObj = obj.categories.Electives.courses;

    $.each(coresObj, function (i, course) {
        $.each(myPlan.getCourseArray(), function (i, allCourse) {
            if (allCourse.getID() == course) {
                $('<span />', {
                    'class': 'semester-class',
                    draggable: 'true',
                    text: course + " " + allCourse.getName(),
                }).appendTo($("#accordion-item1").find("#core-column"));
            }
        });
    });

    $.each(cognatesObj, function (i, course) {
        $.each(myPlan.getCourseArray(), function (i, allCourse) {
            if (allCourse.getID() == course) {
                $('<span />', {
                    'class': 'semester-class',
                    draggable: 'true',
                    text: course + " " + allCourse.getName(),
                }).appendTo($("#accordion-item2").find("#cognate-column"));
            }
        });
    });

    $.each(electivesObj, function (i, course) {
        $.each(myPlan.getCourseArray(), function (i, allCourse) {
            if (allCourse.getID() == course) {
                $('<span />', {
                    'class': 'semester-class',
                    draggable: 'true',
                    text: course + " " + allCourse.getName(),
                }).appendTo($("#accordion-item3").find("#elective-column"));
            }
        });
    });
}

//---------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------Converting Courses---------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------------------

// Organize courses into years
function convertCourses(array) {
    //-----------------Split into years--------------------

    // Years integers, objects
    let arrays = [];
    let years = [];
    let yearsObj = [];
    let unused = [];

    for (let i = 0; i < array.length; i++) {
        // Get year of current course
        let year = array[i].getYear();

        if (year == "") {
            unused.push(array[i]);
            continue;
        }

        // Push every course with the matching year into arrays
        if (!years.includes(year)) {
            years.push(year);
            yearsObj.push(new Year(year));
        }
    }

    //-----------------Split into terms--------------------
    for (let i = 0; i < array.length; i++) {
        // Get year and term of each course
        let year = array[i].getYear();
        let term = array[i].getTerm();

        if (year == "" && term == "") {
            continue;
        }

        // Loop year array to compare year of current course
        for (let j = 0; j < years.length; j++) {
            let terms = yearsObj[j].getTerms();

            // Push term into year if it matches with current course
            if (year == years[j] && !terms.includes(term)) {
                yearsObj[j].pushTerms(term);
                yearsObj[j].pushTermsObj(new Term(term));
            }
        }
    }

    // Split into courses
    for (let i = 0; i < array.length; i++) {

        // Get year, term, and course of each course
        let year = array[i].getYear();
        let term = array[i].getTerm();

        if (year == "" && term == "") {
            continue;
        }

        let course = array[i];
        for (let j = 0; j < years.length; j++) {

            // Get integer and object term arrays
            let terms = yearsObj[j].getTerms();
            let termsObj = yearsObj[j].getTermsObj();

            for (let k = 0; k < terms.length; k++) {

                // Get course array of current term
                let courses = termsObj[k].getCourses();

                // Push course into array if term and year match
                if (year == years[j] && term == terms[k] && !courses.includes(course)) {
                    termsObj[k].pushCourses(course);
                }
            }
        }
    }

    arrays.push(yearsObj);
    arrays.push(unused);

    return arrays;
}

//---------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------Insert Courses-------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------------------

function insertCourses(array) {
    // Clear all semester divs
    years = array[0];
    unused = array[1];

    let semester;

    for (let i = 0; i < years.length; i++) {
        let year = years[i].getYear();

        for (let j = 0; j < years[i].getTerms().length; j++) {

            // Get term and corresponding course array
            let term = years[i].getTerms()[j];
            let courses = years[i].getTermsObj()[j].getCourses();

            semester = term + " " + year;

            // Loop through each semester header text
            $(".semester-header").each(function () {

                // If the semester header equals the term and year of the current cours, insert it
                if (~$(this).text().indexOf(semester) != 0) {

                    // Credit hours to put for each term
                    let hours = 0;
                    for (let k = 0; k < courses.length; k++) {

                        // Add hours of each appended course
                        hours += parseInt(courses[k].getCredits());

                        // Inserted span elements
                        var myCourse = $('<span />', {
                            'class': 'semester-class',
                            draggable: 'true',
                            text: courses[k].getID() + " " + courses[k].getName(),
                        });

                        $('<span />', {
                            'class': 'delete',
                            text: 'X',
                        }).appendTo($(myCourse));

                        $(myCourse).appendTo($(this).parent().find(".class-column"));
                    }
                    // Set credits of current semester to accumulated hours
                    $(this).find(".credits").text("Hours: " + hours);
                }
            })
        }
    }

    $(".delete").hide();
}

//---------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------Startup Function-----------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------------------

$(function(){
    var x = 0;
    setInterval(function(){
        x+=1;
        $('#background-div').css('background-position', x + 'px 0');
    }, 40);
})

function fadeIn() {
    $("body").css("transition-duration", "2s");
    $("body").css("opacity", "1");
}

// startUp() function
function startUp() {
    fadeIn();
    readData();

    var blurProj = $("#sub-project3").text();
    if (blurProj.includes("Back to Projects")) {
        $("#blur").css("background-color", "black");
        $("#blur").css("opacity", ".3");
        $("#blur").css("background", "transparent");
        $("#blur").css("pointer-events", "none");
    }

    $('#data-table').DataTable({
        paging: false,
        "dom": "lifrtp",
        fixedColumns: {
            heightMatch: 'none'
        },
    });

    // Project start up animation
    startUpProjectAnimation();

    var previous;
    var firstClick = false;

    // Accordian Function
    $(".accordion h1").click(function () {
        var id = this.id;

        if (previous != null && $(this).html() == previous.html()) {
            return;
        }
        else if (!firstClick) {
            firstClick = true;
            previous = $(this)
            $(".accordion-item").each(function () {
                if ($("#" + id).next()[0].id != this.id) {
                    $(this).slideUp();
                }
            });

            $(this).next().toggle();
            return
        }

        previous = $(this);
        $(".accordion-item").each(function () {
            if ($("#" + id).next()[0].id != this.id) {
                $(this).slideUp(300);
            }
        });

        $(this).next().toggle(300);
    });

    $("#accordion-header1").trigger('click');

    // Projects on home page events
    $(".project").on({
        "click": function () {
            let proj = $(this).attr("id");
            let text = $(this).text();
            projectID = projectClick(proj, text);
            projectClickAnimation(this);
            setTimeout(nextPage, 2800);
        },
        "mouseover": function () {
            $(this).css("transition-duration", ".3s");
            $(this).css("font-size", "30px");
            $(this).css("cursor", "pointer");
        },
        "mouseleave": function () {
            $(this).css("width", "25%");
            $(this).css("height", "25%");
            $(this).css("transition-duration", ".3s");
            $(this).css("font-size", "25px");
            $(this).css("cursor", "default");
        }
    });

    // Projects on other project pages events
    $(".sub-project").on({
        "click": function () {
            let proj = $(this).attr("id");
            let text = $(this).text();
            projectID = subProjectClick(proj, text);
            projectClickAnimation()
        },
        "mouseover": function () {
            $(this).css("width", "28%");
            $(this).css("height", "28%");
            $(this).css("transition-duration", ".3s");
            $(this).css("cursor", "pointer");
        },
        "mouseleave": function () {
            $(this).css("width", "25%");
            $(this).css("height", "25%");
            $(this).css("transition-duration", ".3s");
            $(this).css("cursor", "default");
        }
    });

    // Choice awards header events
    $("#choice-awards").on({
        "mouseover": function () {
            $(this).css("font-size", "35px");
            $(this).css("font-weight", "bold");
            $(this).css("transition-duration", ".3s");
        },
        "mouseleave": function () {
            $(this).css("font-size", "30px");
            $(this).css("font-weight", "400");
            $(this).css("transition-duration", ".3s");
        }
    });

    // Theme header events
    $("#theme, #theme2").on({
        "click": function () {
            changeTheme();
        },
        "mouseover": function () {
            $(this).css("font-size", "4.5vmin");
            $(this).css("font-weight", "bold");
            $(this).css("transition-duration", ".3s");
            $(this).css("cursor", "pointer");
        },
        "mouseleave": function () {
            $(this).css("font-size", "4vmin");
            $(this).css("font-weight", "400");
            $(this).css("transition-duration", ".3s");
        }
    });

    // Valide inputs on keypress
    $(".input").on({
        "keyup": function () {
            $(this).css("border", "none");
            let value = $(this).val();
            let ID = $(this).attr('id');
            let validate;

            // validate different things dependent on the ID
            switch (ID) {
                case "student":
                    validate = value.search(/[a-zA-Z]+(\s|,)?\s[a-zA-Z]/);
                    if (validate == 0) {
                        $("#studentText").text("Name (Last, First)")
                        $("#studentText").css("color", "black")
                    }
                    break;
                case "email":
                    validate = value.search(/(.+)@(.+){2,}\.(.+){2,}/);
                    if (validate == 0) {
                        $("#emailText").text("E-mail")
                        $("#emailText").css("color", "black")
                    }
                    break;
                case "password":
                    validate = value.search(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/);
                    if (validate == 0) {
                        $(this).css("border", "2px solid green");
                        $("#passwordText").text("Password")
                        $("#passwordText").css("color", "black")
                    }
                    else {
                        $(this).css("border", "none");
                    }
                    break;
            }
        }
    });

    // Input events
    $(".input").blur(function () {
        $(this).css("border", "none");
    });

    $("#submit").on({
        "click": function () {
            checkValues();
        }
    });

    // Tooltips
    $(".inputText").on({
        "hover": function () {
            $(this).tooltip();
        }
    })

    $("#major-select").change(function () {
        clearAccordion();
        readData();
    });

    $("#log-out").on({
        'click': function() {
            
        }
    });

    $("#back-to-projects").on({
        'click': function() {
            document.location.href = "backToProjects.php";
        }
    });

    $("#bill").on({
        'click': function() {
            billAnimation();
        }
    });

    $("#fire").css("opacity", "0");

    $(document).on("mouseenter", ".semester-class", function(e) {
        $(this).find(".delete").show();
    });
    $(document).on("mouseleave", ".semester-class", function(e) {
        $(this).find(".delete").hide();
    });

    $(document).on("click", ".delete", function(e) {
        var hours = parseInt(e.target.parentNode.parentNode.parentNode.children[0].children[0].innerHTML.substr(7));
        var combined = e.target.parentNode.innerHTML;
        var myCourse = combined.substr(0, combined.length - 38);

        markRequirements();

        let courses = myPlans[0].getCourseArray();
        $.each(courses, function (i, course) {
            if (myCourse.includes(course.getID())) {
                hours -= course.credits;
                return false;
            }
        });

        e.target.parentNode.parentNode.parentNode.children[0].children[0].innerHTML = "Hours: " + hours;

        $(this).parent().remove();
    });

    //----------------------------Make Semesters Drag and Drop----------------------------------Beginning
    var dragged;
    var ID;

    /* events fired on the draggable target */
    document.addEventListener("drag", function (event) {

    }, false);

    document.addEventListener("dragstart", function (event) {
        dragged = event.target;
        ID = $(dragged).parent().attr('id');
        tableID = $(dragged).attr('id');

        // make it half transparent
        if (ID != "core-column" && ID != "cognate-column" && ID != "elective-column") {
            event.target.style.opacity = .4;
        }

        // make courses unselectable while dragging
        $(".semester-class").not(dragged).css("pointer-events", "none");

    }, false);

    document.addEventListener("dragend", function (event) {
        // reset the transparency
        event.target.style.opacity = "";
    }, false);

    /* events fired on the drop targets */
    document.addEventListener("dragover", function (event) {
        // prevent default to allow drop
        event.preventDefault();
    }, false);

    document.addEventListener("dragenter", function (event) {
        // highlight potential drop target when the draggable element enters it
        if (event.target.className == "class-column") {
            event.target.style.background = "";
        }

    }, false);

    document.addEventListener("dragleave", function (event) {
        // reset background of potential drop target when the draggable element leaves it
        if (event.target.className == "class-column") {
            event.target.style.background = "";
        }

    }, false);

    document.addEventListener("drop", function (event) {
        // make classes selectable again

        $(".semesters").each(function (i, sem) {
            if ($(sem).css("opacity") == 0.6) {
                $(sem).find(".semester-class").css("pointer-events", "none");
            }
            else {
                $(sem).find(".semester-class").css("pointer-events", "auto");
            }
        });

        $(".accordion-item").each(function (i, acc) {
            $(acc).find(".semester-class").css("pointer-events", "auto");
        });

        // prevent default action (open as link for some elements)
        event.preventDefault();
        // move dragged elem to the selected drop target

        if (event.target.className == "class-column") {
            event.target.style.background = "";

            // Get the hours of the div dragging the course from and to
            let afterHours = event.target.parentNode.children[0].children[0].innerHTML;
            let beforeHours = dragged.parentNode.parentNode.children[0].children[0].innerHTML;

            // Parse the hours out of the string
            aHours = parseInt(afterHours.substr(7));
            bHours = parseInt(beforeHours.substr(7));

            let semesterVal = event.target.parentNode.children[0].innerHTML;
            let term = semesterVal.substr(0, semesterVal.indexOf(' '));
            let year = semesterVal.substr(semesterVal.indexOf(' ') + 1, [4]);
            let courses = myPlans[0].getCourseArray();
            let courseVal = dragged.innerHTML;

            for (let i = 0; i < courses.length; i++) {
                let courseName = courses[i].getID();

                // Change year and term of course when dragged to another semester
                if (~courseVal.indexOf(courseName) != 0) {
                    courses[i].setTerm(term);
                    courses[i].setYear(year);
                    aHours += parseInt(courses[i].getCredits());
                    bHours -= parseInt(courses[i].getCredits());
                    break;
                }
            }

            // Don't do anything with hours if putting the course back in the same semester
            if (event.target != dragged.parentNode) {
                if ($(event.target).attr("id") == "core-column" || $(event.target).attr("id") == "cognate-column" || $(event.target).attr("id") == "elective-column") {

                }
                else if (tableID == "table-row") {
                    $.each(catalogArray, function (i, allCourse) {
                        if (dragged.innerHTML.includes(allCourse[0])) {
                            event.target.parentNode.children[0].children[0].innerHTML = "Hours: " + aHours;
                            var course = $('<span />', {
                                'class': 'semester-class',
                                draggable: 'true',
                                text: allCourse[0] + " " + allCourse[1],
                            });

                            $('<span />', {
                                'class': 'delete',
                                text: 'X',
                            }).appendTo($(course));

                            $(course).appendTo($(event.target));
                            return false;
                        }
                    });
                }
                else if (ID != "core-column" && ID != "cognate-column" && ID != "elective-column") {
                    event.target.parentNode.children[0].children[0].innerHTML = "Hours: " + aHours;
                    dragged.parentNode.parentNode.children[0].children[0].innerHTML = "Hours: " + bHours;

                    // Remove course from current semester and move to where it was dropped
                    dragged.parentNode.removeChild(dragged);
                    event.target.appendChild(dragged);
                }
                else {
                    event.target.parentNode.children[0].children[0].innerHTML = "Hours: " + aHours;

                    var course = $('<span />', {
                        'class': 'semester-class',
                        draggable: 'true',
                        text: dragged.innerHTML,
                    });

                    $('<span />', {
                        'class': 'delete',
                        text: 'X',
                    }).appendTo($(course));

                    $(course).appendTo($(event.target));
                }
            }
        }

        let totHours = 0;
        $(".credits").each(function (i, creds) {
            totHours += parseInt($(creds).html().substr(7));
        });

        $("#total-hours").html("Total Hours: " + totHours)

        markRequirements();
    }, false);
    //----------------------------Make Semesters Drag and Drop----------------------------------------End
};

function clearAccordion() {
    $(".accordion-item").find($(".class-column")).empty();
}

//---------------------------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------Bullet Bill Animation----------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------------------

function billAnimation() {
    $("#fire").css("opacity", "1");
    $("#fire").css("left", "-21%");
    $("#bill").css("left", "-25%");
    $("#bill, #fire").css("transition-duration", "1s");
    setTimeout(billChange, 800);
}

function billChange() {
    $("#fire").css("top", "72.8%");
    $("#fire").css("left", "-54%");
    $("#fire").css("background-image", "url('Icons/Rocket Fire Left.gif')")
    $("#bill").css("top", "67%");
    $("#bill").css("background-image", "url('Icons/Bullet Bill Right.png')")
    $("#bill, #fire").css("transition-duration" ,".5s");
    setTimeout(killGoomba, 200);
}

function killGoomba() {
    $("#fire").css("left", "135%");
    $("#bill").css("left", "150%");
    $("#bill, #fire").css("transition-duration" ,"2s");
    setTimeout(goombaFly, 400);
    setTimeout(billChangeBack, 1200);
}

function goombaFly() {
    $("#goomba").css("left", "35%");
    $("#goomba").css("animation", "myOrbit 2s infinite linear");
    setTimeout(hideAndMoveGoomba, 500);
}

function hideAndMoveGoomba() {
    $("#goomba").hide();
    $("#goomba").css("animation", "none");
    $("#goomba").css("left", "24.6%");
    $("#goomba").css("bottom", "40%");
    setTimeout(goombaBirth, 2000);
}

function goombaBirth() {
    $("#goomba").show();
    $("#goomba").css("bottom", "30%");
    $("#goomba").css("transition-duration", "1.2s");
    setTimeout(goombaBack, 1500);
}

function goombaBack() {
    $("#goomba").css("bottom", "8.5%");
    $("#goomba").css("transition-duration", ".5s");
}

function billChangeBack() {
    $("#fire").css("top", "11.8%");
    $("#fire").css("background-image", "url('Icons/Rocket Fire Right.gif')")
    $("#bill").css("top", "6%");
    $("#bill").css("background-image", "url('Icons/Bullet Bill.ico')")
    $("#bill, #fire").css("transition-duration" ,".1s");
    setTimeout(billBack, 200);
    setTimeout(fireBack, 250);
}

function billBack () {
    $("#bill").css("left", "75%");
    $("#bill").css("transition-duration" ,"1.5s");
    setTimeout(killFire, 1000);
}

function fireBack() {
    $("#fire").css("left", "79%");
    $("#fire").css("transition-duration" ,"1.6s");
}

function killFire() {
    $("#fire").css("opacity", "0");
    $("#fire").css("transition-duration" ,"1s");
}

//---------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------Function for Making Course Divs--------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------------------

var even = true;
function makeCourseDivs(designator, name, credits) {
    var table = $('#data-table').DataTable();

    table.row.add($(
        '<tr draggable="true" id="table-row">' +
        '<td id="bottom-left">' + designator + '</td > ' +
        '<td id="bottom-middle">' + name + '</td>' +
        '<td id="bottom-right">'+ credits + '</td>' +
        '</tr>'
    )).draw();
}

function dimSemesters(myPlan) {
    currYear = myPlan.getYear();
    currTerm = myPlan.getTerm();
    $(".semesters").each(function (i, semDiv) {
        var currCourse = false;
        $('span', semDiv).each(function (j, sem) {
            if (sem.innerHTML.includes(currYear) && sem.innerHTML.includes(currTerm)) {
                currCourse = true;
                return false;
            }
            $(this).parent().css("opacity", ".6");
            $(this).parent().css("pointer-events", "none");
            $(this).find(".semester-class").css("pointer-events", "none");
        });
        if (currCourse) {
            return false;
        }
    });
}

//---------------------------------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------Form Validation--------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------------------

// Hide and show proper divs when login is clicked
function checkValues() {
    let student = $("#student").val();
    let email = $("#email").val();
    let password = $("#password").val();
    let login = true;

    ////Validate last, first name
    //let validate = student.search(/[a-zA-Z]+(,)?\s[a-zA-Z]/);
    //if (validate != 0) {
    //    $("#student").css("border", "1px #880000 solid");
    //    $("#studentText").text("Invalid Name");
    //    $("#studentText").css("color", "#880000");

    //    if (validate == "Shmoe, Joe" || validate == "Shmoe Joe"); {
    //        login = false;
    //    }
    //}
    //// Validate email
    //validate = email.search(/(.+)@(.+){2,}\.(.+){2,}/);
    //if (validate != 0) {
    //    $("#email").css("border", "1px #880000 solid");
    //    $("#emailText").text("Invalid Email");
    //    $("#emailText").css("color", "#880000");

    //    if (validate == "jshmoe@cedarville.edu"); {
    //        login = false;
    //    }
    //}

    //// Validate password
    //validate = password.search(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/);
    //if (validate != 0) {
    //    $("#password").css("border", "1px #880000 solid");
    //    $("#passwordText").text("Invalid Password");
    //    $("#passwordText").css("color", "#880000");

    //    if(validate == "Joe1sBest!"); {
    //        login = false;
    //    }
    //}

    // Put things back to normal if no errors occured
    if (login) {
        $("#form").css("transition-duration", ".8s");
        $("#form, .input, .input-text").css("width", "0");
        $("#form").css("height", "0");
        setTimeout(hideOthers, 300);
        setTimeout(hideForm, 800);
    }
}

//---------------------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------Form Animations ----------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------------------

function hideOthers() {
    $(".input").hide();
    $(".input-text").hide();
    $("#login").hide();
}

function hideForm() {
    $("#form").hide();
    $("#blur").css("opacity", "1");
    $("#blur").css("background", "transparent");
    $("#blur").css("pointer-events", "auto");

    readData();
}

//---------------------------------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------Project Animations-----------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------------------

// When project on home page is clicked
function projectClick(proj, text) {
    btp = text;
    btp = btp.substring(15, 30);
    var id = proj;

    if (btp.includes("to")) {
        id = "cs3220";
    }

    return id;
}

// When project on other project is clicked
function subProjectClick(proj, text) {
    btp = text;
    btp = btp.substring(15, 30);
    var id = proj;

    if (btp.includes("ack")) {
        id = "cs3220";
    }
    else {
        id = id.slice(4);
    }

    return id;
}

// Project animation when clicked
function projectClickAnimation(proj) {
    $(".project").hide();
    $(proj).show();
    $(proj).css("left", "50%");
    $(proj).css("top", "10%");
    $(proj).css("transition-duration", ".8s");
    $(".project").css("animation", "none");
    $("#sub-termProject").css("animation", "none");
    $("#rotate").css("animation", "none");
    $("#sub-rotate").css("animation", "none");
    setTimeout(marioAnimation, 700);
    // $("#mario").css("top","90%");
    // $("#mario").css("transition-duration", "2s");
}

function marioAnimation(){
    $("#mario").css("background-image", "url('Icons/Mario Jump.png')");
    $("#mario").css("top", "35%");
    $("#mario").css("transition-duration", ".7s");
    $("#mario").css("height", "42%");
    var coin = document.createElement('audio');
    coin.setAttribute('src', 'Coin.mp3');
    coin.play();
    setTimeout(coinAnimation, 200);
}

function coinAnimation() {
    $(".project").css("background", "url('Icons/Coin Fast.gif')");
    $(".project").css("background-repeat", "no-repeat");
    $(".project").css("background-size", "cover");
    setTimeout(coinExpand, 300);
}

function coinExpand() {
    $(".project, body").css("transition-duration", "1.2s");
    $(".project").css("transform", "scale(20)");
    $(".project").css("top", "50%");
    $(".project").css("z-index", "2");
    $("body").css("opacity", "0");
    var letsGo = document.createElement('audio');
    letsGo.setAttribute('src', 'lets-a-go.mp3');
    letsGo.play();
}

// Move all projects from middle to their set locations
function startUpProjectAnimation() {
    $(".project").css("margin", "-12.5% 0 0 -12.5%");
    $(".project").css("transition-duration", ".8s");

    $("#project1").css("top", "20%");
    $("#project1").css("left", "68%");

    $("#project2").css("top", "50%");
    $("#project2").css("left", "85%");

    $("#project3").css("top", "80%");
    $("#project3").css("left", "68%");

    $("#project4").css("top", "80%");
    $("#project4").css("left", "32%");

    $("#project5").css("top", "50%");
    $("#project5").css("left", "15%");

    $("#project6").css("top", "20%");
    $("#project6").css("left", "32%");

    $("#termProject").css("top", "50%");
    $("#termProject").css("left", "50%");

    // Sub-projects
    $(".sub-project").css("margin", "-12.5% 0 0 -12.5%");

    $("#sub-project1").css("top", "20%");
    $("#sub-project1").css("left", "68%");

    $("#sub-project2").css("top", "50%");
    $("#sub-project2").css("left", "85%");

    $("#sub-project3").css("top", "80%");
    $("#sub-project3").css("left", "68%");

    $("#sub-project4").css("top", "80%");
    $("#sub-project4").css("left", "32%");

    $("#sub-project5").css("top", "50%");
    $("#sub-project5").css("left", "15%");

    $("#sub-project6").css("top", "20%");
    $("#sub-project6").css("left", "32%");


    $("#sub-termProject").css("top", "50%");
    $("#sub-termProject").css("left", "50%");
}

// Go to the next page of the current project clicked on
function nextPage() {
    if (projectID == "project1" || projectID == "project2" || projectID == "project3" || projectID == "cs3220") {
        document.location.href = projectID + ".html";
    }
    else if (projectID == "project4") {
        document.location.href = projectID + "-login.php";
    }
    else {
        document.location.href = projectID + ".php";
    }

    setTimeout(500, function () {
        $("body").css("opacity", "1");
    });
}