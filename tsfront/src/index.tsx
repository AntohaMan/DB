import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import UserStore from "./store/UserStore";
import Store from "./store/Store";


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

export const Context=createContext<any>(null)

root.render(
    <Context.Provider value={{
      user:new UserStore(),
      store:new Store()

    }}>
  {/*<React.StrictMode>*/}
    <App />
  {/*</React.StrictMode>*/}
    </Context.Provider>
);


