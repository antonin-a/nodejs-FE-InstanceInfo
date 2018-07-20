const express = require('express')
const app = express()
var request = require('request')
app.set('view engine', 'pug'); 

url = "http://169.254.169.254/openstack/2015-10-15/meta_data.json"

app.get('/', function (req, res) {

request({
    url: url,
    json: true
    }, function (error, response, body) {

        if (!error && response.statusCode === 200) {
            console.log('ok') // Print the json response
            	 res.render('index', { 
			title: 'Flexible Engine ECS', 
			AZ: 'Availability Zone: '+ body['availability_zone'],
			ECS: 'Current ECS: '+body['name'],
			Flavor: 'Flavor: '+body['meta']['metering.resourcespeccode'],
			Image: 'Image: '+body['meta']['image_name'],
			OS: 'OS: '+body['meta']['os_type']});
		//res.send('Availability Zone: '+body['availability_zone']+'\n Availability: '+body['availability_zone']);
        }
   })
  
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})

