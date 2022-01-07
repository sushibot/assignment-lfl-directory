// Your work here
const directory_container = document.getElementById("directory");
const directory_list_page = document.getElementById("directory-list-page");
const directory_add_person_page = document.getElementById(
  "directory-add-person-page"
);

directory_list_page.addEventListener("click", () => {
  reset_view();
  directory_list();
});
directory_add_person_page.addEventListener("click", () => {
  reset_view();
  console.log("add person...");
});

function reset_view() {
  directory_container.textContent = "";
}
function directory_list() {
  employeeList.forEach((employee) => {
    const div = document.createElement("div");
    const name = document.createElement("label");
    const office_num = document.createElement("p");
    const phone_num = document.createElement("p");

    name.innerText = employee.name;
    office_num.innerText = employee.officeNum;
    phone_num.innerText = employee.phoneNum;

    div.classList.add("card");
    div.appendChild(name);
    div.appendChild(office_num);
    div.appendChild(phone_num);
    directory_container.appendChild(div);
  });
}
directory_list_page();
