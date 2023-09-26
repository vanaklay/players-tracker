export class Player extends EventTarget {
  constructor(id, firstName, lastName, attendance) {
    super();

    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.attendance = attendance;

    this.element = createElement(firstName, lastName, attendance);

    this.element.addEventListener("click", () => {
      const event = new CustomEvent("toggle");
      this.dispatchEvent(event);
    });
  }
}

const createElement = (firstName, lastName, attendance) => {
  const element = document.createElement("button");
  element.classList.add("player");

  if (attendance) {
    element.classList.add("attendance");
  }

  const fullNameElement = createFullNameElement(firstName, lastName);
  element.appendChild(fullNameElement);
  const attendanceElement = createAttendanceElement(attendance);
  element.appendChild(attendanceElement);
  return element;
};

const createFullNameElement = (firstName, lastName) => {
  const fullNameElement = document.createElement("span");
  fullNameElement.innerText = `${firstName} ${lastName}`;
  return fullNameElement;
};

const createAttendanceElement = (attendance) => {
  const doneElement = document.createElement("span");
  doneElement.innerText = attendance ? "✅" : "❌";
  return doneElement;
};
