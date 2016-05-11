app.factory('myService', function ($http, $q, $timeout) {

  

    return {
        //getUserInfo: function (){
        //    return db.get('localInfo').then(function (doc) {
        //        // handle doc
        //        console.log(JSON.stringify(doc));
        //    }).catch(function (err) {
        //        console.log(err);
        //    });
        //},

        //setUserInfo: function (userInfo) {
        //    return $q.when(db.bulkDocs([
        //        { title: 'localInfo', _id: 'userInfo_userName', type: 'userInfo', userName: userInfo.userName, userToken: userInfo.userToken }
        //    ]).then(function (result) {
        //        // handle result
        //        console.log(result);
        //    }).catch(function (err) {
        //        console.log(err);
        //    }));
        //},

        //removeToken: function (userInfo) {
        //    return $q.when(db.get('userInfo_userToken').then(function(doc) {
        //        doc._deleted = true;
        //        return db.put(doc);
        //    }).then(function (result) {
        //        // handle result
        //        print(result);
        //    }).catch(function (err) {
        //        console.log(err);
        //    }));
        //}
            //return db.put(userInfo, function callback(err, result) {
            //    if (!err) {
            //        console.log('Successfully posted!');
            //        db.allDocs({ include_docs: true, descending: true }, function (err, result) {
            //            console.log('fetched', result.rows.length, 'items');
            //            console.log(result.rows);
            //        });
            //    }
            //    else {
            //        console.log('Error!!!');
            //    }
            //});
        }

});

app.factory('secureService', function ($http, $q, $timeout) {
    return {
        signIn: function (username, password) {
            ///Call secure service passing user name and encrypted password
            if (username.toLowerCase() == "test" && password == "test") {
                return "0000000";//user token
            }
            return false;
        },
        testService: function (userName, pasWord) {
            //var deferred = $q.defer();
            //$http({
            //    method: "POST",
            //    url: secureURL + "/Token",
            //    data: "grant_type=password&username=test%40test.com&password=P@ssword123",
            //    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            //    //params: { userName: userName, password: passWord },
            //}).success(function (data) {
            //    //$scope.employees = data;
            //    console.log(data);
            //    deferred.resolve(data.d);
            //}).error(function (err) {
            //    console.log(err);
            //    deferred.reject(err);
            //});
            //return deferred.promise;
            var data = "grant_type=password&username=test%40test.com&password=P@ssword123";//"grant_type=password&username=" + loginData.userName + "&password=" + loginData.password;

            var deferred = $q.defer();

            $http.post(secureURL + '/token', data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {
                console.log(response);
                //localStorageService.set('authorizationData', { token: response.access_token, userName: loginData.userName });

                _authentication.isAuth = true;
                _authentication.userName = loginData.userName;

                deferred.resolve(response);

            }).error(function (err, status) {
                //_logOut();
                console.log(err);
                deferred.reject(err);
            });

            return deferred.promise;


        }
    }
});

