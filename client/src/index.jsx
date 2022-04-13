import React from 'react';
import { render } from 'react-dom';
import App from './components/app';
import WithClickTracker from './components/WithClickTracker';

render(React.createElement(WithClickTracker(App)), document.getElementById('App'));
