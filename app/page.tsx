import { Terminal } from "@/components/Terminal"

export default function Home() {
	return (
		<div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
			<main className="flex flex-1 w-full max-w-5xl flex-col items-center justify-between py-32  bg-white dark:bg-black sm:items-start">
				<div className="bg-zinc-500/30 overflow-hidden border border-zinc-700 backdrop-blur-2xl w-full h-full grid grid-rows-[1fr_auto_1fr] rounded-xl">
					<div className="p-2 bg-zinc-950/90 text-zinc-400 lowercase text-center">Lim Shi Xun's Portfolio</div>
					<div className="p-2 border-y border-zinc-700 min-h-120 ">
						<Terminal />
					</div>
					<div className="p-2 bg-zinc-950/90" >footer</div>
				</div>
			</main>
		</div>
	);
}
