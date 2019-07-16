import {connect} from 'react-redux';
import {extractBoard}  from './game_selectors';
import Game from './game';

const mapStateToProps = state => ({
    board: extractBoard(state)
})

const mapDispatchToProps = dispatch => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(Game)