<template>
	<view class="test">
		以该规范目录结构放入的组件可以自动导入
	</view>
</template>

<script>
	export default {
		name: "template",
		//1.声明自定义事件：组件的自定义事件，必须事先声明在emits节点中
		emits: ['count-change'], //也可以用对象的形式，里面可以对事件进行验证，同props
		// 组件接收参数多种格式
		props: {
			// 基础的类型检查 (`null` 和 `undefined` 会通过任何类型验证)
			propA: Number,
			// 多个可能的类型
			propB: [String, Number],
			// 必填的字符串
			propC: {
				type: String,
				required: false
			},
			// 带有默认值的数字
			propD: {
				type: Number,
				default: 100
			},
			// 带有默认值的对象
			propE: {
				type: Object,
				// 对象或数组默认值必须从一个工厂函数获取
				default: function() {
					return {
						message: 'hello'
					}
				}
			},
			// 自定义验证函数
			propF: {
				validator: function(value) {
					// 这个值必须匹配下列字符串中的一个
					return ['success', 'warning', 'danger'].indexOf(value) !== -1
				}
			},
			// 具有默认值的函数
			propG: {
				type: Function,
				// 与对象或数组默认值不同，这不是一个工厂函数 —— 这是一个用作默认值的函数
				default: function() {
					return 'Default function'
				}
			}
		},
		data() {
			return {
				test: {
					id: 1
				}
			};
		},
		methods: {
			changeLocale() {

			}
		},
		created() {
			console.log('组件创建后，但还未挂载')
		},
		mounted() {
			console.log('组件挂载到页面OK,可用 vm.$el 访问')
		},
		watch: {
			'test.id': {
				handler(new_val, old_val) { //特别注意，不能用箭头函数，箭头函数，this指向全局

				},
				immediate: true, //刷新加载 立马触发一次handler
				deep: true // 可以深度检测到 obj 对象的属性值的变化
			}
		}
	}
</script>

<style lang="scss" scoped>
	.test {
		width: 750rpx;
		height: 468.75rpx;
	}
</style>
