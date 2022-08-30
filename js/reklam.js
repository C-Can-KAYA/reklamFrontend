fetch('http://localhost:8080/reklam/findAll').then(response => response.json())
    .then(result => {
        var table = document.getElementById("reklam");
        for (var i = 0; result.length > i; i++) {
          var row = table.insertRow(1);
          var cell1 = row.insertCell(0);
          var cell2 = row.insertCell(1);
          var cell3 = row.insertCell(2);
          var cell4 = row.insertCell(3);
          var cell5 = row.insertCell(4); 
          cell1.innerHTML = result[i].id;
          cell2.innerHTML = "Şuanlık boş";
          cell3.innerHTML = result[i].ad;
          cell4.innerHTML = result[i].reklamId;
          cell5.innerHTML = "<a class='btn btn-sm btn-warning'href='reklamDetay.html?id="+result[i].id+"'>Detay</a><a class='btn btn-sm btn-info' href='reklamDetayDuzenle.html?id='#'>Düzenle</a><a class='btn btn-sm btn-primary' onclick='deleteReklam("+result[i].id+")' href='#'>Sil</a>";
        }
    }
    );

    function deleteReklam(id) {
        fetch(
          "http://localhost:8080/reklam/deleteById/" +id,
          {
            method: "POST",
          }
        ).then(() => {
          window.alert("işleminiz başarıyla gerçekleşti");
        }).catch(()=>window.alert("işleminiz gerçekleşmedi."));
      }