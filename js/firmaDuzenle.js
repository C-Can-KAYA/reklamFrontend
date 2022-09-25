let url = new URL(window.location.href).searchParams.get("id");
fetch('http://localhost:8080/firma/findById/'+url,
{
  method: "POST",
  "Access-Control-Allow-Origin": "*",
}).then(response => response.json())
    .then(result => {
        document.getElementById("firmaAd").value=result.firmaAd
        document.getElementById("sicilNo").value=result.sicilNo
        document.getElementById("il").value=result.adres.il
        document.getElementById("ilce").value=result.adres.ilce
        document.getElementById("postaKodu").value=result.adres.postaKodu
      }
    );

    function updateFirma() {
        var id = url;
        var firmaAd = document.getElementById("firmaAd").value;
        var sicilNo = document.getElementById("sicilNo").value;
        var il = document.getElementById("il").value;
        var ilce = document.getElementById("ilce").value;
        var postaKodu = document.getElementById("postaKodu").value;
 
        const firmaItem = {
            id: id,
            ad:firmaAd,
            sicilNo:sicilNo,
            adres: {
                il: il,
                ilce: ilce,
                postaKodu: postaKodu
            }
            
        };
        fetch("http://localhost:8080/firma/updateFirma", {
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
          return response.json;
        });
      }