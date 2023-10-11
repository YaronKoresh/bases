import { Bases } from "./index.mjs"; // or: const { Bases } = await import("./index.mjs");

const stringToBase62 = Bases(
	"Yaroni Makaroni",
	"0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
	1,
	""
);
console.log( stringToBase62 === 'eqW933SeYTNa1dnrLnFx' );

const hexToDecimal = Bases(
	"FF",
	"0123456789ABCDEF",
	10,
	""
);
console.log( hexToDecimal === "255" );