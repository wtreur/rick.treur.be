var geoMatcher = function() {
    var geoMatchNodes,
        geoNonMatchNodes,
        reqLat = 52.017500,
        reqLong = 4.719300,
        range = 0.0015,
        self = {
            start: function() {
                geoMatchNodes = $('.geo-match-only')
                geoNonMatchNodes = $('.geo-match-none')
                self.hide();
                if (navigator.geolocation) {
                    self.locate();
                }
            },

            hide: function() {
                geoMatchNodes.hide();
                geoNonMatchNodes.show();
            },

            show: function() {
                geoMatchNodes.show();
                geoNonMatchNodes.hide();
            },

            locate: function() {
                navigator.geolocation.watchPosition(function(position) {
                    if (self.match(position)) {
                        self.show();
                    }
                    else {
                        self.hide();
                    }
                });
            },

            match: function(position) {
                var lat = position.coords.latitude,
                    long = position.coords.longitude;
                // match lat?
                if (lat >= reqLat - range && lat <= reqLat + range) {
                    //match long?
                    if (long >= reqLong - range && long <= reqLong + range) {
                        return true;
                    }
                }

                return false;
            }
        };

    return self;
}();

$(document).ready(function(){
    setTimeout(function(){
        window.scrollTo(0, 0);
    }, 0);

    geoMatcher.start();
});
