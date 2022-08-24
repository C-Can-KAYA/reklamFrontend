fetch('http://localhost:8080/minibus/findAll').then(response => response.json())
    .then(result => {
        var table = document.getElementById("minibus");
        for (var i = 0; result.length > i; i++) {
          var row = table.insertRow(1);
          var cell1 = row.insertCell(0);
          var cell2 = row.insertCell(1);
          var cell3 = row.insertCell(2);
          var cell4 = row.insertCell(3);
          var cell5 = row.insertCell(4);
          var cell6 = row.insertCell(5); 
          cell1.innerHTML = result[i].id;
          cell2.innerHTML = result[i].plaka;
          cell3.innerHTML = result[i].soforList[0].ad+" "+result[i].soforList[0].soyad;
          cell4.innerHTML = result[i].hat;
          cell5.innerHTML = result[i].soforList[0].tel;
          cell6.innerHTML = "<a class='btn btn-sm btn-warning'href='minibusDetay.html?id="+result[i].id+"'>Detay</a><a class='btn btn-sm btn-info' href='minibusDetayDuzenle.html?id='#'>Düzenle</a><a class='btn btn-sm btn-primary' onclick='deleteMinibus("+result[i].id+")' href='#'>Sil</a>";
        }
    }
    );
    function deleteMinibus(id) {
      fetch(
        "http://localhost:8080/minibus/deleteById/" +id,
        {
          method: "POST",
        }
      ).then(() => {
        window.alert("işleminiz başarıyla gerçekleşti");
      }).catch(()=>window.alert("işleminiz gerçekleşmedi."));
    }