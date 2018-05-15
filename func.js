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

// 取树子节点
let data = [
  {
    "nodeId":-1,
    "parentNodeId":-2,
    "sort":-1,
    "tagColName":"目标人群",
    "tagId":-1,
    "tagName":"目标人群",
    "tagType":"-1",
    "tagValue":"121778",
    "tagValueDis":"目标人群",
    "totalCount":121778
  },{
    "nodeId":0,
    "parentNodeId":-1,
    "sort":0,
    "tagColName":"civil_servt_flag",
    "tagId":7,
    "tagName":"是否公务员",
    "tagType":"2",
    "tagValue":"1",
    "tagValueDis":"是",
    "totalCount":10125
    },{
      "nodeId":1,
      "parentNodeId":0,
      "sort":1,
      "tagColName":"user_age",
      "tagId":30,
      "tagName":"年龄",
      "tagType":"7",
      "tagValue":["ge","30"],
      "tagValueDis":"大于等于30",
      "totalCount":2137
      },{
        "nodeId":2,
        "parentNodeId":1,
        "sort":2,
        "tagColName":"user_gender",
        "tagId":32,
        "tagName":"性别",
        "tagType":"2",
        "tagValue":"0",
        "tagValueDis":"0",
        "totalCount":0
      },{
        "nodeId":3,
        "parentNodeId":1,
        "sort":2,
        "tagColName":"user_gender",
        "tagId":32,
        "tagName":"性别",
        "tagType":"2",
        "tagValue":"1",
        "tagValueDis":"1",
        "totalCount":1025
      },{
        "nodeId":4,
        "parentNodeId":1,
        "sort":2,
        "tagColName":"user_gender",
        "tagId":32,
        "tagName":"性别",
        "tagType":"2",
        "tagValue":"2",
        "tagValueDis":"2",
        "totalCount":1112
      },{
        "nodeId":5,
        "parentNodeId":2,
        "sort":3,
        "tagColName":"acad_degree",
        "tagId":37,
        "tagName":"学位",
        "tagType":"1",
        "tagValue":"专科",
        "tagValueDis":"专科",
        "totalCount":0
      },{
        "nodeId":8,
        "parentNodeId":2,
        "sort":3,
        "tagColName":"acad_degree",
        "tagId":37,
        "tagName":"学位",
        "tagType":"1",
        "tagValue":"硕士",
        "tagValueDis":"硕士",
        "totalCount":0
      },{
        "nodeId":6,
        "parentNodeId":3,
        "sort":3,
        "tagColName":"acad_degree",
        "tagId":37,
        "tagName":"学位",
        "tagType":"1",
        "tagValue":"专科",
        "tagValueDis":"专科",
        "totalCount":14
      },{
        "nodeId":9,
        "parentNodeId":3,
        "sort":3,
        "tagColName":"acad_degree",
        "tagId":37,
        "tagName":"学位",
        "tagType":"1",
        "tagValue":"硕士",
        "tagValueDis":"硕士",
        "totalCount":99
      },{
        "nodeId":7,
        "parentNodeId":4,
        "sort":3,
        "tagColName":"acad_degree",
        "tagId":37,
        "tagName":"学位",
        "tagType":"1",
        "tagValue":"专科",
        "tagValueDis":"专科",
        "totalCount":18
      },{
        "nodeId":10,
        "parentNodeId":4,
        "sort":3,
        "tagColName":"acad_degree",
        "tagId":37,
        "tagName":"学位",
        "tagType":"1",
        "tagValue":"硕士",
        "tagValueDis":"硕士",
        "totalCount":128
      }];
// 最终数据
let finalData = [
  {
    "目标人群": '目标人群',
    "civil_servt_flag": '是',
    "user_age": "大于等于30",
    "user_gender": 1,
    "acad_degree": "博士",
    "totalCount": 123
  }
]
let cols = [];
let dataSource = [];
let isFirst = false;
function transTree(data, pid, tag) {
  if(hasChildren(data,pid)){
    let children = getChildren(data, pid);
    for(let i=0;i<children.length;i++){
      if(children[i].parentNodeId === pid) {
        if(!isFirst) {
          cols.push({ title: children[i].tagName, dataIndex: children[i].tagColName, key: children[i].tagColName });
        }
      }
      let child = children[i];
      let localTag = {[child.tagColName]:child.tagValueDis,...tag}
      transTree(data,child.nodeId,localTag);
    }
  } else {
    let child = getItem(data, pid)
    isFirst = true;
    dataSource.push({...child,...tag})
  }
}
function getItem(data,id){
for(let i =0 ;i <data.length;i++){
  if(data[i].nodeId === id){
    return data[i];
  }
}
}
function hasChildren(data,id){
for(let i =0 ;i <data.length;i++){
  if(data[i].parentNodeId === id){
    return true;
  }
}
return false;
}

