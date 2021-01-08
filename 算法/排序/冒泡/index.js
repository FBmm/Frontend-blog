const list = [10, 8, 4, 6, 7, 9, 1]

function bubbleSort(list) {
	for(let i = 0; i < list.length; i++) {
    for(let j= i+1; j < list.length; j++) {
    	if (list[i] < list[j]) {
      	const t = list[i]
        list[i] = list[j]
        list[j] = t
      }
    }
  }
  return list
}

console.log(bubbleSort(list))