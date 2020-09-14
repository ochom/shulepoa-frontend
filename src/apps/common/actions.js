import Axios from "axios";
import html2pdf from 'html2pdf.js';
import React from 'react';
import { confirmAlert } from 'react-confirm-alert';

export const API_PATH =
  process.env.NODE_ENV === 'development' ?
    'http://127.0.0.1:8000/api/' : process.env.NODE_ENV === 'production' ?
      'https://hosipoa-backend.herokuapp.com/api/' : "/";

// export const API_PATH = 'https://hosipoa-backend.herokuapp.com/api/';

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
  var opt = {
    margin: [0.5, 0.5],
    filename: `${document_name}.pdf`,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
  };
  html2pdf().set(opt).from(input).save();
}

export const loadICD10 = () => (dispatch, getState) => {
  var icd_10 = getState().common.icd_10
  if (icd_10.length === 0) {
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
}

export const deleteData = (id, deleteFunction) => {
  confirmAlert({
    customUI: ({ onClose }) => {
      return (
        <div className='custom-ui'>
          <div className="card">
            <div className="card-header cu-bg-primary">Delete File</div>
            <div className="card-body px-3">
              <p>Are you sure you want to delete this file?</p>
            </div>
            <div className="card-footer">
              <button className="btn btn-sm btn-danger"
                onClick={() => {
                  deleteFunction(id);
                  onClose();
                }}>Yes, Delete it!
                </button>
              <button className="btn btn-sm btn-secondary ml-2 px-3" onClick={onClose}>No</button>
            </div>
          </div>
        </div>
      );
    }
  });
}