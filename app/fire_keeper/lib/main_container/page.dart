import 'package:fish_redux/fish_redux.dart';

import 'state.dart';
import 'view.dart';
import 'reducer.dart';
import 'effect.dart';

class MainContainerPage extends Page<MainContainerState, Map<String, dynamic>> {
  MainContainerPage()
      : super(
          initState: initState,
          effect: buildEffect(),
          reducer: buildReducer(),
          view: buildView,
          dependencies: null,
        );
}
