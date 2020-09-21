import React from 'react'

export const Loader = () =>
  <div className="loader">
    <div className="bars">
      <div className="bar bar1"></div>
      <div className="bar bar2"></div>
      <div className="bar bar3"></div>
      <div className="bar bar4"></div>
    </div>
  </div>

export function PrintHeader(props) {
  const { hospital, title } = props;
  return (
    <div className="col-12">
      <h3 className="col-12 p-0 m-0 text-center">{hospital ? `${hospital.organization_name}` : ""}</h3>
      <h6 className="col-12 p-0 m-0 text-center">{hospital ? `${hospital.postal_address}` : ""}</h6>
      <h6 className="col-12 p-0 m-0 text-center">{hospital ? `${hospital.physical_address}` : ""}</h6>
      <h5 className="col-12 p-0 m-0 text-center mt-3"><u>{title}</u></h5>
    </div>
  )
}