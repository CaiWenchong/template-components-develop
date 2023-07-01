<template>
	<div class="container">

		<div class="col">

			<div class="box">
				<h3>Colors <small><span>Pro Tip</span>Edit Hex codes</small></h3>
				<div>

					<div class="demo-color">
						<div class="preview">
							<span style="--background: var(--primary-1)"></span>
							<div class="edit">
								<strong>--primary-1</strong>
								<div class="input">
									<input class="form-field" v-model="colors['--primary-1']" maxlength="7" type="text">
								</div>
							</div>
						</div>
						<div v-bind:class="{ examples: true, open: examplesToggle.first }"
							@click="examplesToggle.first = !examplesToggle.first">
							<span><i></i><i></i></span>
							<div>
								<ul>
									<li v-for="color in codepenChallange" :style="'--color: ' + color"
										@click="setColor(color, '--primary-1')"></li>
								</ul>
								<ul>
									<li v-for="color in examples" :style="'--color: ' + color"
										@click="setColor(color, '--primary-1')"></li>
								</ul>
							</div>
						</div>
					</div>

					<div class="demo-color">
						<div class="preview">
							<span style="--background: var(--primary-2)"></span>
							<div class="edit">
								<strong>--primary-2</strong>
								<div class="input">
									<input class="form-field" v-model="colors['--primary-2']" maxlength="7" type="text">
								</div>
							</div>
						</div>
						<div v-bind:class="{ examples: true, open: examplesToggle.second }"
							@click="examplesToggle.second = !examplesToggle.second">
							<span><i></i><i></i></span>
							<div>
								<ul>
									<li v-for="color in codepenChallange" :style="'--color: ' + color"
										@click="setColor(color, '--primary-2')"></li>
								</ul>
								<ul>
									<li v-for="color in examples" :style="'--color: ' + color"
										@click="setColor(color, '--primary-2')"></li>
								</ul>
							</div>
						</div>
					</div>

					<div class="demo-color">
						<div class="preview">
							<span style="--background: var(--primary-3)"></span>
							<div class="edit">
								<strong>--primary-3</strong>
								<div class="input">
									<input class="form-field" v-model="colors['--primary-3']" maxlength="7" type="text">
								</div>
							</div>
						</div>
						<div v-bind:class="{ examples: true, open: examplesToggle.third }"
							@click="examplesToggle.third = !examplesToggle.third">
							<span><i></i><i></i></span>
							<div>
								<ul>
									<li v-for="color in codepenChallange" :style="'--color: ' + color"
										@click="setColor(color, '--primary-3')"></li>
								</ul>
								<ul>
									<li v-for="color in examples" :style="'--color: ' + color"
										@click="setColor(color, '--primary-3')"></li>
								</ul>
							</div>
						</div>
					</div>

				</div>
			</div>

			<div class="box">
				<div>

					<div class="demo-color">
						<div class="preview">
							<span style="--background: var(--border)"></span>
							<div class="edit">
								<strong>--border</strong>
								<div class="input">
									<input class="form-field" v-model="colors['--border']" maxlength="7" type="text">
								</div>
							</div>
						</div>
					</div>

					<div class="demo-color">
						<div class="preview">
							<span style="--background: var(--border-hover)"></span>
							<div class="edit">
								<strong>--border-hover</strong>
								<div class="input">
									<input class="form-field" v-model="colors['--border-hover']" maxlength="7"
										type="text">
								</div>
							</div>
						</div>
					</div>

					<div class="demo-color">
						<div class="preview">
							<span style="--background: var(--text-color)"></span>
							<div class="edit">
								<strong>--text-color</strong>
								<div class="input">
									<input class="form-field" v-model="colors['--text-color']" maxlength="7"
										type="text">
								</div>
							</div>
						</div>
					</div>

					<div class="demo-color">
						<div class="preview">
							<span style="--background: var(--text-color-headline)"></span>
							<div class="edit">
								<strong>--text-color-headline</strong>
								<div class="input">
									<input class="form-field" v-model="colors['--text-color-headline']" maxlength="7"
										type="text">
								</div>
							</div>
						</div>
					</div>

				</div>
			</div>

		</div>

		<div class="col">

			<div class="box">
				<h3>Checkbox &amp; Radio</h3>
				<div>
					<div class="demo-toggle">

						<label class="checkbox">
							<input type="checkbox" checked>
							<span>Checkbox</span>
						</label>
						<label class="checkbox">
							<input type="checkbox">
							<span>Checkbox</span>
						</label>

					</div>
					<div class="demo-toggle">

						<label class="radio">
							<input type="radio" name="r" value="1" checked>
							<span>Radio</span>
						</label>
						<label class="radio">
							<input type="radio" name="r" value="2">
							<span>Radio</span>
						</label>

					</div>
					<div class="demo-toggle">

						<label class="switch">
							<input type="checkbox" checked>
							<span>Switch</span>
						</label>
						<label class="switch">
							<input type="checkbox">
							<span>Switch</span>
						</label>

					</div>

					<div class="radioGroup" style="--color: var(--primary-2)">
						<label>
							<input type="radio" name="r2" value="1" checked>
							<span>Radio</span>
						</label>
						<label>
							<input type="radio" name="r2" value="2">
							<span>Radio</span>
						</label>
						<label>
							<input type="radio" name="r2" value="3">
							<span>Radio</span>
						</label>
					</div>

				</div>
			</div>

			<div class="box">
				<h3>Buttons</h3>
				<div>
					<div class="demo-button">

						<a href="" class="btn" style="--color: var(--primary-2)">Dribbble</a>
						<a href="" class="btn"><i data-eva="twitter"></i>Twitter</a>
						<a href="" class="btn icon" style="--color: var(--primary-3)"><i
								data-eva="arrow-circle-down-outline"></i></a>

					</div>
					<div class="demo-button">

						<a href="" class="btn sm" style="--color: var(--primary-2)">Small Button</a>
						<a href="" class="btn sm"><i data-eva="at-outline"></i>Mail</a>
						<a href="" class="btn sm icon" style="--color: var(--primary-3)"><i
								data-eva="bell-outline"></i></a>

					</div>
					<div class="demo-button">

						<a href="" class="btn border" style="--color: var(--primary-2)">Outline</a>
						<a href="" class="btn border"><i data-eva="color-palette-outline"></i>Colors</a>
						<a href="" class="btn border icon" style="--color: var(--primary-3)"><i
								data-eva="cube-outline"></i></a>

					</div>
					<div class="demo-button">

						<a href="" class="btn sm border" style="--color: var(--primary-2)">Small Outline</a>
						<a href="" class="btn sm border"><i data-eva="message-square-outline"></i>Chat</a>
						<a href="" class="btn sm border icon" style="--color: var(--primary-3)"><i
								data-eva="phone-call-outline"></i></a>

					</div>
				</div>
			</div>

		</div>

		<div class="col">

			<div class="box">
				<h3>Icon list</h3>
				<div>

					<ul class="iconList">
						<li>
							<a href="">
								<div class="icon">
									<i data-eva="clipboard-outline"></i>
								</div>
								<div class="text">
									First list entry
									<small>Lorem ipsum dolor sit amet</small>
								</div>
								<i data-eva="chevron-right-outline"></i>
							</a>
						</li>
						<li style="--color: var(--primary-2)">
							<a href="">
								<div class="icon">
									<i data-eva="heart-outline"></i>
								</div>
								<div class="text">
									Another entry
									<small>Lorem ipsum dolor sit amet</small>
								</div>
								<i data-eva="chevron-right-outline"></i>
							</a>
						</li>
						<li style="--color: var(--primary-3)">
							<a href="">
								<div class="icon">
									<i data-eva="flash-outline"></i>
								</div>
								<div class="text">
									Last but not least
									<small>Lorem ipsum dolor sit amet</small>
								</div>
								<i data-eva="chevron-right-outline"></i>
							</a>
						</li>
					</ul>

				</div>

			</div>

			<form class="box">
				<h3>Form</h3>
				<div>

					<div class="form-element">
						<label>Email</label>
						<input class="form-field" type="text" placeholder="hello@hello.com">
					</div>

					<button class="btn">
						<i data-eva="email-outline"></i>Sign up
					</button>

				</div>
			</form>
		</div>

	</div>



	<!-- dribbble -->
	<!-- 	<a class="dribbble" href="https://dribbble.com/shots/5848889-Free-UI-Kit-for-CodePenChallenge" target="_blank"><img
			src="https://cdn.dribbble.com/assets/dribbble-ball-1col-dnld-e29e0436f93d2f9c430fde5f3da66f94493fdca66351408ab0f96e2ec518ab17.png"
			alt=""></a> -->
