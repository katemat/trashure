console.log('item.js is linked');
const itemLocation = document.querySelector('.item-location');


var map, searchManager, address 

const reverseGeocode = function(e) {
    itemLocation.value = '';
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
                itemLocation.value = res.name;
                item_latitude = res.location.latitude;
                item_longitude = res.location.longitude;
            },
            errorCallback: function (e) {
                //If there is an error, alert the user about it.
                alert("Unable to reverse geocode location.");
            }
        };

        //Make the reverse geocode request.
        searchManager.reverseGeocode(searchRequest);
        
        var pin = new Microsoft.Maps.Pushpin(e.location, {
            title: address
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