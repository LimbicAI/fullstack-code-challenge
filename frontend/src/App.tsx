import React from "react";
import { AuthProvider } from "./contexts/AuthContext";

import Routes from "./routes/Routes";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
};

export default App;
