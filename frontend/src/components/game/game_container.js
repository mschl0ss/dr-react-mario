import {connect} from 'react-redux';
import {extractBoard}  from './game_selectors';
import Game from './game';

const mapStateToProps = state => {
    return {  
    board: extractBoard(state),
    gameName: state.game.name
  }
}

const mapDispatchToProps = dispatch => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(Game)