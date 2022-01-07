// Your work here
const directory_container = document.getElementById("directory");
const person_add_icon = "./assets/icons/person_add.svg";
const search_icon = "./assets/icons/search.svg";
$("#directory-list-page").on("click", directory_list);
$("#directory-add-person-page").on("click", directory_add_person);

function init() {
  return directory_list();
}
function reset_view() {
  directory_container.textContent = "";
}

function directory_list() {
  reset_view();
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

function directory_add_person() {
  reset_view();

  const form = document.createElement("form");
  const input_name = document.createElement("input");
  const input_office_num = document.createElement("input");
  const input_phone_num = document.createElement("input");
  const button = document.createElement("button");
  const button_icon = document.createElement("img");

  button_icon.setAttribute("src", person_add_icon);
  button.appendChild(button_icon);
  form.classList.add("directory-form-container");

  input_name.classList.add("form-input");
  input_office_num.classList.add("form-input");
  input_phone_num.classList.add("form-input");

  form.appendChild(input_name);
  form.appendChild(input_office_num);
  form.appendChild(input_phone_num);
  form.appendChild(button);

  directory_container.appendChild(form);
}

init();
