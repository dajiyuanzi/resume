
import { CHANGE_TEST } from '../actions/home'
import { GET_PERSONAL_DETAIL, GET_PLAYLIST_DETAIL } from '../actions/home'
//定义最初的state
let init = {
  personalizedDetail: [],
  playListDetail: [],
};

export default function user(state = init, action) {
  switch (action.type) {
    case GET_PERSONAL_DETAIL:
      return Object.assign({}, state, { personalizedDetail: action.personalizedDetail });
    case GET_PLAYLIST_DETAIL:
      return Object.assign({}, state, { playListDetail:action.playListDetail });
    default:
      return state;
  }
}


