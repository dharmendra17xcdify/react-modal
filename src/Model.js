import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import FormData from 'react-form-data';
import { Button, Form, ModalHeader, FormGroup, Label, Input, FormText, FormFeedback} from 'reactstrap';
import CurrencyFormat from 'react-currency-format';

import './Model.css'

const jobSearch = [{
  active: {
    name: 'Active',
    color: 'blue',
    description: "I'm ready to move on from my current role" 
  },
  passive: {
    name: 'Passive',
    color: 'black',
    description: "I'm ready to move on from my current role" 
  },
  urgent: {
    name: 'Urgent',
    color: 'red',
    description: "I'm ready to move on from my current role" 
  }
}]

const customStyles = {
  content : {
    width                 : '50%',
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
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

// function JobSearch ({title, onClick}) {
//   return (<div className="answer" onClick={() => {onClick(title);}}>
//       <div className="card">
//         <div className="card-body" style={{backgroundColor: "green"}}>
//           <h5 className="card-title">{title}</h5>
//           <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6>
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
      modalIsOpen: false,
      ...INITIAL_STATE
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

  handleSubmit(event) {
    this.setState(() => ({ ...INITIAL_STATE }));
    event.preventDefault();
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
          <ModalHeader toggle={this.toggle}>Edit your ideal job
          {/* <Button onClick={this.closeModal}>close</Button> */}
          <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.closeModal}>
          <span aria-hidden="true">&times;</span>
          </button>
          </ModalHeader>
          <h2 ref={subtitle => this.subtitle = subtitle}></h2>
          
          <p>How serious is your job search?</p>
          <Form onChange={this.updateFormData} onSubmit={this.handleSubmit}>
            <div className="card">
              <div className="card-body" style={{backgroundColor: "green"}}>
                <h5 className="card-title">Passive</h5>
                <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6>
              </div>
            </div><br/>
            <div className="card">
              <div className="card-body" style={{backgroundColor: "blue"}}>
                <h5 className="card-title">Active</h5>
                <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6>
              </div>
            </div><br/>
            <div className="card">
              <div className="card-body" style={{backgroundColor: "red"}}>
                <h5 className="card-title">Urgent</h5>
                <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6>
              </div>
            </div><br/>

            {/* <Button color="black" size="lg" block>Passive</Button><br/>
            <Button color="primary" size="lg" block>Active</Button><br/>
            <Button color="danger" size="lg" block>Urgent</Button> */}
            <FormGroup>
              <Label for="position">Position (ie: Resident Nurse)*</Label>
              <div>
              <Input type="text" id="position" placeholder="Position" name="position" 
              value={position} 
              onChange={event => this.setState(byPropKey('position', event.target.value))} />
            </div>
          </FormGroup>
          <div className="form-row">
            <FormGroup className="form-group col-md-6">
              <Label for="minimumsalary">Minimum salary</Label>
              <FormText>What's the lowest salary you'd take in order to get into a new job?</FormText>
              <div>    
              <CurrencyFormat className="form-control" 
              placeholder="Minimum salary" 
              thousandSeparator={true} prefix={'$'} 
              value={minSalary} 
              onChange={event => this.setState(byPropKey('minSalary', event.target.value))}/>   
              </div>
            </FormGroup>
            <FormGroup className="form-group col-md-6">
              <Label for="anticipatedalary">Anticipated salary</Label>
              <FormText>What are you expecting as your total compensation for you first year?</FormText>
              <div>          
              <CurrencyFormat className="form-control" 
              placeholder="Anticipated salary" 
              thousandSeparator={true} prefix={'$'} 
              value={maxSalary} 
              onChange={event => this.setState(byPropKey('maxSalary', event.target.value))}/>
              </div>
            </FormGroup>
          </div>
          <div className="form-row">
              <FormGroup className="form-group col-md-3">
                <Label for="companysize">Ideal company Size*</Label>
                <Input type="select" name="companysize" 
                value={companySize} 
                onChange={event => this.setState(byPropKey('companySize', event.target.value))}
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
                onChange={event => this.setState(byPropKey('timeCommit', event.target.value))}>
                  <option>select</option>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </Input>
              </FormGroup>
              <FormGroup className="form-group col-md-2">
                <Label for="month">Month</Label>
                <Input type="number" 
                value={month} 
                onChange={event => this.setState(byPropKey('month', event.target.value))}
                placeholder="Month" invalid>
                </Input>
                <FormFeedback>Oh noes! that name is already taken</FormFeedback>
              </FormGroup>
              <FormGroup className="form-group col-md-2">
                <Label for="day">Day</Label>
                <Input type="number" 
                value={day} 
                onChange={event => this.setState(byPropKey('day', event.target.value))}
                placeholder="Day">
                </Input>
              </FormGroup>
              <FormGroup className="form-group col-md-2">
                <Label for="year">Year</Label>
                <Input type="number" 
                value={year} 
                onChange={event => this.setState(byPropKey('year', event.target.value))}
                placeholder="Year">
                </Input>
              </FormGroup>
          </div>
          <FormGroup>
            <Label for="describe">Describe your ideal job</Label>
            <Input type="textarea" name="describe" id="describe" 
            value={describe} 
            onChange={event => this.setState(byPropKey('describe', event.target.value))}
            placeholder="Describe your ideal job" />
            <FormText>*Required</FormText>
          </FormGroup>
          <FormGroup>        
            <div>
              <Button color="primary" size="lg" block type="submit" className="btn btn-default">Save</Button>
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