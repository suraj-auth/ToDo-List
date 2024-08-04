let i = 0;

// getting all data from server
setTimeout(async () => {
  try {
    let alldata = await fetch("/ALL", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    let parsealldata = await alldata.json();
    if (parsealldata.length > 0) {
      for (let index = 0; index < parsealldata.length; index++) {
        await createdata(
          parsealldata[index].list,
          parsealldata[index]._id,
          parsealldata[index].isDone
        );
      }
    }
  } catch (error) {
    console.log("error occured in js while gettting all data" + error);
  }
}, 100);

// updaing data from database
async function hitchecks(i, v) {
  try {
    let a = document.querySelector(`#content${i}`);
    let b = a.querySelector(".p");
    if (b.classList.contains("tog")) {
      const data = {
        key1: `${v}`,
        key2: false,
      };
      let response = fetch("/U", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      b.classList.toggle("tog");
    } else {
      const data = {
        key1: `${v}`,
        key2: true,
      };
      let response = fetch("/U", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      b.classList.toggle("tog");
    }
  } catch (error) {
    console.log("error is = " + error);
  }
}

// creating data in database
document.querySelector("#btn").addEventListener("click", async () => {
  try {
    let d = document.querySelector("#inpt");
    let e = d.value.trim();
    let postResponse = await fetch("/C", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ list: e, isDone: false }),
    });
    d.value = "";
    let a = await postResponse.json();
    getdata(a);
  } catch (error) {
    console.error("Error occurred in between fetch request:", error);
  }
});

// getting single data from database
async function getdata(e) {
  try {
    let response = await fetch(`/R/${e}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    let parsedata = await response.json();
    await createdata(parsedata.list, parsedata._id, parsedata.isDone);
  } catch (error) {
    console.error("Error occurred while getting data:", error);
  }
}

// appending data in the web page
async function createdata(data, id, isdone) {
  i++;
  let val;
  if (isdone == true) {
    val = "tog";
  } else {
    val = "";
  }
  let a = document.querySelector(".container");
  let n = document.createElement("div");
  n.setAttribute("id", `content${i}`);
  n.classList.add("content");
  n.innerHTML = `<div class="left">
            <label class="custom-checkbox">
              <input id="${id}" onclick=hitchecks("${i}","${id}") type="checkbox" />
              <span class="checkmark"></span>
            </label>
            <div class="para">
              <p class="p ${val}">${data}</p>
            </div>
          </div>
          <div class="right" onclick=deletetodo("${id}","${i}")>
            <i class="fa-solid fa-xmark"></i>
          </div>`;
  await a.append(n);
  if (val == "tog") {
    document.getElementById(`${id}`).checked = true;
  }
}
async function deletetodo(id, i) {
  try {
    let response = await fetch(`/D/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    document.querySelector(`#content${i}`).remove();
  } catch (error) {
    console.error("Error occurred in between delete request", error);
  }
}
