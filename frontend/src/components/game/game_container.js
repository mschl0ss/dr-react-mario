import {connect} from 'react-redux';
import {extractBoard, pillOrder}  from './game_selectors';
import Game from './game';
import {receiveScore, gameRunning} from '../../actions/ui_actions'

const mapStateToProps = state => {
    return {  
    board: extractBoard(state),
    colors: pillOrder(state),
    gameName: state.game.name,
    difficulty: state.game.difficulty
  }
}

const mapDispatchToProps = dispatch => ({
  sendScore: score => dispatch(receiveScore(score)),
  sendRunning: running => dispatch(gameRunning(running)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Game)

