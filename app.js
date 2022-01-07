// Your work here
const directory_container = document.getElementById("directory");

const person_add_icon = "./assets/icons/person_add.svg";
const search_icon = "./assets/icons/search.svg";
const delete_icon = "./assets/icons/delete.svg";
const edit_icon = "./assets/icons/edit.svg";
const done_icon = "./assets/icons/done.svg";

$("#directory-list-page").on("click", directory_list_page);
$("#directory-add-person-page").on("click", directory_add_person_page);
$("#directory-verify-person-page").on("click", directory_verify_person_page);
$("#directory-delete-person-page").on("click", directory_delete_person_page);
$("#directory-update-person-page").on("click", directory_update_person_page);

function init() {
  return directory_list_page();
}

// function update_localstorage() {
//   localStorage.setItem("directory", JSON.stringify(employeeList));
// }

// function get_localstorage() {
//   const list = localStorage.getItem("directory");
//   const length = localStorage.length;
//   if (!length) return;
//   employeeList = JSON.parse(list);
// }

function reset_view() {
  directory_container.textContent = "";
}

/***** PAGE NAVIGATION OPERATIONS *****/
function directory_list_page() {
  reset_view();
  const ul = document.createElement("ul");
  ul.classList.add("directory-list-container");
  employeeList.forEach((employee) => {
    const li = document.createElement("li");
    const name = document.createElement("label");
    const office_num = document.createElement("p");
    const phone_num = document.createElement("p");

    name.innerText = employee.name;
    office_num.innerText = employee.officeNum;
    phone_num.innerText = employee.phoneNum;

    li.classList.add("card");
    li.appendChild(name);
    li.appendChild(office_num);
    li.appendChild(phone_num);
    ul.appendChild(li);
  });
  directory_container.appendChild(ul);
}

function directory_add_person_page() {
  reset_view();

  const form = document.createElement("form");
  const input_name = document.createElement("input");
  const input_office_num = document.createElement("input");
  const input_phone_num = document.createElement("input");
  const button = document.createElement("button");
  const button_icon = document.createElement("img");

  button_icon.setAttribute("src", person_add_icon);
  button.appendChild(button_icon);
  button.type = "button";

  form.classList.add("directory-form-container");

  input_name.classList.add("form-input");
  input_name.name = "name";
  input_office_num.classList.add("form-input");
  input_office_num.name = "officeNum";
  input_phone_num.classList.add("form-input");
  input_phone_num.name = "phoneNum";

  form.appendChild(input_name);
  form.appendChild(input_office_num);
  form.appendChild(input_phone_num);
  form.appendChild(button);
  form.name = "insert-person";
  form.id = "insert-person-form";
  directory_container.appendChild(form);
  button.addEventListener("click", () => insert_person());

  const ul = document.createElement("ul");
  ul.classList.add("directory-list-container");
  employeeList.forEach((employee) => {
    const li = document.createElement("li");
    const name = document.createElement("label");
    const office_num = document.createElement("p");
    const phone_num = document.createElement("p");

    name.innerText = employee.name;
    office_num.innerText = employee.officeNum;
    phone_num.innerText = employee.phoneNum;

    li.classList.add("card");
    li.appendChild(name);
    li.appendChild(office_num);
    li.appendChild(phone_num);
    ul.appendChild(li);
  });
  directory_container.appendChild(ul);
}

function directory_verify_person_page() {
  reset_view();
  const form = document.createElement("form");
  const input_name = document.createElement("input");
  const button = document.createElement("button");
  const button_icon = document.createElement("img");

  button_icon.setAttribute("src", search_icon);
  button.appendChild(button_icon);
  button.type = "button";
  input_name.classList.add("form-input");

  form.appendChild(input_name);
  form.appendChild(button);
  form.classList.add("directory-form-container");
  form.name = "verify-person";

  directory_container.appendChild(form);
  button.addEventListener("click", () => {
    const employee = find_person(form.name);
    verify_person_view(employee);
  });

  const ul = document.createElement("ul");
  ul.classList.add("directory-list-container");
  employeeList.forEach((employee) => {
    const li = document.createElement("li");
    const name = document.createElement("label");
    const office_num = document.createElement("p");
    const phone_num = document.createElement("p");

    name.innerText = employee.name;
    office_num.innerText = employee.officeNum;
    phone_num.innerText = employee.phoneNum;

    li.classList.add("card");
    li.appendChild(name);
    li.appendChild(office_num);
    li.appendChild(phone_num);
    ul.appendChild(li);
  });
  directory_container.appendChild(ul);
}

function directory_delete_person_page() {
  reset_view();

  const form = document.createElement("form");
  const input_name = document.createElement("input");
  const button = document.createElement("button");
  const button_icon = document.createElement("img");
  form.classList.add("directory-form-container");

  button_icon.setAttribute("src", delete_icon);
  button.appendChild(button_icon);
  button.type = "button";
  input_name.classList.add("form-input");
  input_name.name = "name";
  form.appendChild(input_name);
  form.appendChild(button);
  form.name = "delete-person";

  directory_container.appendChild(form);
  button.addEventListener("click", () => delete_person());

  const ul = document.createElement("ul");
  ul.classList.add("directory-list-container");
  employeeList.forEach((employee) => {
    const li = document.createElement("li");
    const name = document.createElement("label");
    const office_num = document.createElement("p");
    const phone_num = document.createElement("p");

    name.innerText = employee.name;
    office_num.innerText = employee.officeNum;
    phone_num.innerText = employee.phoneNum;

    li.classList.add("card");
    li.appendChild(name);
    li.appendChild(office_num);
    li.appendChild(phone_num);
    ul.appendChild(li);
  });
  directory_container.appendChild(ul);
}

