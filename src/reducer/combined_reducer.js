import { combineReducers } from 'redux';
import auth from '../apps/auth/reducer';
import bugs from '../apps/bugs/reducer';
import common from '../apps/common/reducer';
import organization from '../apps/organization/reducer';
import inventory from '../apps/inventory/reducer';
import records from '../apps/records/reducer';

export default combineReducers({
  common,
  auth,
  bugs,
  records,
  organization,
  inventory,
});
