import './App.css';
import CodeEditor from '@uiw/react-textarea-code-editor';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import isEmail from 'validator/lib/isEmail';

const axios = require('axios').default;

function App() {
  let [emailID , setEmailID] = useState('');
  let [code,setCode] = useState();
  
  function startSubmitProcess(){
    if(isEmail(emailID)){
      console.log("Valid Email ID.");
      if(code){
        console.log("Code is present");
        
        toast.promise(axios.post('/api/sendMail',{
          email: emailID,
          code: code
        }),{
        error: "Failed to Send",
        success: "Code Sent",
        pending: "Sending Code"
      })
      
      } else {
        console.log("Code is empty.");
        toast.error("Paste Your Code!");
        return;
      }
    } else {
      toast.error("Invalid email address");
      return;
    }
  }

  return (
    <body>
      <ToastContainer 
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme='dark'
      toastClassName={'toast-body'}
      />
      <header className="header">
        idwtgmeptms
      </header>
      <div className='spacer'/>
      <div className="input-section">
        <span className='input-title'>Enter Email</span>
        <br/>
        <input type="email" className='email-input' onChange={(newE)=>{
          setEmailID(newE.target.value);
          console.log(emailID);
        }}>
          
        </input>
      </div>
      <div className='spacer'/>
      <div className="input-section2">
        <span className='input-title'>Paste Code</span>
        <br/>

        <CodeEditor
         value={code}
         placeholder={'#TODO Paste your code'}
         onChange={(newCode)=>{setCode(newCode.target.value);}}
         className="code-input"
         language='py'        
        />
    
      </div>
      <div className="centered">
      <button className='send-button' onClick={startSubmitProcess}>
        Send
      </button>
      </div>
    </body>
  );
}

export default App;
