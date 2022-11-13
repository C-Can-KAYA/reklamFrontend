let url = new URL(window.location.href).searchParams.get("id");
fetch('https://reklamcilik.herokuapp.com/sofor/findById/'+url,
{
  method: "POST",
  "Access-Control-Allow-Origin": "*",
}).then(response => response.json())
    .then(result => {
        document.getElementById("ad").value=result.ad
        document.getElementById("soyad").value=result.soyad
        document.getElementById("tckn").value=result.tckn
        document.getElementById("telefon").value=result.tel
      }
    );

    function updateSofor() {
        var id = url;
        var ad = document.getElementById("ad").value;
        var soyad = document.getElementById("soyad").value;
        var tckn = document.getElementById("tckn").value;
        var telefon = document.getElementById("telefon").value;
 
        const soforItem = {
            soforId: id,
            ad:ad,
            soyad:soyad,
            tckn: tckn,
            tel:telefon
            
        };
        fetch("https://reklamcilik.herokuapp.com/sofor/updateSofor", {
          method: "PUT",
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