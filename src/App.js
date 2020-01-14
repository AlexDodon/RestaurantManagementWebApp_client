import React from 'react';
import './App.css';
import AppRouter from "./component/RouterComponent";
import { createBrowserHistory } from 'history'


function App() {
  let history = createBrowserHistory();
  return (
      <div className="container">
          <AppRouter history={history}/>
      </div>
  );
}

export default App;
