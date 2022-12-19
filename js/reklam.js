fetch("http://localhost:8080/reklam/findAll")
  .then((response) => response.json())
  .then((result) => {
    var table = document.getElementById("reklam");
    for (var i = 0; result.length > i; i++) {
      var row = table.insertRow(1);
      var cell1 = row.insertCell(0);
      var cell2 = row.insertCell(1);
      var cell3 = row.insertCell(2);
      var cell4 = row.insertCell(3);
      cell1.innerHTML = result[i].id;
      cell2.innerHTML = result[i].firma.firmaAd;
      cell3.innerHTML = result[i].ad;
      cell4.innerHTML =
        "<a class='btn btn-sm btn-warning'href='reklamDetay.html?id=" +
        result[i].id +
        "'>Detay</a><a class='btn btn-sm btn-primary' onclick='deleteReklam(" +
        result[i].id +
        ")' href='#'>Sil</a>";
    }
  });

fetch("http://localhost:8080/firma/findAll")
  .then((response) => response.json())
  .then((result) => {
    var select = document.getElementById("selectBoxFirma");
    for (var i = 0; result.length > i; i++) {
      var opt = document.createElement("option");
      opt.value = result[i].id;
      opt.innerHTML = result[i].firmaAd;
      select.appendChild(opt);
    }
  });

function deleteReklam(id) {
  fetch("http://localhost:8080/reklam/deleteById/" + id, {
    method: "POST",
  })
    .then(() => {
      window.alert("işleminiz başarıyla gerçekleşti");
    })
    .catch(() => window.alert("işleminiz gerçekleşmedi."));
}

function postReklam() {
  var select = document.getElementById("selectBoxFirma");
  var firma = select.options[select.selectedIndex].value;
  var multipartFile = document.getElementById("reklam").files[0];
  let formData = new FormData();
  formData.append("multipartFile", multipartFile);

  fetch("http://localhost:8080/reklam/insert/" + firma, {
    method: "POST",
    body: formData,
  }).then((response) => {
    if (response.ok) {
      window.alert("işleminiz başarıyla gerçekleşti");
    } else {
      window.alert("işleminizi gerçekleştiremiyoruz");
    }
    return response.json;
  });
}

let url = new URL(window.location.href).searchParams.get("id");
fetch("http://localhost:8080/reklam/findById/" + url, {
  method: "GET",
  "Access-Control-Allow-Origin": "*",
})
  .then((response) => response.json())
  .then((result) => {
    document.getElementById("firmaAd").innerHTML = result.firma.firmaAd;
    document.getElementById("il").innerHTML = result.firma.adres.il;
    document.getElementById("ilce").innerHTML = result.firma.adres.ilce;
    document.getElementById("reklamId").innerHTML = result.reklamId;
    document.getElementById("indirmeLink").innerHTML = result.link;
  });

