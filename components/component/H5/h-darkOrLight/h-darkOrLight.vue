<template>
	<div >
		

	
	<svg display="none">
		<symbol id="light" viewBox="0 0 24 24">
			<g stroke="currentColor" stroke-width="2" stroke-linecap="round">
				<line x1="12" y1="17" x2="12" y2="20" transform="rotate(0,12,12)" />
				<line x1="12" y1="17" x2="12" y2="20" transform="rotate(45,12,12)" />
				<line x1="12" y1="17" x2="12" y2="20" transform="rotate(90,12,12)" />
				<line x1="12" y1="17" x2="12" y2="20" transform="rotate(135,12,12)" />
				<line x1="12" y1="17" x2="12" y2="20" transform="rotate(180,12,12)" />
				<line x1="12" y1="17" x2="12" y2="20" transform="rotate(225,12,12)" />
				<line x1="12" y1="17" x2="12" y2="20" transform="rotate(270,12,12)" />
				<line x1="12" y1="17" x2="12" y2="20" transform="rotate(315,12,12)" />
			</g>
			<circle fill="currentColor" cx="12" cy="12" r="5" />
		</symbol>
		<symbol id="dark" viewBox="0 0 24 24">
			<path fill="currentColor" d="M15.1,14.9c-3-0.5-5.5-3-6-6C8.8,7.1,9.1,5.4,9.9,4c0.4-0.8-0.4-1.7-1.2-1.4C4.6,4,1.8,7.9,2,12.5c0.2,5.1,4.4,9.3,9.5,9.5c4.5,0.2,8.5-2.6,9.9-6.6c0.3-0.8-0.6-1.7-1.4-1.2C18.6,14.9,16.9,15.2,15.1,14.9z" />
		</symbol>
	</svg>
	<label class="switch">
		<input class="switch__input" type="checkbox" role="switch" name="dark" />
		<svg class="switch__icon" width="24px" height="24px" aria-hidden="true">
			<use href="#light" />
		</svg>
		<svg class="switch__icon" width="24px" height="24px" aria-hidden="true">
			<use href="#dark" />
		</svg>
		<span class="switch__inner"></span>
		<span class="switch__inner-icons">
			<svg class="switch__icon" width="24px" height="24px" aria-hidden="true">
				<use href="#light" />
			</svg>
			<svg class="switch__icon" width="24px" height="24px" aria-hidden="true">
				<use href="#dark" />
			</svg>
		</span>
		<span class="switch__sr">Dark Mode</span>
	</label>
		</div>
</template>

<script>
	export default {
		data() {
			return {

			};
		}
	}
</script>

<style >
	
	* {
		border: 0;
		box-sizing: border-box;
		margin: 0;
		padding: 0;
	}
	
	light-container.{
		height: 500px;
		width: 500px;
	}
	body,
	input {
		font: 1em/1.5 sans-serif;
	}
	body {
		background-color: hsl(var(--hue), 10%, 90%);
		color: hsl(var(--hue), 10%, 10%);
		display: flex;
		height: 100vh;
		transition: background-color var(--trans-dur), color var(--trans-dur);
	}
	body:has(.switch__input:checked) {
		background-color: hsl(var(--hue), 10%, 20%);
		color: hsl(var(--hue), 10%, 90%);
	}
	.switch,
	.switch__input {
		display: block;
		-webkit-tap-highlight-color: transparent;
	}
	.switch {
		margin: auto;
		position: relative;
		-webkit-user-select: none;
		-moz-user-select: none;
		user-select: none;
	}
	.switch__icon {
		color: hsla(var(--hue), 10%, 80%);
		pointer-events: none;
		position: absolute;
		top: 0.375em;
		left: 0.375em;
		width: 0.75em;
		height: 0.75em;
		transition: color var(--trans-dur),
			transform var(--trans-dur) var(--trans-timing);
	}
	.switch__icon:nth-of-type(2) {
		right: 0.375em;
		left: auto;
	}
	.switch__inner,
	.switch__inner-icons {
		border-radius: 0.5em;
		display: block;
		overflow: hidden;
		position: absolute;
		top: 0.25em;
		left: 0.25em;
		width: 2.25em;
		height: 1em;
	}
	.switch__inner:before,
	.switch__inner-icons {
		transition: transform var(--trans-dur) var(--trans-timing);
		transform: translateX(-1.25em);
	}
	.switch__inner:before {
		background-color: var(--primary);
		border-radius: inherit;
		content: "";
		display: block;
		width: 100%;
		height: 100%;
	}
	.switch__inner-icons {
		pointer-events: none;
	}
	.switch__inner-icons .switch__icon {
		color: hsl(0, 0%, 100%);
		top: 0.125em;
		left: 0.125em;
		transform: translateX(1.25em);
	}
	.switch__inner-icons .switch__icon:nth-child(2) {
		right: 0.125em;
		left: auto;
	}
	.switch__input {
		background-color: hsl(0, 0%, 100%);
		border-radius: 0.75em;
		box-shadow: 0 0 0 0.0625em hsla(var(--hue), 90%, 50%, 0),
			0 0.125em 0.5em hsla(var(--hue), 10%, 10%, 0.1);
		outline: transparent;
		width: 2.75em;
		height: 1.5em;
		-webkit-appearance: none;
		appearance: none;
		transition: background-color var(--trans-dur), box-shadow var(--trans-dur);
	}
	.switch__input:checked {
		background-color: hsl(var(--hue), 10%, 10%);
	}
	.switch__input:checked ~ .switch__icon {
		color: hsla(var(--hue), 10%, 40%);
	}
	.switch__input:checked ~ .switch__inner:before,
	.switch__input:checked ~ .switch__inner-icons {
		transform: translateX(1.25em);
	}
	.switch__input:not(:checked) ~ .switch__icon:first-of-type,
	.switch__input:checked ~ .switch__icon:nth-of-type(2) {
		transform: rotate(360deg);
	}
	.switch__input:checked ~ .switch__inner-icons .switch__icon:first-of-type {
		transform: translateX(-1.25em) rotate(-360deg);
	}
	.switch__input:checked ~ .switch__inner-icons .switch__icon:nth-of-type(2) {
		transform: translateX(-1.25em) rotate(360deg);
	}
	.switch__input:focus-visible {
		box-shadow: 0 0 0 0.0625em hsla(var(--hue), 90%, 50%, 1),
			0 0.125em 0.5em hsla(var(--hue), 10%, 10%, 0.1);
	}
	.switch__sr {
		overflow: hidden;
		position: absolute;
		width: 1px;
		height: 1px;
	}

	
</style>