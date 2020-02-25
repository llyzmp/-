// 1.父元素,数据
// 2.渲染
// 3.监听事件

var note = {
    // 存放获取到的数据
    noteList:[],
    // 入口函数
    init:function(options){
        this.initData(options);
        this.render();
        this.handle();
    },
    // 初始化数据
    initData:function(options) {
        // 保存this
        var self = this;
        // 得到父级dom元素,并把dom元素挂载到this上,以供其它函数里边使用
        this.el = options.el;
        // 获取数据
        getData('noteList',function(res){
            // console.log(res)
            // 把数据放在全局中使用,此时this指向那个window
            self.noteList = res
        }) 
       
    },
    // 渲染
    render:function(){
        // 调用渲染每一列函数执行,把dom元素渲染出来
        this.el.innerHTML = this.renderNoteColumn()+'<div class="more">查看更多</div>' ;
        // 渲染数据
        this.renderNote(this.noteList)
    },
    // 专门渲染每一列数据
    renderNoteColumn:function(){
        // 用来拼接div
        var template = '';
        for(var i = 0;i < 5 ; i++){
            template += '<div class="note-column"></div>'
        };
        // 把拼接好的字符串返回
        return template;
    },
     // 渲染数据函数
     renderNote:function(noteList){
        // //  获取到所有数据
        // var noteList = this.noteList;
        // 数据长度
        var length = noteList.length;
        // 获取到每一列dom元素,为了找到最短的那一列,往里边添加数据
        var oColumn = this.el.getElementsByClassName('note-column')

        for(var i = 0 ; i < length ; i++){
            // 循环获取每一个对象数据
            var note = noteList[i]
            // 创建一个div元素
            var oNote = document.createElement('div');
            // 调用获取最短那列的函数,获取最短的索引值
            var minIndex = this.getMinColumn();
            // 找到最短的那一列
            var oMinColumn = oColumn[minIndex];
            // 把新创建的空div添加到最短的那一列
            oMinColumn.append(oNote);
            // 把div中填充渲染的数据,调用noteCmp组件,渲染数据,传递每一个对象数据
            oNote.outerHTML = this.noteCmp(note)
        }
    },
    // note组件
    noteCmp:function(note){
        var template = `
            <div class="note">
                <div class="note-info">
                    <div class="note-img">
                        <img src="${note.cover.url}" alt="">
                       
                        ${note.type === 'video' ? '<i class="video"></i>' : ''}
                    </div>
                    <div class="info">
                        ${note.title}
                    </div>
                </div>
                <div class="note-append">
                    <div class="user">
                        <div class="avatar">
                            <img src="${note.user.image}" alt="">  
                            ${note.user.officialVerified ? ' <i class="verified"></i>':''}
                        </div>
                        <div class="name">${note.user.nickname}</div>
                    </div>
                    <div class="like">
                        <i class="heart ${note.isLiked ? 'heart--red':''}"></i>
                        <span class="likes">${note.likes}</span>
                    </div>

                </div>
            </div>
        `
        return template
    },
    // 获取最短的那一列函数
    getMinColumn:function(){
        //获取到所有的列元素
        var oColumn = this.el.getElementsByClassName('note-column')
        var length = oColumn.length;
        //假设定义第一列高度
        var minHeight = oColumn[0].offsetHeight;
        //最短的那一列的索引
        var minIndex = 0;
        // 循环找到最短的那一列
        for(var i = 0 ; i < length ; i++){
            // 每一列的高度
            var columnHeight = oColumn[i].offsetHeight;
            // 对比找到最短的那一个
            if(columnHeight < minHeight){
                //把最短的赋值给minHeight
                minHeight = columnHeight;
                // 最短那列的索引记录下来
                minIndex = i;
            }
        }
        //把索引返回出去
        return minIndex
    },

    // 监听事件函数
    handle:function(){
        var self = this;
        // 点击父元素,使用事件委托
        this.el.onclick = function(e){
            var dom = e.target;
            // 查看类名列表中是否包含more类名
            var isMore = dom.classList.contains('more');
            if(isMore){
                // 执行函数
                self.handleMore();
            }
        }
    },
    // 点击查看更多事件
    handleMore:function() {
        var self = this;
        getData('noteList',function(res) {
            self.renderNote(res)
        })
    }
}
