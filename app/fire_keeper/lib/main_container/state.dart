import 'package:fire_keeper/global_store/state.dart';
import 'package:fish_redux/fish_redux.dart';

class MainContainerState implements GlobalBaseState<MainContainerState> {

  @override
  MainContainerState clone() {
    var newState = MainContainerState();

    return newState;
  }
}

MainContainerState initState(Map<String, dynamic> args) {
  return MainContainerState();
}
