import React from 'react';
import './FormError.css'

const FormErrors = ({formErrors}) =>
  <div className='formErrors form-group'>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
    {Object.keys(formErrors).map((fieldName, i) => {
      if(formErrors[fieldName].length > 0){
        return (
            <ul className="ul" key={i}>
              <li className="list-error">
                <i className="fa fa-warning error-icon" key={i}>{'  '}
                  <span className="error-message" key={i}>{fieldName} {formErrors[fieldName]}<br/></span>
                </i>
              </li>
            </ul>
        )        
      } else {
        return '';
      }
    })}
  </div>

export default FormErrors;