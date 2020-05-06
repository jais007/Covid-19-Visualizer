
function update (){
    google.load('visualization', '1', {'packages': ['geochart']});
    google.setOnLoadCallback(drawVisualization);
    
    function drawVisualization() {
        var array= [
            ['State Code','State','Cases']
           ];
        fetch("https://covid-19-v1.p.rapidapi.com/v1/india", {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "covid-19-v1.p.rapidapi.com",
                "x-rapidapi-key": "e6201bf60dmsh1a7942d910d76f2p177ee8jsna1751f938774"
            }
          })
          .then(response => response.json())
          .then(response=>{
            console.log(response.data.statewise);
             response.data.statewise.forEach(element => {
                let cases=element.active;
                const confirmed=element.confirmed;
                const deaths= element.deaths;
                const recovered=element.recovered;
                const state=element.state;
                const statecode="IN-"+element.statecode;
                if(statecode!='TT')
                     array.push([statecode,state,cases]);
             });
            })
      
      var data = google.visualization.arrayToDataTable(array);
          var opts = {
            region: 'IN',
            domain:'IN',
            displayMode: 'regions',
            colorAxis: {colors: ['#e5ef88', '#d4b114', '#e85a03']},
            resolution: 'provinces',
            /*backgroundColor: '#81d4fa',*/
            /*datalessRegionColor: '#81d4fa',*/
            defaultColor: '#f5f5f5',
            width: 800, 
            height: 600
          };
          var geochart = new google.visualization.GeoChart(
              document.getElementById('visualization'));
          geochart.draw(data, opts);
        };

}