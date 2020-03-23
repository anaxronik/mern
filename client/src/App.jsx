import React from 'react';
import 'materialize-css'
import { useRoutes } from './routes';
import { BrowserRouter } from 'react-router-dom';

function App() {
  const routes = useRoutes(true)
  return (
    <BrowserRouter>
      <div className='container'>
        <h1>REACT APP WORK</h1>
        {routes}
      </div>
    </BrowserRouter>
  );
}

export default App;
