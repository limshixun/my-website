"use client"
import { useState, useRef, useEffect } from "react"
export function Terminal() {
	const [input, setInput] = useState("")

	useEffect(() => {
		const terminal = document.getElementById("terminal")!
		console.log(terminal)
		terminal.addEventListener("click", () => {
			terminal.focus()
		})
		return () => terminal.removeEventListener("click", () => terminal.focus())
	}, [])

	return (
		<div id="terminal" tabIndex={1} onBlur={() => setInput("")} onFocus={() => setInput("focused")} className="bg-zinc-500/30 overflow-hidden border border-zinc-700 backdrop-blur-2xl w-full h-full grid grid-rows-[1fr_auto_1fr] rounded-xl">
			<div className="p-2 bg-zinc-950/90 text-zinc-400 lowercase text-center">Lim Shi Xun's Portfolio</div>
			<div className="p-2 border-y border-zinc-700 min-h-120 ">
				<div className="flex gap-2">
					<span className="font-mono">limshixun@portfolio $ </span>
					<div >
						<p className="font-mono">{input}</p>
					</div>
				</div>
			</div>
			<div className="p-2 bg-zinc-950/90" >footer</div>
		</div>
	)
}
