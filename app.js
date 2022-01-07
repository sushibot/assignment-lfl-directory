// Your work here
const directory_container = document.getElementById("directory");
let global_employee_name = "";

const person_add_icon = "./assets/icons/person_add.svg";
const search_icon = "./assets/icons/search.svg";
const delete_icon = "./assets/icons/delete.svg";
const edit_icon = "./assets/icons/edit.svg";
const done_icon = "./assets/icons/done.svg";
const close_icon = "./assets/icons/close.svg";

$("#directory-list-page").on("click", directory_list_page);
$("#add-employee-action").on("click", add_employee_form_modal);
$("#directory-verify-person-page").on("click", directory_verify_person_page);
$("#directory-delete-person-page").on("click", directory_delete_person_page);
// $("#directory-update-person-page").on("click", directory_update_person_page);

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
  const employee_directory_list = DirectoryListCardsComponent();

  return directory_container.appendChild(employee_directory_list);
}
function directory_add_person_page() {
  reset_view();

  const form = FormComponent({
    name: "insert-person",
    id: "insert-person-form",
  });

  const input_name = InputComponent({ name: "name" });
  const input_office_num = InputComponent({ name: "officeNum" });
  const input_phone_num = InputComponent({ name: "phoneNum" });
  const button = ButtonComponent({ icon: person_add_icon });

  form.appendChild(input_name);
  form.appendChild(input_office_num);
  form.appendChild(input_phone_num);
  form.appendChild(button);

  directory_container.appendChild(form);
  button.addEventListener("click", () => {
    insert_person();
  });

  const employee_directory_list = DirectoryListCardsComponent();

  directory_container.appendChild(employee_directory_list);
}

function directory_verify_person_page() {
  reset_view();

  const form = FormComponent({
    name: "verify-person",
    id: "verify-person-form",
  });

  const input_name = InputComponent({ name: "name" });
  const button = ButtonComponent({ icon: search_icon });

  form.appendChild(input_name);

  form.appendChild(button);

  directory_container.appendChild(form);

  button.addEventListener("click", () => {
    const employee = find_person("verify-person");
    verify_person_view(employee);
  });

  const employee_directory_list = DirectoryListCardsComponent();

  directory_container.appendChild(employee_directory_list);
}

function directory_delete_person_page() {
  reset_view();

  const form = FormComponent({ name: "delete-person" });
  const input_name = InputComponent({ name: "name" });
  const button = ButtonComponent({ icon: delete_icon });

  form.appendChild(input_name);
  form.appendChild(button);

  directory_container.appendChild(form);
  button.addEventListener("click", () => {
    delete_person();
  });

  const employee_directory_list = DirectoryListCardsComponent();

  directory_container.appendChild(employee_directory_list);
}

// function directory_update_person_page() {
//   reset_view();

//   const form = FormComponent({
//     id: "update-person-form",
//     name: "update-person",
//   });

//   const input_name = InputComponent({
//     name: "employee-search",
//   });

//   const button = ButtonComponent({
//     icon: edit_icon,
//     className: "button-icon__edit",
//   });

//   form.appendChild(input_name);
//   form.appendChild(button);

//   directory_container.appendChild(form);

//   button.addEventListener("click", () => {
//     const employee = find_person("update-person");
//     update_employee_form_view(employee);
//   });

//   const employee_directory_list = DirectoryListCardsComponent();

//   directory_container.appendChild(employee_directory_list);
// }

/***** VIEWS *****/

function add_employee_form_modal() {
  const form_id = "add-new-employee";
  const form = FormComponent({
    id: form_id,
    name: "add-new-employee",
  });

  const input_name = InputComponent({
    name: "name",
    type: "text",
  });
  const input_office_num = InputComponent({
    name: "officeNum",
    type: "tel",
  });

  const input_phone_num = InputComponent({
    name: "phoneNum",
    type: "tel",
  });

  form.appendChild(input_name);
  form.appendChild(input_office_num);
  form.appendChild(input_phone_num);

  const modal = ModalComponent(form, "Add Employee", form_id, {
    button_action: insert_person,
    button_name: "Add",
  });
}

function update_employee_form_modal({ name, office_num, phone_num }) {
  const form_id = `update-${name.toLowerCase()}`;
  const form = FormComponent({
    id: form_id,
    name: "update-person",
  });

  const input_office_num = InputComponent({
    name: "officeNum",
    value: office_num,
    type: "tel",
  });

  const input_phone_num = InputComponent({
    name: "phoneNum",
    value: phone_num,
    type: "tel",
  });

  form.appendChild(input_office_num);
  form.appendChild(input_phone_num);

  global_employee_name = name;
  const title = name;

  const modal = ModalComponent(form, title, form_id, {
    button_action: update_person,
    button_name: "Update",
  });
}

