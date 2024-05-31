import React, { useEffect, useState } from "react";
import Sidenav from "../components/Sidenav";
import Header from "../components/Header";
import axios from "axios";
import { Link } from "react-router-dom";
import ConfirmModal from "../components/ConfirmModal";
// import { inittable } from "../../public/js/datatables-simple-demo";
import DataTable from "react-data-table-component";
import { FilterComponent } from "../components/FilterComponent";
import { toast } from "react-toastify";

function ManageVisitors() {
  // function EditVisitor(visid) {

  // }

  const ws = new WebSocket("ws://localhost:3003");

  ws.onmessage = function (event) {
    const notificationData = JSON.parse(event.data);

    console.log(notificationData);
    showNotification(notificationData);
  };

  function showNotification(notificationData) {
    if (Notification.permission === "granted") {
      new Notification(notificationData.title, {
        body: notificationData.body,
        icon: "http://localhost:4000/public/" + notificationData.icon,
      });
    }
  }

  if (Notification.permission !== "granted") {
    Notification.requestPermission();
  }

  const [visitorList, setVisitorList] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:4000/api/viewVisitorDataforSecurityGuard")
      .then((response) => {
        setVisitorList(response.data);
      });
    const id = "datatablesSimple";
    window.inittable(id);
  }, []);

  function outTime(id) {
    axios
      .post("http://localhost:4000/api/setOutTime", { id: id })
      .then((response) => {
        // alert("Out-time set");

        // console.log("yoooo   " + JSON.stringify(response.data[0].vis_outTime));
        // const rowIndex = data.findIndex((row) => row.id === id);

        // if (rowIndex !== -1) {
        //   const updatedRow = {
        //     ...data[rowIndex],
        //     outTime: JSON.stringify(response.data[0].vis_outTime),
        //   };

        //   const updatedData = [...data];
        //   updatedData[rowIndex] = updatedRow;
        //   console.log(updatedData);
        //   setVisitorList(updatedData);
        //   console.log(visitorList);
        // } else {
        //   console.error(`Row with id ${id} not found`);
        // }

        setVisitorList((prevVisitorList) => {
          const updatedVisitorList = prevVisitorList.map((visitor) => {
            if (visitor.vis_id === id) {
              return {
                ...visitor,
                vis_outTime: response.data[0].vis_outTime,
              };
            }
            return visitor;
          });
          return updatedVisitorList;
        });

        toast.success("Out-time set!", { position: "bottom-right" });
        // window.location.reload();
      });
  }

  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
    },
    {
      name: "Email",
      selector: (row) => row.email,
    },
    {
      name: "Attendee",
      selector: (row) => row.attendee,
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
          {/* This one updates the visitor details */}
          <Link to="/UpdateVisitor" state={{ id: row.id }}>
            <a href="/UpdateVisitor">
              <button>
                <i className="fa fa-edit"></i>
              </button>
            </a>
          </Link>

          {/* <button><i className="fa fa-close"></i></button> */}
          <ConfirmModal id={row.id} />

          <button
            onClick={(e) => {
              e.preventDefault();
              outTime(row.id);
            }}
          >
            <i className="fas fa-walking"></i>
          </button>
        </div>
      ),
    },
  ];

  const data = visitorList.map((val) => ({
    id: val.vis_id,
    name: val.vis_name,
    email: val.vis_email,
    attendee: val.vis_attendee,
    phoneNumber: val.vis_phoneNo,
    inTime: val.vis_inTime,
    outTime: val.vis_outTime,
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
              <h1 className="mt-4">Manage Visitors</h1>
              <ol className="breadcrumb mb-4">
                <li className="breadcrumb-item">
                  <a href="index.html">Dashboard</a>
                </li>
                <li className="breadcrumb-item active">Visitors</li>
              </ol>

              <div className="card mb-4">
                <div className="card-header">
                  <i className="fas fa-table me-1"></i>
                  Visitor Database
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

export default ManageVisitors;
