import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const PatientInfo = () => {
  const navigate = useNavigate();
  const getPatient = JSON.parse(localStorage.getItem("patient")) || [];

  const handleDelete = (items) => {
    const getPateient = JSON.parse(localStorage.getItem("patient"));
    const filterData = getPateient.filter((data) => data?.id !== items.id);
    localStorage.setItem("patient", JSON.stringify(filterData));
    window.location.reload(false);
  };
  const handleCreate = () => {
    navigate("/create-pateient");
  };

  // const Users = (items) => {
  //   const getPateient = JSON.parse(localStorage.getItem("patient"));
  //   const userID = getPateient.filter((data) => data.id === items.id);
  //   return userID;
  // };

  // const handleUpdate = (items) => {
  //   const user = Users(items);
  //   console.log(...user);
  //   if (user && user.length > 0) {
  //     navigate(`/create-pateient/${items.id}`);
  //   }
  //   localStorage.getItem("patient");
  // };

  return (
    <div>
      <Navbar />
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">DOB</th>
            <th scope="col">Age</th>
            <th scope="col">City</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {getPatient &&
            getPatient.length &&
            getPatient.map((items) => {
              return (
                <>
                  <tr key={items.id}>
                    <td>{items.values.name}</td>
                    <td>{items.values.DOB}</td>
                    <td>{items.values.Age}</td>
                    <td>{items.values.City}</td>
                    <td>
                      <button
                        className="btn btn-dark btn-sm"
                        onClick={handleCreate}
                      >
                        Add
                      </button>{" "}
                      <></>
                      <button
                        className="btn btn-dark btn-sm"
                        // onClick={() => handleUpdate(items)}
                        onClick={() => navigate(`/update-pateient/${items.id}`)}
                      >
                        Update
                      </button>{" "}
                      <></>
                      <button
                        className="btn btn-dark btn-sm"
                        onClick={() => handleDelete(items)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                </>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};
export default PatientInfo;
