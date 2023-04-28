import { Component, createRoot } from '@wordpress/element';
import { DragDropContext } from 'react-beautiful-dnd';
import Column from './columns/column';

class App extends Component {
	state = {
		statusOrder: [],
		status: {},
		content: {},
	}

	/**
	 * Handles updating the state and pushing those changes to the database.
	 *
	 * @returns {Array} An array of status ids.
	 */
	onDragEnd = result => {}

	/**
	 * Fetches status order from settings.
	 *
	 * TODO: Build a settings page to allow users to change the order of all
	 *       statuses, using the WP REST API.
	 *
	 * @returns {Array} An array of status ids.
	 */
	setStatusOrder = () => {
		this.setState( {
			...this.state.statusOrder,
			statusOrder: [ 'draft', 'pending', 'future', 'publish' ],
		} );
	}

	/**
	 * Fetches statuses from settings.
	 *
	 * TODO: Build a settings page to allow users to organize statuses, both
	 *       core and custom.
	 *
	 * @returns {Object} An object of statuses.
	 */
	setStatuses = () => {
		this.setState( {
			status: {
				...this.state.status,
				'draft': {
					id: 'draft',
					title: 'Draft',
					contentOrder: [],
				},
				'pending': {
					id: 'pending',
					title: 'Pending',
					contentOrder: [],
				},
				'future': {
					id: 'future',
					title: 'Scheduled',
					contentOrder: [],
				},
				'publish': {
					id: 'publish',
					title: 'Published',
					contentOrder: [],
				},
			}
		} );
	}

	/**
	 * Fetches content for a given status.
	 *
	 * @param {Array} status
	 *
	 * @returns {Array} An array of content.
	 */
	setStatusContent = async ( status ) => {
		const promises = [];
		const request = {
			types: [ 'Posts', 'Pages' ],
			params: {
				status: status,
				per_page: 10,
				_fields: 'id,title,type,status',
			},
		}

		const promise = new Promise( ( resolve ) => {
			for ( const postType of request.types ) {
				wp.api.loadPromise.done( () => {
					const TYPE = new wp.api.collections[ postType ]();

					promises.push( TYPE.fetch( { data: request.params } ) );
				} );
			}

			Promise.all( promises ).then( ( result ) => {
				const content = [];

				result.map( ( data ) => {
					if ( data.length > 0 ) {
						data.map( item => {
							content[ `item-${ item.id }` ] = item;
						} );
					}
				} );

				resolve( content );
			} );
		} );

		const content = await promise;

		const contentOrder = Object.keys( content ).map( key => key );

		this.setState( {
			status: {
				...this.state.status,
				[ status ]: {
					...this.state.status[ status ],
					contentOrder: contentOrder,
				},
			}
		} );

		this.setState( {
			content: {
				...this.state.content,
				...content,
			},
		} );
	}

	componentDidMount() {
		this.setStatusOrder();
		this.setStatuses();

		// TODO: Figure out why using the status order state causes an infinite loop.
		for ( const status of [ 'draft', 'pending', 'future', 'publish' ] ) {
			this.setStatusContent( status );
		}
	}

	render() {
		return (
			<DragDropContext onDragEnd={ this.onDragEnd }>
				{ this.state.statusOrder.map( statusId => {
					const status = this.state.status[ statusId ];
					const content = this.state.status[ statusId ].contentOrder.map( contentId => this.state.content[ contentId ] );

					return <Column key={ status.id } status={ status } content={ content } />;
				} ) }
			</DragDropContext>
		);
	}
}

createRoot( document.getElementById( 'status-boards' ) ).render( <App /> );