function getChildren(data,id){
let result = [];
for(let i = 0 ;i < data.length; i++){
  if(data[i].parentNodeId === id){
    result.push(data[i]);
  }
}
return result;
}
transTree(data, -2, {});
// transTree(data1, -2, {});
cols.push({ title: "目标人数", dataIndex: "totalCount", key: "totalCount" })
console.log(cols, "cols");
console.log(dataSource, "----dataSource");

// 数组扁平化（递归实现）
function flattenDepth(array, depth=1) {
  let result = [];
  array.forEach (item => {
    let d = depth;
    if(Array.isArray(item) && d > 0){
      result.push(...(flattenDepth(item, --d)))
    } else {
      result.push(item);
    }
  })
  return result;
}
console.log(flattenDepth([1,[2,[3,[4]],5]]))
console.log(flattenDepth([1,[2,[3,[4]],5]],2))
console.log(flattenDepth([1,[2,[3,[4]],5]],3))

// 柯里化
function curry(func) {
  var l = func.length;
  return function curried() {
    var args = [].slice.call(arguments);
    if(args.length < l) {
      return function() {
        var argsInner = [].slice.call(arguments)
        return curried.apply(this, args.concat(argsInner))
      }
    } else {
      return func.apply(this, args)
    }
  }
}

var f = function(a,b,c) {
  return console.log([a,b,c])
}
var curried = curry(f);
curried(1)(2)(3)

/**
 * 节流和防抖
函数节流和函数防抖都是对大量频繁调用代码的一种优化。

防抖
不管你触发了多少次，都等到你最后触发后过一段你指定的时间才触发。简单地说，即函数在特定的时间内不被再调用后执行。

实际应用场景
监听窗口大小重绘的操作。
在用户拖拽窗口时，一直在改变窗口的大小，如果我们在 resize 事件中进行一些操作，消耗将是巨大的。而且大多数可能是无意义的执行，因为用户还处于拖拽的过程中。
可以使用 函数防抖 来优化相关的处理。
 */

// 普通方案
window.addEventListener('resize', () => {
  console.log('trigger');
})

//函数防抖方案
let debounceIdentify = 0;
window.addEventListener('resize', () => {
  debounceIdentify && clearTimeout(debounceIdentity)
  debounceIdentity = setTimeout(() => {
    console.log('trigger')
  }, 300)
})
/**
 * 我们在 resize 事件中添加了一个 300 ms 的延迟执行逻辑。
并且每次事件触发时，都会重新计时，这样保证，函数的执行肯定是在距离上次 resize 事件被触发的 300 ms 后。
两次 resize 事件间隔小于 300 ms 的都被忽略了，这样就会节省很多无意义的事件触发。

输入框的联想

几乎所有的搜索引擎都会对你输入的文字进行预判，并在下方推荐相关的结果。
但是这个联想意味着我们需要将当前用户所输入的文本传递到后端，并获取返回数据，展示在页面中。
如果遇到打字速度快的人，在一小段时间内，会连续发送大量的 ajax 请求到后端。并且当前的数据返回过来后，其实已经失去了展示的意义，因为用户可能从 you 输入到了 young ，这两个单词的相关结果肯定不一样的。
所以我们就在监听用户输入的事件那里做函数防抖处理，在 XXX 秒后发送联想搜索的 ajax 请求。
 */

/**
 * 函数防抖的实现
 * @param  {Function} func   要实现函数节流的原函数
 * @param  {Number}   delay  结束的延迟时间
 * @return {Function}        添加节流功能的函数
 */

function debounce (func, delay) {
  let debounceIdentify = 0
  return (...args) => {
    debounceIdentify && clearTimeout(debounceIdentify)
    debounceIdentify = setTimeout(() => {
      debounceIdentify = 0
      func.apply(this, args)
    }, delay)
  }
}
// 基本版的：

