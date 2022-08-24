let url = new URL(window.location.href).searchParams.get("id");
fetch('http://localhost:8080/minibus/findById/'+url,
{
  method: "GET",
  "Access-Control-Allow-Origin": "*",
}).then(response => response.json())
    .then(result => {
        var table = document.getElementById("reklam");
        document.getElementById("tcKimlik").innerHTML=result.soforList[0].tckn;
        document.getElementById("ad").innerHTML=result.soforList[0].ad+" "+result.soforList[0].soyad;
        document.getElementById("tel").innerHTML=result.soforList[0].tel;
        document.getElementById("plaka").innerHTML=result.plaka;
        document.getElementById("hat").innerHTML=result.hat;
        for (var i = 0; result.reklam.length > i; i++) {
            var row = table.insertRow(1);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            var cell3 = row.insertCell(2);
            var cell4 = row.insertCell(3);
            cell1.innerHTML = result.reklam[0].id;
            cell2.innerHTML = result.reklam[0].ad;
            cell3.innerHTML = result.reklam[0].link;
            cell4.innerHTML = result.reklam[0].reklamId;
                 }

    }
    );