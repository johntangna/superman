<template>
  <div id="div1" style="height: 500px; width: 500px; border: 1px solid red; position: relative;">
    <vdr :w="100" :h="100" @dragging="onDrag" @resizing="onResize" :parent="true" :isConflictCheck="true" :snap="true">
      <p>Hello! I'm a flexible component. You can drag me around and you can resize me.<br>
        X: {{ x }} / Y: {{ y }} - Width: {{ width }} / Height: {{ height }}</p>
    </vdr>
    <vdr 
    :w="100" 
    :h="100" 
    :parent="true" 
    :debug="false" 
    :min-width="200" 
    :min-height="200" 
    :isConflictCheck="true"
    :snap="true" 
    :snapTolerance="20" 
    :handles="['tm','bm','ml','mr']" 
    axis="x" 
    :grid="[1,1]" 
    :onDragStart="onDragStart"
    :onDrag="onDrag" 
    @dragging="onDragging" 
    @dragstop="onDragStop" 
    :onResizeStart="onResizeStart" 
    :onResize="onResize"
    @resizing="onResizing" 
    @resizestop="onResizeStop" 
    @activated="onActivated" 
    @deactivated="onDeactivated">
    </vdr>
  </div>
</template>

<script>
  import vdr from 'vue-draggable-resizable-gorkys'
  import 'vue-draggable-resizable-gorkys/dist/VueDraggableResizable.css'
  export default {
    components: {
      vdr
    },
    data: function() {
      return {
        width: 0,
        height: 0,
        x: 0,
        y: 0
      }
    },
    methods: {
      onResize: function(x, y, width, height) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
      },
      onDrag: function(x, y) {
        this.x = x
        this.y = y
      },
      onDragStart(ev) {

      },
      onDrag() {

      },
      onDragging() {

      },
      onDragStop() {

      },
      onResizeStart() {

      },
      onResize() {

      },
      onResizing() {

      },
      onResizeStop() {

      },
      onActivated(a) {

      },
      onDeactivated() {

      }
    },
    mounted() {
      let div1 = document.getElementById('div1');
      div1.addEventListener('click', function() {
        console.log('打印第一次') //成功打印
      })
      div1.addEventListener('click', function() {
        console.log('打印第二次') //成功打印
      })
    }
  }
</script>
