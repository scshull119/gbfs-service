const axios = require('axios');

const STATIONS_URL = process.env.GBFS_STATIONS_URL;
const STATUS_URL = process.env.GBFS_STATUS_URL;

let stationInfoLookup = {};
let stationInfoUpdateTime = 0;
let stationStatusLookup = {};
let stationStatusUpdateTime = 0;

function fetchAndUpdateStationInfo() {
    axios.get(STATIONS_URL)
        .then(({ data }) => {
            if (data && data.data && Array.isArray(data.data.stations)) {
                for (station of data.data.stations) {
                    stationInfoLookup[station.station_id] = {
                        id: station.station_id,
                        name: station.name,
                        capacity: station.capacity,
                        lat: station.lat,
                        lon: station.lon,
                    }
                }
                stationInfoUpdateTime = data.last_updated;
                console.log('Station info updated.');
            }
        })
        .catch(err => {
            console.error(err);
        });
}

function fetchAndUpdateStationStatus() {
    axios.get(STATUS_URL)
        .then(({ data }) => {
            if (data && data.data && Array.isArray(data.data.stations)) {
                for (station of data.data.stations) {
                    stationStatusLookup[station.station_id] = {
                        status: station.station_status,
                        bikesAvailable: station.num_bikes_available,
                        docksAvailable: station.num_docks_available,
                        bikesDisabled: station.num_bikes_disabled,
                        docksDisabled: station.num_docks_disabled,
                        eBikesAvailable: station.num_ebikes_available,
                        renting: station.is_renting ? true : false,
                        returning: station.is_returning ? true : false,
                        lastReported: station.last_reported
                    }
                }
                stationStatusUpdateTime = data.last_updated;
                console.log('Station status updated.');
            }
        })
        .catch(err => {
            console.error(err);
        });
}

function getStationsInfo() {
    stationsCopy = {};
    for (id in stationInfoLookup) {
        stationsCopy[id] = { ...stationInfoLookup[id] };
    }
    return stationsCopy;
}

function getStationStatus(id) {
    return {
        ...stationInfoLookup[id],
        ...stationStatusLookup[id]
    };
}

setInterval(fetchAndUpdateStationInfo, 15000);
setInterval(fetchAndUpdateStationStatus, 15000);
fetchAndUpdateStationInfo();
fetchAndUpdateStationStatus();

module.exports = {
    getStationsInfo,
    getStationStatus
};
