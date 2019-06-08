import 'package:fish_redux/fish_redux.dart';

abstract class GlobalBaseState<T extends Cloneable<T>> implements Cloneable<T> {
}

class GlobalState implements GlobalBaseState<GlobalState> {
  @override
  GlobalState clone() {
    return GlobalState();
  }
}
