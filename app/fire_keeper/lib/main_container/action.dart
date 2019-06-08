import 'package:fish_redux/fish_redux.dart';

import 'state.dart';

enum MainContainerAction {
  onNavigateToWeb,
}

class MainContainerActionCreator {
  static Action onNavigateToWebAction() =>
      const Action(MainContainerAction.onNavigateToWeb);
}
