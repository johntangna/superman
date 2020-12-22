# superman program
>含有拼音搜索
>elementui表格合并高亮行的解决方案
```
#定义类名
.row_class{
 background-color: #D1DDF1 !important;
}
#使用:span-method，合并行方法
spanMethod(
  {row,
  column,
  rowIndex,
  columnIndex}
  ){
  if(columnIndex % 2 == 0){
    if(flag){
      return {
        rowspan : row.rowspan//存放需要合并的行数
        colspan : 1
      }
    } else {
      return {
        rowspan : 0,
        colspan : 0
      }
    }
  }  
}
#核心思想为，处理完合并行函数后，在数据中添加index字段，使用二维数组，同一个类型的数据在同一类型的二维数组中
let sameRowArr = [],sIdx = 0
result.forEach((item,index)=>{
  item.index = index
  if(index == 0){
    sameRowArr.push([index])
  } else {
    if(item.version == result[index - 1].version){
      sameRowArr[sIdx].push(index)
    } else {
      sIdx++
      sameRowArr.push([index])
    }
  }
})
this.sameRowArr = sameRowArr
#使用:row-class-name
rowClassName( {row,rowIndex} ){
  let temp = this.curRowArr
  for(let item of temp){
    if(rowIndex == item){
      return 'row_class'
    }
  }
}
#使用@cell-mouse-enter和@cell-mouse-leave
cellMouseEnter(row,column,cell,event){
  this.sameRowArr.forEach((arr,i)=>{
    if(arr.includes(row.index)){
      this.curRowArr = arr
    }
  })
}
cellMouseLeave(row,column,cell,event){
  this.curRowArr = []
}
```
## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### vue-draggable-resizable Customize api
>第一版本
[github](https://github.com/mauricius/vue-draggable-resizable)

### vue-draggable-resizable-gorkys
>新版本,含有其他示例文档
[npm](https://www.npmjs.com/package/vue-draggable-resizable-gorkys)
[npm-chinese](chinese (https://tingtas.com/vue-draggable-resizable-gorkys/?path=/story/%E5%9F%BA%E6%9C%AC--%E5%9F%BA%E6%9C%AC%E7%BB%84%E4%BB%B6))
[scratch-desktop](https://github.com/LLK/scratch-desktop.git)
[scratch-gui](https://github.com/LLK/scratch-gui)
[Vue-tool](https://github.com/vuejs/awesome-vue)