let url = new URL(window.location.href).searchParams.get("id");
fetch('http://localhost:8080/firma/findById/'+url,
{
  method: "POST",
  "Access-Control-Allow-Origin": "*",
}).then(response => response.json())
    .then(result => {
      document.getElementById("firma").innerHTML=result.firmaAd;
      document.getElementById("il").innerHTML=result.adres.il;
      document.getElementById("ilce").innerHTML=result.adres.ilce;
      document.getElementById("sicil").innerHTML=result.sicilNo;
      }
    );
fetch("http://localhost:8080/firma/findAll")
  .then((response) => response.json())
  .then((result) => {
    var table = document.getElementById("firma");
    for (var i = 0; result.length > i; i++) {
      var row = table.insertRow(1);
      var cell1 = row.insertCell(0);
      var cell2 = row.insertCell(1);
      var cell3 = row.insertCell(2);
      var cell4 = row.insertCell(3);
      cell1.innerHTML = result[i].id;
      cell2.innerHTML = result[i].firmaAd;
      cell3.innerHTML = result[i].adres.il + "/" + result[i].adres.ilce;
      cell4.innerHTML =
        "<a class='btn btn-sm btn-warning'href='firmaDetay.html?id=" +
        result[i].id +
        "'>Detay</a><a class='btn btn-sm btn-info' href='firmaDuzenle.html?id="+
        result[i].id +"'>Düzenle</a><a class='btn btn-sm btn-primary' onclick='deleteFirma(" +
        result[i].id +
        ")' href='#'>Sil</a>";
    }
  });

function deleteFirma(id) {
  fetch("http://localhost:8080/firma/deleteById/" + id, {
    method: "POST",
  })
    .then(() => {
      window.alert("işleminiz başarıyla gerçekleşti");
    })
    .catch(() => window.alert("işleminiz gerçekleşmedi."));
}
function postFirma() {
  var firmaAd = document.getElementById("firmaAd").value;
  var sicilNo = document.getElementById("sicilNo").value;
  var postaKodu = document.getElementById("postaKodu").value;
  var il = document.getElementById("selectIl");
  var il = il.options[il.selectedIndex].text;
  var ilce = document.getElementById("selectIlce");
  var ilce = ilce.options[ilce.selectedIndex].text;
  const firmaItem = {
    ad: firmaAd,
    adres: {
      il: il,
      ilce: ilce,
    },
    postaKodu: postaKodu,
    sicilNo: sicilNo,
  };
  fetch("http://localhost:8080/firma/insert", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(firmaItem),
  }).then((response) => {
    if (response.ok) {
      window.alert("işleminiz başarıyla gerçekleşti");
    } else {
      window.alert("işleminizi gerçekleştiremiyoruz");
    }
  });
}
