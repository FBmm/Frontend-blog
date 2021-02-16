function Ajax(
  {
    method,
    url,
    params,
  },
  successFn,
  errFn
) {
  const xhr = new XMLHttpRequest()
  xhr.open(method, url)
  xhr.send(JSON.stringify(params))
  xhr.onreadystatechange = function () {
    console.log(xhr)
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        successFn && successFn(JSON.parse(xhr.response))
      } else {
        errFn && errFn(`${xhr.status} ${xhr.statusText}`)
      }
    }
  }
}