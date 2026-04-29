"use client"
import { useState, useEffect, useRef } from "react"
import { tokenize, commands } from "@/components/Parser"
import "./terminal.css"

export function Terminal() {
	const terminalRef = useRef<HTMLDivElement>(null)
	const inputRef = useRef<HTMLElement>(null)
	const [input, setInput] = useState("")
	const [logs, setLogs] = useState([{ cmd: "intro", output: "Hi, ShiXun here, type `help` to show all the available options" }])
	const caretRef = useRef<HTMLElement>(null)

	const createDebugBox = (rect: DOMRect) => {
		document.getElementById("debug-box")?.remove()

		const box = document.createElement('div')
		box.id = 'debug-box'
		box.style.position = 'fixed'
		box.style.border = '2px solid red'
		box.style.pointerEvents = 'none'
		box.style.zIndex = '99'

		// Map the rect properties
		box.style.left = `${rect.left}px`;
		box.style.top = `${rect.top}px`;
		box.style.width = `${rect.width}px`;
		box.style.height = `${rect.height}px`;

		document.body.appendChild(box);
	}

	const getCaretPosition = () => {
		const selection = window?.getSelection()
		if (!selection || selection.rangeCount === 0) return null;
		const range = selection.getRangeAt(0)
		const rects = range.getClientRects()
		return rects
	}

	const syncCaretPosition = () => {
		const rects = getCaretPosition()!
		const terminalRect = terminalRef.current?.getBoundingClientRect()
		if (terminalRect && rects && rects.length > 0) {
			const x = rects[0].x - terminalRect.x
			const y = rects[0].y - terminalRect.y
			if (caretRef.current) {
				caretRef.current.style.transform = `translate(${x}px ${y}px)`
				createDebugBox(terminalRect)
			}
		}
	}

	// Focus on input when clicked on terminal
	useEffect(() => {
		const handleTerminalFocus = () => inputRef.current?.focus()

		terminalRef.current?.addEventListener("click", handleTerminalFocus)
		return () => {
			terminalRef.current?.removeEventListener("click", handleTerminalFocus)
		}
	}, [])

	const executeCommand = (rawCmd: string) => {
		const tokens = tokenize(rawCmd)
		const [cmd, ...rest] = tokens

		if (tokens.length === 0) return ""
		if (rawCmd === "clear") {
			setLogs([])
			return ""
		}

		try {
			const cmdFn = commands?.[cmd.value as keyof typeof commands]
			const output = cmdFn(rest)
			writeHistory(output)
		} catch (error: unknown) {
			writeHistory(`${cmd.value}: command not found.`)
		}
	}

	const writeHistory = (output: string) => {
		setLogs([...logs, { cmd: input, output: output }])
	}

	return (
		<div
			ref={terminalRef}
			className="bg-zinc-500/30 font-mono overflow-hidden border border-zinc-700 backdrop-blur-2xl w-full h-full grid grid-rows-[1fr_auto_1fr] rounded-xl">
			<div className="p-2 bg-zinc-950/90 text-zinc-400 lowercase text-center">LimShiXun's Portfolio</div>
			<div className="p-1 border-y border-zinc-700 min-h-120 ">
				<div className="text-wrap break-all flex flex-col">
					{logs.length > 0 && (logs.map(({ cmd, output }, idx) => {
						return (
							<div key={idx}>
								<div className="space-x-2">
									<span>limshixun@portfolio$</span>
									<span>{cmd}</span>
								</div>
								<span>{output}</span>
							</div>
						)
					}))}
					<div>
						<span className="mr-2">limshixun@portfolio$</span>
						<span
							ref={inputRef}
							contentEditable
							onInput={(e) => {
								setInput(e.currentTarget.textContent || "")
							}}
							onKeyUp={(e) => {
								if (e.repeat) console.log('hold')
							}}
							onKeyDownCapture={(e) => {
								syncCaretPosition()
							}}
							onKeyUpCapture={() => {
								syncCaretPosition()
							}}
							onKeyDown={(e) => {
								if (e.code.toLowerCase() === "enter") {
									// Prevent to nextline
									e.preventDefault()
									executeCommand(e.currentTarget.textContent)
									// Reset 
									e.currentTarget.textContent = ""
									setInput("")
								}
							}}
							onMouseUp={() => {
								syncCaretPosition()
							}}
							onMouseDown={() => {
								syncCaretPosition()
							}}
							className="focus:outline-0 caret-transparent"
						/>
						<span ref={caretRef} className="bg-white animation-blink fixed w-2 h-[21px] "></span>
					</div>
				</div>
			</div>
			<div className="p-2 bg-zinc-950/90" >footer</div>
		</div>
	)
}
