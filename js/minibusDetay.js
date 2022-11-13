let url = new URL(window.location.href).searchParams.get("id");
fetch('https://reklamcilik.herokuapp.com/minibus/findById/'+url,
{
  method: "GET",
  "Access-Control-Allow-Origin": "*",
}).then(response => response.json())
    .then(result => {
      document.getElementById("tcKimlik").innerHTML=result.sofor[0].tckn;
      document.getElementById("ad").innerHTML=result.sofor[0].ad+" "+result.sofor[0].soyad;
      document.getElementById("tel").innerHTML=result.sofor[0].tel;
      document.getElementById("plaka").innerHTML=result.plaka;
      document.getElementById("hat").innerHTML=result.hat;
      var table = document.getElementById("reklam");
      for (var i = 0; result.reklam.length > i; i++) {
        var row = table.insertRow(1);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        cell1.innerHTML = result.reklam[i].firma.firmaAd;
        cell2.innerHTML = result.reklam[i].ad;
        cell3.innerHTML = result.reklam[i].link;
     } 
      }
    );