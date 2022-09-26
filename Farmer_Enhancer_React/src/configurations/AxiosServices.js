const axios = require('axios').default

export default class AxiosServices {
  post(url, data, isRequiredHeader = false, header) {
    console.log('Axios Url : ', url, ' Data : ', data, ' isRequiredHeader : ',isRequiredHeader, ' Header : ',header)
    return axios.post(url, data, isRequiredHeader && header)
  }

  Get(url, isRequiredHeader = false, header) {
    console.log('Axios Url : ', url,' isRequiredHeader : ',isRequiredHeader, ' Header : ',header)
    return axios.get(url, isRequiredHeader && header)
  }

  Delete(url, isRequiredHeader = false, header) {
    console.log('Axios Url : ', url,' isRequiredHeader : ',isRequiredHeader,' Header : ',header)
    return axios.delete(url, isRequiredHeader && header)
  }

  put(url, data, isRequiredHeader = false, header) {
    console.log('Axios Url : ', url, ' Data : ', data, ' isRequiredHeader : ',isRequiredHeader, ' Header : ',header)
    return axios.put(url, data, isRequiredHeader && header)
  }
  
  Patch(url, data, isRequiredHeader = false, header) {
    console.log('Axios Url : ', url, ' Data : ', data, ' isRequiredHeader : ',isRequiredHeader, ' Header : ',header)
    return axios.Patch(url, data, isRequiredHeader && header)
  }
}
