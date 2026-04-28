type TokenType = {
	tag: string,
	value: string,
}

export function tokenize(input: string) {
	let regex = /[^\s"']+|"([^"]*)"|'([^']*)'/g
	let match
	let index = 0
	let tokens = []

	while ((match = regex.exec(input)) !== null) {
		const value = match[1] || match[2] || match[0]

		let tag = "ARGUMENT";
		if (index === 0) {
			tag = "COMMAND";
		} else if (value.startsWith("-")) {
			tag = "FLAG";
		}

		tokens.push({ tag: tag, value: value });
		index++;
	}

	return tokens;
}

export const commands = {
	"echo": (args: TokenType[]) => args.map((arg) => arg.value).join(" ")
}
