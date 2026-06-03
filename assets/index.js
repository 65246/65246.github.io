var selector = document.querySelector(".selector_box");
selector.addEventListener("click", () => {
  if (selector.classList.contains("selector_open")) {
    selector.classList.remove("selector_open");
  } else {
    selector.classList.add("selector_open");
  }
});

document.querySelectorAll(".date_input").forEach((element) => {
  element.addEventListener("click", () => {
    document.querySelector(".date").classList.remove("error_shown");
  });
});

var sex = "m";

document.querySelectorAll(".selector_option").forEach((option) => {
  option.addEventListener("click", () => {
    sex = option.id;
    document.querySelector(".selected_text").innerHTML = option.innerHTML;
  });
});

var upload = document.querySelector(".upload");

var imageInput = document.createElement("input");
imageInput.type = "file";
imageInput.accept = ".jpeg,.png,.gif";

document.querySelectorAll(".input_holder").forEach((element) => {
  var input = element.querySelector(".input");
  input.addEventListener("click", () => {
    element.classList.remove("error_shown");
  });
});

upload.addEventListener("click", () => {
  imageInput.click();
  upload.classList.remove("error_shown");
});

imageInput.addEventListener("change", (event) => {
  var file = imageInput.files[0];

  if (!file) {
    return;
  }

  upload.classList.remove("upload_loaded");
  upload.classList.add("upload_loading");

  upload.removeAttribute("selected");

  var reader = new FileReader();
  reader.onload = (loadEvent) => {
    var url = loadEvent.target.result;

    localStorage.setItem("uploadedImage", url);
    upload.classList.remove("error_shown");
    upload.setAttribute("selected", "local");
    upload.classList.add("upload_loaded");
    upload.classList.remove("upload_loading");
    upload.querySelector(".upload_uploaded").src = url;
  };

  reader.onerror = () => {
    upload.classList.add("error_shown");
    upload.classList.remove("upload_loading");
    console.error("Nie udało się odczytać pliku obrazu.");
  };

  reader.readAsDataURL(file);
});

document.querySelector(".go").addEventListener("click", () => {
  var empty = [];

  var params = new URLSearchParams();

  params.set("sex", sex);
  if (!upload.hasAttribute("selected")) {
    empty.push(upload);
    upload.classList.add("error_shown");
  } else {
    params.set("image", upload.getAttribute("selected"));
  }

  const day = document.getElementById("day");
  const month = document.getElementById("month");
  const year = document.getElementById("year");

  [day, month, year].forEach((input) => {
    if (isEmpty(input.value)) {
      dateEmpty = true;
    } else {
      params.set(input.id, input.value);
    }
  });

  document.querySelectorAll(".input_holder").forEach((element) => {
    var input = element.querySelector(".input");

    if (isEmpty(input.value)) {
      empty.push(element);
      element.classList.add("error_shown");
    } else {
      params.set(input.id, input.value);
    }
  });

  if (empty.length != 0) {
    empty[0].scrollIntoView();
  } else {
    forwardToId(params);
  }
});

function isEmpty(value) {
  let pattern = /^\s*$/;
  return pattern.test(value);
}

function forwardToId(params) {
  location.href = "id.html?" + params;
}

var guide = document.querySelector(".guide_holder");
guide.addEventListener("click", () => {
  if (guide.classList.contains("unfolded")) {
    guide.classList.remove("unfolded");
  } else {
    guide.classList.add("unfolded");
  }
});
