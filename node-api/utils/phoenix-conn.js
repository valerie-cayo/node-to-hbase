'use strict';

var JDBC = require('jdbc');
var jinst = require('jdbc/lib/jinst');

if (!jinst.isJvmCreated()) {
  console.log('JVM not created');
  jinst.addOption("-Xrs");
  jinst.setupClasspath(['./drivers/hsqldb.jar',
                        './drivers/derby.jar',
                        './drivers/derbyclient.jar',
                        './drivers/derbytools.jar']);
}

var config = {
  // Required
  url: 'jdbc:phoenix:thin:url=http://queryserver-1',

  // Optional
  // drivername: 'my.jdbc.DriverName',
  // minpoolsize: 10,
  // maxpoolsize: 100,

  // Note that if you sepecify the user and password as below, they get
  // converted to properties and submitted to getConnection that way.  That
  // means that if your driver doesn't support the 'user' and 'password'
  // properties this will not work.  You will have to supply the appropriate
  // values in the properties object instead.
//   user: 'SA',
//   password: '',
//   properties: {}
};

// or user/password in url
// var config = {
//   // Required
//   url: 'jdbc:hsqldb:hsql://localhost/xdb;user=SA;password=',
//
//   // Optional
//   drivername: 'my.jdbc.DriverName',
//   minpoolsize: 10
//   maxpoolsize: 100,
//   properties: {}
// };

// or user/password in properties
// var config = {
//   // Required
//   url: 'jdbc:hsqldb:hsql://localhost/xdb',
//
//   // Optional
//   drivername: 'my.jdbc.DriverName',
//   minpoolsize: 10,
//   maxpoolsize: 100,
//   properties: {
//     user: 'SA',
//     password: ''
//     // Other driver supported properties can be added here as well.
//   }
// };

var hsqldb = new JDBC(config);

hsqldb.initialize(function(err) {
  if (err) {
    console.log(err);
  }
});
