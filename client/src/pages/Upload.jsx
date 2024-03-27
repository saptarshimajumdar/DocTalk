import React, { useState } from "react";
import axios from "axios";

const Upload = () => {
  const [pdf, setPdf] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (pdf) {
      const formData = new FormData();
      formData.append("pdf", pdf);

      try {
        const response = await axios.post("http://localhost:3000/api/file/upload", formData, {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data"
          }
        });
        
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    } else {
      console.log("No PDF selected");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="pdf" className="block font-medium text-gray-700 mb-2">
            Pdf:
          </label>
          <input
            type="file"
            accept="application/pdf"
            id="pdf"
            onChange={(e) => setPdf(e.target.files[0])}
            className="border rounded-md px-4 py-2 w-full"
          />
        </div>

        <button type="submit" className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Upload;
