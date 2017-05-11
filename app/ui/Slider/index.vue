<template>
	<div class="ui-slider">
		<div class="ui-slider-runway" ref="slider" @click="clickChange">
			<div class="ui-slider-bar" :style="{ width: barWidth }"></div>
			<div class="ui-slider-button-wrapper" ref='button' :style="{ left: buttonLeft }">
				<div class="ui-slider-button" @mousedown="swipeStart"></div>
			</div>
		</div>
		<div class="ui-slider-input" v-show="show_input">
			<span class="ui-input-decrease" @click="decrease">
					<i class="kz-e-plus"></i>
				</span>
			<span class="ui-input-increase" @click="increase">
					<i class="kz-e-plus"></i>
				</span>
			<div style="ui-input">
				<input type="number" @input="changeNum" autocomplete="off" :min="min" :max="max" :value="inputNumber" class="ui-input-inner">
			</div>
		</div>
	</div>
</template>
<script>
const Slider = {
	name: 'Slider',
	props: {
		show_input: {
			default: true,
			type: Boolean,
		},
		min: {
			default: 0,
			type: Number
		},
		max: {
			default: 100,
			type: Number
		}
	},
	data() {
		return {
			inputNumber: 0,
			sliderWidth: '',
			barWidth: 0,
			buttonLeft: 0,
			sliderOffsetLeft: 0,
			initial: 100,
		}
	},
	methods: {
		swipeStart(e) {
			this.moveStart = true
			document.addEventListener('mousemove', this.swipeMove);
			document.addEventListener('mouseup', this.swipeEnd);
		},
		swipeMove(e) {
			var clientX = e.clientX - this.sliderOffsetLeft
			if (0 <= clientX && clientX <= this.sliderWidth) {
				this.buttonLeft = clientX + 'px'
				this.barWidth = clientX + 'px'
				this.inputNumber = Math.ceil(clientX / this.sliderWidth * (this.max - this.min)) + this.min
			} else {
				document.removeEventListener('mousemove', this.swipeMove);
			}
			return false
		},
		swipeEnd() {
			document.removeEventListener('mousemove', this.swipeMove);
		},
		changeNum(e) {
			if (e.target.value >= this.min && e.target.value <= this.max) {
				this.inputNumber = Number(e.target.value)
			}
		},
		clickChange(e) {
			var clientX = e.clientX - this.sliderOffsetLeft
			if (e.clientX >= this.sliderOffsetLeft && (this.sliderOffsetLeft + this.sliderWidth) >= e.clientX) {
				this.buttonLeft = clientX + 'px'
				this.barWidth = clientX + 'px'
				this.inputNumber = Math.ceil(clientX / this.sliderWidth * (this.max - this.min)) + this.min
			}
		},
		increase() {
			if (this.inputNumber != this.max) {
				this.inputNumber = this.inputNumber + 1
				this.barWidth = this.sliderWidth * (this.inputNumber - this.min) / (this.max - this.min) + 'px'
				this.buttonLeft = this.sliderWidth * (this.inputNumber - this.min) / (this.max - this.min) + 'px'
			}
		},
		decrease() {
			if (this.inputNumber != this.min) {
				this.inputNumber = this.inputNumber - 1
				this.barWidth = this.sliderWidth * (this.inputNumber - this.min) / (this.max - this.min) + 'px'
				this.buttonLeft = this.sliderWidth * (this.inputNumber - this.min) / (this.max - this.min) + 'px'
			}
		}
	},
	mounted() {
		this.inputNumber = this.min
		this.sliderWidth = this.$refs.slider.offsetWidth
		this.sliderOffsetLeft = this.$refs.slider.offsetLeft
	}
}
export default Slider

</script>
<style scoped lang="postcss">
	.ui-slider-button{
		width: 12px;
		height: 12px;
		background-color: #20a0ff;
		border-radius: 50%;
		transition: .2s;
		vertical-align: middle;
		display: inline-block;
	}
	.ui-slider-button-wrapper{
		width: 36px;
	    height: 36px;
	    position: absolute;
	    z-index: 1001;
	    top: -16px;
	    transform: translateX(-50%);
	    background-color: transparent;
	    text-align: center;
	    user-select: none;
	}
	.ui-slider-button-wrapper:after {
	    display: inline-block;
	    content: "";
	    height: 100%;
	    vertical-align: middle;
	}
	.ui-slider-bar{
		height: 4px;
		background-color: #20a0ff;
		border-top-left-radius: 3px;
		border-bottom-left-radius: 3px;
		position: absolute;
	}
	.ui-slider-runway{
		width: auto;
		height: 4px;
		margin: 16px 0;
		background-color: #e4e8f1;
		border-radius: 3px;
		position: relative;
		cursor: pointer;
		vertical-align: middle;
		margin-right: 160px; 

	}
	.ui-slider-input{
		float: right;
		margin-top: 3px;
		width: 130px;
		display: inline-block;
		overflow: hidden;
		position: relative;
	}
	.ui-input-decrease{
		right: 31px;
		line-height: 30px;
		width: 30px;
		display: inline-block;
		font-size: 13px;
		color: #d1dbe5;
		cursor: not-allowed;
		height: 100%;
		border-left: 1px solid #bfcbd9;
		top: 1px;
		text-align: center;
		cursor: pointer;
		position: absolute;
		z-index: 1;
	}
	.ui-input-increase{
		line-height: 30px;
		width: 30px;
		font-size: 13px;
		height: 100%;
		display: inline-block;
		border-left: 1px solid #bfcbd9;
		top: 1px;
		text-align: center;
		color: #97a8be;
		cursor: pointer;
		position: absolute;
		z-index: 1;
		right: 0;
	}
	.ui-input{
		font-size: 13px;
		position: relative;
		width: 100%;
	}
	.ui-input-inner{
		-webkit-appearance: none;
		-moz-appearance: none;
		appearance: none;
		background-color: #fff;
		background-image: none;
		border-radius: 4px;
		border: 1px solid #bfcbd9;
		box-sizing: border-box;
		color: #1f2d3d;
		display: block;
		font-size: inherit;
		line-height: 1;
		outline: none;
		padding: 3px 10px;
		transition: border-color .2s cubic-bezier(.645,.045,.355,1);
		width: 100%;
		padding-right: 70px;
		height: 30px;
	}
</style>
