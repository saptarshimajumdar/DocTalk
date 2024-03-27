import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Upload from "./pages/Upload";
import Homepage from "./pages/Homepage";
import Preview from "./pages/Preview";
import SignUpPage from "./pages/Signup";
import SignInPage from "./pages/Signin";
function App() {

  return (<div>
     <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/preview" element={<Preview />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/signin" element={<SignInPage />} />

        </Routes>
      </BrowserRouter>
     
  </div>
    
  );
}

export default App;
