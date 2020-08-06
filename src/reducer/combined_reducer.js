import { combineReducers } from 'redux';
import common from '../apps/common/reducer';
import auth from '../apps/auth/reducer';
import patients from '../apps/records/reducer';
import hospital from '../apps/hospital/reducer';
import outpatient from '../apps/outpatient/reducer';
import revenue from '../apps/revenue/reducer'
import laboratory from '../apps/laboratory/reducer'
import radiology from '../apps/radiology/reducer'
import pharmacy from '../apps/pharmacy/reducer'
import inpatient from '../apps/inpatient/reducer'
import procurement from '../apps/procurement/reducer'

export default combineReducers({
  common,
  auth,
  patients,
  hospital,
  outpatient,
  revenue,
  laboratory,
  radiology,
  pharmacy,
  inpatient,
  procurement,
});