</template>

<script>
	export default {
		data() {
			return {
				colors: {
					'--primary-1': '#F44336',
					'--primary-2': '#1E88E5',
					'--primary-3': '#FDD835',
					'--border': '#CDD9ED',
					'--border-hover': '#99A3BA',
					'--text-color': '#6C7486',
					'--text-color-headline': '#3F4656'
				},
				codepenChallange: ['#F44336', '#1E88E5', '#FDD835'],
				examples: ['#5628EE', '#8C6FF0', '#23C4F8', '#D93757', '#3FDC75', '#F6D87C'],
				examplesToggle: {
					first: false,
					second: false,
					third: false
				}
			}
		},
		methods: {
			cssVar(name, value) {
				document.documentElement.style.setProperty(name, value)
			},
			setColor(color, name) {
				this.colors[name] = color;
			}
		},
		watch: {
			colors: {
				handler(val) {
					for (var key in val) {
						if (val.hasOwnProperty(key) && /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(val[key])) {
							this.cssVar(key, val[key])
						}
					}
				},
				deep: true
			}
		}


	}
</script>

<style lang="scss">
	:root {}

	body {}




	// Styles for demo

	.container {
		padding: 24px 0;
		margin: 0 auto;

		--primary-1: #F44336;
		--primary-2: #1E88E5;
		--primary-3: #FDD835;

		--border: #CDD9ED;
		--border-hover: #99A3BA;
		--text-color: #6C7486;
		--text-color-headline: #3F4656;

		--shadow: rgba(22, 30, 50, .04);
		font-family: 'Encode Sans';
		font-size: 16px;
		line-height: 22px;
		color: var(--text-color);
		background: #F5F9FF;

		.form-field {
			--color: var(--primary-1);
			outline: none;
			display: block;
			width: 100%;
			-webkit-appearance: none;
			background: #fff;
			border: 1px solid var(--border);
			padding: 8px 16px;
			line-height: 22px;
			font-size: 14px;
			font-weight: 500;
			color: var(--text-color);
			border-radius: 6px;
			transition: border .3s ease;

			&::placeholder {
				color: var(--border-hover);
			}

			&:focus {
				outline: none;
				border-color: var(--color);
			}
		}

		.form-element {
			margin-bottom: 20px;

			label {
				display: block;
				margin-bottom: 4px;
				font-size: 14px;
				color: var(--text-color-headline);
				font-weight: 500;
			}
		}

		// Iconlist

		.iconList {
			margin: 0;
			padding: 0;
			list-style: none;

			li {
				--color: var(--primary-1);
				margin: 0 0 20px 0;
				border: 1px solid var(--border);
				border-radius: 6px;
				padding: 12px;

				&:last-child {
					margin-bottom: 0;
				}

				a {
					display: flex;
					align-items: center;
					position: relative;
					text-decoration: none;

					.icon {
						width: 44px;
						height: 44px;
						position: relative;
						margin-right: 12px;

						&:before {
							content: '';
							top: 0;
							left: 0;
							right: 0;
							bottom: 0;
							position: absolute;
							border-radius: 50%;
							display: block;
							background: var(--color);
							opacity: .1;
						}

						svg {
							display: block;
							position: absolute;
							left: 50%;
							top: 50%;
							width: 20px;
							height: 20px;
							fill: var(--color);
							transform: translate(-50%, -50%);
						}
					}

					.text {
						color: var(--text-color-headline);
						font-weight: 600;
						font-size: 14px;

						small {
							display: block;
							font-size: 12px;
							font-weight: 500;
							opacity: .75;
							color: var(--text-color);
						}
					}

					&>svg {
						position: absolute;
						display: block;
						right: 0;
						top: 50%;
						transform: translateY(-50%);
						transition: transform .3s ease;
						fill: var(--border-hover);
					}

					&:hover {
						&>svg {
							transform: translateY(-50%) translateX(2px);
						}
					}
				}
			}
		}

		// Toggles

		.radioGroup {
			--color: var(--primary-1);
			--border-width: 2px;
			display: flex;
			font-size: 14px;
			font-weight: 600;

			label {
				cursor: pointer;

				input {
					display: none;

					&+span {
						display: block;
						position: relative;
						padding: 7px 20px;
						border: var(--border-width) solid var(--border);
						transition: background .3s ease, border-color .3s ease;
					}

					&:checked {
						&+span {
							z-index: 2;
							background: var(--color);
							border-color: var(--color);
							color: #fff;
						}
					}
				}

				&:hover {
					input {
						&+span {
							z-index: 1;
							border-color: var(--color);
						}
					}
				}

				&:first-child {
					input {
						&+span {
							border-radius: 6px 0 0 6px;
						}
					}
				}

				&:last-child {
					input {
						&+span {
							border-radius: 0 6px 6px 0;
						}
					}
				}

				&:not(:first-child) {
					margin-left: calc(var(--border-width) * -1);
				}
			}
		}

		.checkbox,
		.radio,
		.switch {
			--color: var(--primary-1);
			--border-hover: var(--primary-1);
			--border-width: 2px;
			margin: 0 0 12px 0;
			display: table;
			cursor: pointer;

			&.inline {
				margin: 0 12px 0 0;
				display: inline-block;
			}

			input {
				display: none;

				&+span {
					color: var(--text-color);
					height: 22px;
					font-size: 14px;
					font-weight: 500;
					position: relative;
					display: block;

					&:before,
					&:after {
						content: '';
						display: block;
						left: 0;
						top: 0;
						position: absolute;
					}

					&:before {
						height: 22px;
						border: var(--border-width) solid var(--border);
						background: #fff;
						transition: background .3s ease, border-color .3s ease;
					}

					&:after {
						transition: transform .3s ease, opacity .2s ease, background .2s ease;
					}
				}

				&:checked+span {
					&:before {
						background: var(--color);
						border-color: var(--color);
					}

					&:after {
						transition: opacity .3s ease, background .3s ease, transform .6s cubic-bezier(.175, .88, .32, 1.2);
					}
				}
			}

			&:hover {
				input {
					&:not(:checked)+span {
						&:before {
							border-color: var(--border-hover);
						}
					}
				}
			}
		}

		.checkbox,
		.radio {
			input {
				&+span {
					padding-left: 22px;

					&:not(:empty) {
						padding-left: 30px;
					}

					&:before {
						width: 22px;
					}

					&:after {
						opacity: 0;
					}
				}

				&:checked+span {
					&:after {
						opacity: 1;
					}
				}
			}
		}

		.checkbox {
			input {
				&+span {
					&:before {
						border-radius: 6px;
					}

					&:after {
						width: 5px;
						height: 9px;
						border: 2px solid #fff;
						border-top: 0;
						border-left: 0;
						left: 8px;
						top: 5px;
						transform: rotate(20deg);
					}
				}

				&:checked+span {
					&:after {
						transform: rotate(43deg)translate(1px, 0);
					}
				}
			}
		}

		.radio {
			input {
				&+span {

					&:before,
					&:after {
						border-radius: 50%;
					}

					&:after {
						width: 22px;
						height: 22px;
						background: #fff;
						opacity: 0;
						transform: scale(.6);
					}
				}

				&:checked+span {
					&:after {
						background: #fff;
						transform: scale(.4);
					}
				}
			}
		}

		.switch {
			input {
				&+span {
					padding-left: 38px;

					&:not(:empty) {
						padding-left: 46px;
					}

					&:before {
						width: 38px;
						border-radius: 11px;
					}

					&:after {
						left: 4px;
						top: 4px;
						border-radius: 50%;
						width: 14px;
						height: 14px;
						background: var(--border);
					}
				}

				&:checked+span {
					&:after {
						background: #fff;
						transform: translateX(16px) scale(.9);
					}
				}
			}

			&:hover {
				input {
					&:not(:checked)+span {
						&:after {
							background: var(--border-hover);
						}
					}
				}
			}
		}

		// Buttons

		.btn {
			--color: var(--primary-1);
			--text: #fff;
			display: inline-block;
			text-align: center;
			vertical-align: middle;
			touch-action: manipulation;
			position: relative;
			white-space: nowrap;
			border: none;
			color: var(--text);
			padding: 9px 24px;
			font-size: 14px;
			line-height: 22px;
			font-weight: 600;
			background: var(--color);
			border-radius: 6px;
			text-decoration: none;
			transition: all .3s ease;

			&:link,
			&:active,
			&:visited,
			&:focus {
				color: var(--text);
			}

			svg {
				position: relative;
				left: -4px;
				width: 18px;
				height: 18px;
				display: inline-block;
				vertical-align: top;
				font-weight: normal;
				margin: 2px 0;
				fill: var(--text);

				&.right {
					left: auto;
					right: -4px;
				}
			}

			&.icon {
				padding: 9px;

				svg {
					left: auto;
					right: auto;
					display: block;
					margin: 2px;
				}
			}

			&.sm {
				font-size: 14px;
				border-radius: 6px;
				padding: 6px 16px;

				&.icon {
					padding: 6px;

					svg {
						margin: 3px;
					}
				}

				svg {
					width: 16px;
					height: 16px;
					margin: 3px 0;
				}
			}

			&.border {
				--text: var(--color);
				background: none;

				&:before {
					content: '';
					left: 0;
					right: 0;
					top: 0;
					bottom: 0;
					position: absolute;
					z-index: 0;
					border-radius: inherit;
					transition: border-color .3s ease;
					border: 1px solid var(--color);
				}
			}
		}

		// Typography

		h3 {
			font-family: 'Encode Sans';
			font-weight: 700;
			font-size: 18px;
			color: var(--text-color-headline);
			margin: 0 0 16px 0;
		}




		@media(min-width: 720px) {
			padding: 32px 0;
			max-width: 720px;
			display: grid;
			grid-gap: 20px;
			grid-auto-rows: min-content;
			grid-template-columns: repeat(2, 1fr);
		}

		@media(min-width: 1140px) {
			padding: 48px 0;
			max-width: 1100px;
			display: grid;
			grid-gap: 40px;
			grid-auto-rows: min-content;
			grid-template-columns: repeat(3, 1fr);
		}

		.col {
			@media(min-width: 720px) {
				display: flex;
				align-content: space-between;
				flex-wrap: wrap;

				.box {
					flex: 0 0 100%;
				}
			}
		}

		h3 {
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 22px;

			small {
				color: var(--border-hover);
				font-size: 12px;
				font-weight: 600;
				display: flex;
				align-items: center;

				span {
					display: block;
					background: var(--primary-1);
					color: #fff;
					text-transform: uppercase;
					font-style: normal;
					font-size: 10px;
					font-weight: 700;
					line-height: 18px;
					border-radius: 9px;
					padding: 0 8px;
					margin: 0 4px 0 0;
				}
			}
		}

		.box {
			max-width: 340px;
			margin: 0 auto;

			&>div {
				padding: 24px;
				background: #fff;
				border-radius: 8px;
				box-shadow: 0 2px 4px var(--shadow);
				border: 1px solid var(--border);
				margin: 0 0 40px 0;

				.demo-toggle {
					display: flex;
					flex-wrap: wrap;
					margin: 0 0 20px 0;

					&:last-child {
						margin-bottom: 0;
					}

					label {
						flex: 0 0 50%;
						display: block;
						margin: 0;
					}
				}

				.demo-button {
					margin-bottom: 20px;

					&:last-child {
						margin-bottom: 0;
					}

					.btn {
						margin: 0 8px 0 0;

						&:last-child {
							margin-right: 0;
						}
					}
				}

				.demo-color {
					display: flex;
					align-items: center;
					justify-content: space-between;
					margin: 0 0 20px 0;
					position: relative;

					&:last-child {
						margin-bottom: 0;
					}

					.preview {
						display: flex;
						align-items: center;

						&>span {
							--background: #000;
							display: block;
							width: 46px;
							height: 46px;
							flex-basis: 46px;
							border-radius: 12px;
							margin: 0 20px 0 0;
							background: var(--background);
						}

						.edit {
							strong {
								font-weight: 600;
								color: var(--text-color-headline);
							}

							.input {
								display: flex;

								input {
									line-height: 22px;
									padding: 0;
									display: block;
									border: 0;
									background: none;
								}
							}
						}
					}

					.examples {
						position: relative;

						span {
							cursor: pointer;
							width: 18px;
							height: 18px;
							display: block;
							z-index: 2;
							position: relative;
							transition: transform .3s ease, background .2s ease;

							i {

								&,
								&:before {
									width: 8px;
									height: 8px;
									background: var(--border);
									display: block;
									position: absolute;
									border-radius: 2px;
									transition: border-radius .2s ease, background .2s ease;
								}

								&:before {
									content: '';
								}

								&:first-child {
									left: 0;
									top: 0;

									&:before {
										top: 0;
										left: 10px;
									}
								}

								&:last-child {
									left: 0;
									bottom: 0;

									&:before {
										bottom: 0;
										left: 10px;
									}
								}
							}
						}

						div {
							opacity: 0;
							visibility: hidden;
							position: absolute;
							transform: scaleY(.8);
							transform-origin: 50% 0;
							background: #fff;
							z-index: 1;
							border-radius: 8px;
							box-shadow: 0 2px 4px var(--shadow);
							border: 1px solid var(--border);
							padding: 34px 8px 8px 8px;
							top: -8px;
							right: -8px;
							width: 80px;
							transition: opacity .2s ease, visibility .2s ease, transform .3s cubic-bezier(.4, .6, .5, 1.2);

							ul {
								list-style: none;
								display: grid;
								grid-gap: 6px;
								grid-template-columns: repeat(3, 1fr);
								margin: 0 0 6px 0;
								padding: 0 0 6px 0;
								border-bottom: 1px solid var(--border);

								&:last-child {
									margin-bottom: 0;
									padding-bottom: 0;
									border-bottom: 0;
								}

								li {
									--color: #000;
									width: 100%;
									padding-bottom: 100%;
									border-radius: 4px;
									cursor: pointer;
									background: var(--color);
									transition: transform .3s cubic-bezier(.4, .6, .5, 1.2);

									&:hover {
										transform: scale(.9);
									}
								}
							}
						}

						&.open {
							z-index: 3;

							span {
								background: var(--border);
								transform: rotate(45deg) scale(.8);

								i {

									&,
									&:before {
										border-radius: 0;
										background: #fff;
									}
								}
							}

							div {
								opacity: 1;
								visibility: visible;
								transform: scaleY(1);
							}
						}
					}
				}
			}
		}
	}


	html {
		box-sizing: border-box;
		-webkit-font-smoothing: antialiased;
	}

	* {
		box-sizing: inherit;

		&:before,
		&:after {
			box-sizing: inherit;
		}
	}

	// Center & dribbble
	body {
		min-height: 100vh;

		.dribbble {
			position: fixed;
			display: block;
			right: 20px;
			bottom: 20px;
			opacity: .5;
			transition: all .4s ease;

			&:hover {
				opacity: 1;
			}

			img {
				display: block;
				height: 36px;
			}
		}
	}
</style>