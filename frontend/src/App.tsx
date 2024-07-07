import { BrowserRouter } from 'react-router-dom';

import SideMenu from './components/SideMenu';
import Routes from './routes';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'izitoast/dist/css/iziToast.min.css';
import './assets/css/App.css';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="app-container">
        <SideMenu />
        <div className="content">
          <Routes />
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
