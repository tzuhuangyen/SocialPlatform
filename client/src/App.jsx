import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import './assets/styles/all.scss';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        {' '}
        <h3> this is a react app with vite and bootstrap</h3>
        <nav class='navbar navbar-expand-lg bg-body-tertiary'>
          <div class='container-fluid'>
            <a class='navbar-brand' href='#'>
              Navbar
            </a>
            <button
              class='navbar-toggler'
              type='button'
              data-bs-toggle='collapse'
              data-bs-target='#navbarNavDropdown'
              aria-controls='navbarNavDropdown'
              aria-expanded='false'
              aria-label='Toggle navigation'
            >
              <span class='navbar-toggler-icon'></span>
            </button>
            <div class='collapse navbar-collapse' id='navbarNavDropdown'>
              <ul class='navbar-nav'>
                <li class='nav-item'>
                  <a class='nav-link active' aria-current='page' href='#'>
                    Home
                  </a>
                </li>
                <li class='nav-item'>
                  <a class='nav-link' href='#'>
                    Features
                  </a>
                </li>
                <li class='nav-item'>
                  <a class='nav-link' href='#'>
                    Pricing
                  </a>
                </li>
                <li class='nav-item dropdown'>
                  <a
                    class='nav-link dropdown-toggle'
                    href='#'
                    role='button'
                    data-bs-toggle='dropdown'
                    aria-expanded='false'
                  >
                    Dropdown link
                  </a>
                  <ul class='dropdown-menu'>
                    <li>
                      <a class='dropdown-item' href='#'>
                        Action
                      </a>
                    </li>
                    <li>
                      <a class='dropdown-item' href='#'>
                        Another action
                      </a>
                    </li>
                    <li>
                      <a class='dropdown-item' href='#'>
                        Something else here
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <p class='d-inline-flex gap-1'>
          <a
            class='btn btn-primary'
            data-bs-toggle='collapse'
            href='#multiCollapseExample1'
            role='button'
            aria-expanded='false'
            aria-controls='multiCollapseExample1'
          >
            Toggle first element
          </a>
          <button
            class='btn btn-primary'
            type='button'
            data-bs-toggle='collapse'
            data-bs-target='#multiCollapseExample2'
            aria-expanded='false'
            aria-controls='multiCollapseExample2'
          >
            Toggle second element
          </button>
          <button
            class='btn btn-primary'
            type='button'
            data-bs-toggle='collapse'
            data-bs-target='.multi-collapse'
            aria-expanded='false'
            aria-controls='multiCollapseExample1 multiCollapseExample2'
          >
            Toggle both elements
          </button>
        </p>
        <div class='row'>
          <div class='col'>
            <div class='collapse multi-collapse' id='multiCollapseExample1'>
              <div class='card card-body'>
                Some placeholder content for the first collapse component of
                this multi-collapse example. This panel is hidden by default but
                revealed when the user activates the relevant trigger.
              </div>
            </div>
          </div>
          <div class='col'>
            <div class='collapse multi-collapse' id='multiCollapseExample2'>
              <div class='card card-body'>
                Some placeholder content for the second collapse component of
                this multi-collapse example. This panel is hidden by default but
                revealed when the user activates the relevant trigger.
              </div>
            </div>
          </div>
        </div>
        <a href='https://vitejs.dev' target='_blank'>
          <img src={viteLogo} className='logo' alt='Vite logo' />
        </a>
        <a href='https://react.dev' target='_blank'>
          <img src={reactLogo} className='logo react' alt='React logo' />
        </a>
      </div>
    </>
  );
}

export default App;
