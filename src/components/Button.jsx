import React from 'react'

const Button = ({title, type,color, onClick}) => {
  return (
    <button onClick={onClick} type={type} className={`font-medium text-${color}-600  hover:underline`}>
        {title}
    </button>
  )
}

export default Button