//首先，看完游戏视频后可以看出：
//1.屏幕内最多同时出现3只虫子，因此我们只需要三个实例
//2.虫子的速度是不一样的，我们可以设三个不同的速度
//3.虫子与人物碰撞时，虫子头部已经到达人物所在方块的一般，这也将作为我们碰撞检测的条件
//

//canvas宽高分别为505和606，每行为83，每列为101。因此，设置初始的x坐标，可以直接设置为101的倍数；
//但是初始y就不好设置了。
//通过查看原始图片，发现水的图片上部有50px的透明部分，而虫子上部存在78px的透明部分，因此将虫子的
//初始y值设置为-28，虫子上部刚好与水的上部持平;将其调整为-23时，虫子位置比较合适。由于虫子在第2,3
//，4列，因此虫子初始的y值为[-23+83，-23+83*2，-23+83*3]；
//人物的y值和虫子的类似，设置为-23+83*n（n=0,1,2,3,4,5）;根据视频，将人物的初始位置设置为第六行的
//中间位置，即（202，-23+83*5）

function randomOne2Three(){
    //返回1或2或3
    return Math.floor(Math.random()*3+1);
}



// 这是我们的玩家要躲避的敌人 
var Enemy = function(y) {
    // 要应用到每个敌人的实例的变量写在这里
    // 我们已经提供了一个来帮助你实现更多

    // 敌人的图片或者雪碧图，用一个我们提供的工具函数来轻松的加载文件
    this.sprite = 'images/enemy-bug.png';
    this.y=y;
    this.x=-101;
    this.speed=100;
   
};

// 此为游戏必须的函数，用来更新敌人的位置
// 参数: dt ，表示时间间隙
Enemy.prototype.update = function(dt) {
    // 你应该给每一次的移动都乘以 dt 参数，以此来保证游戏在所有的电脑上
    // 都是以同样的速度运行的
    this.x+=this.speed*dt*randomOne2Three();
    if(this.x>600){
        this.x=-101;
        this.y=-23+83*randomOne2Three();
    }
};

// 此为游戏必须的函数，用来在屏幕上画出敌人，
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// 现在实现你自己的玩家类
// 这个类需要一个 update() 函数， render() 函数和一个 handleInput()函数
var Player=function(){
    
    this.sprite='images/char-boy.png';
    // this.cat_girl='../images/char-cat-girl.png';
    // this.horn_girl='../images/char-horn-girl.png';
    // this.pink_girl='../images/char-pink-girl.png';
    // this.princess_girl='../images/char-princess-girl.png';
    this.x=202;
    this.y=-23+83*5;  
}
Player.prototype=Object.create(Enemy.prototype);
Player.prototype.constructor=Player;
Player.prototype.update=function(){
    
}
Player.prototype.render=function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}
Player.prototype.handleInput=function(allowedKeys){
    switch(allowedKeys){
        case 'left':if(this.x<=0){
                        this.x=0;
                    }else{
                        this.x-=101;
                    }break;
        case 'right':if(this.x>=400){
                        this.x=404;
                    }else{
                        this.x+=101;
                    }break;



      
        case 'up':this.y-=83;
                    if(this.y<=55){
                        this.y=392;
                        this.x=202;
                        alert("恭喜，你赢了！");
                        
                    }
                    
                       
                    break; 
                    
        case 'down':if(this.y>=55+83*4){
                        this.y=55+83*4;
                     }else{
                        this.y+=83;
                     }
                    

                    break;
    }
}
// 现在实例化你的所有对象
// 把所有敌人的对象都放进一个叫 allEnemies 的数组里面
// 把玩家对象放进一个叫 player 的变量里面

var allEnemies=[];
for(var i=0;i<3;i++){
    var enemy=new Enemy(-23+83*randomOne2Three());
    allEnemies.push(enemy);
}
var player=new Player();
// 这段代码监听游戏玩家的键盘点击事件并且代表将按键的关键数字送到 Play.handleInput()
// 方法里面。你不需要再更改这段代码了。
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});



// 1.在提供的范本 - Enemy 类(Class)的基础上创建 Player 类
// 2.填 Player 实例(instance)起始的位置信息(提示: x? y?)
// 3.用 Player 类创造一个player实例 (你就会看到游戏场景被启动了)
// 4.使用 Enemy 类创造多个 enemy 实例
// 5.填入 enemy 实例的起始位置信息
// 6.填入 enemy 实例的移动函数(function)
// 7.建立 player 的输入(input)函数 (Brian注: 以控制player的上下左右移动)
// 8.建立检测碰撞的函数