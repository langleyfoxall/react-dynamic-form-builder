import React, {Component, Fragment} from 'react';
import ReactDOM from 'react-dom';
import DynamicFormBuilder from '@langleyfoxall/react-dynamic-form-builder';

class Demo extends Component {

    constructor(props){
        super(props);

        this.state = {
            form: JSON.stringify([
                {
                    name: 'normal',
                    label: 'Normal Input',
                    placeholder: 'No validation'
                },
                {
                    name: 'required',
                    label: 'Required',
                    placeholder: 'No Error Message',
                    validationRules: [
                        'required'
                    ]
                },
                {
                    name: 'email',
                    label: 'Email',
                    placeholder: 'With error message',
                    validationRules: [
                        {
                            rule: 'required',
                            message: 'Please enter an email'
                        },
                        {
                            rule: 'email',
                            message: 'Please enter a valid email'
                        }
                    ]
                },
                {
                    name: 'numbers',
                    placeholder: 'Numbers only',
                    filter: 'numeric'
                },
                {
                    name: 'uppercase',
                    placeholder: 'Uppercase transformer',
                    transformer: {
                        onChange: 'uppercase'
                    }
                }
            ], null, 4)
        }
    }

    renderForm(){
        try{
            return(
                <DynamicFormBuilder
                    form={JSON.parse(this.state.form)}
                    submitButton={{
                        text: 'Submit',
                        className: 'submit'
                    }}
                    onSubmit={(form) => {
                        console.log(form);
                    }
                    }/>
            )
        }catch(e){
            return <p>Invalid form, ensure that the JSON is valid</p>
        }
    }

    handleJsonInput(event){
        this.setState({form: event.target.value})
    }

    render() {
        return (
            <Fragment>
                <h2 className={"title"}>React Dynamic Form Builder Demo</h2>
                <p className="description">Modify the JSON on the left to modify the form on the right. On submitting the form value will be logged to the console.</p>
                <div className="container">
                    <div className="showcase">
                        <textarea style={{fontFamily: 'monospace'}} className="json-input" onChange={this.handleJsonInput.bind(this)} value={this.state.form}/>
                    </div>
                    <div className="showcase">
                        {this.renderForm()}
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default Demo;

ReactDOM.render(<Demo />, document.getElementById('demo'));

