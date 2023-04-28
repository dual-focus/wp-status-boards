<?php
/**
 * Status Boards
 *
 * @package           StatusBoards
 * @author            Dual Focus
 * @license           MPL-2.0
 *
 * @wordpress-plugin
 *
 * Plugin Name:       Status Boards
 * Plugin URI:        https://dualfocus.dev/wp/status-boards
 * Description:       Organizing and managing your content has never been easier. With a Kanban style drag-and-drop interface, Status Boards will help you streamline your content management workflow, giving you the birds-eye-view you need to keep your content moving forward.
 * Version:           0.0.1
 * Requires at least: 6.0
 * Requires PHP:      8.0
 * Author:            Dual Focus
 * Author URI:        https://dualfocus.dev/
 * License:           MPL-2.0
 * License URI:       https://www.mozilla.org/en-US/MPL/2.0/
 * Text Domain:       status-boards
 * Domain Path:       /languages
 *
 * Status Boards is free software: you can redistribute it and/or modify
 * it under the terms of the Mozilla Public License (see LICENSE).
 *
 * Status Boards is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 *
 * You should have received a copy of the Mozilla Public License
 * along with Status Boards. If not, see License URI above.
 */

namespace DualFocus\StatusBoards;

const AUTOLOADER = __DIR__ . '/vendor/autoload.php';

/**
 * Plugin Configuration Class
 *
 * Used to store common references, such as a file directory, for easy lookups.
 */
abstract class Plugin {

	/**
	 * Lookup a location relative to the main plugin directory.
	 *
	 * @param string  $loc The location, directory or file, to lookup.
	 * @param boolean $url True if requesting the URL, otherwise it is a path.
	 */
	public static function dir( $loc = '', $url = false ) {
		return ( true === $url ? \plugin_dir_url( __FILE__ ) : \plugin_dir_path( __FILE__ ) ) . $loc;
	}

	/**
	 * Alias for looking up a URL more easily.
	 *
	 * @param string $loc The location, directory or file, to reference.
	 */
	public static function url( $loc = '' ) {
		return self::dir( $loc, true );
	}

	/**
	 * Method for getting the plugin version.
	 *
	 * @return string Plugin version.
	 */
	public static function version() {
		return \get_plugin_data( __FILE__ )['Version'];
	}
}

// Fire things off, if we have an autoload file.
if ( file_exists( AUTOLOADER ) ) {
	require_once AUTOLOADER;

	add_action(
		'plugins_loaded',
		function() {
			new Assets();
			new Admin\Menus();
		}
	);
}
