import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import FormData from 'react-form-data';
import FormErrors from './FormErrors';
import _ from 'lodash'; 
import { Button, Form, ModalHeader, FormGroup, Label, Input, FormText, FormFeedback} from 'reactstrap';
import CurrencyFormat from 'react-currency-format';

import './Model.css'

const jobId = ['Active', 'Passive', 'Urgent'];

const jobSearch = [
    {
      name: 'Active',
      color: '#7c35d9',
      textColor: 'white',
      description: "I'm ready to move on from my current role" 
    },
    {
      name: 'Passive',
      color: '#5a5452',
      textColor: 'white',
      description: "I'm ready to move on from my current role" 
    },
    {
      name: 'Urgent',
      color: '#D6191A',
      textColor: 'white',
      description: "I'm ready to move on from my current role" 
    }
]

const customStyles = {
  content : {
    width                 : '40%',
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    height: 'calc(100vh - 10px)',
    overflow: 'auto'
  }
};

const INITIAL_STATE = {
  jobSearchType: '',
  position: '',
  minSalary: '',
  maxSalary: '',
  companySize: '',
  timeCommit: '',
  month: '',
  day: '',
  year: '',
  describe: ''
};

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

// function JobSearch ({title, jobSearchData, onClick}) {
//   return (<div className="answer" onClick={() => {onClick(title);}}>
//       <div className="card">
//         <div className="card-body" style={{backgroundColor: jobSearchData.color}}>
//           <h5 className="card-title">{title}</h5>
//           <h6 className="card-subtitle mb-2 text-muted">{jobSearchData.description}</h6>
//         </div>
//       </div><br/>
//   </div>
//   );
// }

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
//Modal.setAppElement('#yourAppElement')

