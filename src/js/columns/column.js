/**
 * A single column representing a status, which includes a list of content items.
 *
 * @package StatusBoards
 */

import { Component, createElement } from '@wordpress/element';
import { Droppable } from 'react-beautiful-dnd';
import Card from '../content/card';

const Container = ( props ) => {
	return createElement( 'div', { className: props.className }, props.children );
};

const Title = ( props ) => {
	return createElement( 'h3', null, props.children );
};

const Cards = ( props ) => {
	return createElement( 'div', null, props.children );
};

export default class Column extends Component {

	render() {
		return (
			<Container className={ 'status--' + this.props.status.id }>
				<Title>{ this.props.status.title }</Title>
				<Droppable droppableId={ this.props.status.id }>
					{ provided => (
						<div
							ref={ provided.innerRef }
							{ ...provided.droppableProps }
						>
							<Cards>
								{ this.props.content.map( ( data, index ) => {
									return <Card key={ `item-${ data.id }` } content={ data } index={ index } />;
								} ) }
								{ provided.placeholder }
							</Cards>
						</div>
					) }
				</Droppable>
			</Container>
		);
	}
}
