<template>
	<div id="input">
		<div class="main">
			<div class="input-group">
				<input :type="inputType" v-model="password" class="input" />
				<button class="input-group-icon" @click="togglePassword">
					{{ toggleBtnIcon }}
				</button>
			</div>
		</div>
		
	</div>
</template>

<script>
	export default {
		name: "h-input",
		
		props: {
		
			dtoInputText: {
				type: String,
				default: ''
			}
		
		},
		
		
		data() {
			return {
				showPassword: false,
				password: this.dtoInputText
			};
		},
		watch: {
			dtoInputText(newValue, oldValue) {
				console.log(newValue, oldValue)
				this.password=newValue
			}
		},
		
		
		methods: {
			
			
			togglePassword() {
				this.showPassword = !this.showPassword;
			}
		},
		computed: {
			inputType() {
				return this.showPassword ? "text" : "password";
			},
			toggleBtnIcon() {
				return this.showPassword ? "🐵" : "🙈";
			}
		}
	}
</script>

<style>
	/* @import url("https://fonts.googleapis.com/css2?family=Poppins&display=swap"); */
	html,
	body,
	#input {
		height: 100%;
	}

	body {
		background-color: #e3e6f1;
	}

	body,
	button,
	input {
		font-family: "Poppins", sans-serif;
	}

	.main {
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.input-group {
		display: inline-flex;
		background-color: #ffffff;
		align-items: center;
		border-radius: 0.5rem;
		overflow: hidden;
		font-size: 2rem;
		box-shadow: 0px 2px 4px 1px rgba(0, 0, 0, 0.25);
	}

	.input-group input {
		border: 0;
		padding: 1rem;
	}

	.input-group input:focus {
		outline: 0;
	}

	.input-group-icon {
		padding: 0.5rem;
		display: inline-flex;
		justify-content: center;
		align-items: center;
		align-self: stretch;
		border: 0;
		background-color: inherit;
		cursor: pointer;
	}

	.credits {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		margin: auto;
		background-color: #212121;
		color: #ffffff;
		text-decoration: none;
		padding: 1rem;
		text-align: center;
	}
</style>