import type { NextPage } from 'next'

const Home: NextPage = () => {
  return (
    <div className="">
      <input type="text" />
      <select name="region" id="region">
        <option value="None">Select a region</option>
        <option value="NA">North America</option>
      </select>
    </div>
  )
}

export default Home
