import axios from 'axios'
export async function dataJson() {
  try {
    const response = await axios.get('/data.json')
    return response.data
  }
  catch (error) {
    console.error(error)
  }
}
