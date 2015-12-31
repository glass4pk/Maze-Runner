(function($){
/*
    @object config : {
        @Array maze:迷宫的结构数组，二维数组，每个项的值为一个对象，对象属性为up down left right 四个方向是否有墙壁，0为无，1为有
        @Number width : 迷宫的宽度，格子数
        @Number height : 迷宫的高度，各自数
        @Number size : 每个各自的长宽，因为必须是正方形，所以只长宽相等
        @Number curX : 当前所在点的X值
        @Number curY : 当前所在点的Y值
        
    }
*/

function Maze(box,config){
    if(config == undefined || config.maze == undefined){
        return false;
    }
    this.box = $(box);
    this.config = $.extend({},config||{});
    this.width = this.config.width || 20;//迷宫宽度
    this.height = this.config.height || 30;//迷宫高度
    this.size = this.config.size|| 17; //迷宫格子的长宽
    this.curX = 0; //当前所在格子X值
    this.curY = 0; //当前所在格子Y值
    this.finalX = this.width-1; //终点格子X值
    this.finalY = this.height-1; //终点格子Y值
    this.maze = this.config.maze;
    this.init();
}
$.extend(Maze.prototype,{
    init : function(){
        //初始化执行的函数
        this.createWall();

    },
    createWall : function(){
        //根据maze二维数组建立迷宫墙壁
        //console.log(this.maze);
        var mazeHtml = '<table id="mazeWall"><tbody>';
        for(var i=0; i<this.height;i++){
            mazeHtml += '<tr id="row_'+i+'" >'
            for(var j=0; j<this.width;j++){
                mazeHtml += '<td id="block_'+j+'_'+i+'"></td>'
            }
            mazeHtml += '</tr>';
        }
        mazeHtml += '</tbody></table>';
        this.box.append(mazeHtml);
        $("#mazeWall td").css({
            "width":this.size,
            "height":this.size
        });
        //设置墙壁
        for(var x=0;x<this.width;x++){
            for(var y=0;y<this.height;y++){
                $("#block_"+x+"_"+y).css({
                    "borderTop":(this.maze[x][y].top==1) ? "1px solid #000000" : "none",
                    "borderBottom":(this.maze[x][y].bottom==1) ? "1px solid #000000" : "none",
                    "borderLeft":(this.maze[x][y].left==1) ? "1px solid #000000" : "none",
                    "borderRight":(this.maze[x][y].right==1) ? "1px solid #000000" : "none"
                });
            }
        }

        //设置起点
        $("#mazeWall #block_"+this.curX+"_"+this.curY).css("backgroundColor","red");
        //设置终点
        $("#mazeWall #block_"+(this.width-1)+"_"+(this.height-1)).css("backgroundColor","green");
    },
    moveUp : function(){
        //往上走
        if(this.curY==0){
            return;
        }
        var curBlock = this.maze[this.curX][this.curY];
        var nextBlock = this.maze[this.curX][this.curY-1];
        if(this.curY-1>=0 && curBlock.top == 0 && nextBlock.bottom == 0){
            $("#mazeWall #block_"+this.curX+"_"+this.curY).css("backgroundColor","#ffffff");
            this.curY--;
        }
        $("#mazeWall #block_"+this.curX+"_"+this.curY).css("backgroundColor","#000000").css("border-radius","50%");
        this.checkFinal();
    },
    moveDown : function(){
        //往下走
        if(this.curY==this.height){
            return;
        }
        var curBlock = this.maze[this.curX][this.curY];
        var nextBlock = this.maze[this.curX][this.curY+1];
        if(this.curY+1<=this.height && curBlock.bottom == 0 && nextBlock.top == 0){
            $("#mazeWall #block_"+this.curX+"_"+this.curY).css("backgroundColor","#ffffff");
            this.curY++;
        }
        $("#mazeWall #block_"+this.curX+"_"+this.curY).css("backgroundColor","#000000").css("border-radius","50%");
        this.checkFinal();
    },
    moveLeft : function(){
        //往左走
        if(this.curX==0){
            return;
        }
        var curBlock = this.maze[this.curX][this.curY];
        var nextBlock = this.maze[this.curX-1][this.curY];
        if(this.curX-1>=0 && curBlock.left == 0 && nextBlock.right == 0){
            $("#mazeWall #block_"+this.curX+"_"+this.curY).css("backgroundColor","#ffffff");
            this.curX--;
        }
        $("#mazeWall #block_"+this.curX+"_"+this.curY).css("backgroundColor","#000000").css("border-radius","50%");
        this.checkFinal();
    },
    moveRight : function(){
        //往右走
        if(this.curX==this.width){
            return;
        }
        var curBlock = this.maze[this.curX][this.curY];
        var nextBlock = this.maze[this.curX+1][this.curY];
        if(this.curX+1<=this.width && curBlock.right == 0 && nextBlock.left == 0){
            $("#mazeWall #block_"+this.curX+"_"+this.curY).css("backgroundColor","#ffffff");
            this.curX++;
        }
        $("#mazeWall #block_"+this.curX+"_"+this.curY).css("backgroundColor","#000000").css("border-radius","50%");
        this.checkFinal();
    },
    checkFinal : function(){
        //检测是否到达终点
        console.log("cur:("+this.curX+","+this.curY+")");
        console.log("cur:("+this.finalX+","+this.finalY+")");
        if(this.curX == this.finalX && this.curY == this.finalY){
            alert("到达终点！")
        }
    }

});

/*
    这里对外提供调用接口，对外提供接口方法

*/
$.Maze = function(box,config){
    var maze = new Maze(box,config);
    return {//对外提供接口
        moveUp : function(){maze.moveUp();},
        moveDown : function(){maze.moveDown();},
        moveLeft : function(){maze.moveLeft();},
        moveRight : function(){maze.moveRight();}
    }
}
})(Zepto)