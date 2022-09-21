fetch("http://localhost:8080/sofor/findAll")
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

fetch("http://localhost:8080/minibus/findAll/il")
  .then((response) => response.json())
  .then((result) => {
    var select = document.getElementById("il");
    for (var i = 0; result.length > i; i++) {
      var opt = document.createElement("option");
      opt.innerHTML = result[i];
      select.appendChild(opt);
    }
  });

function hatList() {
  var il = document.getElementById("il");
  var hat = il.options[il.selectedIndex].value;
  var hatChild = document.getElementById("hat");
  while (hatChild.hasChildNodes()) {
    hatChild.removeChild(hatChild.firstChild);
  }
  fetch("http://localhost:8080/minibus/hatList/" + hat, { method: "POST" })
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

fetch("http://localhost:8080/reklam/findAll")
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

function postMinibus() {
  var hat = document.getElementById("hat").value;
  var marka = document.getElementById("marka").value;
  var model = document.getElementById("model").value;
  var plaka = document.getElementById("plaka").value;
  var select = document.getElementById("sofor");
  var soforSelect = select.options[select.selectedIndex].value;
  var values = document.getElementById("reklam");
  var reklamList = getSelectValues(values);
  var minibusItem = {
    hat: hat,
    marka: marka,
    model: model,
    plaka: plaka,
    reklam: [],
    sofor: [],
  }
  reklamList.forEach((reklamekle) => {
    fetch("http://localhost:8080/reklam/findById/" + reklamekle)
      .then((response) => response.json())
      .then((result) => {
       minibusItem.reklam.push(...minibusItem.reklam, {
            link: result.link,
            ad: result.ad,
            firma: {
              firmaAd: result.firma.firmaAd,
              sicilNo: result.firma.sicilNo,
              adres: {
                il: result.firma.adres.il,
                ilce: result.firma.adres.ilce,
                postaKodu: result.firma.adres.postaKodu,
              },
            },
          } );
      });
      console.log(minibusItem)
  });
  fetch("http://localhost:8080/sofor/findById/" + soforSelect, {
    method: "POST",
    "Access-Control-Allow-Origin": "*",
  })
    .then((response) => response.json())
    .then((result) => {
        minibusItem.sofor.push(...minibusItem.sofor,{
          soforId: result.soforId,
          ad: result.ad,
          soyad: result.soyad,
          tckn: result.tckn,
          tel: result.tel
        });
    });
    console.log(minibusItem);
    console.log(JSON.stringify(minibusItem));
 //  kaydet(minibusItem)
}

function kaydet(minibusItem) {
  fetch("http://localhost:8080/minibus/insert", {
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