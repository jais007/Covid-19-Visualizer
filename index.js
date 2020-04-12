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


$(document).ready(function(){
    var gmarkers = [];
    var myOptions = {
        center:new google.maps.LatLng(28.7041,77.1025),
        zoom:4,
    };
    var map = new google.maps.Map(document.getElementById("map"), myOptions);
    var infowindow = new google.maps.InfoWindow();
    var marker, i;
    var bounds = new google.maps.LatLngBounds();
    

    // Promise.all([
    //     fetch('https://jsonplaceholder.typicode.com/posts'), fetch("https://covid19-data.p.rapidapi.com/all", {
    //         "method": "GET",
    //         "headers": {
    //             "x-rapidapi-host": "covid19-data.p.rapidapi.com",
    //             "x-rapidapi-key": "e6201bf60dmsh1a7942d910d76f2p177ee8jsna1751f938774"
    //         }
    //         }),
    //         fetch("https://covid19-data.p.rapidapi.com/india", {
    //             "method": "GET",
    //             "headers": {
    //                 "x-rapidapi-host": "covid19-data.p.rapidapi.com",
    //                 "x-rapidapi-key": "e6201bf60dmsh1a7942d910d76f2p177ee8jsna1751f938774"
    //             }
    //         })
    // ])
    // .then(function (responses) {
    //         // Get a JSON object from each of the responses
    //         return responses.map(function (response) {
    //             return response.json();
    //         });
    // }).then(function (data) {
    //         // Log the data to the console
    //         // You would do something with both sets of data here
    //          console.log(data);
    // }).catch(function (error) {
    //         // if there's an error, log it
    //         console.log(error);
    // });


         
        fetch("https://covid19-data.p.rapidapi.com/all", {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "covid19-data.p.rapidapi.com",
            "x-rapidapi-key": "e6201bf60dmsh1a7942d910d76f2p177ee8jsna1751f938774"
        }
        })
        .then(response =>  response.json())
        .then((data)=>{
            console.table(data);
             data.forEach((marker)=> {
                var pos = new google.maps.LatLng(marker.latitude,marker.longitude);
                var content =marker.country + "<br> Confirmed: " +marker.confirmed 
                 + "<br> Recovered : "+marker.recovered + "<br> Dead: "+marker.deaths
                + "<br> Active: "+marker.active;
                 bounds.extend(pos);
                
                 marker = new google.maps.Marker({
                    position: pos,
                    icon:{
                        path: 'm 12,2.4000002 c -2.7802903,0 -5.9650002,1.5099999 -5.9650002,5.8299998 0,1.74375 1.1549213,3.264465 2.3551945,4.025812 1.2002732,0.761348 2.4458987,0.763328 2.6273057,2.474813 L 12,24 12.9825,14.68 c 0.179732,-1.704939 1.425357,-1.665423 2.626049,-2.424188 C 16.809241,11.497047 17.965,9.94 17.965,8.23 17.965,3.9100001 14.78029,2.4000002 12,2.4000002 Z',
                        fillColor: 'rgb(255,0,0)',
                        fillOpacity: 1.0,
                        strokeColor: '#000000',
                        strokeWeight: 1,
                        scale: 2,
                        anchor: new google.maps.Point(12, 24),
                    },
                    map:map
                });
    
    
                //  marker = new google.maps.Marker({
                //   position: pos,
                //     map: map
                //  });
                 gmarkers.push(marker);
                 google.maps.event.addListener(marker, 'mouseover', (function(marker, content) {
                     return function() {
                        infowindow.setContent(content);
                        infowindow.open(map, marker);
                    }
                })(marker, content));
    
                marker.addListener('mouseout', function() {
                infowindow.close();
                });
             });
        });
    fetch("https://covid19-data.p.rapidapi.com/india", {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "covid19-data.p.rapidapi.com",
		"x-rapidapi-key": "e6201bf60dmsh1a7942d910d76f2p177ee8jsna1751f938774"
	}
    })
    .then(response => response.json())
    .then((data)=>{
        console.table(data);
         data.forEach((marker)=> {
            var pos = new google.maps.LatLng(marker.latitude,marker.longitude);
            var content =marker.state + "<br> Confirmed: " +marker.confirmed 
             + "<br> Recovered : "+marker.recovered + "<br> Dead: "+marker.deaths
            + "<br> Active: "+marker.active;
             bounds.extend(pos);
            
             marker = new google.maps.Marker({
                position: pos,
                icon:{
                    path: 'm 12,2.4000002 c -2.7802903,0 -5.9650002,1.5099999 -5.9650002,5.8299998 0,1.74375 1.1549213,3.264465 2.3551945,4.025812 1.2002732,0.761348 2.4458987,0.763328 2.6273057,2.474813 L 12,24 12.9825,14.68 c 0.179732,-1.704939 1.425357,-1.665423 2.626049,-2.424188 C 16.809241,11.497047 17.965,9.94 17.965,8.23 17.965,3.9100001 14.78029,2.4000002 12,2.4000002 Z',
                    fillColor: 'rgb(255,0,0)',
                    fillOpacity: 1.0,
                    strokeColor: '#000000',
                    strokeWeight: 1,
                    scale: 2,
                    anchor: new google.maps.Point(12, 24),
                },
                map:map
            });


            //  marker = new google.maps.Marker({
            //   position: pos,
            //     map: map
            //  });
             gmarkers.push(marker);
             google.maps.event.addListener(marker, 'mouseover', (function(marker, content) {
                 return function() {
                    infowindow.setContent(content);
                    infowindow.open(map, marker);
                }
            })(marker, content));

            marker.addListener('mouseout', function() {
            infowindow.close();
            });
         });
    });
});