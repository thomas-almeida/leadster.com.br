import { useState } from 'react'
import axios from 'axios'
import './App.css'

function App() {

  const [searchData, setSearchData] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [reqProgress, setReqProgress] = useState(0)

  const apiUrl = 'https://api.hasdata.com/scrape/google-maps/search?q='
  const geoLocation = '%40-23.5324545%2C-46.5066368%2C15z'
  const domain = 'google.com.br'
  const lang = 'pt-br'
  const apiKey = '7dd6ec9f-4b57-411d-bb36-e9a04fcfbad8'

  async function search() {
    try {

      const response = await axios.get(`${apiUrl}${inputValue}&ll=${geoLocation}&domain=${domain}&hl=${lang}&start=40`, {
        headers: {
          'x-api-key': apiKey
        }
      })

      setSearchData(response.data?.localResults)
      console.log(searchData)

    } catch (error) {
      console.error(error)
    }
  }

  function show() {
    search()
  }

  function inputKeyDown(event) {
    if (event.key === 'Enter') {
      search()
    }
  }

  return (
    <>
      <div className='p-8 flex items-center justify-center'>
        <div className='w-[80%]'>
          <div className='flex justify-center'>
            <div className='w-[65%]'>
              <div className='flex items-center justify-center mt-4'>
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={inputKeyDown}
                  placeholder='Escritórios de Advocacia'
                  className='border p-2 rounded-sm outline-blue-600 w-[100%] shadow-sm'
                />
                <button
                  className='mx-2 px-4 py-2 rounded-sm shadow-sm cursor-pointer bg-blue-600 text-white font-medium'
                  onClick={() => show()}
                >
                  Pesquisar
                </button>
              </div>
              <div className={reqProgress > 0 ? `h-[3px] border mt-1 bg-blue-700 w-[${reqProgress}%]` : `hidden`}></div>
            </div>

          </div>

          <div className='mt-4 p-10 flex justify-center'>

            <ul className='grid grid-cols-3'>
              {
                searchData?.map((location) => (
                  <li
                    className='border m-4 p-4 w-[300px] rounded-sm shadow-md transition hover:scale-105 cursor-pointer'
                    key={location?.position}
                  >
                    <img
                      className='w-[100%] h-[100px] object-cover rounded-sm shadow-md'
                      src={location?.thumbnail}
                    />
                    <h2 className='mt-2 font-semibold text-xl whitespace-nowrap overflow-clip overflow-ellipsis'>{location.title}</h2>
                    <p className='py-2 italic'>{location.address}</p>
                    <div className='mb-4 whitespace-nowrap overflow-clip overflow-ellipsis'>
                      <a
                        className='text-blue-700 font-medium'
                        href={location.website}
                      >
                        {location.website}
                      </a>
                    </div>
                    <div className='flex items-center justify-start'>
                      <p className='border px-2 py-1 mr-2 rounded-sm font-semibold'>⭐{location.rating}</p>
                      <p className='border px-2 py-1 rounded-sm font-semibold'>{location.reviews} Reviews</p>
                    </div>
                  </li>
                ))
              }
            </ul>
          </div>

        </div>
      </div>
    </>
  )
}

export default App
