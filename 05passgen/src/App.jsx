import { set } from 'mongoose';
import { useState,useCallback,useEffect ,useRef} from 'react'

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed,setnumberAllowed] = useState(false);
  const[charAllowed,setcharAllowed] = useState(false);
  const[password,setPassword] = useState("");

  //useRef hook
  const passwordRef = useRef(null)

const passwordGenerator = useCallback(()=>{
  let pass = ""
  let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
  if(numberAllowed) str += "0123456789"
  if(charAllowed) str += "!@#$%^&*( )-_=+{ }"
  for(let i = 1; i<=length; i++){
  let char = Math.floor(Math.random() * str.length +1);
  pass += str.charAt(char)
  }
setPassword(pass);

},[length,numberAllowed,charAllowed,setPassword]);

const copyPasswordclipboard = useCallback(()=>{
  passwordRef.current?.select(); // to get selected highlighted
  passwordRef.current?.setSelectionRange(0,100); // select upto range
  window.navigator.clipboard.writeText(password)
},[password])

useEffect(()=>{
  passwordGenerator()
},[length,numberAllowed,charAllowed,passwordGenerator])
  return (
    <>
   <div className='w-full max-w-md mx-auto
    shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-700 '
    ><h1 className='text-white text-center my-6'>Password Generator</h1><div className='flex shadow rounded-lg overflow-hidden mb-5   bg-white '>
       <input 
    type="text" 
    value ={password}
    className ='outline-none w-full py-1 px-5  '
    placeholder='password'
    readOnly
    ref = {passwordRef}
    
    />
    <button 
    onClick={copyPasswordclipboard}
    className='bg-blue-700 px-3 shrink-0'> copy</button>

    </div>
    <div className='flex text-sm gap-x-2'>
      <div className='flex items-center gap-x-1'>
        <input 
        type="range" 
        min={6}
        max={100}
        value = {length}
        className='cursor-pointer'
        onChange={(e)=>{setLength(e.target.value) }}
       />
<label>Length: {length}</label>
      </div>
      <div className='flex items-center gap-x-1'>
        <input 
        type="checkbox" 
        defaultChecked = {numberAllowed}
        id ="numberInput"
        onChange={()=>{setnumberAllowed((prev)=> !prev); }}
       />
       <label htmlFor='numberInput'>Numbers</label>
      </div>
<div className='flex items-center gap-x-1'>
        <input 
        type="checkbox" 
       defaultChecked = {charAllowed}
       id = "characterInput"
        onChange={()=>{setcharAllowed((prev)=> !prev); }}
       />
       <label htmlFor='CharacterInput'>Characters</label>
      </div>
    </div>
       </div>
    </>
  )
}

export default App

//useCallback --> store in cache and prevent from recreating function in memory every time it render until its dependecies changes

//useeffect --> trigger when any change happen in there dependicies

//useRef --> use when we have to take reference of anything