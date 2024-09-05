import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './index.css';
import { faClone, faLink } from '@fortawesome/free-solid-svg-icons';
import fetchAPI from './lib/fetch';
import { ChangeEvent, useState } from 'react';
import notify from './lib/notify';

function App() {
  const { fetch, isLoading, isError, result } = fetchAPI();
  const [value, setValue] = useState<string>('');
  const [method] = useState<string>('Get');
  const { showNotif, ToastContainer } = notify();
  const [isShowAll, setIsShowAll] = useState<boolean>(false);

  const handleForm = () => {
    if (value === '') {
      showNotif("error", "Please input your endpoint API!");
    } else {
      fetch(value, method);
    }
  };

  const handleCopy = (content: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(content).then(() => {
        showNotif("success", "Content copied!");
      }).catch(err => {
        console.error("Failed to copy: ", err);
        showNotif("error", "Failed to copy content.");
      });
    } else {
      const textarea = document.createElement('textarea');
      textarea.value = content;
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand('copy');
        showNotif("success", "Content copied!");
      } catch (err) {
        console.error("Failed to copy: ", err);
        showNotif("error", "Failed to copy content.");
      }
      document.body.removeChild(textarea);
    }
  };

  return (
    <div className='w-full min-h-screen flex flex-col justify-center items-center px-4 lg:px-24 py-12 lg:py-24 bg-white'>
      <ToastContainer />

      {/* header */}
      <div className='w-full flex flex-col gap-4 mb-12'>
        <h1 className='text-center text-4xl text-black font-bold'>API Result Analysis, Accurate and Instant</h1>
        <p className='text-xl text-center text-black'>
          A platform designed to display results from public API endpoints quickly and accurately. With a clean and intuitive interface, you can instantly monitor API responses for better analysis and decision-making needs, without additional validation.
        </p>
      </div>

      {/* form */}
      <div className='w-full flex flex-col items-center gap-4'>
        <div className='w-full flex gap-2'>
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn bg-[#0D0D0D] text-white">{method}</div>
            <div tabIndex={0} className="dropdown-content menu gap-2 bg-[#0D0D0D] rounded-box z-[1] w-52 p-2 shadow">
              <p onClick={() => showNotif("error", "Feature coming soon!")} className='btn btn-xs btn-primary text-white'>Get</p>
              <p onClick={() => showNotif("error", "Feature coming soon!")} className='btn btn-xs btn-primary text-white'>Post</p>
              <p onClick={() => showNotif("error", "Feature coming soon!")} className='btn btn-xs btn-primary text-white'>Update</p>
              <p onClick={() => showNotif("error", "Feature coming soon!")} className='btn btn-xs btn-primary text-white'>Delete</p>
            </div>
          </div>

          <label className="w-full input input-bordered flex items-center gap-2 bg-[#0D0D0D] text-white">
            <FontAwesomeIcon icon={faLink} />
            <input
              type="text"
              className="grow"
              placeholder="Type your API endpoint here"
              value={value}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
            />
          </label>
        </div>

        {isLoading ? (
          <button className='w-full btn btn-primary text-white' disabled>
            <span className="loading loading-spinner loading-sm"></span>
            Loading
          </button>
        ) : (
          <button className='w-full btn btn-primary text-white' onClick={handleForm}>
            Submit
          </button>
        )}
      </div>

      {/* result */}
      <div className='w-full mt-12 rounded-lg overflow-hidden'>
        {isError && (
          <div className='w-full overflow-hidden bg-slate-600'>
            <p className='px-4 py-2 font-bold text-white bg-[#2F2F2F]'>BASH</p>
            <pre className='w-full px-4 py-2 bg-[#0D0D0D]'>
              <code className='w-full text-xs md:text-lg text-wrap text-white'>
                <p>Error!</p>
                <p>
                  Please check the API endpoint that you input!
                </p>
              </code>
            </pre>
          </div>
        )}

        {result && !isLoading && !isError && (
          <div className={`w-full ${isShowAll ? 'min-h-96' : 'h-96'} overflow-hidden bg-slate-600`}>
            <div className='flex justify-between px-4 py-2 bg-[#2F2F2F]'>
              <p className='font-bold text-white'>JSON</p>
              <div className='btn btn-xs text-white' onClick={() => handleCopy(JSON.stringify(result, null, 2))}>
                <FontAwesomeIcon icon={faClone} />
                <span>Copy</span>
              </div>
            </div>
            <pre className='w-full min-h-96 px-4 py-2 bg-[#0D0D0D]'>
              <code className='w-full text-xs md:text-lg text-wrap text-white'>
                {JSON.stringify(result, null, 2)}
              </code>
            </pre>

            <div className='w-full flex justify-center sticky bottom-0 p-6 bg-gradient-to-t from-[#2F2F2F] to-[#0D0D0D]'>
              <span className='text-white cursor-pointer' onClick={() => setIsShowAll(!isShowAll)}>
                {isShowAll ? "Show less" : "Show all"}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
