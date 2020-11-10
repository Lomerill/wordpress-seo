import SentencePart from "../../../../values/SentencePart.js";
import getParticiples from "../helpers/internal/getParticiples.js";

/**
 * Creates a English specific sentence part.
 *
 * @param {string} sentencePartText The text from the sentence part.
 * @param {Array} auxiliaries The list of auxiliaries from the sentence part.
 * @constructor
 */
var EnglishSentencePart = function( sentencePartText, auxiliaries ) {
	SentencePart.call( this, sentencePartText, auxiliaries, "en_EN" );
};

require( "util" ).inherits( EnglishSentencePart, SentencePart );

/**
 * Returns the participle objects for the participles found in the sentence part.
 * @returns {Array} The list of participle objects.
 */

EnglishSentencePart.prototype.getParticiples = function() {
	return getParticiples( this.getSentencePartText(), this.getAuxiliaries() );
};

export default EnglishSentencePart;
