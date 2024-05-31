import React, { useEffect } from "react";
import Sidenav from "../components/Sidenav";
import Header from "../components/Header";
import axios from "axios";
import DataTable from "react-data-table-component";
import { FilterComponent } from "../components/FilterComponent";
import { toast } from "react-toastify";
import { useState } from "react";
import ConfirmModal from "../components/ConfirmModal";
import { Link, useLocation } from "react-router-dom";
import ConfirmModalAdmin from "../components/ConfirmModalAdmin";

function ManageEmployees() {
  const [employeeList, setEmployeeList] = useState([""]);
  const location = useLocation();

  useEffect(() => {
    axios.get("http://localhost:4000/api/getEmployeeNames").then((response) => {
      setEmployeeList(response.data);
      console.log(response.data);
    });

    // const isRedirectedFromUpdateEmployee =
    //   location.state?.from === "/UpdateEmployee";

    // console.log(isRedirectedFromUpdateEmployee);
    // if (isRedirectedFromUpdateEmployee) {
    //   toast.success("Data updated", { position: "bottom-right" });
    // }
    //   }, [location.state]);
  }, []);

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
      name: "PhoneNumber",
      selector: (row) => row.phoneNumber,
    },

    {
      cell: (row) => (
        <div>
          {/* This one updates the visitor details */}
          <Link to="/UpdateEmployee" state={{ id: row.id }}>
            <a href="/UpdateEmployee">
              <button>
                <i className="fa fa-edit"></i>
              </button>
            </a>
          </Link>

          {/* This button deletes the user */}
          {/* <button><i className="fa fa-close"></i></button> */}
          <ConfirmModalAdmin id={row.id}  />
        </div>
      ),
    },
  ];

  const data = employeeList.map((val) => ({
    id: val.user_id,
    name: val.user_name,
    email: val.user_email,
    phoneNumber: val.user_phoneNo,
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
              <h1 className="mt-4">Manage Employees</h1>
              <ol className="breadcrumb mb-4">
                <li className="breadcrumb-item">
                  <a href="index.html">Dashboard</a>
                </li>
                <li className="breadcrumb-item active">Employees</li>
              </ol>

              <div className="card mb-4">
                <div className="card-header">
                  <i className="fas fa-table me-1"></i>
                  Employee Database
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

export default ManageEmployees;
