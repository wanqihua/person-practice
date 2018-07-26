/**
 * fetch 请求
 * @param url 请求的地址
 * @param data 请求的参数
 * @param type 默认get
 * @param method 默认fetch
 */
export default async (url = '', data = {}, type = 'GET', method = 'fetch') => {
  if (type.toUpperCase() === 'GET') {
    let dataStr = '';    // 数据拼接字符串
    Object.keys(data).forEach(key => {
      dataStr += key + '=' + data[key] + '&';
    });
    if (dataStr !== '') {
      dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));
      url = url + '?' + dataStr;
    }
  }

  if (window.fetch && method === 'fetch') {
    let requestConfig = {
      credentials: 'include',
      method: type,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      mode: 'cors',
      cache: 'force-cache'
    };
    if (type === 'POST') {
      Object.defineProperty(requestConfig, 'body', {
        value: JSON.stringify(data)
      })
    }
    try {
      const response = await fetch(url, requestConfig);
      const responseJson = await response.json();
      return responseJson
    } catch (error) {
      // throw new Error(error)   万奇华注释掉，以防没有数据时报错（200）
    }
  } else {
    return new Promise((resolve, reject) => {
      let requestObj = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject();
      let sendData = (type === 'POST') ? JSON.stringify(data) : '';
      requestObj.open(type, url, true);
      requestObj.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      requestObj.send(sendData);
      requestObj.onreadystatechange = () => {
        if (requestObj.readyState === 4) {
          if (requestObj.status === 200) {
            let obj = requestObj.response;
            if (typeof obj !== 'object') {
              obj = JSON.parse(obj);
            }
            resolve(obj);
          } else {
            reject(requestObj);
          }
        }
      }
    })
  }
}