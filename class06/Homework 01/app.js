// Homework

// There is a JSON file with students. Make a call to the file and get the following data from it:

// All students with an average grade higher than 3
// All female student names with an average grade of 5
// All male student full names who live in Skopje and are over 18 years old
// The average grades of all female students over the age of 24
// All male students with a name starting with B and average grade over 2
// Use higher order functions to find the answers 
// Link: https://raw.githubusercontent.com/sedc-codecademy/skwd9-04-ajs/main/Samples/students_v2.json


async function getDataFromApi() {
    try {
        const data = await fetch("https://raw.githubusercontent.com/sedc-codecademy/skwd9-04-ajs/main/Samples/students_v2.json");
        const students = await data.json();
        return students;

    } catch (error) {
        console.log("Something went wrong, please try again later", error);
    }
}


// All students with an average grade higher than 3
getDataFromApi().then(students => {
    let studentsWithGradeHigherThan3 = students
        .filter(student => student.averageGrade > 3)
        .map(student => student);

    console.log(studentsWithGradeHigherThan3);
});

// All female student names with an average grade of 5
getDataFromApi().then(students => {
    let femalesWithAverageGrade5 = students
        .filter(student => student.gender === "Female")
        .filter(student => student.averageGrade === 5)
        .map(student => student.firstName);

    console.log(femalesWithAverageGrade5);
});


// All male student full names who live in Skopje and are over 18 years old
getDataFromApi().then(students => {
    let maleFulnamesFromSkopjeOver18 = students
        .filter(student => student.gender === "Male")
        .filter(student => student.age > 18)
        .filter(student => student.city === "Skopje")
        .map(student => `${student.firstName} ${student.lastName}`);

    console.log(maleFulnamesFromSkopjeOver18);
});


// The average grades of all female students over the age of 24
getDataFromApi().then(students => {
    let femalesOver24AverageGrade = students
        .filter(student => student.gender === "Female")
        .filter(student => student.age > 24)
        .map(student => student.averageGrade);

    // .reduce((sum, grade) => sum += grade, 0); //Sum of average grades 

    console.log(femalesOver24AverageGrade);
});


// All male students with a name starting with B and average grade over 2
getDataFromApi().then(students => {
    let malesWithNameStartingWithBAndAverageGradeOver2 = students
        .filter(student => student.gender === "Male")
        .filter(student => student.firstName[0] === "B")
        .filter(student => student.averageGrade > 2)

    console.log(malesWithNameStartingWithBAndAverageGradeOver2);
});
