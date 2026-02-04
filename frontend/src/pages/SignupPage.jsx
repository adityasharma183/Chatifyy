import React,{useState} from 'react'
import { useAuthStore } from '../store/useAuthStore'
import BorderAnimatedContainer from '../components/BorderAnimatedContainer'

const SignupPage = () => {
    const [formDta, setFormDta] = useState({fulName:"",email:"",password:""})
    const {signup,isSigningUp}=useAuthStore()
    const handleSubmit=(e)=>{

    }
  return (
    <div className='w-full bg-slate-900 flex p-4 items-center justify-center'>
        <div className='relative w-full max-w-6xl md:h-[800px] h-[650px]'>
            <BorderAnimatedContainer>
                <div className='w-full flex flex-col md:flex-row'>
                {/* FORM COLUMN -LEFT SIDE */}
                <div className='md:w-1/2 p-8 flex items-center justify-center md:border-r border-slate-600/30'></div>
                </div>
            </BorderAnimatedContainer>
        </div>
    </div>
  )
}

export default SignupPage