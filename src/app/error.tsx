'use client'

type Props = {}

const error = (props: Props) => {
  return (
    <div className='h-screen flex justify-center items-center font-2xl gap-4'>an unexpected error has occurred
      <a href="/" className='underline'>go home</a>
    </div>
  )
}

export default error