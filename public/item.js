console.log('item.js is linked');
const itemAddress = document.querySelector('.item-location');
const itemLatitude = document.querySelector('.lat');
const itemLongitude = document.querySelector('.long')

var map, searchManager, address 
var item_location = {}

const reverseGeocode = function(e) {
    itemAddress.value = '';
    if (map.entities != []) {
        map.entities.clear();
    }
    //If search manager is not defined, load the search module.
    if (!searchManager) {
        //Create an instance of the search manager and call the reverseGeocode function again.
        Microsoft.Maps.loadModule('Microsoft.Maps.Search', function () {
            searchManager = new Microsoft.Maps.Search.SearchManager(map);
            reverseGeocode();
        });
    } else {
        
        var searchRequest = {
            // loca arguement to be passed in
            location: e.location,
            callback: function (res) {
                //Tell the user the name of the result.
                const itemLocation = document.querySelector('.item-location')
                itemAddress.value = res.name;
                itemLatitude.value = res.location.latitude;
                itemLongitude.value = res.location.longitude;
                // item_location["latitude"] = res.location.latitude;
                // item_location["longitude"] = res.location.longitude;
                // item_location["address"] = res.name;
                // // console.log(item_location)
                // return item_location
                
            },
            errorCallback: function (e) {
                //If there is an error, alert the user about it.
                alert("Unable to reverse geocode location.");
            }
        };

        //Make the reverse geocode request.
        searchManager.reverseGeocode(searchRequest);
        
        var pin = new Microsoft.Maps.Pushpin(e.location, {
            // title: address
            // color: 'green'
            
        })
        map.entities.push(pin);
        console.log(map.entities)
    }
}


function getMap() {
    map = new Microsoft.Maps.Map('.item-map', {
                                            // user location 
        center: new Microsoft.Maps.Location(-37.7989538, 144.9597395)
    });

    Microsoft.Maps.Events.addHandler(map, 'click', (e) => {
        reverseGeocode(e)
    })
}

    
