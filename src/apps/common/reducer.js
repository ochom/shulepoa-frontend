import { commonTypes } from './actions';

const initialState = {
  GENDERS: [
    ('Female'),
    ('Male')
  ],
  KIN_RELATIONSHIPS: [
    ('Father'),
    ('Mother'),
    ('Brother'),
    ('Sister'),
    ('Husband'),
    ('Wife'),
    ('Guardian'),
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