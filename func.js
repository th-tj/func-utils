// 数组去重：

let arr = [2,1,3,2,4,4,5,3,6,8,7,9,7,8,0,0];

// 通过Set方式
function uniqArrayBySet(arr) {
  return [...new Set(arr)];
}

// 通过Set和Array.from
function uniqArrayFrom(arr) {
  return Array.from(new Set(arr));
}

// test
let uniqArr1 = uniqArrayBySet(arr);
let uniqArr2 = uniqArrayFrom(arr);
console.log(uniqArr1);
console.log(uniqArr2);
