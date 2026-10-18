import React, { useState } from 'react'
import { X } from 'lucide-react';

const App = () => {

  const submitHandler = (e) => {
    e.preventDefault(e);
    // e.preventDefault();
    // console.log('Form Submitted')
    // console.log(title,details);
    const copyTask = [...task];
    // console.log(task)    //[]
    copyTask.push({ title, details })
    setTask(copyTask);
    console.log(copyTask)

    setTitle('');
    setDetails('');
  }

  const deleteNote = (idx)=>{
    // console.log('Note Deleted');
    const copyTask = [...task];
    // console.log(copyTask)
    // console.log(idx)   // 0 1 2 3
    console.log(copyTask[idx])   //{title: 'Deepali', details: 'A PHP and Laravel Developer'}
    copyTask.splice(idx,1)
    setTask(copyTask)
    console.log('Note deleted')
  }

  const [title, setTitle] = useState('')
  const [details, setDetails] = useState('')

  const [task, setTask] = useState([])

  return (
    <div className='h-screen lg:flex bg-black p-10 text-white'>
      <form action="" onSubmit={(e) => {
        submitHandler(e)
      }} className='flex p-10 flex-col lg:w-1/2 items-start font-medium gap-4'>

        <h1 className='text-3xl font-bold'>Add Notes</h1>

        {/* First Input for heading */}
        <input type="text"
          placeholder='Enter Notes Heading'
          className='border-2 w-full py-2 rounded px-5'
          value={title}
          onChange={(e) => {
            // console.log(e.target.value);
            setTitle(e.target.value);

          }} />

        {/* Detailed input */}
        <textarea type="text"
          placeholder='Enter Details'
          className='px-5 h-32 w-full py-2 border-2 rounded'
          value={details}
          onChange={(e) => {
            // console.log(e.target.value);
            setDetails(e.target.value)
          }}></textarea>

        <button className='bg-white active:scale-95 active:bg-gray-400 text-black px-5 py-2 w-full rounded'>Add Note</button>
        {/* <img className='h-120 top-0' src="https://th.bing.com/th/id/R.195e6e8c726f50ce81d15d6dd0822dc2?rik=nc1YEW1XVnpsWw&riu=http%3a%2f%2fwww.pngall.com%2fwp-content%2fuploads%2f5%2fYellow-Sticky-Note-PNG-High-Quality-Image.png&ehk=anXPooB4h15C7BAC0O%2f0W8E%2fBB83NiaOaOCVo2rOk%2f8%3d&risl=&pid=ImgRaw&r=0" alt="" /> */}
        {/* <img className='rotate-y-180 h-80' src="https://media.istockphoto.com/id/2042244912/vector/pictogram-businessman-working-on-computer-vector-illustration.jpg?s=612x612&w=0&k=20&c=mP_m74L2GiG0Q4yS7WIMpg-uZA61pPYyT3IDVXesBuo=" alt="" /> */}
      </form>
      <div className="lg:w-1/2 lg:border-l-2 p-10">
        <h1 className='text-3xl font-bold'>Recent Notes</h1>
        <div className="flex flex-wrap gap-5 mt-5 justify-start items-start overflow-auto h-full">
          {/* <div className="h-52 w-40 rounded-2xl bg-white"></div> */}
          {task.map(function (elem, idx) {
            // return 'Hero';
            return <div key={idx} className="flex flex-col justify-between items-start relative h-52 w-40 rounded-2xl pt-9 pb-4 px-4 text-black" style={{
              backgroundImage: "url('https://png.pngtree.com/png-clipart/20220429/original/pngtree-note-paper-png-image_7572363.png')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat"
            }}>
              <div className='w-full'>
                {/* <h2 className='absolute top-5 right-2 bg-red-500 p-1 text-xs rounded-full'>
                  <X size={12} color='white' />
                </h2> */}
                <h3 className='leading-tight text-xl font-bold'>{elem.title}</h3>
                <p className='leading-tight mt-2 font-medium text-gray-700 break-words'>{elem.details}</p>
              </div>
                {/* <button onClick={deleteNote} className='w-full bg-red-400 cursor-pointer active:scale-95 text-white rounded p-1 text-xs font-bold'>Delete Note</button> */}
                <button onClick={()=>{
                  deleteNote(idx)
                }} className='w-full bg-red-400 cursor-pointer active:scale-95 text-white rounded p-1 text-xs font-bold'>Delete Note</button>
            </div>
          })}
        </div>
      </div>
    </div>
  )
}

export default App