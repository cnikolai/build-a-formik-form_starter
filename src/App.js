import React from "react";
import {useFormik} from 'formik'
function App() {
  const [isSent, setIsSent] = React.useState(false);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    onSubmit: (values,actions) => {
      console.log('form: ', values)
      //console.log(actions);
      setIsSent(true)
      actions.resetForm
    },
    validate: values => {
      let errors = {}
      if (!values.email) {
        errors.email = "This field is required!"
      }
      else {
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
         errors.email = 'Invalid email address';
       }
     }
      if (!values.password) {
        errors.password = "This field is required!"
      }
      return errors;
    },
  })

  return (
    <div>
      {isSent ?  <div style={{color: 'green'}}>Login Successful</div>: 
      //null}
      <form onSubmit={formik.handleSubmit}>
        <div>Email</div>
        <input name="email" id="emailField" type="text" onChange={formik.handleChange} value={formik.values.email} />
        {formik.errors.email ? <div style={{color: 'red'}}>{formik.errors.email}</div>:null}
        <div>Password</div>
        <input name="password" id="pswField" type="text" onChange={formik.handleChange} value={formik.values.password} />
        {formik.errors.password ? <div style={{color: 'red'}}>{formik.errors.password}</div>:null}
        <button id="submitBtn" type="submit" disabled={formik.isSubmitting}>Submit</button>
        {formik.isSubmitting ? "Logging in: Please wait..." : null}
       </form>
       }
    </div>
  );
}

export default App;
