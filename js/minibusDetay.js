let url = new URL(window.location.href).searchParams.get("id");
fetch('http://localhost:8080/minibus/findById/'+url,
{
  method: "GET",
  "Access-Control-Allow-Origin": "*",
}).then(response => response.json())
    .then(result => {
      console.log(result);
      }
    );