var userSmokingData = (function(quitDate, packagePrice, cigarettesPerDay) {
    var userSmokingDataInput = {
        date: quitDate,
        price: packagePrice,
        cigarettesCount: cigarettesPerDay
    }
    
    function getAllTheData(handleReceivedData) {
        app.selectAllRecords(handleReceivedData);
    }
    
    sqlite.addData(userSmokingDataInput);
    
    function setData(tx, rs){
        rs.rows.item(0);
    }
    
}())