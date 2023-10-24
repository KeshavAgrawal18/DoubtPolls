var count = 2;
console.log("js file connected");

function add_more_choice() {
  count++;

  const div = document.createElement("div");
  div.className = "input-group";

  const label = document.createElement("label");
  label.setAttribute("for", "choice" + count);
  label.textContent = "choice";

  const input = document.createElement("input");
  input.type = "text";
  input.id = "choice" + count;
  input.name = "choice" + count;
  input.required = true;

  div.appendChild(label);
  div.appendChild(input);

  const element = document.getElementById("additional-choices");
  element.appendChild(div);

  document.getElementById("poll-form").action = "/create?count=" + count;
}

function myFunction() {
  console.log("function called");
  document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function (event) {
  if (!event.target.matches(".dropbtn")) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("show")) {
        openDropdown.classList.remove("show");
      }
    }
  }
};
