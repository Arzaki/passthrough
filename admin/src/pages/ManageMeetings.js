import React, { useEffect } from "react";
import Sidenav from "../components/Sidenav";
import Header from "../components/Header";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
// import registerServiceWorker from "../serviceWorker";

// import { inittable } from "../../public/js/datatables-simple-demo";
import { toast } from "react-toastify";
import DataTable from "react-data-table-component";

import { FilterComponent } from "../components/FilterComponent";

function ManageMeetings() {
  const [show, setShow] = useState(false);
  const [EmployeeNames, setEmployeeNames] = useState([""]);
  const [selectedEmployee, setSelectedEmployee] = useState("Select employee");
  const [visitorList, setVisitorList] = useState([]);
  const [selectedVisitorID, setSelectedVisitorID] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  var user = JSON.parse(sessionStorage.getItem("userData"));
  let name = user.name; //we are accessing the name of the employee that is currently
  const userType = JSON.parse(sessionStorage.getItem("userData")).userType;

  // Inside your React.js component
  const ws = new WebSocket("ws://localhost:8080");

  // Listen for messages from the server
  ws.onmessage = function (event) {
    const notificationData = JSON.parse(event.data);
    // Handle the received push notification
    showNotification(notificationData);
  };

  // Function to display push notification
  function showNotification(notificationData) {
    // Use browser's notification API to display the notification
    if (
      Notification.permission === "granted" &&
      name === notificationData.employee
    ) {
      new Notification(notificationData.title, {
        body: notificationData.body,
        icon: "http://localhost:4000/public/" + notificationData.icon,
      }); //notification
    }
  }

  // Request permission for notifications
  if (Notification.permission !== "granted") {
    Notification.requestPermission();
  }

  useEffect(() => {
    const attendee = JSON.parse(sessionStorage.getItem("userData")).name;

    if (userType === "adm") {
      axios
        .get("http://localhost:4000/api/viewVisitorData")
        .then((response) => {
          console.log(response);
          setVisitorList(response.data);
        });
      return () => {
        ws.close();
      };
    } else {
      axios
        .get("http://localhost:4000/api/viewVisitorData", {
          params: { attendee },
        })
        .then((response) => {
          console.log(response);
          setVisitorList(response.data);
        });
      return () => {
        ws.close();
      };
    }
  }, []);

  function displayEmployeeNames() {
    axios.get("http://localhost:4000/api/getEmployeeNames").then((response) => {
      console.log(response.data);
      setEmployeeNames(response.data);
    });
  }

  function transferMeeting(attendee, id) {
    axios
      .post("http://localhost:4000/api/transferMeeting", { attendee, id })
      .then((response) => {
        toast.success("Meeting transferred successfully.", {
          position: "bottom-right",
        });
        setVisitorList((currentVisitorList) => {
          const newVisitorList = currentVisitorList.filter(
            (visitor) => visitor.vis_id != id
          );
          console.log(newVisitorList);
          return newVisitorList;
        });
      });
  }

  function meetingCompleted(id, e) {
    e.preventDefault();
    axios
      .post("http://localhost:4000/api/meetingCompleted", { id })
      .then((response) => {
        toast("Notification sent to security Guard");
      });
  }

  const columns = userType
    ? [
        {
          name: "Name",
          selector: (row) => row.name,
        },
        {
          name: "Email",
          selector: (row) => row.email,
        },
        {
          name: "PhoneNumber",
          selector: (row) => row.phoneNumber,
        },
        {
          name: "InTime",
          selector: (row) => row.inTime,
        },
        {
          name: "OutTime",
          selector: (row) => row.outTime,
        },
        {
          name: "Attendee",
          selector: (row) => row.attendee,
        },
        {
          name: "Photo",
          selector: (row) => row.photo,
        },
      ]
    : [
        {
          name: "Name",
          selector: (row) => row.name,
        },
        {
          name: "Email",
          selector: (row) => row.email,
        },
        {
          name: "PhoneNumber",
          selector: (row) => row.phoneNumber,
        },
        {
          name: "InTime",
          selector: (row) => row.inTime,
        },
        {
          name: "OutTime",
          selector: (row) => row.outTime,
        },
        {
          name: "Photo",
          selector: (row) => row.photo,
        },
        {
          cell: (row) => (
            <div>
              <Button
                variant="success"
                onClick={(e) => {
                  meetingCompleted(row.id, e);
                }}
              >
                Completed
              </Button>
              <Button
                onClick={() => {
                  setSelectedVisitorID(row.id);
                  handleShow();
                  displayEmployeeNames();
                }}
              >
                Transfer
              </Button>
            </div>
          ),
        },
      ];

  const data = visitorList.map((val) => ({
    id: val.vis_id,
    name: val.vis_name,
    email: val.vis_email,
    phoneNumber: val.vis_phoneNo,
    inTime: val.vis_inTime,
    outTime: val.vis_outTime,
    attendee: val.vis_attendee,
    photo: (
      <img
        className="profile-picture"
        src={"http://localhost:4000/public/" + val.vis_photo}
        alt="profile pic"
      ></img>
    ),
  }));

  const [filterText, setFilterText] = React.useState("");
  const [resetPaginationToggle, setResetPaginationToggle] =
    React.useState(false);

  const filteredItems = data.filter(
    (item) =>
      item.name && item.name.toLowerCase().includes(filterText.toLowerCase())
  );

  const subHeaderComponentMemo = React.useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
      }
    };

    return (
      <FilterComponent
        onClear={handleClear}
        filterText={filterText}
        setFilterText={setFilterText}
      />
    );
  }, [filterText, resetPaginationToggle]);

  return (
    <div>
      <Header />
      <div id="layoutSidenav">
        <Sidenav />

        <div id="layoutSidenav_content">
          <main>
            <div className="container-fluid px-4">
              <h1 className="mt-4">Manage Meetings</h1>
              <ol className="breadcrumb mb-4">
                <li className="breadcrumb-item">
                  <a href="index.html">Dashboard</a>
                </li>
                <li className="breadcrumb-item active">Visitors</li>
              </ol>

              <div className="card mb-4">
                <div className="card-header">
                  <i className="fas fa-table me-1"></i>
                  Meeting Database
                </div>
                <div className="card-body">
                  <DataTable
                    columns={columns}
                    data={filteredItems}
                    pagination
                    paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1
                    subHeader
                    subHeaderComponent={subHeaderComponentMemo}
                    persistTableHead
                  />
                </div>
                <Modal show={show} onHide={handleClose} animation={false}>
                  <Modal.Header closeButton>
                    <Modal.Title>Transfer Meeting</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <div className="dropdown">
                      <p>
                        Choose employee you would like to transfer the meeting:
                      </p>
                      <button
                        className="btn btn-secondary dropdown-toggle"
                        type="button"
                        id="dropdownMenuButton"
                        data-bs-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        {selectedEmployee}
                      </button>
                      <div
                        className="dropdown-menu"
                        aria-labelledby="dropdownMenuButton"
                      >
                        {EmployeeNames.map((val) => {
                          if (val.user_name === name) {
                            return <></>;
                          } else {
                            return (
                              <button
                                className="dropdown-item"
                                onClick={() => {
                                  setSelectedEmployee(val.user_name);
                                }}
                              >
                                {val.user_name}
                              </button>
                            );
                          }
                        })}
                      </div>
                    </div>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                      Close
                    </Button>
                    <Button
                      variant="primary"
                      onClick={() => {
                        handleClose();
                        transferMeeting(selectedEmployee, selectedVisitorID);
                      }}
                    >
                      Save Changes
                    </Button>
                  </Modal.Footer>
                </Modal>
              </div>
            </div>
          </main>
          <footer className="py-4 bg-light mt-auto">
            <div className="container-fluid px-4">
              <div className="d-flex align-items-center justify-content-between small">
                <div className="text-muted">Copyright &copy; Passthrough</div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}

export default ManageMeetings;
