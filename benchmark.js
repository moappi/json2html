#!/usr/bin/env node
// Benchmark harness for json2html render performance.
// Run with: node benchmark.js [json2html-file]
// Defaults to node.json2html.js (which loads ./json2html.js).

const path = require("path");
const target = process.argv[2] || "./node.json2html.js";
const json2html = require(path.resolve(target));

function now() {
	const [s, ns] = process.hrtime();
	return s * 1000 + ns / 1e6;
}

function bench(name, iterations, fn) {
	// warmup
	for (let i = 0; i < Math.min(50, iterations); i++) fn();

	const start = now();
	for (let i = 0; i < iterations; i++) fn();
	const elapsed = now() - start;

	const opsPerSec = iterations / (elapsed / 1000);
	console.log(
		`${name.padEnd(34)} ${iterations.toString().padStart(8)} iters  ` +
			`${elapsed.toFixed(1).padStart(9)} ms  ${Math.round(opsPerSec).toLocaleString().padStart(12)} ops/sec`
	);
	return { name, iterations, elapsed, opsPerSec };
}

// ---------- Fixture data ----------

// A: simple single-element render
const simpleTemplate = { "<>": "div", "class": "greeting", "html": "${name}" };
const simpleData = { name: "ashley" };

// B: large list render (the common "table row" / "list item" case)
const listTemplate = {
	"<>": "li",
	"class": "item ${status}",
	"data-id": "${id}",
	"html": "${name} - $${value}",
};
const listData = [];
for (let i = 0; i < 3000; i++) {
	listData.push({
		id: i,
		name: "Item " + i,
		value: (i * 1.5).toFixed(2),
		status: i % 2 === 0 ? "even" : "odd",
	});
}

// C: deeply nested wrapper elements
function buildNested(depth) {
	if (depth === 0) return { "<>": "span", "html": "${leaf}" };
	return { "<>": "div", "class": "level-${depth}", "html": [buildNested(depth - 1)] };
}
const nestedTemplate = buildNested(30);
const nestedData = { leaf: "bottom", depth: 30 };

// D: components, list of items each rendering a sub-component
json2html.component.add("row", {
	"<>": "tr",
	"html": [
		{ "<>": "td", "html": "${name}" },
		{ "<>": "td", "html": "${email}" },
		{ "[]": "badge", "label": "${role}" },
	],
});
json2html.component.add("badge", { "<>": "span", "class": "badge", "html": "${label}" });

const componentTemplate = { "[]": "row" };
const componentData = [];
for (let i = 0; i < 1000; i++) {
	componentData.push({ name: "User " + i, email: `user${i}@example.com`, role: i % 3 === 0 ? "admin" : "member" });
}

// E: string-interpolation heavy (stresses the tokenizer specifically)
const tokenHeavyTemplate = {
	"<>": "div",
	"html":
		"${a} ${b} ${c} ${d} ${e} ${f} ${g} ${h} static text in between ${a} ${b} ${c}-${d}_${e}.${f} more ${g} ${h} tail",
};
const tokenHeavyData = { a: "1", b: "2", c: "3", d: "4", e: "5", f: "6", g: "7", h: "8" };

// ---------- Run ----------

console.log(`\nBenchmarking: ${target}\n`);

const results = [];
results.push(bench("A: simple single element", 200000, () => json2html.render(simpleData, simpleTemplate)));
results.push(bench("B: large list (3000 items)", 500, () => json2html.render(listData, listTemplate)));
results.push(bench("C: deeply nested (30 levels)", 20000, () => json2html.render(nestedData, nestedTemplate)));
results.push(bench("D: components (1000 rows)", 500, () => json2html.render(componentData, componentTemplate)));
results.push(bench("E: token-heavy string (16 tokens)", 100000, () => json2html.render(tokenHeavyData, tokenHeavyTemplate)));

console.log("");

if (process.argv[3] === "--json") {
	console.log(JSON.stringify(results.map(({ name, iterations, elapsed, opsPerSec }) => ({ name, iterations, elapsed, opsPerSec }))));
}
