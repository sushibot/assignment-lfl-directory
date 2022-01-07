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
$("#search-employee-action").on("click", search_person_results_modal);

function init() {
  return directory_list_page();
}

function reset_view() {
  directory_container.textContent = "";
}

/***** PAGE NAVIGATION OPERATIONS *****/
function directory_list_page() {
  reset_view();
  const employee_directory_list = DirectoryListCardsComponent();

  return directory_container.appendChild(employee_directory_list);
}

/***** MODALS *****/

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

function search_person_results_modal() {
  const form_name = "search-employee";
  const employee = find_person(form_name);

  if (!employee) return alert(`No employee found for given name.`);

  const employee_details = ListItemComponent({
    name: employee.name,
    office_num: employee.officeNum,
    phone_num: employee.phoneNum,
    display_actions: false,
  });
  const modal = ModalComponent(employee_details, "Employee Search", null);
}

/***** COMPONENTS *****/

function ModalComponent(
  content,
  title,
  form_id,
  { button_name, button_action } = {}
) {
  const modal = document.getElementById("custom-modal");

  const modal_content = document.getElementById("custom-modal-content");
  const modal_title = document.getElementById("custom-modal-title");
  const modal_close_action = document.getElementById(
    "custom-modal-close-action"
  );

  const modal_custom_action_button = document.getElementById(
    "custom-modal-action-button"
  );
  const modal_custom_actions = document.getElementById("custom-modal-actions");
  if (title) {
    modal_title.textContent = title;
  }

  modal_content.appendChild(content);

  modal.style.display = "block";

  modal_close_action.addEventListener("click", () => {
    modal.style.display = "none";
    modal_content.textContent = "";
    modal_custom_actions.classList.add("modal-contents__hide");
  });

  if (form_id) {
    modal_custom_actions.classList.remove("modal-contents__hide");
    modal_custom_actions.classList.add("modal-actions");

    modal_custom_action_button.classList.add("button-primary");
    modal_custom_action_button.textContent = button_name;
    modal_custom_action_button.addEventListener("click", () =>
      button_action(form_id)
    );
  }
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

function ListItemComponent({
  name,
  office_num,
  phone_num,
  display_actions = true,
} = {}) {
  const li = document.createElement("li");
  const name_label = document.createElement("label");
  const office_num_label = document.createElement("label");
  const phone_num_label = document.createElement("label");
  const div = document.createElement("div");

  name_label.innerText = name;
  office_num_label.innerText = office_num;
  phone_num_label.innerText = phone_num;

  li.classList.add("card");
  if (display_actions) {
    div.classList.add("card-actions");

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
    div.appendChild(update_button);
    div.appendChild(delete_button);
  }

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
  if (!document.forms[form_id]) return;
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
  const [input_name, input_office_num, input_phone_num] = Array.from(forms);

  const invalid_form =
    input_name.value.length <= 0 &&
    input_office_num.value.length <= 0 &&
    input_phone_num.value.length <= 0;

  if (invalid_form) {
    return alert("Please fill out the form fields to add a new employee.");
  }

  employeeList.push({
    name: input_name.value,
    officeNum: input_name.value,
    phoneNum: input_phone_num.value,
  });

  alert(`Succesfully added ${input_name.value.toUpperCase()}!`);
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
    return null;
  }
}

init();