function verify_person_view(employee) {
  const div = document.createElement("div");
  const name = document.createElement("label");
  const office_num = document.createElement("p");
  const phone_num = document.createElement("p");

  const lookup_form = document.getElementById("verify-person-form");
  name.innerText = employee.name;
  office_num.innerText = employee.officeNum;
  phone_num.innerText = employee.phoneNum;

  div.classList.add("card__selected");
  div.appendChild(name);
  div.appendChild(office_num);
  div.appendChild(phone_num);
  lookup_form.parentNode.insertBefore(div, lookup_form.nextSibling);
}

/***** COMPONENTS *****/

function ModalComponent(
  content,
  title = "",
  form_id,
  { button_name, button_action }
) {
  const modal = document.getElementById("custom-modal");

  const modal_content = document.getElementById("custom-modal-content");
  const modal_title = document.getElementById("custom-modal-title");
  const modal_close_action = document.getElementById(
    "custom-modal-close-action"
  );

  const modal_custom_action = document.getElementById(
    "custom-modal-action-button"
  );

  modal_title.textContent = title;
  modal_custom_action.classList.add("button-primary");
  modal_custom_action.textContent = button_name;

  modal_content.appendChild(content);

  modal.style.display = "block";

  modal_close_action.addEventListener("click", () => {
    modal.style.display = "none";
    modal_content.textContent = "";
  });

  modal_custom_action.addEventListener("click", () => button_action(form_id));
}

function DirectoryListCardsComponent() {
  const ul = document.createElement("ul");
  ul.classList.add("directory-list-container");

  employeeList.forEach((employee) => {
    const list_item = ListItemComponent({
      name: employee.name,
      office_num: employee.officeNum,
      phone_num: employee.phoneNum,
    });
    ul.appendChild(list_item);
  });
  return ul;
}

function ListItemComponent({ name, office_num, phone_num }) {
  const li = document.createElement("li");
  const name_label = document.createElement("label");
  const office_num_label = document.createElement("label");
  const phone_num_label = document.createElement("label");
  const div = document.createElement("div");

  const update_button = ButtonComponent({
    icon: edit_icon,
    className: ["button-icon", "button-icon__edit"],
  });
  const delete_button = ButtonComponent({
    icon: delete_icon,
    className: ["button-icon", "button-icon__remove"],
  });

  update_button.addEventListener("click", () => {
    update_employee_form_modal({ name, office_num, phone_num });
  });

  delete_button.addEventListener("click", () => {
    delete_person(name);
  });

  name_label.innerText = name;
  office_num_label.innerText = office_num;
  phone_num_label.innerText = phone_num;

  li.classList.add("card");
  div.classList.add("card-actions");

  div.appendChild(update_button);
  div.appendChild(delete_button);

  li.appendChild(name_label);
  li.appendChild(office_num_label);
  li.appendChild(phone_num_label);
  li.appendChild(div);

  return li;
}

function FormComponent({ id = "", name = "" } = {}) {
  const form = document.createElement("form");
  form.name = name;
  form.id = id;
  form.classList.add("directory-form-container");
  return form;
}

function InputComponent({
  name,
  value = "",
  read_only = false,
  type = "",
} = {}) {
  const input = document.createElement("input");
  input.type = type;

  input.value = value;
  input.name = name;
  input.readOnly = read_only;
  input.classList.add("form-input");
  return input;
}

function ButtonComponent({ icon = "", type = "button", className = [] } = {}) {
  const button = document.createElement("button");
  button.type = type;
  if (className.length) button.classList.add(...className);

  const img_icon = document.createElement("img");
  img_icon.setAttribute("src", icon);
  button.appendChild(img_icon);

  return button;
}

/***** CRUD OPERATIONS *****/

function update_person(form_id) {
  const forms = document.forms[form_id].getElementsByTagName("input");
  const inputs = Array.from(forms);

  const [office_num_input, phone_num_input] = inputs;

  const employee = employeeList.find(
    (employee) =>
      employee.name.toLowerCase() === global_employee_name.toLowerCase()
  );

  employee.officeNum = office_num_input.value;
  employee.phoneNum = phone_num_input.value;

  alert(`Succesfully updated record for ${global_employee_name}`);

  if (!employee) return alert(`No matching record found for ${input_value}`);

  directory_list_page();
}

function insert_person(form_id) {
  const forms = document.forms[form_id].getElementsByTagName("input");
  const inputs = Array.from(forms);
  let new_person = {
    name: "",
    officeNum: "",
    phoneNum: "",
  };

  inputs.forEach((input) => {
    if (input.value !== "") {
      new_person[input.name] = input.value;
    }
  });

  employeeList.push(new_person);
  console.log(employeeList);
  alert(`Succesfully added ${new_person.name.toUpperCase()}!`);
  directory_list_page();
}

function delete_person(employee_name) {
  const found_employee_index = employeeList.findIndex(
    (employee) => employee.name.toLowerCase() === employee_name.toLowerCase()
  );

  if (found_employee_index > -1) {
    employeeList.splice(found_employee_index, 1);

    alert(`Succesfully deleted ${employee_name.toUpperCase()}!`);
  } else {
    alert(`No record found for ${employee_name.toUpperCase()}!`);
  }

  directory_list_page();
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
