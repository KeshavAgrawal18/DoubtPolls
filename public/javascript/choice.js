var count = 2;
console.log("js file connected");

function add_more_choice() {
  console.log("function called");
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