app.factory('clientService', function ($http, $q, $timeout) {
    return {
        getFacilities: function (token) {
            ///Call client service passing user token to get all facilities
            var facilitices = [
            { title: 'Laramie', id: 1, techs: [1, 2, 3, 4, 5, 6] },
            { title: 'Hobart', id: 2, techs: [1, 2, 3] },
            { title: 'Fort Collins', id: 3, techs: [2, 3, 4, 5] },
            { title: 'Denver', id: 4, techs: [4, 6] }];
            return facilitices;
        },
        getTechnicians: function (token) {
            ///Call client service passing user token to get all technicians
            var technicians = [
             { title: 'Paul', id: 1 },
             { title: 'Tracy', id: 2 },
             { title: 'Ben', id: 3 },
             { title: 'Jake', id: 4 },
             { title: 'Randy', id: 5 },
             { title: 'Derek', id: 6 }]
            return technicians;
        },
        getInstruments: function (token) {
            ///Call client service passing user token to get all instruments
            var instruments = [
            { serial: '0015248829', id: 1, isDirty: false },
            { serial: '22002563547', id: 2, isDirty: false },
            { serial: '632952141', id: 3, isDirty: false },
            { serial: '2036956585b', id: 4, isDirty: false }]
            return instruments;
        },
        getCOAs: function (token) {
            ///Call client service passing user token to get all coas
            var COAs = [
            { cylinder: "10165425", id: 1, lot: "19990", analyticalResult: 0, concentration: 0, expiration: '2016-06-01', added: '2016-01-01', dateInactive: null, isDirty: false },
            { cylinder: "10896845", id: 2, lot: "19991", analyticalResult: 0, concentration: 0, expiration: '2016-06-01', added: '2016-01-01', dateInactive: null, isDirty: false },
            { cylinder: "10513542", id: 3, lot: "19992", analyticalResult: 0, concentration: 0, expiration: '2016-06-01', added: '2016-01-01', dateInactive: null, isDirty: false },
            { cylinder: "10871181", id: 4, lot: "19993", analyticalResult: 0, concentration: 0, expiration: '2016-06-01', added: '2016-01-01', dateInactive: null, isDirty: false },

            { cylinder: "20106842", id: 10, lot: "29990", analyticalResult: 498, concentration: 500, expiration: '2016-05-01', added: '2016-01-01', dateInactive: null, isDirty: false },
            { cylinder: "20823181", id: 11, lot: "29991", analyticalResult: 497, concentration: 500, expiration: '2016-04-21', added: '2016-01-01', dateInactive: null, isDirty: false },
            { cylinder: "20884245", id: 12, lot: "29992", analyticalResult: 495, concentration: 500, expiration: '2016-06-21', added: '2016-01-01', dateInactive: null, isDirty: false },
            { cylinder: "20544107", id: 13, lot: "29993", analyticalResult: 497, concentration: 500, expiration: '2016-05-21', added: '2016-01-01', dateInactive: null, isDirty: false },

            { cylinder: "30188440", id: 20, lot: "39990", analyticalResult: 1988, concentration: 2000, expiration: '2016-05-01', added: '2016-01-01', dateInactive: null, isDirty: false },
            { cylinder: "30181621", id: 21, lot: "39991", analyticalResult: 1990, concentration: 2000, expiration: '2016-04-12', added: '2016-01-01', dateInactive: null, isDirty: false },
            { cylinder: "30138122", id: 22, lot: "39992", analyticalResult: 1991, concentration: 2000, expiration: '2016-06-15', added: '2016-01-01', dateInactive: null, isDirty: false },
            { cylinder: "30881683", id: 23, lot: "39993", analyticalResult: 1988, concentration: 2000, expiration: '2016-05-01', added: '2016-01-01', dateInactive: null, isDirty: false },

            { cylinder: "40654564", id: 30, lot: "49990", analyticalResult: 9990, concentration: 10000, expiration: '2016-04-12', added: '2016-01-01', dateInactive: null, isDirty: false },
            { cylinder: "40986588", id: 31, lot: "49991", analyticalResult: 9991, concentration: 10000, expiration: '2016-06-15', added: '2016-01-01', dateInactive: null, isDirty: false },
            { cylinder: "40244829", id: 32, lot: "49992", analyticalResult: 9994, concentration: 10000, expiration: '2016-04-12', added: '2016-01-01', dateInactive: null, isDirty: false },
            { cylinder: "40183585", id: 33, lot: "49993", analyticalResult: 9991, concentration: 10000, expiration: '2016-05-20', added: '2016-01-01', dateInactive: null, isDirty: false }, ]
            return COAs;
        },
        testService: function (controllerName, methodName) {
            var result;
            var config = {
                headers: {
                    'Authorization': '',
                    'siteID': '3'
                }
            };
            $http.get(clientURL + controllerName + "/" + methodName, config)
            .success(function (data, status) {
                result = (data);
            }).error(function (err) {
                console.log(err);
            });
            return result;



            //// Deferred technique
            //var deferred = $q.defer();
            //$http({
            //    method: "GET",
            //    url: clientURL + controllerName + "/"+methodName,
            //    headers: { 'siteID': '3' }
            //}).success(function (data) {
            //    //$scope.employees = data;
            //    console.log(data);
            //    deferred.resolve(data.d);
            //}).error(function (err) {
            //    console.log(err);
            //    deferred.reject(err);
            //});
            //return deferred.promise;
        }
    }
});
