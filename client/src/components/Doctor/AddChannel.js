import DoctorHeader from './DoctorHeader';
import React, { useEffect, useState } from "react";
import DoctorSidePanel from "./DoctorSidePanel";
import axios from "axios";

const AddChannel = () => {
  const [doctor, setDoctor] = useState([]);
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [maxPatients, setMaxPatients] = useState(0);
  const [startDateTime, setStartDateTime] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [specialization, setSpecialization] = useState("");

  useEffect(() => {
    getUser();
  }, []);

  const createChannel = async (e) => {
    e.preventDefault();
    const drName = doctor.name;

    const newChannel = {
      doctor,
      drName,
      startDateTime,
      maxPatients,
      specialization,
    };

    await axios
      .post("http://localhost:8070/channel/add/", newChannel)
      .then((res) => {
        alert("Channel created!!!");
        window.location.reload();
      })
      .catch((err) => {
        alert(err);
      });
  };

  const getUser = async () => {
    await axios
      .get("http://localhost:8070/doctor/check/", {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setEmail(res.data.doctor.email);
        setPassword(res.data.doctor.password);
        setName(res.data.doctor.name);
        setSpecialization(res.data.doctor.specialization);
        setDoctor(res.data.doctor);
        setId(res.data.doctor._id);
        console.log(res.data.doctor._id);
      })
      .catch((err) => {
        localStorage.removeItem("token");
        window.location.href = "/";
      });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <DoctorHeader />
      <div className="flex">
        <DoctorSidePanel />

        <div className="flex-1 p-8">
          <h1 className="text-3xl font-semibold text-blue-600 mb-6">Create Channeling Time</h1>

          <form onSubmit={createChannel} className="space-y-6 bg-white p-8 rounded-lg shadow-lg max-w-md">
            <div>
              <label className="block text-gray-700 mb-2">Doctor Name</label>
              <input
                type="text"
                value={doctor.name}
                readOnly
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-700"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Maximum Patients</label>
              <input
                type="number"
                placeholder="Maximum Patients"
                onChange={(e) => setMaxPatients(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Start Date and Time</label>
              <input
                type="datetime-local"
                onChange={(e) => setStartDateTime(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200"
            >
              Create Channeling Time
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddChannel;
