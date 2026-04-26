"use client"
import { useState, useEffect } from "react"
export function Terminal() {
	const [input, setInput] = useState("")
	const [logs, setLogs] = useState([{ cmd: "intro", output: "Hi, ShiXun here, type `help` to show all the available options" }])

	// Focus on input when clicked on terminal
	useEffect(() => {
		const terminal = document.getElementById("terminal")!
		const input = document.getElementById('input')!
		const handleTerminalFocus = () => input.focus()

		terminal.addEventListener("click", handleTerminalFocus)
		return () => {
			terminal.removeEventListener("click", handleTerminalFocus)
		}
	}, [])


	const executeCommand = (command: string) => {
		const trimmedCommand = command.trim();
		if (trimmedCommand === "clear") {
			setLogs([])
			return ""
		}
		return trimmedCommand === "" ? "" : `${trimmedCommand}: command not found.`
	}

	const writeHistory = (output: string) => {
		setLogs([...logs, { cmd: input, output: output }])
	}

	return (
		<div
			id="terminal"
			className="bg-zinc-500/30 font-mono overflow-hidden border border-zinc-700 backdrop-blur-2xl w-full h-full grid grid-rows-[1fr_auto_1fr] rounded-xl">
			<div className="p-2 bg-zinc-950/90 text-zinc-400 lowercase text-center">LimShiXun's Portfolio</div>
			<div className="p-1 border-y border-zinc-700 min-h-120 ">
				<div className="text-wrap break-all flex flex-col">
					{logs.length > 0 && (logs.map(({ cmd, output }, idx) => {
						return (
							<div key={idx}>
								<div className="flex gap-2">
									<span>limshixun@portfolio$</span>
									<span>{cmd}</span>
								</div>
								<span>{output}</span>
							</div>
						)
					}))}
					<div className="flex gap-2">
						<span>limshixun@portfolio$</span>
						<span
							id="input"
							contentEditable
							onInput={(e) => {
								setInput(e.currentTarget.textContent || "")
							}}
							onKeyDown={(e) => {
								if (e.code.toLowerCase() === "enter") {
									// Prevent to nextline
									e.preventDefault()
									const output = executeCommand(e.currentTarget.textContent)
									writeHistory(output)
									// Reset 
									e.currentTarget.textContent = ""
									setInput("")
								}
							}}
							className="focus:outline-0"
						/>
					</div>
				</div>
			</div>
			<div className="p-2 bg-zinc-950/90" >footer</div>
		</div>
	)
}
