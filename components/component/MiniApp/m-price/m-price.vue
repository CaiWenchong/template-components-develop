<template>
	<view class="m-price">


		<view class="unit-number" :style="{
			'color':color,
			'font-weight':fontWeight,
			'text-decoration':deleted?'line-through':'none'
		}">

			<text :style="`font-size:${priceUnitSize}`+'rpx'">
				{{priceUnit}}
			</text>

			<text :style="`font-size:${priceNumSize}`+'rpx'">
				{{price}}
			</text>

		</view>

	</view>
</template>

<script>
	export default {
		name: "m-price",
		data() {
			return {
				price: NaN
			};
		},


		props: {

			// 字体颜色
			color: {
				type: String,
				default: '#161616'
			},

			// 字体粗细，默认500
			fontWeight: {
				type: String,
				default: '500'
			},

			// 	deleted属性设置价格是否为删除态。默认值为false
			deleted: {
				type: Boolean,
				default: false
			},

			//价格单位，默认￥
			priceUnit: {
				type: String,
				default: '￥'
			},

			//价格单位字体大小，默认28rpx
			priceUnitSize: {
				type: Number,
				default: 40
			},

			//价格，默认0
			priceNum: {
				type: Number,
				default: 0
			},

			//价格字体大小，默认32rpx
			priceNumSize: {
				type: Number,
				default: 55
			},

		},
		created() {
			//补零函数
			this.priceZeroFill()
		},
		
		methods:{
			
			// 自动补零价格,保留小鼠两位
			priceZeroFill(){
				// 保持小数点后有两位，不足补零：
				var x = this.priceNum;
				var f = parseFloat(x); // 解析一个字符串，返回一个浮点数；
				
				var f = Math.round(x*100)/100;
				var s = f.toString(); // 把一个逻辑值转换为字符串，并返回结果；
				var rs = s.indexOf('.'); // 返回某个指定的字符串值在字符串中首次出现的位置；如果字符串值没有出现，返回-1；
				
				// 没有小数点时：
				if (rs < 0) {
				    rs = s.length;
				    s += '.';
				}
				while (s.length <= rs + 2) {
				    s += '0';
				}
				this.price=s
				
			
				
			}
			
		}
		



	}
</script>

<style lang="scss" scoped>
	.m-price {
		width: -webkit-fit-content;


		.unit-number {
			width: -webkit-fit-content;
		}

	}
</style>