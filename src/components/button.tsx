import React from 'react'

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>

/**
 * A simple button component with custom styles.
 * @param props - The properties to pass to the button element.
 * @returns A styled button element.
 */
export function button(props: ButtonProps) {
	return (
		<button
			{...props}
			style={{
				background: 'blue',
				border: 'none',
				borderRadius: '4px',
				color: 'white',
				padding: '8px 16px',
			}}
		/>
	)
}
