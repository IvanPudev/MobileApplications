var sqlite = (function() {
    var app = app || {};
    app.db = null;

    app.openDb = function() {
        if (window.sqlitePlugin !== undefined) {
            app.db = window.sqlitePlugin.openDatabase("QuitSmiking");
        }
        else {
            // For debugging in simulator fallback to native SQL Lite
            app.db = window.openDatabase("QuitSmiking", "1.0", "Quit Smoking", 200000);
        }
    }
    
    app.createTable = function() {
        app.db.transaction(function(tx) {
            tx.executeSql("CREATE TABLE IF NOT EXISTS UserData" +
                          "(id INTEGER PRIMARY KEY ASC, " +
                          "quit_date DATETIME, " +
                          "package_price DOUBLE, " +
                          "cigarettes_count INT);", []);
        });
    }

    app.insertRecord = function(userSmokingData) {
        app.db.transaction(function(tx) {
            tx.executeSql("INSERT INTO UserData(quit_date, package_price, cigarettes_count) VALUES (?,?,?);",
                          [userSmokingData.date, userSmokingData.price, userSmokingData.cigarettesCount],
                          app.onSuccess,
                          app.onError);
        });
    }
    
     app.deleteRecord = function(id) {
        app.db.transaction(function(tx) {
            tx.executeSql("DELETE FROM UserData WHERE id = ?;",
                          [id],
                          app.onSuccess,
                          app.onError);
        });
    }

    app.updateRecord = function(id, quitDate, packagePrice, cigarettesCount) {
        app.db.transaction(function(tx) {
            tx.executeSql("UPDATE UserData SET quit_date = ?, package_price = ?, cigarettes_count = ?  WHERE id = ?;",
                          [quitDate, packagePrice, cigarettesCount, id],
                          app.onSuccess,
                          app.onError);
        });
    }

    app.selectAllRecords = function(fn) {
        app.db.transaction(function(tx) {
            tx.executeSql("SELECT * FROM UserData;", [],
                          fn,
                          app.onError);
        });
    }

    function getAllTheData(handleReceivedData) {
        app.selectAllRecords(handleReceivedData);
    }

    app.onSuccess = function(tx, r) {
        console.log("Your SQLite query was successful!");
    }

    app.onError = function(tx, e) {
        console.log("SQLite Error: " + e.message);
    }

    function init() {
        app.openDb();
        app.createTable();
    }
    
    init();
    
    return {
        getData:app.getAllTheData,
        addData:app.insertRecord,
        deleteData:app.deleteRecord
    }
}());