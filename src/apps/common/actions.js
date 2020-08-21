import Axios from "axios";
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

export const API_PATH =
  process.env.NODE_ENV === 'development' ?
    'http://127.0.0.1:8000/api/' : process.env.NODE_ENV === 'production' ?
      'https://hosipoa-backend.herokuapp.com/api/' : "/";

export const commonTypes = {
  PROCESSING: 'PROCESSING',
  SILENT_PROCESSING: 'SILENT_PROCESSING',
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR',
  DASHBOARD_DATA: 'DASHBOARD_DATA',
  DONE: 'DONE',

  LOAD_ICD10: "LOAD_ICD10",
};

export const PrintPDF = (input, document_name) => {
  html2canvas(input)
    .then((canvas) => {
      var contentDataURL = canvas.toDataURL("image/png");
      var margin = 2;
      var imgWidth = 210 - 2 * margin;
      var pageHeight = 295;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;

      var doc = new jsPDF('p', 'mm', 'a4');
      var position = 5;

      doc.addImage(contentDataURL, 'PNG', margin, position, imgWidth, imgHeight);

      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        doc.addPage();
        doc.addImage(contentDataURL, 'PNG', margin, position, imgWidth, imgHeight);
        doc.text('Hosipoa -Lysofts Ke', 210 - 20, pageHeight - 2, null, null, "right");
        heightLeft -= pageHeight;
      }
      //doc.output('datauri')
      doc.save(`${document_name}.pdf`);
    });
}

export const loadICD10 = () => (dispatch) => {
  dispatch({ type: commonTypes.PROCESSING })
  Axios.get(`https://gist.githubusercontent.com/cryocaustik/b86de96e66489ada97c25fc25f755de0/raw/b31a549638a609004e9a45f8933c3f37bdf4c27d/icd10_codes.json`)
    .then(res => {
      dispatch({ type: commonTypes.LOAD_ICD10, payload: res.data })
    }).catch(err => {
      dispatch({ type: commonTypes.ERROR, payload: err })
    })
    .finally(() => {
      dispatch({ type: commonTypes.DONE, })
    })
}

