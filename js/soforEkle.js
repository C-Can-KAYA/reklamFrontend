function postSofor() {
    var telefon = document.getElementById("telefon").value;
    var tckn = document.getElementById("tckn").value;
    var ad = document.getElementById("ad").value;
    var soyad = document.getElementById("soyad").value;
  
    const soforItem = {
        ad: ad,
        soyad: soyad,
        tckn: tckn,
        tel: telefon
    };
    fetch("http://localhost:8080/sofor/insert", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(soforItem),
    }).then((response) => {
      if (response.ok) {
        window.alert("işleminiz başarıyla gerçekleşti");
      } else {
        window.alert("işleminizi gerçekleştiremiyoruz");
      }
      return response.json;
    });
  }