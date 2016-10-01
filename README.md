# interactive-travel-map
【项目介绍】

链接：http://1.muliping.applinzi.com/map_2/

展示丽江旅程的网站，通过HTML5/CSS3实现响应式布局。使用svg和原生Javascript实现页面交互。

【文件结构】

Map_2
  
|__ index .html(主页)

|__ map.html（地图）

|__ route.html(路线)

|__ note.html(记录)

|__ css

	|__ font.css（latin字体）

	|__ main.css（主页样式）

	|__ map.css

	|__ route.css

	|__note.css

|__ img

	|__map

	|__ route

	|__ 1.svg（东巴文小图）

	|__3.svg（东巴文大图）

	|__close.png（map中关闭背景图的图标）

	|__yunhe.png（网页logo）

|__ js

	|__jquery-3.0.0.min.js
  
	|__ fastclick.js(提高手机端点击响应速度)
  
	|__ lunar.js（操作svg元素的class）
  
	|__index.js
  
	|__map.js
  
	|__route.js


【功能模块】

1.主页

--自适应手机屏幕的宽度

<meta name="viewport" content="width=device-width, initial-scale=1">

viewport：虚拟窗口；

width=device-width ：虚拟窗口宽度=设备宽度；

initial-scale=1：初始缩放比例为 1 倍，虚拟窗口相对设备窗口大小进行缩放。

为什么使用viewport?

->不使用viewport时，手机会自动缩放页面。如980px的CSS元素，放入320px的设备中，则虚拟窗口相对设备窗口的缩放比例为980/320。

->但这样页面整体缩小，并不好看。相当于我有一只大象，而盒子太小只能放老鼠，所以需要把大象缩小到老鼠大小放进去，这时我可能看不清大象的样子。

->所以，我们可以针对不同的设备放置不同的元素，在大盒子里放大象，在小盒子里放老鼠。这时就需要使用viewport设置缩放比例为1，避免在小盒子里放老鼠时，仍然按980/320的比例缩放。

以上只是个人的浅陋之见。

viewport的知识，推荐参考https://www.zybuluo.com/gongzhen/note/170557


-- IE识别H5标签

引入html5shiv.js


--导航栏svg图标

预定义svg（由于是预定义的元素，所以将其css设置为不可见，禁用鼠标事件）

|__defs(预定义可重用元素)

		|__symbol（定义可重用符号）
    
			|__id（后面使用时，需要用id引用符号）
      
			|__viewbox（符号大小，参数：x,y,w,h）
      
|__path（路径）

   使用svg
   
<svg><use xlink:href="#引用符号的id"></use></svg>


--响应式布局

@media screen and (max-width:768px) 判断屏幕宽度，当屏幕宽度<=768px时，将页面宽由80vw改为为100vw，同时改变logo和导航的大小。


2.Map

--背景地图

采用H5的响应式图片<picture><source>元素，针对不同的屏幕宽度，加载不同图片


--地标点

svg将多个地标点合并成一个整体，好处是容易定位，不需要再使用css对每个点进行定位。svg的每个地标点又是独立的，可以单独进行交互操作,优于png图片。另外svg还有缩放不失真，加载快，文件小等优点。

在小屏幕下，使用JS改变svg图形整体的viewbox，既可进行缩放。

使用svg也有缺点：因为不是DOM节点，只能用原生js进行操作。因此引入lunar.js，方便操作svg元素的class。


--交互

->mouseover：动态生成提示框内容（获取对应地标点的data-title），再显示提示框（改变其透明度），改变对应的背景图片透明度（+class）。提示框和背景图片在css中都设置了过渡效果，让交互效果更自然。

显示提示框时，需要先确定地标点的位置，使用getBBox()获取svg地标点左上角位置（x，y），用getBoundingClientRect()获取地标点高度。另外，svg的viewbox宽度是913，放在页面80vw宽的容器中会产生缩放，如果缩放比例1.2则地标点位置实际应该是(1.2*x,1.2*y),所以计算提示框位置时还要考虑缩放比例。

->Click：显示背景图（+class，改变透明度和z-index）,显示简介内容（+class）。对简介的标题、副标题、内容在css中设置不同的过渡延迟时间，实现更好的视觉效果。


3.route

运用jQuery实现景点简介的滑动，利用定时器避免鼠标快速移动时页面混乱。


4.note

--东巴文图片

采用H5的响应式图片<picture><source>元素，针对不同的屏幕宽度，加载不同图片

--svg动画

->旋转

<animateTransform attributeName="transform" begin="0s" dur="3s" type="rotate" from="0 132.5 36" to="360 134 38" repeatCount="indefinite"/>

begin：可设置延迟时间

dur：动画执行时间

type：动画类型

from/to：角度，x,y

repeatCount:动画重复次数

->透明度

<animate attributeName="opacity" from="1" to="0" begin="0.9s" dur="3s" repeatCount="indefinite" />

from/to：透明度

->路径运动

<animateMotion path="M-5,-5 l7,5 l-7,-5" begin="0.5s" dur="5s" repeatCount="indefinite"/>

Path:运动路径，起始位置（-5，-5），直线移动到（17，5），再直线移动到（-7，-5），这里的坐标是以当前位置为参考点相对坐标，所以最后是移动到起始位置。


Svg动画知识，推荐参考 http://www.zhangxinxu.com/wordpress/2014/08/so-powerful-svg-smil-animation/ 
