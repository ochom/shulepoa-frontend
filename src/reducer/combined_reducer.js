import { combineReducers } from 'redux';
import auth from '../apps/auth/reducer';
import bugs from '../apps/bugs/reducer';
import common from '../apps/common/reducer';
import hospital from '../apps/hospital/reducer';
import inpatient from '../apps/inpatient/reducer';
import inventory from '../apps/inventory/reducer';
import laboratory from '../apps/laboratory/reducer';
import outpatient from '../apps/outpatient/reducer';
import pharmacy from '../apps/pharmacy/reducer';
import radiology from '../apps/radiology/reducer';
import patients from '../apps/records/reducer';
import revenue from '../apps/revenue/reducer';

export default combineReducers({
  common,
  auth,
  bugs,
  patients,
  hospital,
  outpatient,
  revenue,
  laboratory,
  radiology,
  pharmacy,
  inpatient,
  inventory,
});
