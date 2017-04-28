<template>
	<div class="ui-notification" :class='animateClass'>
		<div class="ui-notification-icon" :class="type" v-if="iconShow"><i :class="iconClass"></i></div>
		<div class="ui-notification-group">
			<h2 class="ui-notification-title">{{title}}</h2>
			<div class="ui-notification-content">{{message}}</div>
			<div class="ui-notification-close" @click='onClose'><i class="kz-e-close"></i></div>
		</div>
	</div>
</template>

<script>

	const Notification = {
		name: 'Notification',
		props: {
			title: String,
			message: String,
			duration: {
				default: 0,
				type: Number
			},
			type: String,
			removeNotice: {
				default: null,
				type: Function
			}
		},
		data() {
			return {
				iconClass: '',
				iconShow: false,
				animateClass: ''
			}
		},
		methods: {
			onClose() {
				if (this.removeNotice != null) {
					this.removeNotice()
				}
				this.$emit('ui-notification-close')
			},
			onClick() {
				this.animateClass = 'ui-notification-animate-show'
				if (this.duration != 0) {
					setTimeout(() => this.onClose(), this.duration)
				}
			}
		},
		created() {
			if (this.type) {
				this.iconShow = true
				switch (this.type) {
					case 'success':
						this.iconClass = 'kz-e-check'
						break
					case 'warning':
						this.iconClass = 'kz-e-warning'
						break
					case 'info':
						this.iconClass = 'kz-e-comment'
						break
					case 'error':
						this.iconClass = 'kz-e-close-2'
						break
					default:
						break
				}
			} else {
				this.iconShow = false
			}
			this.onClick()
		}
	}
	Notification.install = (Vue) => {
		window.$notify = Vue.prototype.$notify = (options) => {
			var _dom = document.createElement('div')
			let _Constructor = Vue.extend(Notification)
			document.body.append(_dom)
			return new _Constructor({
				el: _dom,
				propsData: {
					title: options.title,
					message: options.message,
					duration: options.duration,
					type: options.type,
					removeNotice: function() {
						document.body.removeChild(this.$el)
						if (options.removeNotice != null) {
							options.removeNotice()
						}
						this.$destroy()
					}
				},
				mounted() {
					this.$el.style.position = 'fixed'
					this.$el.style.top = '100px'
				}
			})
		}
	}
	export default Notification
</script>

<style scoped lang="postcss">
	.ui-notification {
		z-index: 9999;
		width: 330px;
		padding: 20px;
		box-sizing: border-box;
		border-radius: 2px;
		position: fixed;
		right: 16px;
		background-color: #fff;
		box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
		transition: opacity .3s, transform .3s, right .3s, top .4s;
		overflow: hidden;
	}
	
	.ui-notification-title {
		font-weight: 400;
		font-size: 16px;
		color: #1f2d3d;
		margin: 0;
	}
	
	.ui-notification-content {
		font-size: 14px;
		line-height: 21px;
		margin: 10px 0 0;
		color: #8391a5;
		text-align: justify;
	}
	
	.ui-notification-close {
		top: 20px;
		right: 20px;
		position: absolute;
		cursor: pointer;
		color: #bfcbd9;
		font-size: 14px;
	}
	
	.ui-notification-icon {
		width: 40px;
		height: 40px;
		font-size: 40px;
		float: left;
		position: relative;
		top: 3px;
		padding-right: 20px;
	}
	
	.warning {
		color: #f7ba2a
	}
	
	.success {
		color: #13ce66
	}
	
	.info {
		color: #50bfff
	}
	
	.error {
		color: #ff4949;
	}
	
	.ui-notification-animate-show {
		-webkit-animation: notification 0.5s;
		-o-animation: notification 0.5s;
		animation: notification 0.5s;
	}
	
	@keyframes notification {
		from {
			opacity: 0;
			width: 0
		}
		to {
			opacity: 1;
			width: 330px;
		}
	}
</style>