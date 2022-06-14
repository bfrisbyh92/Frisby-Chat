import { auth, signInWithGoogle, signInWithFacebook, logout } from "../firebase";
import {GoogleOutlined, FacebookOutlined} from '@ant-design/icons';

function Login() {
  

  return (
  
        <div id="login-page">
             <div id="login-card">
                 <h2>Welcome to Frisby Chat!</h2>
                 <div
                    className="login-button google"
                    onClick={() => signInWithGoogle()}
                    >
                    <GoogleOutlined/>Google Sign In
                    <br></br>

                </div>

                <div
                    className="login-button facebook"
                    onClick={() => signInWithFacebook()}
                >
                    <FacebookOutlined/>Facebook Sign In
                    <br></br>
                
            </div>
        </div>
    
    </div>
  )
}
export default Login;