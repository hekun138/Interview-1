<template>
	<div id="app">
		<div class="nav"></div>
		<ul class="list">
			<!-- 卡片容器 -->
			<li class="item" :class="`item_${i}`" v-for="(item, i) in list" :key="i">
				<!-- 卡片 -->
				<div class="card" :class="`card_${i}`">
					<header @mousedown="move($event, i)">
						<span class="left">{{ item.leftText }}</span>
						<span class="middle">{{ item.middleText }}</span>
						<span class="right">{{ item.rightText }}</span>
					</header>
					<div class="box-body"></div>
				</div>
			</li>
		</ul>
		
	</div>
</template>

<script>
export default {
	name: "App",
	data() {
		return {
			positionX: 0,
			positionY: 0,
			list: [
				{ leftText: 'left1', middleText: 'middle1', rightText: 'right1', left: 0, top: 0 },
				{ leftText: 'left2', middleText: 'middle2', rightText: 'right2', left: 0, top: 0 },
				{ leftText: 'left3', middleText: 'middle3', rightText: 'right3', left: 0, top: 0 },
				{ leftText: 'left4', middleText: 'middle4', rightText: 'right4', left: 0, top: 0 },
			]
		}
	},
	mounted() {
		let cards = document.querySelectorAll('.card');
		cards.forEach((card, index) => {
			// 保存每个卡片的相对于父元素的位置
			let cardOffest = this.offset(card);
			let cardParentOffset = this.offset(card.parentNode);
			console.log('card: ', this.offset(card));
			console.log('li: ', this.offset(card.parentNode));
			this.list[index].left = cardOffest.left;
			this.list[index].top = cardOffest.top;
		});
		console.log(this.list)
	},
	methods: {
		// 碰撞检测
		isCrash(a, b) {
			if ((a.x + a.w < b.x) || (b.x + b.w < a.x) || (a.y + a.h < b.y) || (b.y + b.h < a.y)) {
				return false;
			}
			return true;
		},
		// 是否需要换位
		crashGreateThanHalf(a, b) {
			// 获取固定元素b的中心分割线
			let centerX = b.x + b.w / 2;
			let centerY = b.y + b.h / 2;
			if (a.x + a.w < centerX || a.x > centerX || a.y + a.h < centerY || a.y > centerY) {
				console.log('false')
				return false;
			}
			console.log('true')
			return true;
		},
		// 获取offset
		offset(curEle){
			var totalLeft = null,totalTop = null,par = curEle.offsetParent;
			//首先加自己本身的左偏移和上偏移
			totalLeft += curEle.offsetLeft;
			totalTop += curEle.offsetTop
			//只要没有找到body，我们就把父级参照物的边框和偏移也进行累加
			while(par){
				//累加父级参照物本身的偏移
				totalLeft+=par.offsetLeft;
				totalTop+=par.offsetTop
				par = par.offsetParent;
			}
		
			return{
				left:totalLeft,
				top:totalTop
			}
		},
		move(e, i) {
			let odiv = e.target.parentNode.parentNode; // 获取目标元素

			// 算出鼠标相对元素的位置 
			// = 鼠标相对于浏览器的位置 - 目标元素相对于父元素的位置
			// = 鼠标相对于浏览器的位置 - 目标元素相对于浏览器的位置 + 目标元素的父元素相对于浏览器的位置
			let disX = e.clientX - this.offset(odiv).left + this.offset(odiv.parentNode).left;
			let disY = e.clientY - this.offset(odiv).top + this.offset(odiv.parentNode).top;
			odiv.classList.add('moveActive');

			// 鼠标移动
			document.onmousemove = e => {
				// 鼠标按下并移动的事件
				// 用鼠标的位置减去鼠标相对元素的位置-元素在父元素中的相对位置，得到元素的位置
				let left = e.clientX - disX;
				let top = e.clientY - disY;

				// 移动当前元素
				odiv.style.left = left + "px";
				odiv.style.top = top + "px";

				// 如果当前移动卡片的 上下左右进入了其他卡片中超过一半，则被进入的卡片换到移动卡片的位置
				let width = odiv.clientWidth;
				let height = odiv.clientHeight;
				let moveDom = {
					x: this.offset(odiv).left,
					y: this.offset(odiv).top,
					w: width,
					h: height
				};
				this.list.forEach((card, index) => {
					// 跳过自己
					if (i != index) {
						let fixDom = {
							x: card.left,
							y: card.top,
							w: width,
							h: height
						};
						// 是否碰撞
						if (this.isCrash(moveDom, fixDom)) {
							// 是否需要换位
							if (this.crashGreateThanHalf(moveDom, fixDom)) {
								console.log(`${i}和${index}进行换位`)

								let li_i = document.querySelector(`.item_${i}`);
								let li_index = document.querySelector(`.item_${index}`);
								let card_i = li_i.querySelector(`.card_${i}`);
								let card_index = li_index.querySelector(`.card_${index}`);
								console.log(li_i);
								console.log(li_index);
								console.log(card_i);
								console.log(card_index);
								if (card_index) {
									li_i.append(card_index);
								}
								if (card_i) {
									li_index.append(card_i);
								}
								// li_index.replaceChild(card_i, card_index);
							}
						} else {
							
						}

					}
				});
				
			};

			// 鼠标抬起
			document.onmouseup = e => {
				document.onmousemove = null;
				document.onmouseup = null;
				// 恢复默认值
				odiv.classList.remove('moveActive');
				odiv.classList.forEach(cls => {
					if (cls.includes('card_')) {
						let index = cls[cls.length - 1];
						odiv.style.left = '0px';
						odiv.style.top = '0px';
						// odiv.style.left = this.list[index].left + "px";
						// odiv.style.top = this.list[index].top + "px";
					}
				});
			};
		}
	}
};
</script>

<style>
* {
	padding: 0;
	margin: 0;
}
ul, li {
	list-style: none;
}
html, body, #app {
	width: 100%;
	height: 100%;
}
.nav {
	height: 80px;
}
.list {
	margin: 0 auto;
	width: 800px;
	min-height: 800px;
}
.item {
	position: relative;
	width: 350px;
	height: 350px;
	float: left;
	margin-bottom: 50px;
}
.item:nth-of-type(2n) {
	margin-left: 100px;
}
.card {
	display: inline-block;
	position: absolute; /*定位*/
	width: 350px;
	height: 350px;
	background: #666; /*设置一下背景*/
}
.moveActive {
	opacity: 0.6;
	z-index: 99;
}
header {
	height: 60px;
	line-height: 60px;
	display: flex;
	text-align: center;
	cursor: pointer;
	background: #ccc;
}
.left {
	flex: 1;
}
.right {
	flex: 1;
}
.middle {
	flex: 4;
}
</style>
