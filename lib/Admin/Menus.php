<?php
/**
 * Admin Menus.
 *
 * @package StatusBoards
 *
 * @author DualFocus <support@dualfocus.dev>
 */

namespace DualFocus\StatusBoards\Admin;

use DualFocus\StatusBoards\Plugin;

/**
 * Admin Menus class.
 */
class Menus extends Plugin {

	/**
	 * Class constructor.
	 */
	public function __construct() {
		add_action( 'admin_menu', [ __CLASS__, 'register_menus' ] );
	}

	/**
	 * Register admin menus.
	 *
	 * @return void
	 */
	public static function register_menus() {
		add_menu_page(
			__( 'Status Boards', 'status-boards' ),
			__( 'Status Boards', 'status-boards' ),
			'edit_published_posts',
			'status-boards',
			function() {
				echo '<div class="wrap"><h1>Status Boards</h1><div id="status-boards"></div></div>';
			},
			'dashicons-schedule',
			3.9999999999999
		);
	}
}
