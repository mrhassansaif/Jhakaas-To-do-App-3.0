auth.onAuthStateChanged((user) => {
  if (user) {
    console.log("user is signed in at users.html");
  } else {
    alert(
      "your login session has expired or you have logged out, login again to continue"
    );
    location = "../index.html";
  }
});

auth.onAuthStateChanged((user) => {
  const username = document.getElementById("username");
  if (user) {
    fs.collection("users")
      .doc(user.uid)
      .get()
      .then((snapshot) => {
        // console.log(snapshot.data().Name);
        username.innerText = snapshot.data().Name;
      });
  } else {
    // console.log('user is not signed in to retrive username');
  }
});

arr = [];
var btn_add = document.getElementById("additem");
var btn_delete = document.getElementById("deleted");

function get_update() {
  let title = document.getElementById("title").value;
  let desc = document.getElementById("description").value;
  arr.push([title, desc]);
  update();
}

function update() {
  str = "";
  arr.forEach((element, index) => {
    str =
      str +
      `<tr>
        <th scope="row">${index + 1}</th>
        <td>${element[0]}</td>
        <td>${element[1]}</td>
        <td><button type="submit" onclick="deleted(${index})" class="btn btn-outline-danger btn-rounded waves-effect"
        >
          Delete &nbsp; &nbsp;<i class="fas fa-trash pr-2"></i>
        </button></td>
        </tr>`;
  });
  document.getElementById("tableBody").innerHTML = str;
}

function deleted(item_index) {
  arr.splice(item_index, 1);
  console.log(arr);
  update();
}

btn_add.addEventListener("click", () => {
  get_update();
});
