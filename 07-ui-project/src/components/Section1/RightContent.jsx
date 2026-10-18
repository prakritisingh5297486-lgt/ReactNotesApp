import React from 'react'
import 'remixicon/fonts/remixicon.css'
import RightCard from './RightCard'

const RightContent = (props) => {
  // console.log(props);
  return (
    <div id="right" className='h-full overflow-x-auto rounded flex flex-nowrap gap-5 p-6 w-3/4'>
      {props.users.map(function(elem,idx){
        return <RightCard key={idx} color={elem.color} id={idx} img={elem.img} tag={elem.tag}/>
      })}
    </div>
  )
}
export default RightContent