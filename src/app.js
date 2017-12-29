import {
  inject
} from 'aurelia-framework';
import $ from "jquery";
import {
  HttpClient
} from 'aurelia-fetch-client';
import {
  AppService
} from './app-service';
import {
  StateService
} from "./state-service";
@inject(HttpClient, AppService, StateService)

export class App {
  position = 'top';
  trigger = 'mouseover';
  text = 'Dynamic Tooltip '
  collapsed = false;
  closeOthers = true; //accorian

  deleteItem() {
    alert('Deleting item');
  }
  toggled(open) {
    if (open) {
      console.log('opened');
    } else {
      console.log('closed');
    }
  }
  states = []
  autoClose = 'disabled'; // drop

  monthsOfTheYear = [{
      name: 'January',
      short: 'Jan',
      number: 1
    },
    {
      name: 'February',
      short: 'Feb',
      number: 2
    },
    {
      name: 'March',
      short: 'Mar',
      number: 3
    },
    {
      name: 'April',
      short: 'Apr',
      number: 4
    },
    {
      name: 'May',
      short: 'May',
      number: 5
    },
    {
      name: 'June',
      short: 'Jun',
      number: 6
    },
    {
      name: 'July',
      short: 'Jul',
      number: 7
    },
    {
      name: 'August',
      short: 'Aug',
      number: 8
    },
    {
      name: 'September',
      short: 'Sep',
      number: 9
    },
    {
      name: 'October',
      short: 'Oct',
      number: 10
    },
    {
      name: 'November',
      short: 'Nov',
      number: 11
    },
    {
      name: 'December',
      short: 'Dec',
      number: 12
    }
  ];

  fruits = ['Apple', 'Orange', 'Grapes', 'Pineaple', 'Peach', 'Bananas'];
  daysOfTheWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  //stateList = [];

  constructor(httpClient, appService, stateService) {
    this.message = 'Hello World!';
    this.httpClient = httpClient;
    this.dayOfTheWeek = 'Wednesday'

    this.appService = appService;
    this.stateService = stateService;

  }

  getStates(filter, limit) {
    let filterlc = filter.toLowerCase()
    let states
    let Promise = this.stateService.loadStates()
      .then(response => {
        states = response
        return states //response // .json();
      })
      .then(states => filter.length > 0 ? states.filter(item => item.name.toLowerCase().indexOf(filter.toLowerCase()) > -1) : states)
      .then(states => filter.length > 0 ? states.filter(item => item.name.toLowerCase().indexOf(filterlc) > -1) : states)

    return Promise
  }
  getStates1(filter, limit) {
    let filterlc = filter.toLowerCase()

    let states
    let Promise = this.stateService.loadStates()
      .then(response => {
        if (filterlc.length > 0) {
          states = response.filter((item) => {
            return this.itemMaches(filterlc, item)
          });
        } else {
          states = response
        }
        return states
      })
    return Promise
  }

  itemMaches(searchTerm, value) {
    value = value.name;
    let itemValue = value.toLowerCase()
    console.log('itemValue', itemValue)
    if (!itemValue) return false;
    let find = itemValue.indexOf(searchTerm) !== -1;
    console.log('find', find)
    return find
  }

  monthSelected(item) {
    if (item) {
      console.log('Month Selected: ' + item.short);
    } else {
      console.log('Month cleared');
    }
  }
  attached() {
    this.name = {
      name: 'New York',
      value: 'NY'
    }
    this.dow.value = this.name
    //  $(document).ready(function () {
    //    $('#dow').val( this.name);
    //   })

  }
  activate() {
    ////    this.getStates('New York', 100)
    // this.name = {
    //   name: 'New York',
    //   value: 'NY'
    // }
    //  $(document).ready(function () {
    //   $('#dow').val( this.name);
    //  })

    
 

  }
  setup() {
        this.name = {
        name: 'New York',
        value: 'NY'
      }
  // let myVal = $('#dow')
   $('#dow').val( this.name);
  
  }



}
