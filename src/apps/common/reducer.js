import { commonTypes } from './actions';

const initialState = {
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
  KIN_RELATIONSHIPS: [
    (0, 'Father'),
    (1, 'Mother'),
    (2, 'Brother'),
    (3, 'Sister'),
    (4, 'Husband'),
    (5, 'Wife'),
    (6, 'Guardian'),
  ],
  status: null,
  message: null
}
export default function (state = initialState, action) {
  switch (action.type) {
    case commonTypes.PROCESSING:
      return {
        ...state,
        isProcessing: true,
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
        status: "success",
        message: action.payload,
      };
    case commonTypes.ERROR:
      return {
        ...state,
        isProcessing: false,
        status: "error",
        message: action.payload,
      };

    case commonTypes.DONE:
      return {
        ...state,
        isProcessing: false,
        silent_processing: false,
        status: "",
        message: null,
      }

    default:
      return {
        ...state,
      }
  }
}