fetch('https://reklamcilik.herokuapp.com/sofor/findAll').then(response => response.json())
    .then(result => {
        var table = document.getElementById("sofor");
        for (var i = 0; result.length > i; i++) {
          var row = table.insertRow(1);
          var cell1 = row.insertCell(0);
          var cell2 = row.insertCell(1);
          var cell3 = row.insertCell(2);
          var cell4 = row.insertCell(3);
          var cell5 = row.insertCell(4);
          cell1.innerHTML = result[i].id;
          cell2.innerHTML = result[i].ad;
          cell3.innerHTML = result[i].soyad;
          cell4.innerHTML = result[i].tel;
          cell5.innerHTML = "<a class='btn btn-sm btn-info' href='soforDuzenle.html?id="+result[i].soforId+"'>Düzenle</a><a class='btn btn-sm btn-primary' onclick='deleteMinibus("+result[i].soforId+")' href='#'>Sil</a>";
        } 
    }
    );
    function deleteMinibus(id) {
      fetch(
        "https://reklamcilik.herokuapp.com/sofor/deleteById/" +id,
        {
          method: "POST",
        }
      ).then(() => {
        window.alert("işleminiz başarıyla gerçekleşti");
      }).catch(()=>window.alert("işleminiz gerçekleşmedi."));
    }