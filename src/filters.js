import Vue from 'vue';
import moment from 'moment';

Vue.filter('formatDate', function(value) {
  if (value) {
    return moment(String(value)).format('MMMM Do YYYY');
  }
});

Vue.filter('formatDateTime', function(value) {
  if (value) {
    return moment(String(value)).format('MMMM Do YYYY, hh:mm A');
  }
});
