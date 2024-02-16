import { invoke } from "@tauri-apps/api/tauri"

const NoAdmin = () => {
  return window.process.isAdmin ? <></> : (
    <div
      className='absolute w-full min-h-screen left-0 top-0 bg-[#000A]
        z-[100] flex justify-center items-center flex-col'
    >
      <main
        className='w-1/2 max-h-[50vh] flex flex-grow rounded-xl relative
          justify-center items-center text-center bg-[#1A1A1A] flex-col'
      >
        <section
          className='absolute -inset-[2px] bg-gradient-to-br from-[#22F]
            to-[#F2F] -z-[1] rounded-[inherit]'
        />
        <p
          className='text-white text-2xl max-w-[80%] font-libreFranklin'
        >
          This app requires Administrative Privileges as it modifies the Windows Registry
        </p>
        <button
          type="button"
          className='mt-10 py-2 px-4 bg-red-500 rounded-md text-white
            font-libreFranklin text-xl font-semibold'
          onClick={async () => invoke('exit_app')}
        >
          CLOSE
        </button>
      </main>
    </div>
  )
}
export default NoAdmin
