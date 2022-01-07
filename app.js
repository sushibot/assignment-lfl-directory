// Your work here
const directory_container = document.getElementById("directory");

const person_add_icon = "./assets/icons/person_add.svg";
const search_icon = "./assets/icons/search.svg";
const delete_icon = "./assets/icons/delete.svg";
const edit_icon = "./assets/icons/edit.svg";

$("#directory-list-page").on("click", directory_list_page);
$("#directory-add-person-page").on("click", directory_add_person_page);
$("#directory-verify-person-page").on("click", directory_verify_person_page);
$("#directory-delete-person-page").on("click", directory_delete_person_page);
$("#directory-update-person-page").on("click", directory_update_person_page);

function init() {
  return directory_list_page();
}

function update_localstorage() {
  localStorage.setItem("directory", JSON.stringify(employeeList));
}

function reset_view() {
  directory_container.textContent = "";
}

function directory_list_page() {
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
  button.addEventListener("click", () => find_person());
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
  button.addEventListener("click", update_person);

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
function update_employee_form_view() {
  const update_form = document.getElementById("update-person-form");

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
    if (input.value) {
      new_person[input.name] = input.value;
    }
  });
  employeeList.push(new_person);
  update_localstorage();
  alert(`Succesfully added ${new_person.name.toUpperCase()}!`);
}

function delete_person() {
  const forms = document.forms["delete-person"].getElementsByTagName("input");
  const inputs = Array.from(forms);
  const input_value = inputs[0].value.toLowerCase();

  if (!input_value) return alert("Please type in the name you wish to delete.");

  employeeList.forEach((employee, index) => {
    const name = employee.name.toLowerCase();

    if (name === input_value) {
      employeeList.splice(index, 1);
    }
  });
  update_localstorage();
  alert(`Succesfully deleted ${input_value.toUpperCase()}!`);
}

function find_person() {
  const forms = document.forms["verify-person"].getElementsByTagName("input");
  const inputs = Array.from(forms);
  const input_value = inputs[0].value.toLowerCase();
  let result = false;
  let found_employee = "";
  if (!input_value) return alert("Please type in the name you wish to verify.");
  employeeList.forEach((employee, index) => {
    const name = employee.name.toLowerCase();

    if (name === input_value) {
      result = true;
      found_employee = employee;
    }
  });
  if (result) {
    return verify_person_view(found_employee);
  } else {
    return alert(
      `No employee found under the name ${input_value.toUpperCase()}`
    );
  }
}

init();
