import { commonTypes } from './actions';

const initialState = {
  icd_10: [],
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
    COUNTRIES: [
      "Afghanistan", "Albania", "Algeria", "American Samoa", "Andorra", "Angola", "Anguilla",
      "Antarctica", "Antigua And Barbuda", "Argentina", "Armenia", "Aruba", "Australia",
      "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus",
      "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia And Herzegovina",
      "Botswana", "Bouvet Island", "Brazil", "British Indian Ocean Territory", "Brunei Darussalam",
      "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde",
      "Cayman Islands", "Central African Republic", "Chad", "Chile", "China", "Christmas Island",
      "Cocos (keeling) Islands", "Colombia", "Comoros", "Congo", "Congo,, The Democratic Republic Of The", "Cook Islands", "Costa Rica", "Cote D'ivoire", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "East Timor", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Falkland Islands (malvinas)", "Faroe Islands", "Fiji", "Finland", "France", "French Guiana", "French Polynesia", "French Southern Territories", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guadeloupe", "Guam", "Guatemala", "Guinea", "Guinea-bissau", "Guyana", "Haiti", "Heard Island And Mcdonald Islands", "Holy See (vatican City State)", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran,, Islamic Republic Of", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakstan", "Kenya", "Kiribati", "Korea,, Democratic People's Republic Of", "Korea,, Republic Of", "Kosovo", "Kuwait", "Kyrgyzstan", "Lao People's Democratic Republic", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libyan Arab Jamahiriya", "Liechtenstein", "Lithuania", "Luxembourg", "Macau", "Macedonia,, The Former Yugoslav Republic Of", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Martinique", "Mauritania", "Mauritius", "Mayotte", "Mexico", "Micronesia,, Federated States Of", "Moldova,, Republic Of", "Monaco", "Mongolia", "Montserrat", "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "Netherlands Antilles", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Niue", "Norfolk Island", "Northern Mariana Islands", "Norway", "Oman", "Pakistan", "Palau", "Palestinian Territory,, Occupied", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Pitcairn", "Poland", "Portugal", "Puerto Rico", "Qatar", "Reunion", "Romania", "Russian Federation", "Rwanda", "Saint Helena", "Saint Kitts And Nevis", "Saint Lucia", "Saint Pierre And Miquelon", "Saint Vincent And The Grenadines", "Samoa", "San Marino", "Sao Tome And Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Georgia And The South Sandwich Islands", "Spain", "Sri Lanka", "Sudan", "Suriname", "Svalbard And Jan Mayen", "Swaziland", "Sweden", "Switzerland", "Syrian Arab Republic", "Taiwan,, Province Of China", "Tajikistan", "Tanzania,, United Republic Of", "Thailand", "Togo", "Tokelau", "Tonga", "Trinidad And Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks And Caicos Islands", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "United States Minor Outlying Islands", "Uruguay", "Uzbekistan", "Vanuatu", "Venezuela", "Viet Nam", "Virgin Islands,, British", "Virgin Islands,, U.s.", "Wallis And Futuna", "Western Sahara", "Yemen", "Zambia", "Zimbabwe"
    ]
  },
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