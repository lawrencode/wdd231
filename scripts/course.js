const courseData = [
  { code: "WDD 130", name: "Web Fundamentals I", credits: 3, category: "wdd", completed: true },
  { code: "WDD 131", name: "Dynamic Web Fundamentals", credits: 3, category: "wdd", completed: true },
  { code: "WDD 230", name: "Web Frontend Development I", credits: 3, category: "wdd", completed: false },
  { code: "WDD 245", name: "Responsive Design for the Web", credits: 3, category: "wdd", completed: true },
  { code: "CSE 121", name: "JavaScript Programming", credits: 3, category: "cse", completed: true },
  { code: "CSE 122", name: "Software Development Fundamentals", credits: 3, category: "cse", completed: false },
  { code: "CSE 123", name: "Data Structures and Algorithms", credits: 3, category: "cse", completed: false },
  { code: "CSE 210", name: "Introduction to Programming Concepts", credits: 2, category: "cse", completed: true }
];

const filterButtons = document.querySelectorAll(".filter-btn");
const courseList = document.getElementById("courseList");
const totalCredits = document.getElementById("creditTotal");

let currentFilter = "all";

function renderCourses() {
  const filteredCourses = courseData.filter((course) => {
    if (currentFilter === "all") return true;
    return course.category === currentFilter;
  });

  const creditSum = filteredCourses.reduce((sum, course) => sum + course.credits, 0);
  totalCredits.textContent = `Total credits: ${creditSum}`;

  courseList.innerHTML = filteredCourses
    .map(
      (course) => `
        <article class="course-card ${course.completed ? "completed" : ""}">
          <div class="course-header">
            <h3>${course.code}</h3>
            <span class="status ${course.completed ? "" : "pending"}">${course.completed ? "Completed" : "In Progress"}</span>
          </div>
          <p>${course.name}</p>
          <span class="credit-badge">${course.credits} credits</span>
        </article>
      `
    )
    .join("");
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    currentFilter = button.dataset.filter;
    filterButtons.forEach((btn) => btn.classList.toggle("active", btn === button));
    renderCourses();
  });
});

renderCourses();
