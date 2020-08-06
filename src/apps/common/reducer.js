import { commonTypes } from './actions';

const initialState = {
  isProcessing: false,
  CONSTANTS: {
    DEPARTMENTS: [
      (0, "Records"), (1, "Revenue"), (2, "Outpatient"),
      (3, "Laboratory"), (4, "Radiology"), (5, "Pharmacy"),
      (6, "Inpatient"), (7, "General"),
    ],
    TREATMENT_SCHEMES: [
      (0, 'Cash'),
      (1, 'Corporate')
    ],
    GENDERS: [
      (0, 'Female'),
      (1, 'Male'),
      (2, 'Inter-sex'),
    ],
    ID_TYPES: [
      (0, 'Birth Certificate'),
      (1, 'National ID'),
      (2, 'Alien ID'),
      (3, 'Military ID'),
      (4, 'Passport'),
    ],
    MARITAL_STATUSES: [
      (0, 'Child'), (1, 'Single '), (2, 'Married '), (3, 'Separated '), (4, ' Divorced '),
    ],
    KIN_RELATIONSHIPS: [
      (0, 'Father'),
      (1, 'Mother'),
      (2, 'Brother'),
      (3, 'Sister'),
      (4, 'Husband'),
      (5, 'Wife'),
      (6, 'Guardian'),
    ],
    TIME_UNITS: [
      "Minutes",
      "Hours",
      "Days",
      "Weeks",
      "Months",
      "Years",
    ],
  }
};

export default function (state = initialState, action) {
  switch (action.type) {
    case commonTypes.PROCESSING:
      return {
        ...state,
        isProcessing: true,
        isSuccessful: false,
        isError: false,
        error: null,
        message: null,
      };
    case commonTypes.SILENT_PROCESSING:
      return {
        ...state,
        silent_processing: true,
      }
    case commonTypes.SUCCESS:
      return {
        ...state,
        isProcessing: false,
        isSuccessful: true,
        isError: false,
        error: null,
        message: action.message,
      };
    case commonTypes.ERROR:
      return {
        ...state,
        isProcessing: false,
        isSuccessful: false,
        isError: true,
        message: null,
        error: action.error,
      };
    case commonTypes.DASHBOARD_DATA:
      return {
        ...state,
        isProcessing: false,
        dashboard_data: action.payload,
      }
    case commonTypes.DONE:
      return {
        ...state,
        isProcessing: false,
        silent_processing: false,
      }

    default:
      return state;
  }
}