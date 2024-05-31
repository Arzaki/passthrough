var mysql = require("mysql");
// var proxy = require('html2canvas-proxy');
var express = require("express");

var app = express();
// app.use('/', proxy());

app.use("/public", express.static("public"));
const path = require("path");
const webpush = require("web-push");

var cors = require("cors");
const bodyParser = require("body-parser");

//NOTIFICATIONS USING SOCKET.IO METHOD
// const http = require('http')
// const socketIO =  require('socket.io');

// const PORT = 300

// const httpServer = http.createServer(app)

// const io = socketIO(httpServer,{
//     cors:{
//         origin:'http://localhost:3000',
//         methods:['GET','POST'],
//         credentials: true
//     }
// })

// io.on('connection',(socket)=>{
//     console.log('A user connected');

//     socket.on('notifcation',(data)=>{
//         console.log("Recieved notification", data);

//         socket.broadcast.emit('receievedNotification',data);
//     })

//     socket.on('disconnect',()=>{
//         console.log("A user disconnected");
//     });

// })

// httpServer.listen(PORT,()=>{
//     console.log(`WebSocket server running on port ${PORT}`)
// })

//NOTIFICATION USING SOCKET.IO END

//METHOD 2 USING WEBSOCKETS

const WebSocket = require("ws");
const wssEmployee = new WebSocket.Server({ port: 8080 });
const wssSecurityGuard = new WebSocket.Server({ port: 3003 });

// Function to send push notification
function sendPushNotificationtoEmployee(notificationData) {
  wssEmployee.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(notificationData));
    }
  });
}
function sendPushNotificationtoSecurityGuard(notificationData) {
  wssSecurityGuard.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(notificationData));
    }
  });
}

//METHOD 2 END

const multer = require("multer");
const { title } = require("process");

app.use(express.json());
app.use(bodyParser.json());

app.use(cors());

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "passthrough",
});

app.listen(4000);

const storage = multer.diskStorage({
  destination: path.join(__dirname, "./public"),
  filename: function (req, file, callback) {
    callback(null, Date.now() + "-" + path.extname(file.originalname));
  },
});

app.get("/", (req, res) => {
  res.send("Hello");
});

con.connect(function (err) {
  if (err) throw err;
  console.log("db connected");
});

app.post("/api/loginData", (req, res) => {
  var email = req.body.email;
  var pass = req.body.pass;
  var userType = req.body.userType;

  //console.log(email);
  //.log(pass);

  // console.log(email)
  // console.log(pass)
  // console.log(userType)

  const selectQuery =
    "select * from users where user_email=? and user_password=? and user_type=?";

  con.query(selectQuery, [email, pass, userType], (err, result) => {
    if (result.length > 0) {
      res.send(result);
    } else {
      res.send({ msg: "No user found!" });
    }
  });
});

app.post("/api/RegisterUserData", (req, res) => {
  var name = req.body.name;
  var inputEmail = req.body.inputEmail;
  var phoneNo = req.body.phoneNo;
  var userType = req.body.userType;
  var pass = req.body.pass;

  // console.log(name);
  // console.log(inputEmail);
  // console.log(phoneNo);
  // console.log(userType);
  // console.log(pass);

  const insertQuery =
    "insert into users(user_type,user_name,user_email,user_phoneNo,user_password) values(?,?,?,?,?)";

  con.query(insertQuery, [userType, name, inputEmail, phoneNo, pass]);
  res.send();
});

const upload = multer({ storage: storage });
var abc = upload.fields([{ name: "p_image" }]);

app.post("/api/registerVisitor", abc, (req, res) => {
  var name = req.body.name;
  var email = req.body.email;
  var phoneNo = req.body.phoneNo;
  var employee = req.body.employee;
  // var image = req.files.filename;

  const imageBuffer = req.files["p_image"][0].buffer;
  const fn = req.files["p_image"][0].filename;
  //  console.log(fn)

  const insertQuery =
    "insert into visitor (vis_name,vis_email,vis_phoneNo,vis_photo,vis_inTime,vis_outTime,vis_attendee) values(?,?,?,?,now(),now(),?)";
  con.query(
    insertQuery,
    [name, email, phoneNo, fn, employee],
    (err, result) => {
      // console.log(result)
      sendPushNotificationtoEmployee({
        title: "New visitor",
        body: `${name} is arriving shortly.`,
        icon: fn,
        employee: employee,
      });

      res.send(result);
    }
  );
});

app.get("/api/getVisitorId", (req, res) => {
  const idQuery = "SELECT vis_id FROM visitor ORDER BY vis_id DESC LIMIT 0, 1";
  con.query(idQuery, (err, result) => {
    // console.log(result)
    let id = result[0].vis_id;
    // console.log (id)
    // res.send(result)

    const sel = "select * from visitor where vis_id = ?";
    con.query(sel, [id], (err, result) => {
      res.send(result);
      console.log(result);
    });
  });
});
app.get("/api/viewVisitorData", (req, res) => {
  const attendee = req.query.attendee;
  console.log("the attendee is" + attendee);

  if (attendee == undefined) {
    //this means the person looking at the meetings table is the admin, because when we take the local storage the userType is adm but in our axios post we have specified a parameter for and attendee. So instead we just pass it as undefined and create another select query for admin
    const selectQueryAdmin = "select * from visitor";
    con.query(selectQueryAdmin, (err, result) => {
      res.send(result);
    });
  } else {
    const selectQuery = "select * from visitor where vis_attendee=?";
    con.query(selectQuery, [attendee], (err, result) => {
      res.send(result);
    });
  }
});
app.get("/api/viewVisitorDataforSecurityGuard", (req, res) => {
  const selectQuery = "select * from visitor";
  con.query(selectQuery, (err, result) => {
    res.send(result);
  });
});

