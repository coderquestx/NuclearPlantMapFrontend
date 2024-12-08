const { destinationPoint, generate_ellipse_points, rotate_point, setPolygon } = require('./geometry');
const { get_wind_direction, wind_speed_map } = require('./weather');

async function generate_polygons(lat, lng) {
    let spinDelta = 48;
    angleToRotate = await get_wind_direction(lat, lng);
    wind_speed_kmph = await wind_speed_map(lat, lng);
    let centerPoint = [lat, lng];

    // A0
    var A0_long = 583;
    var A0_width = 42;
    let spinDistance0 = wind_speed_kmph * spinDelta;
    if (spinDistance0 >= A0_long) {
        spinDistance0 = A0_long;
    }
    let semiMajorAxisA0 = Math.max(A0_width, spinDistance0) / 2;
    let semiMinorAxisA0 = Math.min(A0_width, spinDistance0) / 2;
    let shiftDistanceKmA0 = spinDistance0 / 2;
    let newCoordinatesA0 = destinationPoint(centerPoint[0], centerPoint[1], 90, shiftDistanceKmA0);
    let newLatitudeA0 = newCoordinatesA0[0];
    let newLongitudeA0 = newCoordinatesA0[1];
    let ellipsePointsA0 = generate_ellipse_points([newLatitudeA0, newLongitudeA0], semiMajorAxisA0, semiMinorAxisA0);
    var rotatedEllipsePointsA0 = ellipsePointsA0.map(point => rotate_point(point, centerPoint, -angleToRotate));
    let polygonA0 = setPolygon(rotatedEllipsePointsA0, '#FF5050', '#FF5050', 'A0');
    map.addLayer(polygonA0);
    let circleRadiusA0 = A0_width / 2;
    let circlePointsA0 = generate_ellipse_points([lat, lng], circleRadiusA0, circleRadiusA0, 50);
    let polygonCA0 = setPolygon(circlePointsA0, '#FF5050', '#FF5050', 'A0');
    map.addLayer(polygonCA0);

    // A1
    var A1_long = 191;
    var A1_width = 11;
    let spinDistance1 = wind_speed_kmph * spinDelta;
    if (spinDistance1 >= A1_long) {
        spinDistance1 = A1_long;
    }
    let semiMajorAxisA1 = Math.max(A1_width, spinDistance1) / 2;
    let semiMinorAxisA1 = Math.min(A1_width, spinDistance1) / 2;
    let shiftDistanceKmA1 = spinDistance1 / 2;
    let newCoordinatesA1 = destinationPoint(centerPoint[0], centerPoint[1], 90, shiftDistanceKmA1);
    let newLatitudeA1 = newCoordinatesA1[0];
    let newLongitudeA1 = newCoordinatesA1[1];
    let ellipsePointsA1 = generate_ellipse_points([newLatitudeA1, newLongitudeA1], semiMajorAxisA1, semiMinorAxisA1);
    var rotatedEllipsePointsA1 = ellipsePointsA1.map(point => rotate_point(point, centerPoint, -angleToRotate));
    let polygonA1 = setPolygon(rotatedEllipsePointsA1, '#6CA5F7', '#6CA5F7', 'A1');
    map.addLayer(polygonA1);
    let circleRadiusA1 = A1_width / 2;
    let circlePointsA1 = generate_ellipse_points([lat, lng], circleRadiusA1, circleRadiusA1, 50);
    let polygonCA1 = setPolygon(circlePointsA1, '#6CA5F7', '#6CA5F7', 'A1');
    map.addLayer(polygonCA1);

    // A2
    var A2_long = 47;
    var A2_width = 2;
    let spinDistance2 = wind_speed_kmph * spinDelta;
    if (spinDistance2 >= A2_long) {
        spinDistance2 = A2_long;
    }
    let semiMajorAxisA2 = Math.max(A2_width, spinDistance2) / 2;
    let semiMinorAxisA2 = Math.min(A2_width, spinDistance2) / 2;
    let shiftDistanceKmA2 = spinDistance2 / 2;
    let newCoordinatesA2 = destinationPoint(centerPoint[0], centerPoint[1], 90, shiftDistanceKmA2);
    let newLatitudeA2 = newCoordinatesA2[0];
    let newLongitudeA2 = newCoordinatesA2[1];
    let ellipsePointsA2 = generate_ellipse_points([newLatitudeA2, newLongitudeA2], semiMajorAxisA2, semiMinorAxisA2);
    var rotatedEllipsePointsA2 = ellipsePointsA2.map(point => rotate_point(point, centerPoint, -angleToRotate));
    let polygonA2 = setPolygon(rotatedEllipsePointsA2, '#92D050', '#92D050', 'A2');
    map.addLayer(polygonA2);
    let circleRadiusA2 = A2_width / 2;
    let circlePointsA2 = generate_ellipse_points([lat, lng], circleRadiusA2, circleRadiusA2, 50);
    let polygonCA2 = setPolygon(circlePointsA2, '#92D050', '#92D050', 'A2');
    map.addLayer(polygonCA2);

    // A3
    var A3_long = 23;
    var A3_width = 1;
    let spinDistance3 = wind_speed_kmph * spinDelta;
    if (spinDistance3 >= A3_long) {
        spinDistance3 = A3_long;
    }
    let semiMajorAxisA3 = Math.max(A3_width, spinDistance3) / 2;
    let semiMinorAxisA3 = Math.min(A3_width, spinDistance3) / 2;
    let shiftDistanceKmA3 = spinDistance3 / 2;
    let newCoordinatesA3 = destinationPoint(centerPoint[0], centerPoint[1], 90, shiftDistanceKmA3);
    let newLatitudeA3 = newCoordinatesA3[0];
    let newLongitudeA3 = newCoordinatesA3[1];
    let ellipsePointsA3 = generate_ellipse_points([newLatitudeA3, newLongitudeA3], semiMajorAxisA3, semiMinorAxisA3);
    var rotatedEllipsePointsA3 = ellipsePointsA3.map(point => rotate_point(point, centerPoint, -angleToRotate));
    let polygonA3 = setPolygon(rotatedEllipsePointsA3, '#794B47', '#794B47', 'A3');
    map.addLayer(polygonA3);
    let circleRadiusA3 = A3_width / 2;
    let circlePointsA3 = generate_ellipse_points([lat, lng], circleRadiusA3, circleRadiusA3, 50);
    let polygonCA3 = setPolygon(circlePointsA3, '#794B47', '#794B47', 'A3');
    map.addLayer(polygonCA3);

    // A4
    var A4_long = 9;
    var A4_width = 1;
    let spinDistance4 = wind_speed_kmph * spinDelta;
    if (spinDistance4 >= A4_long) {
        spinDistance4 = A4_long;
    }
    let semiMajorAxisA4 = Math.max(A4_width, spinDistance4) / 2;
    let semiMinorAxisA4 = Math.min(A4_width, spinDistance4) / 2;
    let shiftDistanceKmA4 = spinDistance4 / 2;
    let newCoordinatesA4 = destinationPoint(centerPoint[0], centerPoint[1], 90, shiftDistanceKmA4);
    let newLatitudeA4 = newCoordinatesA4[0];
    let newLongitudeA4 = newCoordinatesA4[1];
    let ellipsePointsA4 = generate_ellipse_points([newLatitudeA4, newLongitudeA4], semiMajorAxisA4, semiMinorAxisA4);
    var rotatedEllipsePointsA4 = ellipsePointsA4.map(point => rotate_point(point, centerPoint, -angleToRotate));
    let polygonA4 = setPolygon(rotatedEllipsePointsA4, '#292929', '#292929', 'A4');
    map.addLayer(polygonA4);
    let circleRadiusA4 = A4_width / 2;
    let circlePointsA4 = generate_ellipse_points([lat, lng], circleRadiusA4, circleRadiusA4, 50);
    let polygonCA4 = setPolygon(circlePointsA4, '#292929', '#292929', 'A4');
    map.addLayer(polygonCA4);
}

module.exports = { generate_polygons };