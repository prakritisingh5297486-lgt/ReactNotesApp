import React from 'react'

const RightCardContent = (props) => {
  return (
    <div className='absolute top-0 left-0 h-full w-full p-7 flex flex-col justify-between'>
        <h2 className='bg-white rounded-full bg-white text-xl h-10 w-10 flex justify-center items-center font-semibold'>{props.id+1}</h2>
        <div>
        <p className='text-lg text-shadow-2xs leading-relaxed text-white mb-6'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos officia ex voluptas nemo iste quam.</p>
        <div className='justify-between flex'>
            <button style={{backgroundColor:props.color}} className='text-white font-medium px-6 py-2 rounded-full'>{props.tag}</button>
            <button style={{backgroundColor:props.color}} className='text-white font-medium px-3 py-2 rounded-full'><i className='ri-arrow-right-line'></i></button>
        </div>
        </div>
    </div>
  )
}

export default RightCardContent
