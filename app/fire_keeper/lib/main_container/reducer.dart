import 'package:fish_redux/fish_redux.dart';

import 'action.dart';
import 'state.dart';

Reducer<MainContainerState> buildReducer() {
  return asReducer(<Object, Reducer<MainContainerState>>{
    MainContainerAction.updateJavascriptChannels:
        _updatJavascriptChannelsReducer,
  });
}

MainContainerState _updatJavascriptChannelsReducer(
        MainContainerState state, Action action) =>
    state.clone()..javascriptChannels = action.payload;