class Model extends React.Component {
  constructor() {
    super();

    this.state = {
      chars_left: 10,
      max_char: 10,
      modalIsOpen: false,
      ...INITIAL_STATE,
      formData: {
        jobSearchType: '',
        position: '',
        minSalary: '',
        maxSalary: '',
        companySize: '',
        timeCommit: '',
        month: '',
        day: '',
        year: '',
        describe: ''
      },
      activeData: {name: '', color: '', textColor: '', description: ""},
      passiveData: {name: '', color: '', textColor: '', description: ""},
      urgentData: {name: '', color: '', textColor: '', description: ""},
      // validation
      formErrors: {position: '', minSalary: '', maxSalary: '', companySize: '', timeCommit: '', month: '', day: '', year: '', describe: '' },
      positionValid: false,
      minSalaryValid: false,
      maxSalaryValid: false,
      minSalaryValid: false,
      companySizeValid: false,
      timeCommitValid: false,
      monthValid: false,
      dayValid: false,
      yearValid: false,
      describeValid: false,
      formValid: false
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = '#000';
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  handleChange(event) {
    if(event.target.id == 'position'){
      this.setState({data: {
        position: event.target.value
      }});
    }
  }

  handleUserInput (e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({[name]: value}, 
                  () => { this.validateField(name, value) });
  }

  handleWordCount() {
    const charCount = this.state.describe.length;
    const maxChar = this.state.max_char;
    const charLength = maxChar - charCount;
    this.setState({ chars_left: charLength });
  }

  handleClick = (e) => {
      let jobIdData = _.find(jobSearch, {name: e.target.innerText})

      if(jobIdData && jobIdData.name == 'Active'){
          this.setState({
            jobSearchType: jobIdData.name,
            activeData: {
                  name: jobIdData.name,
                  color: jobIdData.color,
                  textColor: jobIdData.textColor,
                  description: jobIdData.description
              },
              urgentData: {
                name: '',
                color: '',
                textColor: '',
                description: ''
              },
              passiveData: {
                name: '',
                color: '',
                textColor: '',
                description: ''
              }
          });
      } else if(jobIdData && jobIdData.name == 'Passive'){
        this.setState({
          jobSearchType: jobIdData.name,
          passiveData: {
                name: jobIdData.name,
                color: jobIdData.color,
                textColor: jobIdData.textColor,
                description: jobIdData.description
            },
            activeData: {
              name: '',
              color: '',
              textColor: '',
              description: ''
          },
          urgentData: {
            name: '',
            color: '',
            textColor: '',
            description: ''
          }
        });
    } else if(jobIdData && jobIdData.name == 'Urgent'){
      this.setState({
        jobSearchType: jobIdData.name,
        urgentData: {
              name: jobIdData.name,
              color: jobIdData.color,
              textColor: jobIdData.textColor,
              description: jobIdData.description
          },
          activeData: {
            name: '',
            color: '',
            textColor: '',
            description: ''
          },
          passiveData: {
            name: '',
            color: '',
            textColor: '',
            description: ''
          }
      });
    }
  }

  handleSubmit(event) {
    this.setState(() => ({ ...INITIAL_STATE ,
    }));
    console.log(this.state);
    event.preventDefault();
  }

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let positionValid = this.state.positionValid;
    let minSalaryValid = this.state.minSalaryValid;
    let maxSalaryValid = this.state.maxSalaryValid;
    let companySizeValid = this.state.companySizeValid;
    let timeCommitValid = this.state.timeCommitValid;
    let monthValid = this.state.monthValid;
    let dayValid = this.state.dayValid;
    let yearValid = this.state.yearValid;
    let describeValid = this.state.describeValid;
  
    switch(fieldName) {
      case 'position':
        positionValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.position = positionValid ? '' : ' is invalid';
        break;
      case 'minsalary':
        minSalaryValid = value.length >= 6;
        fieldValidationErrors.minSalary = minSalaryValid ? '': ' is too short';
        break;
      case 'maxsalary':
        maxSalaryValid = value.length >= 6;
        fieldValidationErrors.maxSalary = maxSalaryValid ? '': ' is too short';
      break;
      case 'companysize':
        companySizeValid = value.length >= 6;
        fieldValidationErrors.companySize = companySizeValid ? '': ' is too short';
      break;
      case 'time':
        timeCommitValid = value.length >= 6;
        fieldValidationErrors.timeCommit = timeCommitValid ? '': ' is too short';
      break;
      case 'month':
        monthValid = value.length >= 6;
        fieldValidationErrors.month = monthValid ? '': ' is too short';
      break;
      case 'day':
        dayValid = value.length >= 6;
        fieldValidationErrors.day = dayValid ? '': ' is too short';
      break;
      case 'year':
        yearValid = value.length >= 6;
        fieldValidationErrors.year = yearValid ? '': ' is too short';
      break;
      case 'describe':
        describeValid = value.length >= 6;
        fieldValidationErrors.describe = describeValid ? '': ' is too short';
      break;
      default:
        break;
    }
    this.setState({formErrors: fieldValidationErrors,
                    positionValid: positionValid,
                    minSalaryValid: minSalaryValid,
                    maxSalaryValid: maxSalaryValid,
                    companySizeValid: companySizeValid,
                    timeCommitValid: timeCommitValid,
                    monthValid: monthValid,
                    dayValid: dayValid,
                    yearValid: yearValid,
                    describeValid: describeValid
                  }, this.validateForm);
  }

  errorClass(error) {
    return(error.length === 0 ? '' : 'has-error');
 }
  
  validateForm() {
    this.setState({formValid: this.state.emailValid && this.state.passwordValid});
  }

  render() {
    const {
      jobSearchType,
      position,
      minSalary,
      maxSalary,
      companySize,
      timeCommit,
      month,
      day,
      year,
      describe
    } = this.state;

    const isInvalid =
      jobSearchType === '' ||
      position === '' ||
      minSalary === '' ||
      maxSalary === ''
      companySize  === '' || 
      timeCommit  === '' ||
      month  === '' ||
      day  === '' ||
      year  === '' ||
      describe  === '';

    return (
      <div className ="container modal-open">
        <Button onClick={this.openModal}>Open Modal</Button>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <h4 toggle={this.toggle}>Edit your ideal job
          {/* <Button onClick={this.closeModal}>close</Button> */}
          <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.closeModal}>
          <span aria-hidden="true">&times;</span>
          </button>
          </h4>
          <div className="panel panel-default">
            <FormErrors formErrors={this.state.formErrors} />
          </div>
          <h2 ref={subtitle => this.subtitle = subtitle}></h2>
          
          <p>How serious is your job search?</p>
          <Form onSubmit={this.handleSubmit}>

            {/* <ul className="">
                <li className="form-group" value={jobId}>{jobId.map((title) => <JobSearch title={title} key={title}/>)}</li>
            </ul> */}

            <div className="card">
              <div className="card-body" onClick={this.handleClick.bind(this)} 
              style={{backgroundColor: this.state.passiveData.color, color: this.state.passiveData.textColor}}>
                <h5 className="card-title">Passive</h5>
                <h6 className="card-subtitle mb-2 text-muted" style={{color: this.state.passiveData.textColor}}>{this.state.passiveData.description}</h6>
              </div>
            </div><br/>
            <div className="card">
              <div className="card-body" onClick={this.handleClick.bind(this)} 
              style={{backgroundColor: this.state.activeData.color, color: this.state.activeData.textColor}}>
                <h5 className="card-title">Active</h5>
                <h6 className="card-subtitle mb-2 text-muted" style={{color: this.state.activeData.textColor}}>{this.state.activeData.description}</h6>
              </div>
            </div><br/>
            <div className="card">
              <div className="card-body" onClick={this.handleClick.bind(this)} 
              style={{backgroundColor: this.state.urgentData.color, color: this.state.urgentData.textColor}}>
                <h5 className="card-title">Urgent</h5>
                <h6 className="card-subtitle mb-2 text-muted" style={{color: this.state.urgentData.textColor}}>{this.state.urgentData.description}</h6>
              </div>
            </div><br/>

            {/* <Button color="black" size="lg" block>Passive</Button><br/>
            <Button color="primary" size="lg" block>Active</Button><br/>
            <Button color="danger" size="lg" block>Urgent</Button> */}
            <FormGroup>
              <Label for="position">Position (ie: Resident Nurse)*</Label>
              <div>
              {/* className={`form-group ${this.errorClass(this.state.formErrors.email)}`} */}
              <Input className={`form-group ${this.errorClass(this.state.formErrors.position)}`}
               type="text" id="position" placeholder="Position" name="position" 
              value={position} 
              onChange={event => this.setState(byPropKey('position', event.target.value), this.handleUserInput(event))}/>
            </div>
          </FormGroup>
          <div className="form-row">
            <FormGroup className="form-group col-md-6">
              <Label for="minimumsalary">Minimum salary</Label>
              <FormText>What's the lowest salary you'd take in order to get into a new job?</FormText>
              <div>    
              <CurrencyFormat className="form-control" name="minsalary"
              placeholder="Minimum salary" 
              thousandSeparator={true} prefix={'$'} 
              value={minSalary} 
              onChange={event => this.setState(byPropKey('minSalary', event.target.value), this.handleUserInput(event))}/>   
              </div>
            </FormGroup>
            <FormGroup className="form-group col-md-6">
              <Label for="anticipatedalary">Anticipated salary</Label>
              <FormText>What are you expecting as your total compensation for you first year?</FormText>
              <div>          
              <CurrencyFormat className="form-control" name="maxsalary"
              placeholder="Anticipated salary" 
              thousandSeparator={true} prefix={'$'} 
              value={maxSalary} 
              onChange={event => this.setState(byPropKey('maxSalary', event.target.value), this.handleUserInput(event))}/>
              </div>
            </FormGroup>
          </div>
          <div className="form-row">
              <FormGroup className="form-group col-md-3">
                <Label for="companysize">Ideal company Size*</Label>
                <Input type="select" name="companysize" 
                value={companySize} 
                onChange={event => this.setState(byPropKey('companySize', event.target.value), this.handleUserInput(event))}
                id="companysize">
                  <option value="0-100">0-100</option>
                  <option value="0-1000">0-1000</option>
                  <option value="0-5000">0-5000</option>
                  <option value="0-10000">0-10000</option>
                </Input>
              </FormGroup>
              <FormGroup className="form-group col-md-3">
                <Label for="time">Time commitment</Label>
                <Input type="select" name="time" id="time" 
                value={timeCommit} 
                onChange={event => this.setState(byPropKey('timeCommit', event.target.value), this.handleUserInput(event))}>
                  <option>select</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </Input>
              </FormGroup>
              <FormGroup className="form-group col-md-2">
                <Label for="month">Month</Label>
                <Input type="number" name="month"
                value={month} 
                onChange={event => this.setState(byPropKey('month', event.target.value), this.handleUserInput(event))}
                placeholder="Month">
                </Input>
                <FormFeedback>Oh noes! that name is already taken</FormFeedback>
              </FormGroup>
              <FormGroup className="form-group col-md-2">
                <Label for="day">Day</Label>
                <Input type="number" name="day"
                value={day} 
                onChange={event => this.setState(byPropKey('day', event.target.value), this.handleUserInput(event))}
                placeholder="Day">
                </Input>
              </FormGroup>
              <FormGroup className="form-group col-md-2">
                <Label for="year">Year</Label>
                <Input type="number" name="year"
                value={year} 
                onChange={event => this.setState(byPropKey('year', event.target.value), this.handleUserInput(event))}
                placeholder="Year">
                </Input>
              </FormGroup>
          </div>
          <FormGroup>
            <Label for="describe">Describe your ideal job</Label>
            <Input type="textarea" name="describe" id="describe" rows={4} maxLength={this.state.max_char}
            required
            value={describe} 
            onChange={event => this.setState(byPropKey('describe', event.target.value), this.handleWordCount, this.handleUserInput(event))}
            placeholder="Describe your ideal job" /><span className="textarea__count">{this.state.chars_left}/{this.state.max_char}</span>
            <FormText>*Required</FormText>
          </FormGroup>
          <FormGroup>        
            <div>
              <button id="savebtn" type="submit" className="btn btn-primary" disabled={!this.state.formValid}>Save</button>
            </div>
          </FormGroup>
          </Form>
        </Modal>
      </div>
    );
  }
}
export default Model;

//ReactDOM.render(<App />, appElement);