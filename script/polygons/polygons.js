const L = require('leaflet');

function get_new_point(center_point, semi_major_axis, semi_minor_axis, angle) {
    var angle_rad = angle * Math.PI / 180;
    var delta_lat = semi_minor_axis * Math.cos(angle_rad);
    var delta_lon = semi_major_axis * Math.sin(angle_rad);
    var new_point_lat = center_point[0] + (delta_lat / 111);
    var new_point_lon = center_point[1] + (delta_lon / (111 * Math.cos(center_point[0] * Math.PI / 180)));
    return [new_point_lat, new_point_lon];
}

function geo_to_cartesian(latitude, longitude) {
    var earth_radius_km = 6371.0;
    var x = earth_radius_km * (longitude * Math.PI / 180);
    var y = earth_radius_km * Math.log(Math.tan((Math.PI / 4) + (latitude * Math.PI / 360)));
    return [x, y];
}

function cartesian_to_geo(x, y) {
    var earth_radius_km = 6371.0;
    var longitude = (x / earth_radius_km) * (180 / Math.PI);
    var latitude = (2 * Math.atan(Math.exp(y / earth_radius_km)) - (Math.PI / 2)) * (180 / Math.PI);
    return [latitude, longitude];
}

function rotate_point(point, center, angle_degrees) {
    var point_cartesian = geo_to_cartesian(point[0], point[1]);
    var center_cartesian = geo_to_cartesian(center[0], center[1]);
    var angle_radians = angle_degrees * Math.PI / 180;
    var x = point_cartesian[0] - center_cartesian[0];
    var y = point_cartesian[1] - center_cartesian[1];
    var new_x = x * Math.cos(angle_radians) - y * Math.sin(angle_radians);
    var new_y = x * Math.sin(angle_radians) + y * Math.cos(angle_radians);
    var new_point = [new_x + center_cartesian[0], new_y + center_cartesian[1]];
    return cartesian_to_geo(new_point[0], new_point[1]);
}

function generate_ellipse_points(center_point, semi_major_axis, semi_minor_axis, num_points = 50) {
    var points = [];
    for (var i = 0; i < num_points; i++) {
        var angle = i * (360 / num_points);
        var new_point = get_new_point(center_point, semi_major_axis, semi_minor_axis, angle);
        points.push(new_point);
    }
    return points;
}

function destinationPoint(lat1, lon1, angle, dist) {
    const earthRadius = 6371;
    const angularDistance = dist / earthRadius;
    const angleRad = (angle * Math.PI) / 180;
    const lat1Rad = (lat1 * Math.PI) / 180;
    const lon1Rad = (lon1 * Math.PI) / 180;
    const lat2 = Math.asin(Math.sin(lat1Rad) * Math.cos(angularDistance) + Math.cos(lat1Rad) * Math.sin(angularDistance) * Math.cos(angleRad));
    const lon2 = lon1Rad + Math.atan2(Math.sin(angleRad) * Math.sin(angularDistance) * Math.cos(lat1Rad), Math.cos(angularDistance) - Math.sin(lat1Rad) * Math.sin(lat2));
    return [lat2 * 180 / Math.PI, lon2 * 180 / Math.PI];
}

function setPolygon(points, color, fillColor, popupContent) {
    return L.polygon(points, { color: color, fillColor: fillColor, fillOpacity: 0.5 }).bindPopup(popupContent);
}

module.exports = { setPolygon, generate_ellipse_points, destinationPoint, rotate_point, cartesian_to_geo, geo_to_cartesian };
