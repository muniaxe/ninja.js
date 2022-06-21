import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { users } from './data/users';

// var userData = JSON.parse(document.getElementById('user-data').dataset.users);
var userData2 = users
ReactDOM.render(<App rows={userData2} />, document.getElementById('root'));