app.get("/api/getVisitorData", (req, res) => {
  var id = req.query.id;
  console.log(id);

  const selectQuery = "select * from visitor where vis_id = ?";
  con.query(selectQuery, [id], (err, result) => {
    console.log(result);
    res.send(result);
  });
});
app.get("/api/getVisitorData", (req, res) => {
  var id = req.query.id;

  const selectQuery = "select * from visitor where vis_id = ?";
  con.query(selectQuery, [id], (err, result) => {
    res.send(result);
  });
});

app.post("/api/updateVisitor", (req, res) => {
  var id = req.body.id;
  var newName = req.body.newName;

  var newEmail = req.body.newEmail;
  var newPhoneNo = req.body.newPhoneNo;

  console.log(newName);
  console.log(newEmail);
  console.log(newPhoneNo);
  // console.log(newPhoto);

  const updateQuery =
    "UPDATE visitor SET vis_name = ?,vis_email = ?,vis_phoneNo = ? where vis_id =? ";

  con.query(updateQuery, [newName, newEmail, newPhoneNo, id], (err, result) => {
    if (result) {
      res.send(result);
    } else {
      res.send({ msg: "not update" });
    }
  });
});

app.post("/api/DeleteVisitor", (req, res) => {
  var id = req.body.id;

  const deleteQuery = "DELETE FROM visitor WHERE vis_id=?";
  con.query(deleteQuery, [id], (err, result) => {
    res.send();
  });
});

app.post("/api/setOutTime", (req, res) => {
  const id = req.body.id;

  const updateQuery = "UPDATE visitor SET vis_outTime=now() where vis_id = ?";
  const selectQuery = "SELECT * from visitor where vis_id=?";
  con.query(updateQuery, [id], (err, result) => {
    console.log(result);
    // res.send(result);
  });
  con.query(selectQuery, [id], (err, result) => {
    console.log(result);
    res.send(result);
  });
});

app.post("/api/meetingCompleted", (req, res) => {
  const id = req.body.id;

  const fetchQuery = "SELECT * FROM visitor WHERE vis_id=?";
  con.query(fetchQuery, [id], (err, result) => {
    console.log(result);

    sendPushNotificationtoSecurityGuard({
      title: "Meeting completed",
      body: `${result[0].vis_name} has left the meeting`,
      icon: result[0].vis_photo,
    });
    res.send();
  });
});

//EMPLOYEE DASHBOARD APIS START//
app.get("/api/getEmployeeNames", (req, res) => {
  const fetchQuery = 'select * from users where user_type="emp";';
  con.query(fetchQuery, (err, result) => {
    console.log(result);
    res.send(result);
  });
});

app.post("/api/transferMeeting", (req, res) => {
  const attendee = req.body.attendee;
  const id = req.body.id;

  console.log(attendee);
  console.log(id);

  const updateQuery =
    // "UPDATE visitor SET vis_attendee = '?' where vis_phoneNo='?' ";
    "UPDATE visitor SET vis_attendee =? where vis_id=? ";

  con.query(updateQuery, [attendee, id], (err, result) => {
    res.send();
    //send a response on completion
  });
});

//EMPLOYEE DASHBOARD APIS END//

//ADMIN APIS

app.post("/api/updateEmployee", (req, res) => {
  var id = req.body.id;
  var newName = req.body.newName;

  var newEmail = req.body.newEmail;
  var newPhoneNo = req.body.newPhoneNo;

  console.log(newName);
  console.log(newEmail);
  console.log(newPhoneNo);
  // console.log(newPhoto);

  const updateQuery =
    "UPDATE users SET user_name = ?,user_email = ?,user_phoneNo = ? where user_type ='emp' and user_id =? ";

  con.query(updateQuery, [newName, newEmail, newPhoneNo, id], (err, result) => {
    if (result) {
      res.send(result);
    } else {
      res.send({ msg: "not update" });
    }
  });
});

app.get("/api/getSingleEmployeeName", (req, res) => {
  const id = req.query.id;
  const fetchQuery = 'select * from users where user_type="emp" and user_id=?;';
  con.query(fetchQuery, [id], (err, result) => {
    console.log(result);
    res.send(result);
  });
});

app.post("/api/DeleteEmployee", (req, res) => {
  var id = req.body.id;

  const deleteQuery = "DELETE FROM users WHERE user_id=? and user_type='emp'";
  con.query(deleteQuery, [id], (err, result) => {
    res.send();
  });
});
//ADMIN API END

//NOTIFICATION

//*****************Push notification Route *******************//
const publicVapidKey =
  "BAwAkyLW5-o9mm8-nn0tdK4WqWVtSkILmupn4Lcd7MwgSPmV37EYfASlYntwBlWHPTKZX_--KqkBVLkblCjqEpY";
const privateVapidKey = "akRmSh5mlQqo2IDGc2oBYQBObn1QC4_e4zKlnfvkmnE";

webpush.setVapidDetails(
  "mailto:your-app@localhost",
  publicVapidKey,
  privateVapidKey
);
app.post("/subscribe", (req, res) => {
  const { subscription, title, message } = req.body;
  const payload = JSON.stringify({ title, message });

  webpush
    .sendNotification(subscription, payload)
    .catch((err) => console.error("err", err));

  res.status(200).json({ success: true });
});

//NOTIFICATION END

app.get("/api/getVisitorDates", (req, res) => {
  const selectDateCountQuery =
    "SELECT vis_date, COUNT(*) AS date_count FROM visitor GROUP BY vis_date;";
  con.query(selectDateCountQuery, (err, result) => {
    // console.log(result);
    res.send(result);
  });
});
