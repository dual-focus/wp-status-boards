/**
 * A single content item of any post type (post, page, etc.), rendered as a card
 * within a column.
 *
 * @package StatusBoards
 */

import { Component, createElement } from '@wordpress/element';
import { Draggable } from 'react-beautiful-dnd';

const Container = ( props ) => {
	return createElement( 'div', null, props.children );
};

export default class Card extends Component {
	render() {
		return (
			<Draggable draggableId={ `item-${ this.props.content.id }` } index={ this.props.index }>
				{ provided => (
					<div
						ref={ provided.innerRef }
						className="status-content-card"
						{ ...provided.draggableProps }
						{ ...provided.dragHandleProps }
					>
						<Container>
							{ this.props.content.title.rendered }
						</Container>
					</div>
				) }
			</Draggable>
		)
	}
}
