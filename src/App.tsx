import './App.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './components/one-login/ProtectedRoute';
import { loginRoutes } from './routes/Routes';
import NavBar from './components/navbar/NavBar';
import Upload from './components/upload/Upload';
import Query from './components/query/QueryPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {loginRoutes.map((route, index) => {
          return <Route key={index} {...route} />;
        })}
        <Route
          path="/home"
          element={
            <ProtectedRoute redirectTo="/login">
              <>
                <NavBar />
                <Upload />
              </>
            </ProtectedRoute>
          }
        />
        <Route
          path="/query"
          element={
            <ProtectedRoute redirectTo="/login">
              <>
                <NavBar />
                <Query />
              </>
            </ProtectedRoute>
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
