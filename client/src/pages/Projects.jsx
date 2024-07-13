import CallToAction from '../components/CallToAction'

function Projects() {
  return (
    <div className='min-h-[80vh] max-w-2xl mx-auto flex flex-col justify-center items-center gap-5'>
      <h1 className='text-3xl font-bold'>Projects</h1>
      <p className='text-md text-gray-500'>Build fun and engaging projects while learning HTML, CSS, and JavaScript!</p>
      <CallToAction />
    </div>
  )
}

export default Projects