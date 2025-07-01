"use client";
import { useState } from "react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import {
  FaFilter,
  FaSearch,
} from "react-icons/fa";

export default function FindDonorPage() {
  const [bloodType, setBloodType] = useState("");
  const [city, setCity] = useState("");
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const requestBody = {
        city: city,
        bloodGroup: bloodType,
      };

      const apiUrl = "http://34.205.160.246:3300/api/user/donors";

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody), // Sending city and bloodGroup in the body
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();
      setFilteredRequests(data.data); // Assuming the response data is an array of requests
    } catch (error) {
      setError("An error occurred while fetching the data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  
  return (
    <>
      <Navbar />
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <div className="flex justify-center items-center gap-2 text-red-600 text-4xl">
            <FaSearch />
            <h1 className="text-3xl md:text-4xl font-bold text-black">
              Find Blood Requests
            </h1>
          </div>
          <p className="text-gray-700 mt-2">
            Search for patients in need of blood donation in your area
          </p>
        </div>

        {/* Search Filter Card */}
        <div className="bg-white rounded-md shadow p-6">
          <div className="flex items-center mb-4 text-lg font-semibold text-black">
            <FaFilter className="text-red-600 mr-2 text-xl" />
            Search Filters
          </div>
          <p className="text-gray-600 mb-6 text-sm">
            Filter blood requests by location, blood type, and distance
          </p>

          {/* Filters Grid */}
          <form className="grid gap-4 md:grid-cols-2" onSubmit={handleSearch}>
            <div>
              <label
                htmlFor="bloodType"
                className="block font-medium text-sm mb-1"
              >
                Blood type
              </label>
              <select
                id="bloodType"
                value={bloodType}
                onChange={(e) => setBloodType(e.target.value)}
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
              >
                <option>All types</option>
                <option>A+</option>
                <option>A-</option>
                <option>B+</option>
                <option>B-</option>
                <option>AB+</option>
                <option>AB-</option>
                <option>O+</option>
                <option>O-</option>
              </select>
            </div>

            <div className="w-full">
              <label htmlFor="city" className="block font-medium text-sm mb-1">
                City
              </label>
              <select
                name="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
              >
                <option value="">Select City</option>
                <option>Lahore</option>
                <option>Karachi</option>
                <option>Islamabad</option>
                <option>Rawalpindi</option>
                <option>Multan</option>
                <option>Faisalabad</option>
                <option>Gujranwala</option>
                <option>Sialkot</option>
                <option>Quetta</option>
                <option>Peshawar</option>
                <option>Hyderabad</option>
                <option>Sukkur</option>
                <option>Bahawalpur</option>
                <option>Abbottabad</option>
                <option>Mardan</option>
                <option>Sargodha</option>
                <option>Sheikhupura</option>
                <option>Rahim Yar Khan</option>
                <option>Sadiqabad</option>
                <option>Dera Ghazi Khan</option>
              </select>
            </div>

            <div className="md:col-span-3 flex justify-center mt-4">
              <button
                type="submit"
                className="flex items-center gap-2 bg-red-600 text-white font-semibold px-6 py-3 rounded hover:bg-red-700 transition"
              >
                <FaSearch />
                {loading ? "Searching..." : "Search Blood Request"}
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Search Results */}
      <div className="p-6 md:p-12">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">
          Blood Requests ({filteredRequests.length} found)
        </h2>

        {/* Blood Requests Table / Cards */}
        {filteredRequests.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow">
              <thead className="bg-red">
                <tr className="bg-red-600 text-white font-bold">
                  <th className="py-3 px-6 text-left text-sm">
                    Name
                  </th>
                  <th className="py-3 px-6 text-left text-sm">
                    email
                  </th>
                  <th className="py-3 px-6 text-left text-sm">
                    Contact
                  </th>
                  <th className="py-3 px-6 text-left text-sm">
                    Blood Type
                  </th>
                  <th className="py-3 px-6 text-left text-sm">
                    City
                  </th>
                  <th className="py-3 px-6 text-left text-sm">
                    DOB
                  </th>
                  <th className="py-3 px-6 text-left text-sm">
                    Last Donation
                  </th>
                  <th className="py-3 px-6 text-left text-sm">
                    Address
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredRequests.map((req, idx) => (
                  <tr key={idx} className="border-b">
                    <td className="py-3 px-6 text-sm text-gray-600">
                      {req.firstName} {req.lastName}{" "}
                    </td>
                    <td className="py-3 px-6 text-sm text-gray-600">
                      {req.email}
                    </td>
                    <td className="py-3 px-6 text-sm text-gray-600">
                      {req.phoneNumber}
                    </td>
                    <td className="py-3 px-6 text-sm text-gray-600">
                      {req.bloodGroup}
                    </td>
                    <td className="py-3 px-6 text-sm text-gray-600">
                      {req.city}
                    </td>

                    <td className="py-3 px-6 text-sm text-gray-600">
                      {req.dob ? req.dob : "--"}
                    </td>
                    <td className="py-3 px-6 text-sm text-gray-600">
                      {req.lastDonated ? req.lastDonated : "--"}
                    </td>
                    <td className="py-3 px-6 text-sm text-gray-600">
                      {req.address ? req.address : "--"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center text-gray-600">
            No blood requests found for the selected filters.
          </p>
        )}
      </div>
      <Footer />
    </>
  );
}
