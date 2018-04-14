<template>
  <div id="app">
    <el-container>

      <el-aside width="300px">
        
      </el-aside>
      
      <el-container>
        <el-header height="80px">
          NoToDo - 不仅待办<br>
          <el-input
            v-on:change="inputChange" 
            placeholder="请输入待办，用//分割简述和具体！(例如 我要做完这个TODO拓展:这个拓展还差这个功能啦，那个功能啦BalaBala！)" 
            focus
            style="padding: 10px 0px;"
          ></el-input>
        </el-header>
        <el-main>
          <el-card class="box-card">
            <div slot="header">
              <span style="font-size:18px;">待办 ({{ todoList.length }})</span>
              <i style="float: right;" class="el-icon-delete" v-on:click="dialogVisible = true"></i>
            </div>
            <el-collapse v-model="activeName" accordion >
              <el-collapse-item v-for="(todo, index) in todoList" :key="todo[0]" v-if="!todo[1]">
                <template slot="title">
                  {{ todo[2] }}
                </template>
                <template slot="name">
                  {{ todo[0] }}
                </template>
                <div>{{ todo[3] }}</div>
                <el-row style="font-size: 28px; letter-spacing: 4px;">
                  <i type="primary" class="el-icon-edit" ></i>
                  <i type="info" class="el-icon-message" ></i>
                  <i type="warning" class="el-icon-star-off" ></i>
                  <i type="success" class="el-icon-check"  v-on:click="finished(index,$event)" ></i>
                </el-row>
              </el-collapse-item>
            </el-collapse>
            
          </el-card>
        </el-main>      
      </el-container>
    </el-container>
    
  <el-dialog
    title="警告！"
    :visible.sync="dialogVisible"
    width="30%"
    :before-close="handleClose">
    <span>清空所有待办？</span>
    <span slot="footer" class="dialog-footer" style="letter-spacing:20px;">
      <i @click="dialogVisible = false">取消</i>
      <i @click="nova" style="color: red;">确定</i>
    </span>
  </el-dialog>
  
  </div>

</template>

<script>
export default {
  data() {
    return {
      inputValue: "",
      tableData: [
        { text: '学习 JavaScript' },
        { text: '学习 Vue' },
        { text: '整个牛项目' }
      ],
      todoList: [],
      dialogVisible: false
    }
  },
  mounted(){
    var that = this
    chrome.storage.sync.get(['todo'], function (result) {
      try {
        var todoList = JSON.parse(result.todo)  
      } catch (error) {
        console.log(error)
        var todoList = []
      }
      
      // console.log(todoList)

      if (typeof todoList != 'object') {
        var todoList = []
      }

      that.todoList = todoList
    });
  },
  methods: {
    // example: [ [1,  true,  todowhat, howtodo], ... ]
    // format:  [ [id, done?, text    , desc,], ... ]
    // focuz on matter, regardless of time
    inputChange (value) {
      var that = this
      chrome.storage.sync.get(['todo'], function(result){
        // console.log(result.todo)

        try {
          var todoList = JSON.parse(result.todo)  
        } catch (error) {
          console.log(error)
          var todoList = []
        }

        if (typeof todoList != 'object') {
          var todoList = []
        }

        let textArr = value.split("//")
        if (textArr.length == 1){
          textArr.push("")
        }
        
        let newTodo = [todoList.length, false, textArr[0], textArr[1]]
        todoList.push(newTodo)
        var jsonTodoList = JSON.stringify(todoList)
        
        chrome.storage.sync.set({'todo': jsonTodoList}, () => {
          // 通知保存完成。
          that.$notify({
            title: '添加成功',
            type: 'success',
            message: '务必记得完成新的待办哦！完成后勾一下～',
            duration: 2000
          })
          that.todoList = todoList
        });

      })

    },
    finished (index, e) {
      // console.log(e.target)
      var that = this
      chrome.storage.sync.get(['todo'], function(result){
        // console.log(result.todo)

        try {
          var todoList = JSON.parse(result.todo)  
        } catch (error) {
          console.log(error)
          var todoList = []
        }
        
        
        todoList.splice(index, 1)
        var jsonTodoList = JSON.stringify(todoList)
        
        chrome.storage.sync.set({'todo': jsonTodoList}, () => {
          // 通知保存完成。
          that.$notify({
            title: '完成成功',
            type: 'success',
            message: '恭喜BalaBala',
            duration: 2000
          })
          that.todoList = todoList
        });

      })
    },
    nova () {
      let that = this
      that.todoList = []
      chrome.storage.sync.set({'todo': ''}, () => {})
      that.dialogVisible = false
    }
  },
}
</script>

<style>
#app {
  font-size: 24px;
  /* font-family: Helvetica, sans-serif; */
  text-align: center;
}

#aside-card {
  min-height: 400px;
  font-size: 18px;
}

.el-collapse-item__arrow {
  font-size: 30px;
  line-height: 56px;
}

.el-collapse-item__header {
  font-size: 20px;
  line-height: 56px;
  height: 56px;
}
</style>
