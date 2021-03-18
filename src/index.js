'use strict';

import 'nodelist-foreach-polyfill';
import '@babel/polyfill';
import 'formdata-polyfill';
import 'es6-promise';
import 'fetch-polyfill';

import elementClosest from 'element-closest';
elementClosest(window);

import calc from './modules/calc';
import changePhoto from './modules/changePhoto';
import checkDigitsInput from './modules/checkDigitsInput';
import countTimer from './modules/countTimer';
import sendForm from './modules/sendForm';
import slider from './modules/slider';
import tabs from './modules/tabs';
import toggleMenu from './modules/toggleMenu';
import togglePopUp from './modules/togglePopUp';


//Timer
countTimer('20 july 2021');
//Menu
toggleMenu();
// popUp
togglePopUp();
//Tabs
tabs();
//Slider
slider();
//Change photos
changePhoto();
// Only digits input allowed
checkDigitsInput();
//Calc
calc(100);
//Send-ajax-form
sendForm('form1');
sendForm('form2');
sendForm('form3');
