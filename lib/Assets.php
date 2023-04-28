<?php
/**
 * Asset management.
 *
 * @package StatusBoards
 *
 * @author DualFocus <support@dualfocus.dev>
 */

namespace DualFocus\StatusBoards;

/**
 * Asset management class.
 */
class Assets extends Plugin {

	/**
	 * Class constructor.
	 */
	public function __construct() {
		add_action( 'admin_enqueue_scripts', [ __CLASS__, 'enqueue_scripts' ] );
	}

	/**
	 * Enqueue scripts.
	 */
	public static function enqueue_scripts() {
		$screen = get_current_screen();

		if ( 'toplevel_page_status-boards' === $screen->id ) {
			wp_enqueue_script(
				'status-boards',
				self::url( 'dist/app.js' ),
				[ 'wp-element', 'wp-api' ],
				self::version(),
				true
			);

			wp_enqueue_style(
				'status-boards',
				self::url( 'dist/style.css' ),
				[],
				self::version()
			);
		}
	}
}
