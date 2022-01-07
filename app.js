// Your work here
const directory_container = document.getElementById("directory");
const person_add_icon = "./assets/icons/person_add.svg";
const search_icon = "./assets/icons/search.svg";

$("#directory-list-page").on("click", directory_list_page);
$("#directory-add-person-page").on("click", directory_add_person_page);
$("#directory-verify-person-page").on("click", directory_verify_person_page);

function init() {
  return directory_list_page();
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
  button.addEventListener("click", () => {
    insert_person();
  });
}

function directory_verify_person_page() {
  reset_view();
  const form = document.createElement("form");
  const input_name = document.createElement("input");
  const button = document.createElement("button");
  const button_icon = document.createElement("img");

  button_icon.setAttribute("src", search_icon);
  button.appendChild(button_icon);
  input_name.classList.add("form-input");

  form.appendChild(input_name);
  form.appendChild(button);
  form.classList.add("directory-form-container");

  directory_container.appendChild(form);
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
    if (input.validity.valid) {
      new_person[input.name] = input.value;
    }
  });
  employeeList.push(new_person);
  update_localstorage();
}

init();
