import stem from "../../../src/morphology/arabic/stem";
import getMorphologyData from "../../specHelpers/getMorphologyData";

const morphologyDataAR = getMorphologyData( "ar" ).ar;

const wordsToStem = [
	// Two letter word with a removed duplicate letter.
	[ "صف", "صفف" ],
	// Two letter word with the word-final letter (alif) removed.
	[ "عد", "عدا" ],
	// Two letter word with the word-initial letter (waw) removed.
	[ "بأ", "وبأ" ],
	// Two letter word with the middle letter (yah) removed.
	[ "غض", "غيض" ],
	// Three letter words which is in the list of threeLetterRoots
	[ "رحل", "رحل" ],
	[ "طمو", "طمو" ],
	// Three letter word with initial letter ا/ ؤ/ ئ, change the initial letter to أ
	[ "ؤكد", "أكد" ],
	// Three letter words ending in weak letter و/ي/ا/ى/ء/ئ and the root is in the list of word with the last weak letter or hamza removed.
	[ "قوا", "قوا" ],
	[ "بدء", "بدأ" ],
	[ "كرى", "كرى" ],
	// Three letter words ending in weak letter و/ي/ا/ى/ء/ئ and the root is NOT in the list of word with the last weak letter or hamza removed.
	[ "وفى", "وف" ],
	[ "باء", "با" ],
	// The current stem is برا, as بر is also detected in wordsWithLastHamzaRemoved list. For words found in the list, ا is added to the root
	// [ "برئ", "بر" ],
	// The current stem is بلي, as بل is also detected in wordsWithLastYahRemoved list. For words found in the list, ي is added to the root
	// [ "بلا", "بل" ],
	[ "رؤي", "رؤ" ],
	// Three letter words with و/ي as their second letter and the root is in the exception list after و/ي removal
	[ "أيد", "أيد" ],
	[ "أوز", "أوز" ],
	// Three letter words with و/ي/ا/ئ as their second letter and the root is NOT in the exception list after و/ي removal
	[ "موظ", "مظ" ],
	[ "فئة", "فة" ],
	[ "بار", "بر" ],
	// Three letter words with ئ/ؤ as their second letter and end in ر/ز/ن, change ئ/ؤ to ا
	[ "يئن", "يان" ],
	[ "بئر", "بار" ],
	// Three letter words that ends in a shadda, duplicate the second character and the root is in threeLetterRoots list
	[ "ودّ", "ودد" ],
];

describe( "Test for stemming Arabic words", () => {
	for ( let i = 0; i < wordsToStem.length; i++ ) {
		const wordToCheck = wordsToStem[ i ];
		it( "stems the word " + wordToCheck[ 0 ], () => {
			expect( stem( wordToCheck[ 0 ], morphologyDataAR ) ).toBe( wordToCheck[ 1 ] );
		} );
	}
} );
