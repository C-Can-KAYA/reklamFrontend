fetch("https://reklamcilik.herokuapp.com/reklam/findAll")
  .then((response) => response.json())
  .then((result) => {
    var select = document.getElementById("reklam");
    for (var i = 0; result.length > i; i++) {
      var opt = document.createElement("option");
      opt.value = result[i].id;
      opt.innerHTML = result[i].ad + " (" + result[i].firma.firmaAd + ")";
      select.appendChild(opt);
    }
  });

fetch("https://reklamcilik.herokuapp.com/sofor/findAll")
  .then((response) => response.json())
  .then((result) => {
    var select = document.getElementById("sofor");
    for (var i = 0; result.length > i; i++) {
      var opt = document.createElement("option");
      opt.value = result[i].soforId;
      opt.innerHTML =
        result[i].ad + " " + result[i].soyad + " (" + result[i].tckn + ")";
      select.appendChild(opt);
    }
  });

fetch("https://reklamcilik.herokuapp.com/minibus/findAll/il")
  .then((response) => response.json())
  .then((result) => {
    var select = document.getElementById("il");
    for (var i = 0; result.length > i; i++) {
      var opt = document.createElement("option");
      opt.innerHTML = result[i];
      select.appendChild(opt);
    }

    hatList();
  });

function hatList() {
  var il = document.getElementById("il");
  var hat = il.options[il.selectedIndex].value;
  var hatChild = document.getElementById("hat");
  while (hatChild.hasChildNodes()) {
    hatChild.removeChild(hatChild.firstChild);
  }
  fetch("https://reklamcilik.herokuapp.com/minibus/hatList/" + "ISTANBUL", {
    method: "POST",
  })
    .then((response) => response.json())
    .then((result) => {
      var select = document.getElementById("hat");
      for (var i = 0; result.length > i; i++) {
        var opt = document.createElement("option");
        opt.innerHTML = result[i];
        select.appendChild(opt);
      }
    });
}

let url = new URL(window.location.href).searchParams.get("id");
fetch("https://reklamcilik.herokuapp.com/minibus/findById/" + url, {
  method: "GET",
  "Access-Control-Allow-Origin": "*",
})
  .then((response) => response.json())
  .then((result) => {
    document.getElementById("marka").value = result.marka;
    document.getElementById("plaka").value = result.plaka;
    document.getElementById("model").value = result.model;
    var sofor = document.getElementById("sofor");
    var soforId = result.sofor[0].soforId;
    var hat = document.getElementById("hat");
    var hatResult = result.hat;
    var il = document.getElementById("il");
    var ilResult = result.il;
    var reklam = document.getElementById("reklam");
    for (var i = 0, j = sofor.options.length; i < j; ++i) {
      if (sofor.options[i].value == soforId) {
        sofor.selectedIndex = i;
        break;
      }
    }

    for (var i = 0, j = il.options.length; i < j; ++i) {
        if (il.options[i].innerHTML == ilResult) {
            il.selectedIndex = i;
          break;
        }
      }

    for (var i = 0, j = hat.options.length; i < j; ++i) {
      if (hat.options[i].value == hatResult) {
        hat.selectedIndex = i;
        break;
      }
    }

    for (var i = 0, j = reklam.options.length; i < j; ++i) {    
      for (var b = 0, c = result.reklam.length; b < c; b++) {
        if (reklam.options[i].value == result.reklam[b].id) {
          reklam.querySelectorAll("option")[result.reklam[b].id].selected='selected'
        }
      }
    }
  });

  function updateMinibus(){
    var hat = document.getElementById("hat").value;
    var marka = document.getElementById("marka").value;
    var model = document.getElementById("model").value;
    var plaka = document.getElementById("plaka").value;
    var select = document.getElementById("sofor");
    var selectIl = document.getElementById("il");
    var soforSelect = select.options[select.selectedIndex].value;
    var values = document.getElementById("reklam");
    var reklamList = getSelectValues(values);
    var il = selectIl.options[selectIl.selectedIndex].text;
    var minibusItem = {
      il: il,
      hat: hat,
      id: url,
      marka: marka,
      model: model,
      plaka: plaka,
      reklam: reklamList,
      sofor: soforSelect,
    };
    fetch("https://reklamcilik.herokuapp.com/minibus/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(minibusItem),
    }).then((response) => {
      if (response.ok) {
        window.alert("işleminiz başarıyla gerçekleşti");
      } else {
        window.alert("işleminizi gerçekleştiremiyoruz");
      }
      return response.json;
    });
  }

  function getSelectValues(select) {
    var result = [];
    var options = select && select.options;
    var opt;
  
    for (var i = 0, iLen = options.length; i < iLen; i++) {
      opt = options[i];
  
      if (opt.selected) {
        result.push(opt.value || opt.text);
      }
    }
    return result;
  }
