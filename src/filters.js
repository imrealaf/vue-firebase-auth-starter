import Vue from 'vue';
import moment from 'moment';
import { DATE_FORMAT_PRETTY } from '@/constants';

Vue.filter('formatDate', function(value) {
  if (value) {
    return moment(String(value)).format(DATE_FORMAT_PRETTY);
  }
});

Vue.filter('formatDateTime', function(value) {
  if (value) {
    return moment(String(value)).format('MMMM Do YYYY, hh:mm A');
  }
});
