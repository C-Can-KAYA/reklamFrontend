fetch('http://localhost:8080/firma/findAll').then(response => response.json())
    .then(result => {
        var table = document.getElementById("firma");
        for (var i = 0; result.length > i; i++) {
          var row = table.insertRow(1);
          var cell1 = row.insertCell(0);
          var cell2 = row.insertCell(1);
          var cell3 = row.insertCell(2);
          var cell4 = row.insertCell(3);
          cell1.innerHTML = result[i].id;
          cell2.innerHTML = result[i].firmaAd;
          cell3.innerHTML = result[i].adres.il+"/"+result[i].adres.ilce;
          cell4.innerHTML = "<a class='btn btn-sm btn-warning'href='firmaDetay.html?id="+result[i].id+"'>Detay</a><a class='btn btn-sm btn-info' href='firmaDetayDuzenle.html?id='#'>Düzenle</a><a class='btn btn-sm btn-primary' onclick='deleteFirma("+result[i].id+")' href='#'>Sil</a>";
        }
    }
    );

    function deleteFirma(id) {
        fetch(
          "http://localhost:8080/firma/deleteById/" +id,
          {
            method: "POST",
          }
        ).then(() => {
          window.alert("işleminiz başarıyla gerçekleşti");
        }).catch(()=>window.alert("işleminiz gerçekleşmedi."));
      }