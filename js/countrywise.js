function update(x){
    fetch("https://covid-193.p.rapidapi.com/statistics?country="+`${x}`, {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "covid-193.p.rapidapi.com",
		"x-rapidapi-key": "e6201bf60dmsh1a7942d910d76f2p177ee8jsna1751f938774"
	}
})
.then(response => response.json())
    .then(data =>{
        let newcase=data.response[0].cases.new; if(newcase==null) newcase="+0";
        const active=data.response[0].cases.active;
        const critical=data.response[0].cases.critical;
        const recovered=data.response[0].cases.recovered;
        const total=data.response[0].cases.total;
        let newdeath=data.response[0].deaths.new; if(newdeath==null) newdeath="+0";
        const totaldeath=data.response[0].deaths.total;
        const tests=data.response[0].tests.total;
        document.getElementById("new").style.display = "block";
        document.getElementById("name").innerHTML = `${data.response[0].country}`;
        document.getElementById("newconfirm").innerHTML = `${newcase}`;
        document.getElementById("confirm").innerHTML = `${total}`;
        document.getElementById("active").innerHTML = `${active}`;
        document.getElementById("recovered").innerHTML = `${recovered}`;
        document.getElementById("death").innerHTML = `${totaldeath}`;
        document.getElementById("newdeath").innerHTML = `${newdeath}`;
    });
}
