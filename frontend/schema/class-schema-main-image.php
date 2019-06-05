<?php
/**
 * WPSEO plugin file.
 *
 * @package WPSEO\Frontend\Schema
 */

/**
 * Returns ImageObject schema data.
 *
 * @since 10.2
 */
class WPSEO_Schema_MainImage implements WPSEO_Graph_Piece {

	/**
	 * A value object with context variables.
	 *
	 * @var WPSEO_Schema_Context
	 */
	private $context;

	/**
	 * WPSEO_Schema_WebPage constructor.
	 *
	 * @param WPSEO_Schema_Context $context A value object with context variables.
	 */
	public function __construct( WPSEO_Schema_Context $context ) {
		$this->context = $context;
	}

	/**
	 * Determines whether or not a piece should be added to the graph.
	 *
	 * @return bool
	 */
	public function is_needed() {
		if ( is_singular() ) {
			return true;
		}

		return false;
	}

	/**
	 * Adds a main image for the current URL to the schema if there is one.
	 *
	 * This can be either the featured image, or fall back to the first image in the content of the page.
	 *
	 * @return false|array $data Image Schema.
	 */
	public function generate() {
		$image_id = $this->context->canonical . WPSEO_Schema_IDs::PRIMARY_IMAGE_HASH;

		$image_schema = $this->get_featured_image( $this->context->id, $image_id );

		if ( $image_schema === null ) {
			$image_schema = $this->get_first_content_image( $this->context->id, $image_id );
		}

		if ( $image_schema === null ) {
			return false;
		}

		$this->context->has_image = true;

		return $image_schema;
	}

	/**
	 * Gets the image schema for the web page based on the featured image.
	 *
	 * @param int    $post_id  The post id.
	 * @param string $image_id The image schema id.
	 *
	 * @return array|null The image schema object and null if there is no featured image.
	 */
	private function get_featured_image( $post_id, $image_id ) {
		if ( ! has_post_thumbnail( $post_id ) ) {
			return null;
		}

		$schema_image = new WPSEO_Schema_Image( $image_id );
		return $schema_image->generate_from_attachment_id( get_post_thumbnail_id() );
	}

	/**
	 * Gets the image schema for the web page based on the first content image image.
	 *
	 * @param int    $post_id  The post id.
	 * @param string $image_id The image schema id.
	 *
	 * @return array|null The image schema object and null if there is no image in the content.
	 */
	private function get_first_content_image( $post_id, $image_id ) {
		$image_url = WPSEO_Image_Utils::get_first_usable_content_image_for_post( $post_id );

		if ( $image_url === null ) {
			return null;
		}

		$schema_image = new WPSEO_Schema_Image( $image_id );
		return $schema_image->generate_from_url( $image_url );
	}
}
