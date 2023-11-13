import Navbar from "../Components/Navbar";
const Home = () => {
  return (
    <>
      <Navbar />
      <div className="">
        <div className="">
          <div>Patient Detail List </div>
        </div>
        <div className="row border m-5">
          <div className="col">Name:</div>
          <div className="col">Anom</div>
          <div className="col">
            <div>
              <div>
                <button className="btn btn-secondary rounded-pill ">ADD</button>
              </div>
              <div>
                <button className="btn btn-secondary rounded-pill">
                  UPDATE
                </button>
              </div>
              <div>
                <button className="btn btn-secondary rounded-pill">
                  DELETE
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