function debounce(func, wait){
   var timer;
   return function(){
     var context = this;
     var args = arguments;
     clearTimeout(timer);
     timer = setTimeout(function(){
       func.apply(context, args)
     }, wait)
   }
}
function debounce(func, wait, leading, trailing) {
  var timer, lastCall = 0, flag = true
  return function() {
    var context = this
    var args = arguments
    var now = + new Date()
    if (now - lastCall < wait) {
      flag = false
      lastCall = now
    } else {
      flag = true
    }
    if (leading && flag) {
      lastCall = now
      return func.apply(context, args)
    }
    if (trailing) {
      clearTimeout(timer)
      timer = setTimeout(function() {
        flag = true
        func.apply(context, args)
      }, wait)
    }
  }
}
/**
 * 类似函数防抖操作
在一些与用户的交互上，比如提交表单后，一般都会显示一个loading框来提示用户，他提交的表单正在处理中。
但是发送表单请求后就显示loading是一件很不友好的事情，因为请求可能在几十毫秒内就会得到响应。
这样在用户看来就是页面中闪过一团黑色，所以可以在提交表单后添加一个延迟函数，在XXX秒后再显示loading框。
这样在快速响应的场景下，用户是不会看到一闪而过的loading框，当然，一定要记得在接收到数据后去clearTimeout.
 */

let identify = setTimeout(showLoadingModal, 500)
fetch('XXX').then(res => {
  // doing something

  // clear timer
  clearTimeout(identify)
})
/**
 * 节流
不管怎么触发，都是按照指定的时间间隔来执行。简单地说，就是限制函数在一定时间内调用的次数。

在程序中，可以通过限制函数的调用频率，来抑制资源的消耗。

需要实现一个元素拖拽的效果，可以在每次 move 事件中进行重绘 DOM，但是这样做，程序的开销是非常大的。
所以这里用到函数节流的方法，来减少重绘的次数。
 */
//普通方案
$dragable.addEventListener('mousemove', () => {
  console.log('trigger')
})

// 函数节流的实现方案
let throttleIndentify = 0;
$dragable.addEventListener('mousemove', () => {
  if(throttleIndentify) return;
  throttleIndentify = setTimeout(() => throttleIdentify = 0, 500);
  console.log('trigger');
})
/**
 * 这样做的效果是，在拖拽的过程中，能保证 500 ms 内，只能重绘一次 DOM。 在同时监听了 mousemove 后，两者最终的效果是一致的，但是在拖拽的过程中，函数节流 版触发事件的次数会减少很多，资源相应地会消耗更少。
 */

//通用的函数节流实现
// ES6 版
function throttle (func, interval) {
  let identify = 0;
  return (...args) => {
    if (identify) return;
    identify = setTimeout(() => identify = 0, interval);
    func.apply(this, args)
  }
}
function throttle(func, wait){
  var timer;
  return function() {
    var context = this;
    var args = arguments;
    if(!timer) {
      timer = setTimeout(function() {
        timer = null;
        func.apply(context, args)
      },wait)
    }
  }
}
function throttle(func, wait, leading, trailing) {
  var timer, lastCall = 0, flag = true
  return function() {
    var context = this
    var args = arguments
    var now = + new Date()
    flag = now - lastCall > wait
    if (leading && flag) {
      lastCall = now
      return func.apply(context, args)
    }
    if (!timer && trailing && !(flag && leading)) {
      timer = setTimeout(function () {
        timer = null
        lastCall = + new Date()
        func.apply(context, args)
      }, wait)
    } else {
      lastCall = now
    }
  }
}

/**
 * 类似函数节流的操作
平时开发中经常会做的 ajax 请求获取数据，这里可以用到类似函数节流的操作。
在我们发送一个请求到后台时，当返回的数据还没有接收到，我们会添加一个标识，来表明当前有一个请求正在被处理，如果这时用户再触发 ajax 请求，则会直接跳过本次函数的执行。
同样的还有滑动加载更多数据，如果不添加类似的限制，可能会导致发送更多条请求，渲染重复数据。

 */


 /**
  * 对象拷贝
对象拷贝分为深拷贝和浅拷贝
  */

