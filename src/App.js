// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Dashboard from './components/dashboard';
// import BooksPage from './components/books';
// import UsersPage from './components/users';
// import ProtectedRoute from './components/protectedRoutes';
// import Login from './components/login';
// import Signup from './components/signup';
// import AddBookPage from './components/addNewBook';
// import TransactionPage from './components/transactions';
// import ReportPage from './components/reports';

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/auth/login" element={<Login />} />
//         <Route path="/auth/signup" element={<Signup />} />
//         <Route path="/" element={
//           <ProtectedRoute>
//             <Dashboard />
//           </ProtectedRoute>
//         } />
//         <Route path="/books" element={
//           <ProtectedRoute>
//             <BooksPage />
//           </ProtectedRoute>
//         } />
//         <Route path='/add-book' element={
//           <ProtectedRoute>
//             <AddBookPage />
//           </ProtectedRoute>
//         } />
//         <Route path="/users/get-all-users" element={
//           <ProtectedRoute>
//             <UsersPage />
//           </ProtectedRoute>
//         } />
//         <Route path='/transaction' element={
//           <ProtectedRoute>
//             <TransactionPage />
//           </ProtectedRoute>
//         } />
//         <Route path='/reports' element={
//           <ProtectedRoute>
//             <ReportPage />
//           </ProtectedRoute>
//         } />
//       </Routes>
//     </Router>
//   );
// }

// export default App;




import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React, { useEffect } from 'react';
import Dashboard from './components/dashboard';
import BooksPage from './components/books';
import UsersPage from './components/users';
import ProtectedRoute from './components/protectedRoutes';
import Login from './components/login';
import Signup from './components/signup';
import AddBookPage from './components/addNewBook';
import TransactionPage from './components/transactions';
import ReportPage from './components/reports';
// Import just the TelemetryProvider first
import { TelemetryProvider, RouteMonitor, WebVitalsMonitor, useTelemetry } from 'tele-track-sdk';
import { initializeTrackedAxios } from './services/apiService';

function TelemetryInitializer() {
  const telemetry = useTelemetry();

  useEffect(() => {
    initializeTrackedAxios(telemetry);
  }, [telemetry]);

  return null; // This component doesn't render anything
}

function App() {
  return (
    // Add the TelemetryProvider as the outermost wrapper
    <TelemetryProvider
      apiEndpoint="http://localhost:3001/api/telemetry"
      applicationId="library-management-ui"
      debug={true}
    >
      <Router>
        {/* Initialize API tracking */}
        <TelemetryInitializer />
        <RouteMonitor />
        <WebVitalsMonitor />
        <Routes>
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/signup" element={<Signup />} />
          <Route path="/" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/books" element={
            <ProtectedRoute>
              <BooksPage />
            </ProtectedRoute>
          } />
          <Route path='/add-book' element={
            <ProtectedRoute>
              <AddBookPage />
            </ProtectedRoute>
          } />
          <Route path="/users/get-all-users" element={
            <ProtectedRoute>
              <UsersPage />
            </ProtectedRoute>
          } />
          <Route path='/transaction' element={
            <ProtectedRoute>
              <TransactionPage />
            </ProtectedRoute>
          } />
          <Route path='/reports' element={
            <ProtectedRoute>
              <ReportPage />
            </ProtectedRoute>
          } />
        </Routes>
      </Router>
    </TelemetryProvider>
  );
}

export default App;