function directory_update_person_page() {
  reset_view();
  const form = document.createElement("form");
  const input_name = document.createElement("input");
  const button = document.createElement("button");
  const button_icon = document.createElement("img");

  button_icon.setAttribute("src", edit_icon);
  button.appendChild(button_icon);
  button.type = "button";
  input_name.classList.add("form-input");

  form.appendChild(input_name);
  form.appendChild(button);
  form.classList.add("directory-form-container");
  form.name = "update-person";
  form.id = "update-person-form";

  directory_container.appendChild(form);

  button.addEventListener("click", () => {
    const employee = find_person(form.name);
    update_employee_form_view(employee);
  });

  const ul = document.createElement("ul");
  ul.classList.add("directory-list-container");
  employeeList.forEach((employee) => {
    const li = document.createElement("li");
    const name = document.createElement("label");
    const office_num = document.createElement("p");
    const phone_num = document.createElement("p");

    name.innerText = employee.name;
    office_num.innerText = employee.officeNum;
    phone_num.innerText = employee.phoneNum;

    li.classList.add("card");
    li.appendChild(name);
    li.appendChild(office_num);
    li.appendChild(phone_num);
    ul.appendChild(li);
  });
  directory_container.appendChild(ul);
}

function update_employee_form_view(employee) {
  const update_form = document.getElementById("update-person-form");

  const form = document.createElement("form");
  const input_name = document.createElement("input");
  const input_office_num = document.createElement("input");
  const input_phone_num = document.createElement("input");
  const button = document.createElement("button");
  const button_icon = document.createElement("img");

  button_icon.setAttribute("src", done_icon);
  button.appendChild(button_icon);
  button.type = "button";

  form.classList.add("directory-form-container");

  input_name.classList.add("form-input");
  input_name.name = "name";
  input_name.value = employee.name;
  input_name.readOnly = true;

  input_office_num.classList.add("form-input");
  input_office_num.name = "officeNum";
  input_office_num.value = employee.officeNum;

  input_phone_num.classList.add("form-input");
  input_phone_num.name = "phoneNum";
  input_phone_num.value = employee.phoneNum;

  form.appendChild(input_name);
  form.appendChild(input_office_num);
  form.appendChild(input_phone_num);
  form.appendChild(button);
  form.name = "insert-person";
  form.id = "insert-person-form";
  update_form.appendChild(form);
  button.addEventListener("click", () => update_person);
}

function verify_person_view(employee) {
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
}

/***** COMPONENTS *****/

function input_component({ name, value = "", read_only = false } = {}) {
  const input = document.createElement("input");
  if (value) {
    input.value = value;
  }
  input.readOnly = read_only;
  input.classList.add("form-input");
  return input;
}
/***** CRUD OPERATIONS *****/
function update_person() {
  const forms = document.forms["update-person"].getElementsByTagName("input");
  const inputs = Array.from(forms);
  const input_value = inputs[0].value.toLowerCase();
  if (!input_value) return alert("Please type in the name you wish to update.");
  const employee = employeeList.find(
    (employee) => employee.name.toLowerCase() === input_value
  );
  if (!employee) return alert(`No matching record found for ${input_value}`);
  update_employee_form_view();
}

function insert_person() {
  const forms = document.forms["insert-person"].getElementsByTagName("input");
  const inputs = Array.from(forms);
  let new_person = {
    name: "",
    officeNum: "",
    phoneNum: "",
  };
  inputs.forEach((input) => {
    console.log(input.value);
    if (input.value !== "") {
      new_person[input.name] = input.value;
    }
  });
  employeeList.push(new_person);

  alert(`Succesfully added ${new_person.name.toUpperCase()}!`);
  directory_add_person_page();
}

function delete_person() {
  const forms = document.forms["delete-person"].getElementsByTagName("input");
  const inputs = Array.from(forms);
  const input_value = inputs[0].value.toLowerCase();

  if (!input_value) return alert("Please type in the name you wish to delete.");

  const found_employee_index = employeeList.findIndex(
    (employee) => employee.name.toLowerCase() === input_value
  );
  if (found_employee_index > -1) {
    employeeList.splice(found_employee_index, 1);
    alert(`Succesfully deleted ${input_value.toUpperCase()}!`);
  } else {
    alert(`No record found for ${input_value.toUpperCase()}!`);
  }

  directory_delete_person_page();
}

function find_person(form_name) {
  const forms = document.forms[form_name].getElementsByTagName("input");
  const inputs = Array.from(forms);
  const input_value = inputs[0].value.toLowerCase();

  if (!input_value) return alert("Please type in the name you wish to verify.");
  const found_employee_index = employeeList.findIndex(
    (employee) => employee.name.toLowerCase() === input_value
  );

  if (found_employee_index > -1) {
    const found_employee = employeeList[found_employee_index];

    return found_employee;
  } else {
    return alert(
      `No employee found under the name ${input_value.toUpperCase()}`
    );
  }
}

init();
