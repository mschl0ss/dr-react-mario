import {connect} from 'react-redux';
import {extractBoard, pillOrder}  from './game_selectors';
import Game from './game';

const mapStateToProps = state => ({
    board: extractBoard(state), 
    colors: pillOrder(state)
})

const mapDispatchToProps = dispatch => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(Game)

