import React from 'react'
import LeftContent from './LeftContent'
import RightContent from './RightContent'

const Page1Content = (props) => {
  return (
    <div className='pb-12 p-2 h-[90vh] justify-between items-center gap-7 px-18 flex'>
      <LeftContent />
      <RightContent users={props.users}/>
    </div>
  )
}

export default Page1Content