JSON.parse(JSON.stringify(obj))
function clone(value, isDeep) {
  if(value === null) return null;
  if(typeof value !== 'object') return value
  if(Array.isArray(value)) {
    if(isDeep) {
      return value.map(item => clone(item, true))
    }
    return [].concat(value)
  } else {
    if(isDeep) {
      var obj = {};
      Object.keys(value).forEach(item => {
        obj[item] = clone(value[item], true)
      })
      return obj;
    }
    return {...value}
  }
}

var objects = { c: { 'a': 1, e: [1, {f: 2}] }, d: { 'b': 2 } }
var shallow = clone(objects, true)
console.log(shallow.c.e[1]) // { f: 2 }
console.log(shallow.c === objects.c) // false
console.log(shallow.d === objects.d) // false
console.log(shallow === objects) // false

//  数组转换成树
let array = [
  {
    "colName":"",
    "colValue":"",
    "gmtCreate":1516263195000,
    "id":1,
    "name":"客中",
    "parId":0,
    "permissionCode":"datamind_kz",
    "queryType":1
  },{
    "colName":"business_name",
    "colValue":"安全线",
    "gmtCreate":1516263199000,
    "id":2,
    "name":"安全线",
    "parId":1,
    "permissionCode":"datamind_aq",
    "queryType":1
  },{
    "colName":"bpo_flag",
    "colValue":"自营",
    "gmtCreate":1523619457000,
    "id":3,
    "name":"自营",
    "parId":32,
    "permissionCode":"datamind_aq",
    "queryType":1
  },{"colName":"bpo_flag","colValue":"外包","gmtCreate":1523619540000,"id":4,"name":"外包","parId":32,"permissionCode":"datamind_aq","queryType":1},{"colName":"business_name","colValue":"保险理赔","gmtCreate":1516263212000,"id":5,"name":"保险理赔","parId":1,"permissionCode":"datamind_bxlp","queryType":1},{"colName":"bpo_flag","colValue":"自营","gmtCreate":1523619551000,"id":6,"name":"自营","parId":53,"permissionCode":"datamind_bxlp","queryType":1},{"colName":"bpo_flag","colValue":"外包","gmtCreate":1523619554000,"id":7,"name":"外包","parId":53,"permissionCode":"datamind_bxlp","queryType":1},{"colName":"business_name","colValue":"大网商线","gmtCreate":1516263220000,"id":8,"name":"大网商线","parId":1,"permissionCode":"datamind_dws","queryType":1},{"colName":"bpo_flag","colValue":"自营","gmtCreate":1523619560000,"id":9,"name":"自营","parId":48,"permissionCode":"datamind_dws","queryType":1},{"colName":"bpo_flag","colValue":"外包","gmtCreate":1523619634000,"id":10,"name":"外包","parId":48,"permissionCode":"datamind_dws","queryType":1},{"colName":"business_name","colValue":"国际","gmtCreate":1516263230000,"id":11,"name":"国际","parId":1,"permissionCode":"datamind_gj","queryType":1},{"colName":"bpo_flag","colValue":"自营","gmtCreate":1523619639000,"id":12,"name":"自营","parId":44,"permissionCode":"datamind_gj","queryType":1},{"colName":"bpo_flag","colValue":"外包","gmtCreate":1523619645000,"id":13,"name":"外包","parId":44,"permissionCode":"datamind_gj","queryType":1},{"colName":"business_name","colValue":"理财线","gmtCreate":1516266647000,"id":14,"name":"理财线","parId":1,"permissionCode":"datamind_lc","queryType":1},{"colName":"bpo_flag","colValue":"外包","gmtCreate":1523619651000,"id":16,"name":"外包","parId":39,"permissionCode":"datamind_lc","queryType":1},{"colName":"bpo_flag","colValue":"自营","gmtCreate":1523619654000,"id":17,"name":"自营","parId":39,"permissionCode":"datamind_lc","queryType":1},{"colName":"business_name","colValue":"支付宝线","gmtCreate":1516266692000,"id":18,"name":"支付宝线","parId":1,"permissionCode":"datamind_zfb","queryType":1},{"colName":"bpo_flag","colValue":"自营","gmtCreate":1523619659000,"id":20,"name":"自营","parId":34,"permissionCode":"datamind_zfb","queryType":1},{"colName":"bpo_flag","colValue":"外包","gmtCreate":1523619663000,"id":21,"name":"外包","parId":34,"permissionCode":"datamind_zfb","queryType":1},{"colName":"business_name","colValue":"VIP","gmtCreate":1516266703000,"id":22,"name":"VIP","parId":1,"permissionCode":"datamind_vip","queryType":1},{"colName":"bpo_flag","colValue":"自营","gmtCreate":1523619666000,"id":23,"name":"自营","parId":57,"permissionCode":"datamind_vip","queryType":1},{"colName":"business_name","colValue":"芝麻信用","gmtCreate":1516266708000,"id":26,"name":"芝麻信用","parId":1,"permissionCode":"datamind_zmxy","queryType":1},{"colName":"bpo_flag","colValue":"自营","gmtCreate":1523619672000,"id":27,"name":"自营","parId":33,"permissionCode":"datamind_zmxy","queryType":1},{"colName":"business_name","colValue":"中后台","gmtCreate":1516266712000,"id":28,"name":"中后台","parId":1,"permissionCode":"datamind_zht","queryType":1},{"colName":"business_name","colValue":"自助","gmtCreate":1518166570000,"id":30,"name":"自助","parId":1,"permissionCode":"datamind_zz","queryType":1},{"colName":"business_name","colValue":"IVR","gmtCreate":1518166602000,"id":31,"name":"IVR","parId":1,"permissionCode":"datamind_ivr","queryType":1},{"colName":"channel","colValue":"热线","gmtCreate":1520964968000,"id":32,"name":"热线","parId":2,"permissionCode":"datamind_aq","queryType":1},{"colName":"channel","colValue":"热线","gmtCreate":1520964968000,"id":33,"name":"热线","parId":26,"permissionCode":"datamind_zmxy","queryType":1},{"colName":"channel","colValue":"热线","gmtCreate":1520964968000,"id":34,"name":"热线","parId":18,"permissionCode":"datamind_zfb","queryType":1},{"colName":"channel","colValue":"在线","gmtCreate":1520964968000,"id":35,"name":"在线","parId":18,"permissionCode":"datamind_zfb","queryType":1},{"colName":"bpo_flag","colValue":"云服务","gmtCreate":1523619676000,"id":36,"name":"云服务","parId":35,"permissionCode":"datamind_zfb","queryType":1},{"colName":"bpo_flag","colValue":"自营","gmtCreate":1523619681000,"id":37,"name":"自营","parId":35,"permissionCode":"datamind_zfb","queryType":1},{"colName":"bpo_flag","colValue":"外包","gmtCreate":1523619684000,"id":38,"name":"外包","parId":35,"permissionCode":"datamind_zfb","queryType":1},{"colName":"channel","colValue":"热线","gmtCreate":1520964968000,"id":39,"name":"热线","parId":14,"permissionCode":"datamind_lc","queryType":1},{"colName":"channel","colValue":"在线","gmtCreate":1520964968000,"id":40,"name":"在线","parId":14,"permissionCode":"datamind_lc","queryType":1},{"colName":"bpo_flag","colValue":"云服务","gmtCreate":1523619695000,"id":41,"name":"云服务","parId":40,"permissionCode":"datamind_lc","queryType":1},{"colName":"bpo_flag","colValue":"外包","gmtCreate":1523619699000,"id":42,"name":"外包","parId":40,"permissionCode":"datamind_lc","queryType":1},{"colName":"bpo_flag","colValue":"自营","gmtCreate":1523619703000,"id":43,"name":"自营","parId":40,"permissionCode":"datamind_lc","queryType":1},{"colName":"channel","colValue":"热线","gmtCreate":1520964968000,"id":44,"name":"热线","parId":11,"permissionCode":"datamind_gj","queryType":1},{"colName":"channel","colValue":"在线","gmtCreate":1520964968000,"id":45,"name":"在线","parId":11,"permissionCode":"datamind_gj","queryType":1},{"colName":"bpo_flag","colValue":"自营","gmtCreate":1523619707000,"id":46,"name":"自营","parId":45,"permissionCode":"datamind_gj","queryType":1},{"colName":"bpo_flag","colValue":"外包","gmtCreate":1523619711000,"id":47,"name":"外包","parId":45,"permissionCode":"datamind_gj","queryType":1},{"colName":"channel","colValue":"热线","gmtCreate":1520964968000,"id":48,"name":"热线","parId":8,"permissionCode":"datamind_dws","queryType":1},{"colName":"channel","colValue":"在线","gmtCreate":1520964968000,"id":49,"name":"在线","parId":8,"permissionCode":"datamind_dws","queryType":1},{"colName":"bpo_flag","colValue":"自营","gmtCreate":1523619716000,"id":50,"name":"自营","parId":49,"permissionCode":"datamind_dws","queryType":1},{"colName":"bpo_flag","colValue":"外包","gmtCreate":1523619721000,"id":51,"name":"外包","parId":49,"permissionCode":"datamind_dws","queryType":1},{"colName":"bpo_flag","colValue":"云服务","gmtCreate":1523619725000,"id":52,"name":"云服务","parId":49,"permissionCode":"datamind_dws","queryType":1},{"colName":"channel","colValue":"热线","gmtCreate":1520964968000,"id":53,"name":"热线","parId":5,"permissionCode":"datamind_bxlp","queryType":1},{"colName":"channel","colValue":"在线","gmtCreate":1520964968000,"id":54,"name":"在线","parId":5,"permissionCode":"datamind_bxlp","queryType":1},{"colName":"bpo_flag","colValue":"自营","gmtCreate":1523619730000,"id":55,"name":"自营","parId":54,"permissionCode":"datamind_bxlp","queryType":1},{"colName":"bpo_flag","colValue":"外包","gmtCreate":1523619735000,"id":56,"name":"外包","parId":54,"permissionCode":"datamind_bxlp","queryType":1},{"colName":"channel","colValue":"热线","gmtCreate":1520964969000,"id":57,"name":"热线","parId":22,"permissionCode":"datamind_vip","queryType":1},{"colName":"channel","colValue":"在线","gmtCreate":1520964969000,"id":58,"name":"在线","parId":22,"permissionCode":"datamind_vip","queryType":1},{"colName":"bpo_flag","colValue":"自营","gmtCreate":1523619738000,"id":59,"name":"自营","parId":58,"permissionCode":"datamind_vip","queryType":1},{"colName":"channel","colValue":"MYPA","gmtCreate":1523618368000,"id":60,"name":"自助","parId":28,"permissionCode":"datamind_zht","queryType":1},{"colName":"channel","colValue":"IVR","gmtCreate":1523618368000,"id":61,"name":"IVR","parId":28,"permissionCode":"datamind_zht","queryType":1}];

  const translateTree = (data) => {
    // const result = [];
    let tagTree = {};
    data.map((tag) => {
      tagTree[tag.id] = { ...tag, sub: [] };
      return null;
    });
    const getAarry = (json) => {
      const thisJson = {};
      for (const key in json) {
        if (Object.hasOwnProperty.bind(tagTree, key)) {
          const tag = json[key];
          if (tag.parId && json[tag.parId]) {
            if (!thisJson[tag.parId]) {
              thisJson[tag.parId] = json[tag.parId];
            }
            thisJson[tag.parId].sub.push(tag);
          }
        }
      }
      return json;
    };
    tagTree = getAarry(tagTree);
    const tagList = [];
    for (const key in tagTree) {
      if (Object.hasOwnProperty.bind(tagTree, key)) {
        const tag = tagTree[key];
        if (!tagTree[tag.parId]) {
          tagList.push(tag);
        }
      }
    }
    return tagList;
  };


  let treeData = translateTree(array);

  console.log(treeData);

(function test(){
  const translate = (values) => {
    const list = [];
    const keys = [];
    const obj = {};
    for (const [key, value] of Object.entries(values)) {
      if (key !== 'type' && Array.isArray(value)) {
        keys.push(key);
      } else {
        obj[key] = value;
      }
    }
    let flag = false;
    keys.length && keys.forEach((item) => {
      const temp = values[item];
      let index = 0;
      temp.forEach((subItem) => {
        if (flag) {
          const tmp = list[index];
          tmp[item] = subItem;
          index++;
        } else {
          list.push({ [item]: subItem });
        }
      });
      flag = true;
    });
    obj.list = list;
    return obj;
  }

  const values = {
    a: "test",
    b: {
      b1: "children b1",
      b2: "children b2"
    },
    c1: ["11", "22", "33", "44"],
    c2: ["11", "22", "33", "44"],
    c3: ["11", "22", "33", "44"],
    c4: ["11", "22", "33", "44"]
  }

  let translateData = translate(values);
  console.log(translateData, "test translateData")
})()

